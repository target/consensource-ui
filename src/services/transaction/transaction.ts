import * as m from 'mithril';
import { createHash } from 'crypto';
import { Transaction, TransactionHeader, Batch, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';

import * as addressing from 'App/addressing';

export const BATCH_STATUS_WAIT = 60;

export enum BATCH_STATUS {
    COMMITTED = 'COMMITTED',
    INVALID = 'INVALID',
}

export interface PayloadInfo {
    payloadBytes: string | Buffer | NodeJS.TypedArray | DataView;
    inputs: string[];
    outputs: string[];
}

/**
 * Create an array of transaction IDs, where each ID is the `headerSignature`
 * of the transaction
 */
export const getTransactionIds = (transactions: sawtooth.protobuf.Transaction[]): string[] =>
    transactions.map(transaction => transaction.headerSignature);

/**
 * Creates a serialized `TransactionHeader`, signs the message,
 * and creates a `Transaction` with the header, signature and payload
 */
export const createTransaction = (
    payloadInfo: PayloadInfo,
    signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction => {
    const { payloadBytes, inputs, outputs } = payloadInfo;

    const pubkey = signer.getPublicKey().asHex();
    const payloadSha512 = createHash('sha512')
        .update(payloadBytes)
        .digest('hex');

    const transactionHeaderBytes = TransactionHeader.encode({
        familyName: addressing.familyName,
        familyVersion: addressing.familyVersion,
        inputs,
        outputs,
        signerPublicKey: pubkey,
        batcherPublicKey: pubkey,
        dependencies: [],
        payloadSha512,
    }).finish();

    const signature = signer.sign(transactionHeaderBytes as Buffer);

    return Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: signature,
        payload: payloadBytes as Buffer,
    });
};

/**
 * Create a `Transaction` with the payloadInfo and submit it in a `Batch`.
 * @returns `Promise` that will resolve when the transactions have been committed.
 */
export const submitTransaction = (payloadInfo: any, signer: sawtooth.signing.Signer): Promise<any> => {
    const transactions = [createTransaction(payloadInfo, signer)];
    return submitBatch(transactions, signer);
};

/**
 * Creates a serialized `BatchHeader`, signs the message,
 * and creates a `Batch` with the header, signature and transactions
 */
export const createBatch = (
    transactions: sawtooth.protobuf.Transaction[],
    signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Batch => {
    const transactionIds = getTransactionIds(transactions);
    const pubkey = signer.getPublicKey().asHex();
    const batchHeaderBytes = BatchHeader.encode({
        signerPublicKey: pubkey,
        transactionIds,
    }).finish();

    const signature = signer.sign(Buffer.from(batchHeaderBytes));

    return Batch.create({
        header: batchHeaderBytes,
        headerSignature: signature,
        transactions,
    });
};

/**
 * Make a `POST` request to `/api/batches`
 */
export const postBatches = (batchListBytes: Uint8Array): Promise<any> => {
    const url = '/api/batches';

    try {
        return m.request({
            method: 'POST',
            url,
            body: batchListBytes,
            headers: { 'Content-Type': 'application/octet-stream' },
            serialize: x => x,
        });
    } catch (e) {
        return Promise.reject(`Failed to POST ${url}: ${e.message}`);
    }
};

/**
 * Builds a batch and includes it in a `BatchList` that is submitted to the
 * validator.
 *
 * @return Promise which will resolve when the batch is determined to be either committed or invalid
 */
export const submitBatch = async (
    transactions: sawtooth.protobuf.Transaction[],
    signer: sawtooth.signing.Signer,
): Promise<string | string[]> => {
    const transactionIds = getTransactionIds(transactions);
    const batch = createBatch(transactions, signer);
    const batchListBytes = BatchList.encode({
        batches: [batch],
    }).finish();

    const res = await postBatches(batchListBytes);

    return waitForCommit(transactionIds, formatStatusUrl(res.link));
};

/**
 * This is to fix the URL's returned from the sawtooth rest api, which doesn't
 * render URL's for proxied environments
 */
export const formatStatusUrl = (url: string): string => `/api${url}`;

/**
 * Iterates over the list of invalid transactions in the batch and returns the error message
 * from the first invalid transaction that is in our array of `transactionIds`.
 */
export const getInvalidBatchResult = (batchResult: any, transactionIds: string[]): string => {
    const transaction_result = batchResult.invalid_transactions.find((transaction: any) =>
        transactionIds.indexOf(transaction.id),
    );

    return transaction_result ? transaction_result.message : 'Invalid Transaction';
};

/**
 * Given a statusUrl, poll with a `wait` param set to `BATCH_STATUS_WAIT`
 */
export const getBatchStatus = (statusUrl: string): Promise<any> => {
    const url = `${statusUrl}&wait=${BATCH_STATUS_WAIT}`;

    try {
        return m.request({
            url,
            method: 'GET',
        });
    } catch (e) {
        return Promise.reject(`Failed to GET ${url}: ${e.message}`);
    }
};

/**
 * Recursive function that will wait for commit, by polling the statusUrl provided.
 * It returns a promise, which will return the transaction id array on success, or:
 * - the error message from the first invalid transaction encountered
 * - an HTTP response error message
 */

export const waitForCommit = async (transactionIds: string[], statusUrl: string): Promise<string | string[]> => {
    const res = await getBatchStatus(statusUrl);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const batch = res.data[0];

    switch (batch.status) {
        case BATCH_STATUS.COMMITTED:
            return Promise.resolve(transactionIds);
        case BATCH_STATUS.INVALID:
            return Promise.reject(getInvalidBatchResult(batch, transactionIds));
        default:
            return waitForCommit(transactionIds, statusUrl);
    }
};

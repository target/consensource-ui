import * as m from 'mithril';
import { createHash } from 'crypto';
import { Transaction, TransactionHeader, Batch, BatchHeader, BatchList } from 'sawtooth-sdk/protobuf';

import * as addressing from 'App/addressing';

/**
 * Given a payload descriptor and a signer, create a transaction that can be
 * added to a batch.
 *
 * Args
 *  payloadInfo (:obj:): an object consisting of
 *    - payloadBytes: the bytes of the transaction content
 *    - inputs: the list of input addresses used by the payload
 *    - outputs: the list of output addresses used by the payload
 *
 *  signer (:Signer:): the signer to use with the transaction
 */
export const createTransaction = (payloadInfo: any, signer: sawtooth.signing.Signer): sawtooth.protobuf.Transaction => {
    const { payloadBytes, inputs, outputs } = payloadInfo;
    const pubkey = signer.getPublicKey().asHex();

    const transactionHeaderBytes = TransactionHeader.encode({
        familyName: addressing.familyName,
        familyVersion: addressing.familyVersion,
        inputs,
        outputs,
        signerPublicKey: pubkey,
        batcherPublicKey: pubkey,
        dependencies: [],
        payloadSha512: createHash('sha512')
            .update(payloadBytes)
            .digest('hex'),
    }).finish();

    const signature = signer.sign(transactionHeaderBytes as Buffer);

    return Transaction.create({
        header: transactionHeaderBytes,
        headerSignature: signature,
        payload: payloadBytes,
    });
};

/**
 * Submits a batch of the given transactions
 *
 * Args:
 *   transactions (Array:Transaction:) an array of Transaction protobuf objects
 *   signer (:Signer:): the signer to use with the transaction
 *
 * Returns:
 *   Promise which will resolve on batch commit
 */
export const submitBatch = (
    transactions: Array<sawtooth.protobuf.Transaction>,
    signer: sawtooth.signing.Signer,
): Promise<any> => {
    const transactionIds = transactions.map(txn => txn.headerSignature);
    const pubkey = signer.getPublicKey().asHex();
    const batchHeaderBytes = BatchHeader.encode({
        signerPublicKey: pubkey,
        transactionIds,
    }).finish();

    const signature = signer.sign(Buffer.from(batchHeaderBytes));

    const batch = Batch.create({
        header: batchHeaderBytes,
        headerSignature: signature,
        transactions: transactions,
    });

    const batchListBytes = BatchList.encode({
        batches: [batch],
    }).finish();

    return m
        .request({
            method: 'POST',
            url: '/api/batches',
            params: batchListBytes,
            headers: { 'Content-Type': 'application/octet-stream' },
            serialize: x => x,
        })
        .then((result: any) => _waitForCommit(transactionIds, _formatStatusUrl(result.link)));
};

/**
 * Given a payload descriptor and a signer, submit a transaction to the
 * validator.
 *
 * Args:
 *  payloadInfo (:obj:): an object consisting of
 *    - payloadBytes: the bytes of the transaction content
 *    - inputs: the list of input addresses used by the payload
 *    - outputs: the list of output addresses used by the payload
 *
 *  signer (:Signer:): the signer to use with the transaction
 */
export const submitTransaction = (payloadInfo: any, signer: sawtooth.signing.Signer): Promise<any> => {
    const transactions = [createTransaction(payloadInfo, signer)];
    return submitBatch(transactions, signer);
};

/**
 * This is to fix the URL's returned from the sawtooth rest api, which doesn't
 * render URL's for proxied environments
 */
const _formatStatusUrl = (url: string): string => `/api${url}`;

/**
 * This function will wait for commit, by polling the statusUrl provided.
 * It returns a promise, which will return the transaction id on success, or
 * - the error message from an invalid transaction
 * - the response message on a HTTP error
 */
const _waitForCommit = (transactionIds: Array<string>, statusUrl: string): Promise<any> =>
    m
        .request({
            url: `${statusUrl}&wait=60`,
            method: 'GET',
        })
        .catch(e => Promise.reject(e.message))
        .then(
            (result: any): Promise<any> => {
                // We can look at the single entry, in that each item in 'data' refers
                // to a batch submitted, so our batch status is entry 0
                const batch_result = result.data[0];
                if (batch_result.status === 'COMMITTED') {
                    return Promise.resolve(transactionIds);
                } else if (batch_result.status === 'INVALID') {
                    const transaction_result = batch_result.invalid_transactions.find((txn: any) =>
                        transactionIds.indexOf(txn.id),
                    );
                    if (transaction_result) {
                        return Promise.reject(transaction_result.message);
                    } else {
                        return Promise.reject('Invalid Transaction');
                    }
                } else {
                    return _waitForCommit(transactionIds, statusUrl);
                }
            },
        );

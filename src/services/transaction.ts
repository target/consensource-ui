import { createHash } from 'crypto';
import {
    Transaction,
    TransactionHeader,
    Batch,
    BatchHeader,
    BatchList,
} from 'sawtooth-sdk/protobuf';
import * as addressing from 'services/addressing';
import * as transactionApi from 'services/api/transaction';

export enum BATCH_STATUS {
    COMMITTED = 'COMMITTED',
    INVALID = 'INVALID',
}

export interface PayloadInfo {
    payloadBytes: string | Buffer | NodeJS.TypedArray | DataView;
    inputs: string[];
    outputs: string[];
}

class TransactionService {
    /**
     * Create an array of transaction IDs, where each ID is the `headerSignature`
     * of the transaction
     */
    getTransactionIds = (
        transactions: sawtooth.protobuf.Transaction[],
    ): string[] => transactions.map(transaction => transaction.headerSignature);

    /**
     * Creates a serialized `BatchHeader`, signs the message,
     * and creates a `Batch` with the header, signature and transactions
     */
    createBatch = (
        transactions: sawtooth.protobuf.Transaction[],
        signer: sawtooth.signing.Signer,
    ): sawtooth.protobuf.Batch => {
        const transactionIds = this.getTransactionIds(transactions);
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
     * Iterates over the list of invalid transactions in the batch and returns the error message
     * from the first invalid transaction that is in our array of `transactionIds`.
     */
    getInvalidBatchResult = (
        batchResult: any,
        transactionIds: string[],
    ): string => {
        const transaction_result = batchResult.invalid_transactions.find(
            (transaction: any) => transactionIds.indexOf(transaction.id),
        );

        return transaction_result
            ? transaction_result.message
            : 'Invalid Transaction';
    };

    /**
     * Recursive function that will wait for commit, by polling the statusUrl provided.
     * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
     * - the error message from the first invalid transaction encountered
     * - an HTTP response error message
     */
    waitForCommit = async (
        transactionIds: string[],
        batchStatusLink: string,
    ): Promise<string | string[]> => {
        const res = await transactionApi.getBatchStatus(batchStatusLink);

        // Because we currently only submit a single batch at a time
        // we can assume the only batch status entry is in index 0
        const batch = res.data[0];

        switch (batch.status) {
            case BATCH_STATUS.COMMITTED:
                return transactionIds;
            case BATCH_STATUS.INVALID:
                return Promise.reject(
                    this.getInvalidBatchResult(batch, transactionIds),
                );
            default:
                return this.waitForCommit(transactionIds, batchStatusLink);
        }
    };

    /**
     * Builds a batch and includes it in a `BatchList` that is submitted to the
     * validator.
     *
     * @return Promise which will resolve when the batch is determined to be either committed or invalid
     */
    submitBatch = async (
        transactions: sawtooth.protobuf.Transaction[],
        signer: sawtooth.signing.Signer,
    ): Promise<string | string[]> => {
        const transactionIds = this.getTransactionIds(transactions);
        const batch = this.createBatch(transactions, signer);
        const batchListBytes = BatchList.encode({
            batches: [batch],
        }).finish();

        const res = await transactionApi.postBatches(batchListBytes);

        return this.waitForCommit(transactionIds, res.link);
    };

    /**
     * Creates a serialized `TransactionHeader`, signs the message,
     * and creates a `Transaction` with the header, signature and payload
     */
    createTransaction = (
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
    submitTransaction(
        payloadInfo: PayloadInfo,
        signer: sawtooth.signing.Signer,
    ): Promise<any> {
        const transactions = [this.createTransaction(payloadInfo, signer)];
        return this.submitBatch(transactions, signer);
    }
}

export default new TransactionService();

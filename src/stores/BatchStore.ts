import { observable, action } from 'mobx';
import * as BatchApi from 'services/api/batch';

export enum BATCH_STATUS {
    COMMITTED = 'COMMITTED',
    INVALID = 'INVALID',
}

export default class BatchStore {
    @observable isWaitingOnBatch: boolean = false;

    /**
     * Builds a batch and includes it in a `BatchList` that is submitted to the
     * validator.
     *
     * @return Promise which will resolve when the batch is determined to be either committed or invalid
     */
    async submitBatch(batchListBytes: Uint8Array): Promise<void> {
        const res = await BatchApi.postBatches(batchListBytes);
        const { link: batchStatusLink } = res.data;

        this.waitForBatchCommit(batchStatusLink);
    }

    /**
     * Iterates over the list of invalid transactions in the batch and returns the error message
     * from the first invalid transaction that is in our array of `txnIds`.
     */
    getFailedTxns(invalidTxns: Array<any>): string {
        return invalidTxns.reduce((acc: string, txn: any) => {
            return `${acc} ${txn.id},`;
        }, 'The following transaction IDs failed to be committed to state: ');
    }

    /**
     * Recursive function that will wait for commit, by polling the statusUrl provided.
     * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
     * - the error message from the first invalid transaction encountered
     * - an HTTP response error message
     */
    @action.bound
    async waitForBatchCommit(batchStatusLink: string): Promise<string | void> {
        this.isWaitingOnBatch = true;

        const res = await BatchApi.getBatchStatus(batchStatusLink);

        // Because we currently only submit a single batch at a time
        // we can assume the only batch status entry is in index 0
        const batch = res.data.data[0];

        switch (batch.status) {
            case BATCH_STATUS.COMMITTED:
                this.isWaitingOnBatch = false;
                return;
            case BATCH_STATUS.INVALID:
                this.isWaitingOnBatch = false;
                return Promise.reject(
                    this.getFailedTxns(batch.invalid_transactions),
                );
            default:
                return await this.waitForBatchCommit(batchStatusLink);
        }
    }
}

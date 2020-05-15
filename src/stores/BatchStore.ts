import { observable, action } from 'mobx';
import * as BatchApi from 'services/api/batch';
import SnackbarStore from './SnackbarStore';

export enum BATCH_STATUS {
  COMMITTED = 'COMMITTED',
  INVALID = 'INVALID',
}

// TODO: Do we need to use a store for this? Does any
// other parts of the codebase care about `isWaitingOnBatch`?
export default class BatchStore {
  snackbarStore: SnackbarStore;

  @observable isWaitingOnBatch = false;

  constructor(snackbarStore: SnackbarStore) {
    this.snackbarStore = snackbarStore;
  }

  /**
   * Submits a serialized BatchList to the API and awaits a response.
   *
   * @return Promise which will resolve when the batch is determined to be either committed or invalid
   */
  async submitBatch(batchListBytes: Uint8Array): Promise<void> {
    const res = await BatchApi.postBatches(batchListBytes);
    const { link: batchStatusLink } = res.data;

    await this.waitForBatchCommit(batchStatusLink);
  }

  /**
   * Iterates over the list of invalid transactions in the batch and returns the error message
   * from the first invalid transaction that is in our array of `txnIds`.
   */
  static getFailedTxns(invalidTxns: Array<any>): string {
    return invalidTxns.reduce(
      (acc: string, txn: any) => `\n${acc} ${txn.id},`,
      'The following transaction IDs failed to be committed to state: ',
    );
  }

  // Because we currently only submit a single batch at a time
  // we can assume the only batch status entry is in index 0
  static async getBatchStatus(batchStatusLink: string) {
    const res = await BatchApi.getBatchStatus(batchStatusLink);
    const batch = res.data.data[0];

    return batch;
  }

  /**
   * Recursive function that will wait for commit, by polling the statusUrl provided.
   * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
   * - the error message from the first invalid transaction encountered
   * - an HTTP response error message
   */
  @action.bound
  async waitForBatchCommit(batchStatusLink: string): Promise<void> {
    this.isWaitingOnBatch = true;

    const batch = await BatchStore.getBatchStatus(batchStatusLink);

    let snackbarMsg = '';

    switch (batch.status) {
      case BATCH_STATUS.COMMITTED:
        snackbarMsg = 'Successfully submitted transactions to the network';
        this.isWaitingOnBatch = false;
        break;
      case BATCH_STATUS.INVALID:
        // TODO: Use a persistent modal here instead
        snackbarMsg = `Failed to submit transactions to the network \n ${BatchStore.getFailedTxns(
          batch.invalid_transactions,
        )}`;
        this.isWaitingOnBatch = false;
        break;
      default:
        snackbarMsg = 'Submitting transactions to the network';
        this.waitForBatchCommit(batchStatusLink);
        break;
    }

    this.snackbarStore.triggerSnackbar(snackbarMsg);
  }
}

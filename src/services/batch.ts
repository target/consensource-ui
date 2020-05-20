import * as BatchApi from 'services/api/batch';
import stores from 'stores';

export enum BATCH_STATUS {
  COMMITTED = 'COMMITTED',
  INVALID = 'INVALID',
}

class BatchService {
  /**
   * Recursive function that will wait for commit, by polling the statusUrl provided.
   * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
   * - the error message from the first invalid transaction encountered
   * - an HTTP response error message
   */
  async waitForBatchCommit(batchStatusLink: string): Promise<void> {
    const { snackbarStore } = stores;
    const res = await BatchApi.getBatchStatus(batchStatusLink);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const batch = res.data.data[0];

    let snackbarMsg = '';

    switch (batch.status) {
      case BATCH_STATUS.COMMITTED:
        snackbarMsg = 'Successfully submitted transactions to the network';
        break;
      case BATCH_STATUS.INVALID:
        // TODO: Use a persistent modal here instead
        snackbarMsg = 'Failed to submit transactions to the network';
        break;
      default:
        snackbarMsg = 'Submitting transactions to the network';
        this.waitForBatchCommit(batchStatusLink);
        break;
    }

    snackbarStore.open(snackbarMsg);
  }

  /**
   * Submits a serialized BatchList to the API and awaits a response.
   *
   * @return Promise which will resolve when the batch is determined to be either committed or invalid
   */
  async submitBatch(batchListBytes: Uint8Array): Promise<void> {
    let res;

    try {
      res = await BatchApi.postBatches(batchListBytes);
    } catch ({ message }) {
      throw new Error(`Failed to submit batch: ${message}`);
    }

    const { link: batchStatusLink } = res.data;

    await this.waitForBatchCommit(batchStatusLink);
  }
}

export default new BatchService();

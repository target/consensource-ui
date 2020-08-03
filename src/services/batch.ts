import { getBatchStatus, postBatches } from 'services/api';
import stores from 'stores';
import { ClientBatchStatus } from 'sawtooth-sdk/protobuf';

export const BatchStatus = ClientBatchStatus.Status;

class BatchService {
  /**
   * Given a `ClientBatchStatus.Status` string value, get the actual enum
   * number value that it corresponds to.
   */
  static getBatchStatusFromKey(status: ClientBatchStatus.Status) {
    return +ClientBatchStatus.Status[status];
  }

  /**
   * Recursive function that will wait for commit, by polling the statusUrl provided.
   * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
   * - the error message from the first invalid transaction encountered
   * - an HTTP response error message
   */
  async waitForBatchCommit(batchStatusLink: string): Promise<void> {
    const { snackbarStore } = stores;
    const res = await getBatchStatus(batchStatusLink);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const { status } = res.data[0];

    let snackbarMsg = '';

    switch (BatchService.getBatchStatusFromKey(status)) {
      case BatchStatus.COMMITTED:
        snackbarMsg = 'Successfully submitted transactions to the network';
        break;
      case BatchStatus.INVALID:
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
      res = await postBatches(batchListBytes);
    } catch ({ message }) {
      throw new Error(`Failed to submit batch: ${message}`);
    }

    const { link: batchStatusLink } = res;

    await this.waitForBatchCommit(batchStatusLink);
  }
}

export default new BatchService();

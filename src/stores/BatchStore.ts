import { action, observable } from 'mobx';
import { ClientBatchStatus } from 'sawtooth-sdk/protobuf';
import { getBatchStatus, postBatches, PostBatchRes } from 'services/api';

export interface BatchStatus {
  statusUrl: string;
  status: ClientBatchStatus.Status | null;
}

export class BatchStore {
  pendingBatches = observable<BatchStatus>([]);

  /**
   * Given a `ClientBatchStatus.Status` string value, get the actual enum
   * number value that it corresponds to.
   *
   * Needed due to a bug in Sawtooth typings that expect an int
   * for the status, instead of the string enum that is actually returned
   */
  static getBatchStatusFromKey(status: ClientBatchStatus.Status) {
    return +ClientBatchStatus.Status[status];
  }

  /**
   * Submits a serialized BatchList to the API and awaits a response.
   *
   * @return Promise which will resolve when the batch is determined to be either committed or invalid
   */
  async submitBatch(batchListBytes: Uint8Array) {
    let res: PostBatchRes;

    try {
      res = await postBatches(batchListBytes);
    } catch ({ message }) {
      throw new Error(`Failed to submit batch: ${message}`);
    }

    const statusUrl = res.link;

    this.appendBatchAndPrune({ statusUrl, status: null });

    this.pollBatchStatus(statusUrl);

    return statusUrl;
  }

  /**
   * Recursive function that will wait for commit, by polling the statusUrl provided.
   * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
   * - the error message from the first invalid transaction encountered
   * - an HTTP response error message
   */
  async pollBatchStatus(statusUrl: string) {
    const res = await getBatchStatus(statusUrl);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const { status } = res.data[0];
    const batchStatus: BatchStatus = { statusUrl, status };

    switch (BatchStore.getBatchStatusFromKey(status)) {
      case ClientBatchStatus.Status.COMMITTED:
        this.setBatchStatus(batchStatus);
        break;
      case ClientBatchStatus.Status.PENDING:
        this.setBatchStatus(batchStatus);
        this.pollBatchStatus(statusUrl);
        break;
      case ClientBatchStatus.Status.INVALID || ClientBatchStatus.Status.UNKNOWN:
        // TODO
        break;
      default:
        // TODO
        break;
    }
  }

  getBatchStatus(statusUrl: string) {
    const batch = this.pendingBatches.find(
      (BatchStatus) => BatchStatus.statusUrl === statusUrl,
    );

    return batch ? batch.status : null;
  }

  @action.bound
  setBatchStatus(batch: BatchStatus) {
    const updated = this.pendingBatches.map((pendingBatch) => {
      if (pendingBatch.statusUrl === batch.statusUrl) {
        return batch;
      }

      return pendingBatch;
    });

    this.pendingBatches.replace(updated);
  }

  @action.bound
  appendBatchAndPrune(batch: BatchStatus) {
    this.pendingBatches.push(batch);
    this.pruneBatches();
  }

  @action.bound
  pruneBatches() {
    this.pendingBatches.forEach((batch) => {
      if (batch.status === ClientBatchStatus.Status.COMMITTED) {
        this.pendingBatches.remove(batch);
      }
    });
  }
}

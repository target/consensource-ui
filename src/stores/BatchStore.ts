import { action, observable } from 'mobx';
import { ClientBatchStatus } from 'sawtooth-sdk/protobuf';
import { getBatchStatus, postBatches, PostBatchRes } from 'services/api';

export interface PendingBatch {
  statusUrl: string;
  status: ClientBatchStatus.Status | null;
}

export class BatchStore {
  pendingBatches = observable<PendingBatch>([]);

  // pendingBatchesKey = 'PENDING_BATCHES';

  // constructor() {
  //   this.getLocalStoragePendingBatches();
  // }

  /**
   * Submits a serialized BatchList to the API and awaits a response.
   *
   * @return Promise which will resolve when the batch is determined to be either committed or invalid
   */
  @action.bound
  async submitBatch(batchListBytes: Uint8Array) {
    let res: PostBatchRes;

    try {
      res = await postBatches(batchListBytes);
    } catch ({ message }) {
      throw new Error(`Failed to submit batch: ${message}`);
    }

    const statusUrl = res.link;

    this.addPendingBatch({ statusUrl, status: null });

    this.pollBatchStatus(statusUrl);

    return statusUrl;
  }

  /**
   * Recursive function that will wait for commit, by polling the statusUrl provided.
   * It returns a promise, which will return the transaction id array of headerSignatures on success, or:
   * - the error message from the first invalid transaction encountered
   * - an HTTP response error message
   */
  @action.bound
  async pollBatchStatus(statusUrl: string) {
    const res = await getBatchStatus(statusUrl);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const { status } = res.data[0];
    const pendingBatch: PendingBatch = { statusUrl, status };
    debugger;

    switch (pendingBatch.status) {
      case ClientBatchStatus.Status.COMMITTED:
        this.removePendingBatch(pendingBatch);
        break;
      case ClientBatchStatus.Status.PENDING:
        this.setPendingBatchStatus(pendingBatch);
        this.pollBatchStatus(pendingBatch.statusUrl);
        break;
      case ClientBatchStatus.Status.INVALID || ClientBatchStatus.Status.UNKNOWN:
        // TODO
        break;
      default:
        // TODO
        break;
    }
  }

  // @action.bound
  // getLocalStoragePendingBatches() {
  //   const batchStatusJson = localStorage.getItem(this.pendingBatchesKey);

  //   if (batchStatusJson) {
  //     const batchStatusLinks: string[] = JSON.parse(batchStatusJson);
  //     batchStatusLinks.forEach((link) => this.pollBatchStatus(link));
  //   }
  // }

  @action.bound
  removePendingBatch(batch: PendingBatch) {
    this.pendingBatches.remove(batch);
  }

  @action.bound
  setPendingBatchStatus(batch: PendingBatch) {
    this.pendingBatches.forEach((pendingBatch, i) => {
      if (pendingBatch.statusUrl === batch.statusUrl) {
        this.pendingBatches[i] = batch;
      }
    });
  }

  @action.bound
  addPendingBatch(batch: PendingBatch) {
    this.pendingBatches.push(batch);
  }

  getBatchStatus(statusUrl: string) {
    const batch = this.pendingBatches.find(
      (pendingBatch) => pendingBatch.statusUrl === statusUrl,
    );

    return batch ? batch.status : null;
  }
}

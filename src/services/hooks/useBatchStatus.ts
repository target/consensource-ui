import { useState, useEffect } from 'react';
import { BatchStatusRes, getBatchStatus } from 'services/api';
import { ClientBatchStatus } from 'sawtooth-sdk/protobuf';

type ResolvedBatchStatus = Exclude<
  ClientBatchStatus.Status,
  ClientBatchStatus.Status.PENDING
>;

/**
 * Custom hook that can be used to track the status of a batch
 * that has been submitted to the ConsenSource network.
 *
 * The `batchStatus` is initalized to null. When `setBatchStatusLink` is
 * called with a path to `/batch_statuses?<batch_ids>`, the hook will poll
 * the endpoint every 60 seconds until all batches are resolved.
 *
 * **Note:** Currently this hook only supports the polling of a single batch.
 */
export const useBatchStatus = () => {
  const [batchStatusLink, setBatchStatusLink] = useState<
    BatchStatusRes['link']
  >('');

  const [batchStatus, setBatchStatus] = useState<ResolvedBatchStatus | null>(
    null,
  );

  const pollBatchStatus = async (link: string): Promise<void> => {
    const res = await getBatchStatus(link);

    // Because we currently only submit a single batch at a time
    // we can assume the only batch status entry is in index 0
    const { status } = res.data[0];

    if (status === ClientBatchStatus.Status.PENDING) {
      await pollBatchStatus(link);
    } else {
      setBatchStatus(status);
    }
  };

  useEffect(() => {
    if (batchStatusLink) {
      pollBatchStatus(batchStatusLink);
    }
  }, [batchStatusLink]);

  return { batchStatus, setBatchStatusLink };
};

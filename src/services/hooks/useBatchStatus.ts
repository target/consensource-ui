import { useState, useEffect } from 'react';
import stores, { PendingBatch } from 'stores';

export const useBatchStatus = () => {
  const { batchStore } = stores;

  const [batchStatusUrl, setBatchStatusUrl] = useState<
    PendingBatch['statusUrl']
  >('');

  const [batchStatus, setBatchStatus] = useState<PendingBatch['status']>(null);

  useEffect(() => {
    setBatchStatus(batchStore.getBatchStatus(batchStatusUrl));
  }, [batchStore.pendingBatches, batchStatusUrl]);

  return { batchStatus, setBatchStatusUrl };
};

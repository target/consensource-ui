import { useState } from 'react';
import { BatchStatus } from 'stores';
import { reaction } from 'mobx';
import { useStores } from './useStores';

export const useBatchStatus = () => {
  const { batchStore } = useStores();

  const [batchStatusUrl, setBatchStatusUrl] = useState<
    BatchStatus['statusUrl']
  >('');

  const [batchStatus, setBatchStatus] = useState<BatchStatus['status']>(null);

  reaction(
    () => batchStore.pendingBatches.map((batch) => batch.statusUrl),
    () => {
      setBatchStatus(batchStore.getBatchStatus(batchStatusUrl));
    },
  );

  return { batchStatus, setBatchStatusUrl };
};

import React from 'react';
import CreateAssertionForm from 'view/forms/CreateAssertionForm';
import stores from 'stores';
import {
  createAssertionActionTransaction,
  CreateAssertionAction,
} from 'services/protobuf/assertion';
import { createBatch } from 'services/protobuf/batch';
import BatchService from 'services/batch';

export default function Dashboard() {
  const onSubmit = async (assertion: CreateAssertionAction) => {
    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txns = new Array(createAssertionActionTransaction(assertion, signer));
    const batchListBytes = createBatch(txns, signer);

    await BatchService.submitBatch(batchListBytes);
  };

  return (
    <div>
      <CreateAssertionForm onSubmit={onSubmit} />
    </div>
  );
}

import React from 'react';
import CreateAssertionForm from 'view/forms/CreateAssertionForm';
import stores from 'stores';
import {
  createAssertionTransaction,
  CreateAssertionAction,
} from 'services/protobuf/transactions/assertion';
import createBatch from 'services/protobuf/batch';
import BatchService from 'services/batch';

export default function Dashboard() {
  const onSubmit = async (assertion: CreateAssertionAction) => {
    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txns = new Array(createAssertionTransaction(assertion, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await BatchService.submitBatch(batchListBytes);
    } catch ({ message }) {
      console.error(message);
    }
  };

  return (
    <div>
      <CreateAssertionForm onSubmit={onSubmit} />
    </div>
  );
}

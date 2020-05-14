import React from 'react';
import { observer } from 'mobx-react-lite';
import stores from 'stores';
import createBatch from 'services/protobuf/batch';

export interface TransactionFormProps {
  children: JSX.Element[];
  createTxnFn: () => sawtooth.protobuf.Transaction[];
  submitBtnTitle: string;
  onSuccess: Function;
}

function TransactionForm({
  children,
  createTxnFn,
  submitBtnTitle,
  onSuccess,
}: TransactionFormProps) {
  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
    const txns = createTxnFn();
    const batchListBytes = createBatch(txns, signer);

    await stores.batchStore.submitBatch(batchListBytes);

    onSuccess();
  };

  return (
    <form>
      {children}
      <button type="submit" onClick={onClick}>
        {submitBtnTitle}
      </button>
    </form>
  );
}

export default observer(TransactionForm);

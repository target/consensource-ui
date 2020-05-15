import React from 'react';
import { observer } from 'mobx-react-lite';
import stores from 'stores';
import createBatch from 'services/protobuf/batch';

export interface TransactionFormProps {
  children: JSX.Element | JSX.Element[];
  createTxnsFn: () => sawtooth.protobuf.Transaction[];
  submitBtnTitle?: string;
  onSuccess?: Function;
}

function TransactionForm({
  children,
  createTxnsFn,
  submitBtnTitle,
  onSuccess,
}: TransactionFormProps) {
  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
    const txns = createTxnsFn();
    const batchListBytes = createBatch(txns, signer);

    await stores.batchStore.submitBatch(batchListBytes);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form>
      {children}
      <button type="submit" onClick={onClick}>
        {submitBtnTitle || 'Submit'}
      </button>
    </form>
  );
}

export default observer(TransactionForm);

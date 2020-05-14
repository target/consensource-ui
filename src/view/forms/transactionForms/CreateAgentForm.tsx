import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import TransactionForm from 'view/forms/transactionForms';
import createAgentTransaction from 'services/protobuf/transactions/agent';
import stores from 'stores';

function CreateAgentForm({ onSubmit }: FormProps) {
  const state = useLocalStore(() => ({
    name: '',
    errMsg: '',
  }));

  const createTxnFn = () => {
    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
    const txn = createAgentTransaction({ name: state.name }, signer);
    return [txn];
  };

  return (
    <TransactionForm
      createTxnFn={createTxnFn}
      submitBtnTitle="Create Agent"
      onSuccess={onSubmit}
    >
      <h1>Agent Signup</h1>
      <h3>{state.errMsg}</h3>
      <div>
        <label>name</label>
        <input
          value={state.name}
          onChange={(e) => (state.name = e.target.value)}
          placeholder="name"
          type="text"
          required
        />
      </div>
    </TransactionForm>
  );
}

export default observer(CreateAgentForm);

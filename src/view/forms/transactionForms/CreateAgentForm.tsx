import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import TransactionForm from 'view/forms/transactionForms';
import createAgentTransaction from 'services/protobuf/transactions/agent';
import stores from 'stores';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

function createStore() {
  return {
    name: '',
  } as consensource.IAgent;
}

function CreateAgentForm({ onSubmit }: FormProps) {
  const state = useLocalStore(createStore);

  const createTxnsFn = () => {
    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txn = createAgentTransaction(state, signer);
    return [txn];
  };

  const setState = <T extends keyof consensource.IAgent>(
    key: T,
    val: consensource.IAgent[T],
  ) => {
    state[key] = val;
  };

  return (
    <TransactionForm
      createTxnsFn={createTxnsFn}
      submitBtnTitle="Create Agent"
      onSuccess={onSubmit}
    >
      <h1>Agent Signup</h1>
      <div>
        <label htmlFor="agent-name">
          name
          <input
            value={state.name || ''}
            onChange={(e) => setState('name', e.target.value)}
            placeholder="name"
            type="text"
            id="agent-name"
            required
          />
        </label>
      </div>
    </TransactionForm>
  );
}

export default observer(CreateAgentForm);

import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import createAgentTransaction from 'services/protobuf/transactions/agent';
import createBatch from 'services/protobuf/batch';
import stores from 'stores';

function createStore() {
  return {
    name: '',
  } as consensource.IAgent;
}

function CreateAgentForm({ onSubmit }: FormProps) {
  const state = useLocalStore(createStore);

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txns = new Array(createAgentTransaction(state, signer));
    const batchListBytes = createBatch(txns, signer);

    await stores.batchStore.submitBatch(batchListBytes);

    if (onSubmit) {
      onSubmit();
    }
  };

  const setState = <T extends keyof consensource.IAgent>(
    key: T,
    val: consensource.IAgent[T],
  ) => {
    state[key] = val;
  };

  return (
    <form>
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
      <button type="submit" onClick={onClick}>
        Create Agent
      </button>
    </form>
  );
}

export default observer(CreateAgentForm);

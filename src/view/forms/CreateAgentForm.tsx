import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import createAgentTransaction from 'services/protobuf/transactions/agent';
import createBatch from 'services/protobuf/batch';
import stores from 'stores';
import BatchService from 'services/batch';

function createStore() {
  return {
    name: '',
  } as consensource.IAgent;
}

function CreateAgentForm({
  onSubmit,
  onError,
  onSubmitBtnLabel = 'Create Agent',
}: FormProps) {
  const state = useLocalStore(createStore);

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txns = new Array(createAgentTransaction(state, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await BatchService.submitBatch(batchListBytes);

      if (onSubmit) {
        onSubmit();
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
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
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateAgentForm);

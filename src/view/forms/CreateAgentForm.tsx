import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import createAgentTransaction from 'services/protobuf/transactions/agent';
import createBatch from 'services/protobuf/batch';
import stores from 'stores';
import BatchService from 'services/batch';

function createStore() {
  const store: IAgent = {
    name: '',
  };

  return store;
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

  const setState = <T extends keyof IAgent>(key: T, val: IAgent[T]) => {
    state[key] = val;
  };

  const isDisabled = hasEmptyFields(state);

  return (
    <form>
      <div>
        <label htmlFor="agent-name">
          name
          <input
            value={state.name || ''}
            onChange={(e) => setState('name', e.target.value)}
            placeholder="Name"
            type="text"
            id="agent-name"
            required
          />
        </label>
      </div>
      <button type="submit" onClick={onClick} disabled={isDisabled}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateAgentForm);

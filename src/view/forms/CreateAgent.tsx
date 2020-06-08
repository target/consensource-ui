import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import {
  createAgentAction,
  ICreateAgentActionStrict,
} from 'services/protobuf/agent';

function createStore() {
  const store: ICreateAgentActionStrict = {
    name: '',
  };

  return store;
}

/**
 * Form used to build a `CreateAgentAction` payload object
 */
function CreateAgentActionForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Agent',
}: FormProps) {
  const state = useLocalStore(createStore);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createAgentAction(state));
  };

  const setState = <T extends keyof ICreateAgentActionStrict>(
    key: T,
    val: ICreateAgentActionStrict[T],
  ) => {
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
      <button type="submit" onClick={submit} disabled={isDisabled}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateAgentActionForm);

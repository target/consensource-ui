import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';

export interface CreateUserFormState {
  username: string;
  password: string;
}

function createStore() {
  return {
    username: '',
    password: '',
  } as CreateUserFormState;
}

function CreateUserForm({ onSubmit, onSubmitBtnLabel }: FormProps) {
  const state = useLocalStore(createStore);

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit(state);
    }
  };

  const setState = (key: keyof CreateUserFormState, val: string) => {
    state[key] = val;
  };

  return (
    <form>
      <div>
        <label htmlFor="user-username">
          username
          <input
            value={state.username}
            onChange={(e) => setState('username', e.target.value)}
            placeholder="username"
            type="text"
            id="user-username"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="user-password">
          password
          <input
            value={state.password}
            onChange={(e) => setState('password', e.target.value)}
            placeholder="password"
            type="text"
            id="user-password"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit}>
        {onSubmitBtnLabel || 'Create User'}
      </button>
    </form>
  );
}

export default observer(CreateUserForm);

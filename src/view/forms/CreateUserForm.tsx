import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import stores from 'stores';

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

function CreateUserForm({ onSubmit, onError, onSubmitBtnLabel }: FormProps) {
  const state = useLocalStore(createStore);

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password } = state;

    try {
      await stores.userStore.createUser(username, password);

      if (onSubmit) {
        onSubmit(stores.userStore.user);
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
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

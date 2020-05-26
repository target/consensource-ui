import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import stores from 'stores';

export interface CreateUserFormState {
  username: string;
  password: string;
}

function createStore() {
  const store: CreateUserFormState = {
    username: '',
    password: '',
  };

  return store;
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

  const isDisabled = hasEmptyFields(state);

  return (
    <form>
      <div>
        <label htmlFor="user-username">
          username
          <input
            value={state.username}
            onChange={(e) => setState('username', e.target.value)}
            placeholder="Username"
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
            placeholder="Password"
            type="text"
            id="user-password"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit} disabled={isDisabled}>
        {onSubmitBtnLabel || 'Create User'}
      </button>
    </form>
  );
}

export default observer(CreateUserForm);

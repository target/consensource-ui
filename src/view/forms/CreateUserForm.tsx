import React from 'react';
import stores from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';

export interface CreateUserFormState {
  username: string;
  password: string;
}

function CreateUserForm({ onSubmit }: FormProps) {
  const state = useLocalStore(() => ({
    username: '',
    password: '',
  }));

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  return (
    <form>
      <div>
        <label>username</label>
        <input
          value={state.username}
          onChange={(e) => (state.username = e.target.value)}
          placeholder="username"
          type="text"
          required
        />
      </div>
      <div>
        <label>password</label>
        <input
          value={state.password}
          onChange={(e) => (state.password = e.target.value)}
          placeholder="password"
          type="text"
          required
        />
      </div>

      <button onClick={submit}>Create User</button>
    </form>
  );
}

export default observer(CreateUserForm);

import React from 'react';
import { FormProps } from 'view/forms';
import { useLocalStore, observer } from 'mobx-react-lite';

export interface LoginFormState {
  username: string;
  password: string;
}

function createStore() {
  const state: LoginFormState = {
    username: '',
    password: '',
  };

  return state;
}

function LoginForm({ onSubmit, onSubmitBtnLabel = 'Login' }: FormProps) {
  const state = useLocalStore(createStore);

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const setState = <T extends keyof LoginFormState>(
    key: T,
    val: LoginFormState[T],
  ) => {
    state[key] = val;
  };

  return (
    <form>
      <div>
        <label htmlFor="username">
          username
          <input
            value={state.username}
            onChange={(e) => setState('username', e.target.value)}
            placeholder="username"
            type="text"
            id="username"
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          password
          <input
            value={state.password}
            onChange={(e) => setState('password', e.target.value)}
            placeholder="password"
            type="text"
            id="password"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={onClick}>
        {onSubmitBtnLabel || 'Login'}
      </button>
    </form>
  );
}

export default observer(LoginForm);

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStore, observer } from 'mobx-react-lite';
import stores from 'stores';

function Login() {
  const history = useHistory();
  const state = useLocalStore(() => ({
    username: '',
    password: '',
    errMsg: '',
  }));

  useEffect(() => {
    // Redirect a user to the dashboard if they are already logged in
    if (stores.userStore.isSignedIn) {
      history.push('/dashboard');
    }
  }, []);

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await stores.userStore.authenticateUser(state.username, state.password);
      history.push('/dashboard');
    } catch ({ message }) {
      state.errMsg = message;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>{state.errMsg}</h3>
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

        <button type="submit" onClick={onClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default observer(Login);

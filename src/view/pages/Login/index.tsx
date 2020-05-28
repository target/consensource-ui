import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStore, observer } from 'mobx-react-lite';
import LoginForm, { LoginFormState } from 'view/forms/Login';
import stores from 'stores';

function Login() {
  const state = useLocalStore(() => ({ errMsg: '' }));
  const history = useHistory();

  useEffect(() => {
    // Redirect a user to the dashboard if they are already logged in
    if (stores.userStore.isSignedIn) {
      history.push('/dashboard');
    }
  }, []);

  const onSubmit = async (loginInfo: LoginFormState) => {
    const { username, password } = loginInfo;

    try {
      await stores.userStore.authenticateUser(username, password);
      history.push('/dashboard');
    } catch ({ message }) {
      state.errMsg = message;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>{state.errMsg}</h3>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default observer(Login);

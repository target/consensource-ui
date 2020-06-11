import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm, { LoginFormState } from 'view/forms/Login';
import stores from 'stores';

function Login() {
  const [errMsg, setErrMsg] = useState('');
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
      setErrMsg(message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>{errMsg}</h3>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default Login;

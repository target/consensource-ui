import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm, { LoginFormState } from 'view/forms/Login';
import stores from 'stores';

export function Login() {
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();

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

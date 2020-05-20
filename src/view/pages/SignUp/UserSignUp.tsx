import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import CreateUserForm from 'view/forms/CreateUserForm';

function UserSignUp() {
  const state = useLocalStore(() => ({ errMsg: '' }));

  function onError(err: string) {
    state.errMsg = err;
  }

  return (
    <div>
      <h1>User Sign Up</h1>
      <h3>{state.errMsg}</h3>
      <CreateUserForm onError={onError} />
    </div>
  );
}

export default observer(UserSignUp);

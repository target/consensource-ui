import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import CreateUserForm, { CreateUserFormState } from 'view/forms/CreateUser';
import stores from 'stores';

function UserSignUp() {
  const state = useLocalStore(() => ({ errMsg: '' }));

  const onSubmit = async ({ username, password }: CreateUserFormState) => {
    try {
      await stores.userStore.createUser(username, password);
    } catch ({ message }) {
      state.errMsg = message;
    }
  };

  return (
    <div>
      <h1>User Sign Up</h1>
      <h3>{state.errMsg}</h3>
      <CreateUserForm onSubmit={onSubmit} />
    </div>
  );
}

export default observer(UserSignUp);

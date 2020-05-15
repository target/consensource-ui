import React from 'react';
import stores from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';
import CreateUserForm, { CreateUserFormState } from 'view/forms/CreateUserForm';

function UserSignUp() {
  const state = useLocalStore(() => ({ errMsg: '' }));

  /**
   * Create a user and an agent from the form info
   */
  const onSubmit = async (formState: CreateUserFormState) => {
    try {
      await stores.userStore.createUser(formState.username, formState.password);
    } catch ({ message }) {
      state.errMsg = message;
    }
  };

  return (
    <div>
      <h1>User Sign Up</h1>
      <h3>{state.errMsg}</h3>
      <CreateUserForm onSubmit={onSubmit} onSubmitBtnLabel="Create User" />
    </div>
  );
}

export default observer(UserSignUp);

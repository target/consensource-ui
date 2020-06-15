import React, { useState } from 'react';
import CreateUserForm, {
  CreateUserFormState,
} from 'view/widgets/forms/CreateUser';
import stores from 'stores';

export default function UserSignUp() {
  const [errMsg, setErrMsg] = useState('');

  const onSubmit = async ({ username, password }: CreateUserFormState) => {
    try {
      await stores.userStore.createUser(username, password);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <div>
      <h1>User Sign Up</h1>
      <h3>{errMsg}</h3>
      <CreateUserForm onSubmit={onSubmit} />
    </div>
  );
}

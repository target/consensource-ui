import React from 'react';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import UserSignUp from 'view/pages/SignUp/UserSignUp';
import AgentSignUp from 'view/pages/SignUp/AgentSignUp';

function SignUp() {
  return !stores.userStore.isSignedIn ? <UserSignUp /> : <AgentSignUp />;
}

export default observer(SignUp);

import React from 'react';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import UserSignUp from 'view/SignUp/UserSignUp';
import AgentSignUp from 'view/SignUp/AgentSignUp';

function SignUp() {
	return !stores.userStore.isSignedIn ? <UserSignUp /> : <AgentSignUp />;
}

export default observer(SignUp);

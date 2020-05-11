import React from 'react';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import UserSignUp from 'components/SignUp/UserSignUp';
import AgentSignUp from 'components/SignUp/AgentSignUp';

const SignUp = () =>
	!stores.userStore.isSignedIn ? <UserSignUp /> : <AgentSignUp />;

export default observer(SignUp);

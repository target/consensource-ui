import React, { useContext } from 'react';
import { StoreContext } from 'stores';
import { observer } from 'mobx-react-lite';
import UserSignUp from 'components/SignUp/UserSignUp';
import AgentSignUp from 'components/SignUp/AgentSignUp';

const SignUp = () => {
    const context = useContext(StoreContext);

    return !context.userStore.isSignedIn ? <UserSignUp /> : <AgentSignUp />;
};

export default observer(SignUp);

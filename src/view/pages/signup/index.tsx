import React from 'react';
import UserSignUp from 'view/pages/signup/UserSignUp';
import AgentSignUp from 'view/pages/signup/AgentSignUp';

export default function SignUp() {
  return (
    <div>
      <UserSignUp />
      <AgentSignUp />
    </div>
  );
}

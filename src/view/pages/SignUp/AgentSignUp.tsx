import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateAgentForm from 'view/forms/CreateAgentForm';
import { useLocalStore } from 'mobx-react-lite';

export default function AgentSignUp() {
  const state = useLocalStore(() => ({ errMsg: '' }));
  const history = useHistory();

  /**
   * Redirect a user to the dashboard screen if successful
   */
  function onSubmit() {
    history.push('/dashboard');
  }

  function onError(err: string) {
    state.errMsg = err;
  }

  return (
    <div>
      <h1>Agent Signup</h1>
      <div>{state.errMsg}</div>
      <CreateAgentForm onSubmit={onSubmit} onError={onError} />
    </div>
  );
}

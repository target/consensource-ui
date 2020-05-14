import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateAgentForm from 'view/forms/transactionForms/CreateAgentForm';

export default function AgentSignUp() {
  const history = useHistory();

  /**
   * Redirect a user to the dashboard screen if successful
   */
  const onSubmit = () => history.push('/dashboard');

  return (
    <div>
      <CreateAgentForm onSubmit={onSubmit} />
    </div>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateAgentActionForm from 'view/forms/CreateAgent';
import stores from 'stores';
import { createAgentTransaction } from 'services/protobuf/agent';
import BatchService from 'services/batch';
import { createBatch } from 'services/protobuf/batch';
import { CreateAgentAction } from 'services/protobuf/compiled';

export default function AgentSignUp() {
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();

  /**
   * Redirect a user to the dashboard screen if successful
   */
  const onSubmit = async (agentAction: CreateAgentAction) => {
    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern

    const txns = new Array(createAgentTransaction(agentAction, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await BatchService.submitBatch(batchListBytes);
      history.push('/dashboard');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <div>
      <h1>Agent Signup</h1>
      <div>{errMsg}</div>
      <CreateAgentActionForm onSubmit={onSubmit} />
    </div>
  );
}

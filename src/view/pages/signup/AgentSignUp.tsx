import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateAgentActionForm from 'view/widgets/forms/CreateAgent';
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
    let signer;

    if (!stores.userStore.user) {
      throw new Error('A signer is required to create an agent');
    } else {
      signer = stores.userStore.user.signer;
    }

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

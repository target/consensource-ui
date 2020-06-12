import React, { useState, useEffect } from 'react';
import { fetchAgentByPubKey, AgentResData } from 'services/api/agent';
import stores from 'stores';

export default function Profile() {
  const [agent, setAgent] = useState<AgentResData | null>(null);
  const [errMsg, setErrMsg] = useState('');

  let publicKeyString: string;

  if (!stores.userStore.user) {
    throw new Error('A signer is required to create an agent');
  } else {
    publicKeyString = stores.userStore.user.publicKeyString;
  }

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const { data } = await fetchAgentByPubKey(publicKeyString);
        setAgent(data);
      } catch ({ message }) {
        setErrMsg(message);
      }
    };

    fetchAgent();
  });

  if (!agent) {
    return <div>Loading agent...</div>;
  }

  return (
    <div>
      <div>{errMsg}</div>
      <h1>Profile</h1>
      {Object.entries(agent).map(([key, val]) => (
        <div>{`${key}: ${val}`}</div>
      ))}
    </div>
  );
}

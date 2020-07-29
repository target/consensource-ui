import React, { useState, useEffect } from 'react';
import stores from 'stores';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react-lite';
import { fetchAgentByPubKey, AgentResData } from 'services/api/agent';
import { User } from 'stores/UserStore';
import { UserInfo } from 'view/pages/Profile/UserInfo';
import { AgentInfo } from 'view/pages/Profile/AgentInfo';

// TODO: Remove checks on user store when session tokens are setup
export const Profile = observer(() => {
  const { userStore } = stores;

  const [agent, setAgent] = useState<AgentResData | null>(null);
  const [errMsg, setErrMsg] = useState('');

  const fetchAgent = async (publicKeyString: User['publicKeyString']) => {
    try {
      const { data } = await fetchAgentByPubKey(publicKeyString);
      setAgent(data);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  useEffect(() => {
    if (userStore.user) {
      const { publicKeyString } = userStore.user;
      fetchAgent(publicKeyString);
    }
  }, [userStore.user]);

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Profile</Typography>
      </Grid>

      {userStore.user && (
        <Grid item xs={12}>
          <UserInfo user={userStore.user} />
        </Grid>
      )}

      <Grid item xs={12}>
        <AgentInfo agent={agent} />
      </Grid>
    </Grid>
  );
});

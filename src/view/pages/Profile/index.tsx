import React from 'react';
import stores from 'stores';
import { Typography, Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { fetchAgentByPubKey, AgentResData } from 'services/api';
import { AsyncCircularProgress } from 'view/components';
import { UserInfo } from './UserInfo';
import { AgentInfo } from './AgentInfo';
import { useAsync } from 'react-async-hook';

interface AgentInfoContainerProps {
  agentPubKey: AgentResData['public_key'];
}

/**
 * Fetching our agent is dependent upon the userStore having a user
 * field with a public key field.
 *
 * Since the user is potentially null, we separate the agent API
 * call into a separate component in order to conditionally fetch
 * the agent only once we have a public key from the user.
 */
function AgentInfoContainer({ agentPubKey }: AgentInfoContainerProps) {
  const { result, loading, error } = useAsync(fetchAgentByPubKey, [
    agentPubKey,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Agent Info</Typography>
      </Grid>

      <Grid item xs={12}>
        <AsyncCircularProgress
          isLoading={loading}
          minDisplayTimeMs={1000}
          size={60}
        >
          {error && (
            <Grid item xs={12}>
              <Typography color="error">Failed to load agent info</Typography>
            </Grid>
          )}

          {result && <AgentInfo agent={result.data} />}
        </AsyncCircularProgress>
      </Grid>
    </Grid>
  );
}

// TODO: Remove checks on user store when session tokens are setup
export const Profile = observer(() => {
  const { userStore } = stores;

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
        {userStore.user && (
          <AgentInfoContainer agentPubKey={userStore.user.publicKeyString} />
        )}
      </Grid>
    </Grid>
  );
});

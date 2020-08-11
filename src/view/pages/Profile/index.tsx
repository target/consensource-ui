import React, { FC } from 'react';
import stores from 'stores';
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-async-hook';
import { fetchAgentByPubKey, AgentResData } from 'services/api';
import { AsyncCircularProgress } from 'view/components';
import { UserInfo } from './UserInfo';
import { AgentInfo } from './AgentInfo';

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
const AgentInfoContainer: FC<AgentInfoContainerProps> = ({ agentPubKey }) => {
  const { result, loading, error } = useAsync(fetchAgentByPubKey, [
    agentPubKey,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {result?.data ? 'Agent Info' : 'Create an Agent'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AsyncCircularProgress isLoading={loading} size={60}>
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
};

// TODO: Remove checks on user store when session tokens are setup
export const Profile = observer(() => {
  const { userStore } = stores;

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Profile</Typography>
      </Grid>

      {!userStore.user && (
        <Grid item xs={12}>
          <Typography color="error">Failed to load profile info</Typography>
        </Grid>
      )}

      {userStore.user && (
        <>
          <Grid item xs={12}>
            <UserInfo user={userStore.user} />
          </Grid>

          <Grid item xs={6}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="advanced-content"
                id="advanced-header"
              >
                <Typography variant="h6">Advanced</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AgentInfoContainer
                  agentPubKey={userStore.user.publicKeyString}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </>
      )}
    </Grid>
  );
});

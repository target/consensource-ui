import React from 'react';
import { useAuth } from 'services/hooks';
import { Typography, Grid } from '@material-ui/core';
import { UserInfo } from './UserInfo';
import { AgentAccordion } from './AgentAccordion';

export const Profile = () => {
  const user = useAuth();

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Typography variant="h3" align="center">
          Profile
        </Typography>
      </Grid>

      <Grid item>
        <UserInfo user={user} />
      </Grid>

      <Grid item>
        <AgentAccordion agentPubKey={user.publicKeyString} />
      </Grid>
    </Grid>
  );
};

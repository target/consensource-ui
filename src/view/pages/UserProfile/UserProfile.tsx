import React from 'react';
import { useAuth } from 'services/hooks';
import { Typography, Grid } from '@material-ui/core';
import { UserInfo } from './UserInfo';
import { AgentAccordion } from './AgentAccordion';

export const Profile = () => {
  const user = useAuth();

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Profile</Typography>
      </Grid>

      <Grid item xs={12}>
        <UserInfo user={user} />
      </Grid>

      <Grid item xs={6}>
        <AgentAccordion agentPubKey={user.publicKeyString} />
      </Grid>
    </Grid>
  );
};

import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import { User } from 'stores';
import { InfoItem } from 'view/components';

export interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  const { username, password } = user;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs>
        <Typography variant="h4">User Info</Typography>
      </Grid>

      <Grid container item>
        <InfoItem title="Username" val={username} />

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h6">Password</Typography>
          <TextField value={password} type="password" disabled />
        </Grid>
      </Grid>
    </Grid>
  );
}

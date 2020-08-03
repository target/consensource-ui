import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { User } from 'stores/UserStore';
import { InfoItem } from 'view/components';

export interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  const { username, password } = user;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">User Info</Typography>
      </Grid>

      <InfoItem title="Username" val={username} />
      <InfoItem title="Password" val={password} />
    </Grid>
  );
}

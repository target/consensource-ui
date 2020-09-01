import React from 'react';
import { CreateUserForm } from 'view/forms';
import { Grid, Typography } from '@material-ui/core';

export const SignUp = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Sign Up</Typography>
      </Grid>
      <Grid item xs>
        <CreateUserForm />
      </Grid>
    </Grid>
  );
};

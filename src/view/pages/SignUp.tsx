import React from 'react';
import { CreateUserForm } from 'view/forms';
import { Grid } from '@material-ui/core';

export const SignUp = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <CreateUserForm />
    </Grid>
  );
};

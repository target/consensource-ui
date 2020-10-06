import React from 'react';
import { CreateUserForm } from 'view/forms';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const SignUp = () => {
  const history = useHistory();

  return (
    <Grid container direction="column" alignItems="center">
      <CreateUserForm onSubmit={() => history.push('/')} />
    </Grid>
  );
};

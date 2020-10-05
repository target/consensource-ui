import React from 'react';
import { LoginForm } from 'view/forms';
import { Grid } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

export const Login = () => {
  const { state } = useLocation();
  const history = useHistory();

  return (
    <Grid container direction="column" alignItems="center">
      <LoginForm onSubmit={() => history.push(state.from)} />
    </Grid>
  );
};

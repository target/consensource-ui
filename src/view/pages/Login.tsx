import React from 'react';
import { LoginForm } from 'view/forms';
import { Grid, Typography } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';

export const Login = () => {
  const { state } = useLocation();
  const history = useHistory();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Login</Typography>
      </Grid>
      <Grid item>
        <LoginForm onSubmit={() => history.push(state.from)} />
      </Grid>
    </Grid>
  );
};

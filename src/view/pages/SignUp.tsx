import React, { useState } from 'react';
import CreateUserForm, { CreateUserFormState } from 'view/forms/CreateUser';
import { DEFAULT_FORM_PAPER_ELEVATION } from 'view/forms';
import stores from 'stores';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export function SignUp() {
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();

  const onSubmit = async ({ username, password }: CreateUserFormState) => {
    try {
      await stores.userStore.createUser(username, password);
      history.push('/dashboard');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <Paper elevation={DEFAULT_FORM_PAPER_ELEVATION}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">User Sign Up</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{errMsg}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CreateUserForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  );
}

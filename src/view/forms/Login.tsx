import React, { useState } from 'react';
import { hasEmptyFields, FormErrMsg } from 'view/forms/utils';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import stores from 'stores';
import { useHistory } from 'react-router-dom';

export interface LoginFormState {
  username: string;
  password: string;
}

export function LoginForm() {
  const history = useHistory();
  const [errMsg, setErrMsg] = useState('');
  const [login, setLogin] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await stores.userStore.authenticateUser(login);
      history.push('/');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container spacing={2}>
        <FormErrMsg msg={errMsg} />
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            label="Username"
            id="username"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            label="Password"
            id="password"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onClick}
            disabled={hasEmptyFields(login)}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

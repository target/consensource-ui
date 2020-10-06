import React, { useState } from 'react';
import { hasEmptyFields, FormErrMsg } from 'view/forms/utils';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useStores } from 'services/hooks';

export interface LoginFormProps {
  onSubmit: () => void;
}

export interface LoginFormState {
  username: string;
  password: string;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { userStore } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const [login, setLogin] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await userStore.authenticateUser(login);
      onSubmit();
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item>
          <FormErrMsg msg={errMsg} />
        </Grid>
        <Grid>
          <TextField
            color="secondary"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            label="Username"
            id="username"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            label="Password"
            id="password"
            type="password"
            required
          />
        </Grid>
        <Grid item>
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

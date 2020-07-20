import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/forms';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export interface LoginFormState {
  username: string;
  password: string;
}

export default function LoginForm({
  onSubmit,
  onSubmitBtnLabel = 'Login',
}: FormProps) {
  const [login, setLogin] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(login);
  };

  return (
    <form>
      <Grid container>
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={onClick}
          disabled={hasEmptyFields(login)}
        >
          {onSubmitBtnLabel || 'Login'}
        </Button>
      </Grid>
    </form>
  );
}

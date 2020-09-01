import React, { useState } from 'react';
import { hasEmptyFields, FormErrMsg } from 'view/forms/utils';
import { Button, Grid, TextField } from '@material-ui/core';
import { useStores } from 'services/hooks';
import { useHistory } from 'react-router-dom';

export interface CreateUserFormState {
  username: string;
  password: string;
}

export function CreateUserForm() {
  const history = useHistory();
  const { userStore } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const [user, setUser] = useState<CreateUserFormState>({
    username: '',
    password: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password } = user;

    try {
      await userStore.createUser(username, password);
      history.push('/');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <FormErrMsg msg={errMsg} />
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            label="Username"
            id="username"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            disabled={hasEmptyFields(user)}
          >
            Create User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

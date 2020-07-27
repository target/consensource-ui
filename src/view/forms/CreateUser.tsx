import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/forms';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export interface CreateUserFormState {
  username: string;
  password: string;
}

export default function CreateUserForm({
  onSubmit,
  onSubmitBtnLabel,
}: FormProps) {
  const [user, setUser] = useState<CreateUserFormState>({
    username: '',
    password: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(user);
  };

  return (
    <form>
      <Grid container spacing={2}>
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
            {onSubmitBtnLabel || 'Create User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

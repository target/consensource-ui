import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/**
 * Helper function that checks if any values in `state` have not been set.
 * Returns true if there is any key in `state` that is falsey.
 */
export function hasEmptyFields<T>(state: T) {
  return Object.keys(state).some((key) => !state[key as keyof T]);
}

export interface FormErrMsgProps {
  msg?: string;
}

export function FormErrMsg({ msg }: FormErrMsgProps) {
  if (!msg) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Typography variant="caption" color="error">
        {msg}
      </Typography>
    </Grid>
  );
}

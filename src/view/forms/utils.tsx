import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { BatchStatus } from 'stores';

export interface TransactionFormProps {
  setBatchStatusUrl: (statusUrl: BatchStatus['statusUrl']) => void;
}

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

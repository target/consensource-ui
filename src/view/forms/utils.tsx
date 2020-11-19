import React from 'react';
import { Grid, Typography, TextFieldProps } from '@material-ui/core';
import { BatchStatusRes } from 'services/api';

export interface TransactionFormProps {
  setBatchStatusLink: (statusLink: BatchStatusRes['link']) => void;
}

export type onChangeEvent = Parameters<
  NonNullable<TextFieldProps['onChange']>
>[0];

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
    <Grid item>
      <Typography variant="caption" color="error">
        {msg}
      </Typography>
    </Grid>
  );
}

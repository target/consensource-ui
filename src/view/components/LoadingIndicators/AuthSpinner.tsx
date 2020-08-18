import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { FullScreenSpinnerSize } from './utils';

export const AuthSpinner = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <CircularProgress size={FullScreenSpinnerSize} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Authenticating...</Typography>
      </Grid>
    </Grid>
  );
};

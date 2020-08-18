import React from 'react';
import {
  CircularProgress,
  CircularProgressProps,
  Grid,
  Typography,
} from '@material-ui/core';

export const LoadingSpinner = (props: CircularProgressProps) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <CircularProgress {...props} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Loading...</Typography>
      </Grid>
    </Grid>
  );
};

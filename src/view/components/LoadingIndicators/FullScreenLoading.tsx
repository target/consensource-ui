import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

export const FullScreenLoading = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <CircularProgress size={window.screen.width / 8} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Loading...</Typography>
      </Grid>
    </Grid>
  );
};

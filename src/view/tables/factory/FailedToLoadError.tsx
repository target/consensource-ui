import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';

export const FailedToLoadError = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <WarningIcon fontSize="large" color="error" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" color="error">
          Failed to load factory information
        </Typography>
      </Grid>
    </Grid>
  );
};

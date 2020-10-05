import React from 'react';
import { Typography, Grid } from '@material-ui/core';

export const Dashboard = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h3" align="center">
          Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
};

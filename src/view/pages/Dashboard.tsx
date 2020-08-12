import React from 'react';
import { Typography, Grid } from '@material-ui/core';

export function Dashboard() {
  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Dashboard</Typography>
      </Grid>
    </Grid>
  );
}

import React from 'react';
import { FactoriesTable } from 'view/tables/factory';
import { Grid } from '@material-ui/core';

export function SearchFactories() {
  return (
    <Grid container>
      <Grid item xs>
        <FactoriesTable />
      </Grid>
    </Grid>
  );
}

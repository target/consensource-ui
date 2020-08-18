import React from 'react';
import { SearchFactoriesTable } from 'view/tables';
import { Grid } from '@material-ui/core';

export function SearchFactories() {
  return (
    <Grid container>
      <Grid item xs>
        <SearchFactoriesTable />
      </Grid>
    </Grid>
  );
}

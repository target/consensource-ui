import React from 'react';
import { SearchFactoriesTable } from 'view/tables';
import { Grid, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    container: { width: '100%' },
    icon: {
      paddingTop: 10,
    },
  }),
);

export function SearchFactories() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs>
        <SearchFactoriesTable />
      </Grid>
    </Grid>
  );
}

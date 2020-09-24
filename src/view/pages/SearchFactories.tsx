import React from 'react';
import { FactoriesTable } from 'view/tables';
import { Grid, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    container: { width: '100%' },
  }),
);

export const SearchFactories = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs>
        <FactoriesTable />
      </Grid>
    </Grid>
  );
};

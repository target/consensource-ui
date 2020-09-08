import React from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import { Business as BusinessIcon } from '@material-ui/icons';

const useStyles = makeStyles(
  createStyles({
    icon: {
      paddingTop: 10,
    },
  }),
);

export const TableTitle = () => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Factories</Typography>
      </Grid>
      <Grid item>
        <BusinessIcon fontSize="large" className={classes.icon} />
      </Grid>
    </Grid>
  );
};

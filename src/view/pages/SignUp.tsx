import React from 'react';
import { CreateUserForm } from 'view/forms';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  createStyles({
    container: {
      padding: 15,
    },
  }),
);

export function SignUp() {
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Sign Up</Typography>
        </Grid>
      </Grid>
      <Grid item xs>
        <CreateUserForm />
      </Grid>
    </Paper>
  );
}

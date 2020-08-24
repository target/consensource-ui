import React from 'react';
import { LoginForm } from 'view/forms';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles(
  createStyles({
    container: {
      padding: 15,
    },
  }),
);

export function Login() {
  const { state } = useLocation();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Paper elevation={6} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item xs>
          <LoginForm onSubmit={() => history.push(state.from)} />
        </Grid>
      </Grid>
    </Paper>
  );
}

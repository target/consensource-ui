import React, { useEffect } from 'react';
import {
  Paper,
  Button,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStores } from 'services/hooks';
import { autorun } from 'mobx';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    center: { minHeight: '75vh' },
    paper: { margin: 15, padding: 45 },
    type: {
      color: palette.grey['800'],
      textAlign: 'center',
    },
  }),
);

export const Landing = () => {
  const { userStore } = useStores();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const redirectIfLoggedIn = () => {
      autorun(() => {
        if (userStore.user) {
          history.push('/');
        }
      });
    };

    redirectIfLoggedIn();
  }, []);

  return (
    <Grid
      className={classes.center}
      container
      justify="center"
      alignContent="center"
    >
      <Paper elevation={6} className={classes.paper}>
        <Grid container direction="column" spacing={6}>
          <Grid item>
            <Typography variant="h1" className={classes.type}>
              ConsenSource
            </Typography>
            <Typography variant="h5" className={classes.type}>
              Certification <b>transparency</b> and <b>authenticity</b> to
              empower responsible sourcing
            </Typography>
          </Grid>

          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button
                component={Link}
                to="/sign-up"
                size="medium"
                color="secondary"
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item>
              <Button
                component={Link}
                to="/login"
                size="medium"
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

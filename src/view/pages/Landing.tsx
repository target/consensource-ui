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
    paper: {
      padding: 15,
    },
    type: {
      color: palette.grey['800'],
      textAlign: 'center',
    },
    linkBtn: {
      textAlign: 'center',
      margin: 10,
    },
  }),
);

export function Landing() {
  const { userStore } = useStores();
  const classes = useStyles();
  const history = useHistory();

  const redirectIfLoggedIn = () => {
    autorun(() => {
      if (userStore.user) {
        history.push('/');
      }
    });
  };

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

  return (
    <Paper elevation={6} className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.type}>
            ConsenSource
          </Typography>
          <Typography variant="h5" className={classes.type}>
            Certification <b>transparency</b> and <b>authenticity</b> to empower
            responsible sourcing
          </Typography>
        </Grid>

        <Grid item xs className={classes.linkBtn}>
          <Button
            component={Link}
            to="/sign-up"
            size="medium"
            color="secondary"
            className={classes.linkBtn}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            size="medium"
            color="secondary"
            variant="contained"
            className={classes.linkBtn}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

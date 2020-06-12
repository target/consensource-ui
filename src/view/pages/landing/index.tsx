import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link, useHistory } from 'react-router-dom';
import stores from 'stores';
import { autorun } from 'mobx';

const useStyles = makeStyles({
  linkBtn: {
    textAlign: 'center',
  },
});

export default function Landing() {
  const classes = useStyles();
  const history = useHistory();

  const redirectIfLoggedIn = () => {
    autorun(() => {
      if (stores.userStore.user) {
        history.push('/dashboard');
      }
    });
  };

  useEffect(() => {
    redirectIfLoggedIn();
  });

  return (
    <div>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Typography variant="h1">ConsenSource</Typography>
          </Grid>

          <Grid container spacing={0} justify="center">
            <Grid item xs={2} className={classes.linkBtn}>
              <ButtonBase component={Link} to="/login">
                <Typography variant="h4">Login</Typography>
              </ButtonBase>
            </Grid>

            <Grid item xs={2} className={classes.linkBtn}>
              <ButtonBase component={Link} to="/sign-up">
                <Typography variant="h4">Sign Up</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

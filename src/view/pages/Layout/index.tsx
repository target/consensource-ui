import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'view/pages/dashboard';
import Snackbar from 'view/components/Snackbar';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import NavBar, { NAVBAR_HEIGHT } from 'view/components/NavBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navbar: {
    marginTop: NAVBAR_HEIGHT,
  },
});

function Layout() {
  const { snackbarStore } = stores;
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.navbar}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>

        <Snackbar
          message={snackbarStore.message}
          isOpen={snackbarStore.isOpen}
          onClose={snackbarStore.handleClose}
        />
      </div>
    </>
  );
}

export default observer(Layout);

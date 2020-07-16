import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'view/pages/dashboard';
import Profile from 'view/pages/profile';
import Snackbar from 'view/components/Snackbar';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import NavBar, { NAVBAR_HEIGHT } from 'view/components/NavBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Sidebar, { SIDEBAR_SPACING_UNITS } from 'view/components/Sidebar';
import SearchFactories from 'view/pages/searchFactories';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: NAVBAR_HEIGHT,
      marginLeft: theme.spacing(SIDEBAR_SPACING_UNITS),
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
  }),
);

function Layout() {
  const classes = useStyles();
  const { snackbarStore } = stores;

  return (
    <div>
      <NavBar />
      <Sidebar />
      <div className={classes.content}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/search" component={SearchFactories} />
        </Switch>

        <Snackbar
          message={snackbarStore.message}
          open={snackbarStore.isOpen}
          onClose={snackbarStore.handleClose}
        />
      </div>
    </div>
  );
}

export default observer(Layout);

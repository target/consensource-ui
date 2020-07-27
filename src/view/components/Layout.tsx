import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from 'view/pages/Dashboard';
import { Profile } from 'view/pages/Profile';
import Snackbar from '@material-ui/core/Snackbar';
import stores from 'stores';
import { NavBar, NAVBAR_SPACING_UNITS } from 'view/components/NavBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Sidebar } from 'view/components/Sidebar';
import { SearchFactories } from 'view/pages/SearchFactories';
import { FactoryProfile } from 'view/pages/FactoryProfile';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      marginTop: theme.spacing(NAVBAR_SPACING_UNITS),
      padding: `${theme.spacing(3)}px`,
    },
  }),
);

export function Layout() {
  const classes = useStyles();
  const { snackbarStore } = stores;

  return (
    <div className={classes.root}>
      <NavBar />
      <Sidebar />
      <main className={classes.content}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/search">
            <SearchFactories />
          </Route>

          <Route path="/factories/:factoryId">
            <FactoryProfile />
          </Route>
        </Switch>

        <Snackbar
          message={snackbarStore.message}
          open={snackbarStore.isOpen}
          onClose={snackbarStore.handleClose}
          autoHideDuration={3000}
        />
      </main>
    </div>
  );
}

import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AuthenticatedRoutes } from 'view/components/Layout/Routes';
import { useStores } from 'services/hooks';
import {
  AuthedNavBar,
  NAVBAR_SPACING_UNITS,
  Sidebar,
  LoadingWithMinDisplay,
  AuthSpinner,
} from 'view/components';
import { Snackbar } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(NAVBAR_SPACING_UNITS),
      padding: `${theme.spacing(3)}px`,
      flexGrow: 1, // TODO: Determine if this style is needed
    },
    container: {
      display: 'flex',
    },
  }),
);

export function AuthenticatedLayout() {
  const classes = useStyles();
  const {
    snackbarStore,
    userStore: { isAuthenticating },
  } = useStores();

  return (
    <Router>
      <div className={classes.container}>
        <AuthedNavBar />
        <Sidebar />

        <main className={classes.content}>
          <LoadingWithMinDisplay
            isLoading={isAuthenticating}
            loadingIndicator={<AuthSpinner />}
          >
            <AuthenticatedRoutes />
            <Snackbar
              message={snackbarStore.message}
              open={snackbarStore.isOpen}
              onClose={snackbarStore.handleClose}
              autoHideDuration={3000}
            />
          </LoadingWithMinDisplay>
        </main>
      </div>
    </Router>
  );
}

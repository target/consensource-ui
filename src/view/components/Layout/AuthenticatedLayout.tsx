import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AuthenticatedRoutes } from 'view/components/Layout/Routes';
import { useStores } from 'services/hooks';
import { AuthedNavBar, NAVBAR_SPACING_UNITS, Sidebar } from 'view/components';
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
  const { snackbarStore } = useStores();

  return (
    <Router>
      <div className={classes.container}>
        <AuthedNavBar />
        <Sidebar />
        <main className={classes.content}>
          <AuthenticatedRoutes />
          <Snackbar
            message={snackbarStore.message}
            open={snackbarStore.isOpen}
            onClose={snackbarStore.handleClose}
            autoHideDuration={3000}
          />
        </main>
      </div>
    </Router>
  );
}

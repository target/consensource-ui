import React from 'react';
import { useStores } from 'services/hooks';
import { Snackbar, makeStyles, createStyles } from '@material-ui/core';
import { AuthedNavBar, Sidebar, FullPageLoading } from 'view/components';
import { QueryResult } from 'react-query';
import { AuthenticatedRoutes } from './Routes';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(5),
      flexGrow: 1,
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
    <div className={classes.container}>
      <nav>
        <AuthedNavBar />
        <Sidebar />
      </nav>

      <main className={classes.content}>
        <FullPageLoading
          queryRes={{ isLoading: isAuthenticating } as QueryResult<any>}
          loadingLabel="Authenticating..."
          errorLabel="Failed to authenticate"
        >
          <AuthenticatedRoutes />
          <Snackbar
            message={snackbarStore.message}
            open={snackbarStore.isOpen}
            onClose={snackbarStore.handleClose}
            autoHideDuration={3000}
          />
        </FullPageLoading>
      </main>
    </div>
  );
}

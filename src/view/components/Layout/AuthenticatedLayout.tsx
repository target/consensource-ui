import React from 'react';
import { useStores } from 'services/hooks';
import { Snackbar, makeStyles, createStyles } from '@material-ui/core';
import { AuthedNavbar, Sidebar, FullPageLoading } from 'view/components';
import { QueryResult } from 'react-query';
import { observer } from 'mobx-react-lite';
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

export const AuthenticatedLayout = observer(() => {
  const classes = useStyles();
  const {
    snackbarStore,
    userStore: { isAuthenticating },
  } = useStores();

  /**
   * If a user fails authentication, they are logged out and redirected.
   * This mock response is constructed to use our `<FullPageLoading />`
   * component without actually providing return data.
   */
  const mockQueryRes = {
    isLoading: isAuthenticating,
    data: {},
  } as QueryResult<any>;

  return (
    <FullPageLoading
      queryRes={mockQueryRes}
      loadingLabel="Authenticating..."
      errorLabel="Failed to authenticate"
    >
      <div className={classes.container}>
        <nav>
          <AuthedNavbar />
          <Sidebar />
        </nav>

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
    </FullPageLoading>
  );
});

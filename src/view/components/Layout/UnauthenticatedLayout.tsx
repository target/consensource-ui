import React from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BaseNavBar, NAVBAR_SPACING_UNITS } from 'view/components';
import { UnauthenticatedRoutes } from 'view/components/Layout/Routes';
import { useStores } from 'services/hooks';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(NAVBAR_SPACING_UNITS),
      padding: `${theme.spacing(3)}px`,
    },
    container: { height: '80vh' },
  }),
);

export function UnauthenticatedLayout() {
  const classes = useStyles();
  const { snackbarStore } = useStores();

  return (
    <Router>
      <Grid
        className={classes.container}
        alignItems="center"
        justify="center"
        container
      >
        <BaseNavBar />
        <main className={classes.content}>
          <UnauthenticatedRoutes />
          <Snackbar
            message={snackbarStore.message}
            open={snackbarStore.isOpen}
            onClose={snackbarStore.handleClose}
            autoHideDuration={3000}
          />
        </main>
      </Grid>
    </Router>
  );
}

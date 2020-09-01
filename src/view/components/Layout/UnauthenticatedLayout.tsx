import React from 'react';
import { Grid, Snackbar, makeStyles, createStyles } from '@material-ui/core';
import { useStores } from 'services/hooks';
import { BaseNavBar } from 'view/components';
import { UnauthenticatedRoutes } from './Routes';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(5),
      padding: `${theme.spacing(3)}px`,
      flexGrow: 1,
    },
  }),
);

export function UnauthenticatedLayout() {
  const classes = useStyles();
  const { snackbarStore } = useStores();

  return (
    <Grid alignItems="center" justify="center" container>
      <nav>
        <BaseNavBar />
      </nav>

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
  );
}

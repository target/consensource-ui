import React from 'react';
import { Grid, Snackbar, makeStyles, createStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useStores } from 'services/hooks';
import { UnauthedNavBar } from 'view/components';
import { UnauthenticatedRoutes } from './Routes';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      margin: theme.spacing(8),
      flexGrow: 1,
    },
  }),
);

export const UnauthenticatedLayout = observer(() => {
  const classes = useStyles();
  const { snackbarStore } = useStores();

  return (
    <Grid alignItems="center" justify="center" container>
      <nav>
        <UnauthedNavBar />
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
});

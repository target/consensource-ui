import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'view/Dashboard';
import Snackbar from 'components/Snackbar';
import stores from 'stores';
import { observer } from 'mobx-react-lite';

function Layout() {
  const { snackbarStore } = stores;

  return (
    <>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>

      <Snackbar
        message={snackbarStore.message}
        isOpen={snackbarStore.isOpen}
        onClose={snackbarStore.handleClose}
      />
    </>
  );
}

export default observer(Layout);

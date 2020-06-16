import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'view/pages/dashboard';
import Profile from 'view/pages/profile';
import Snackbar from 'view/components/Snackbar';
import stores from 'stores';
import { observer } from 'mobx-react-lite';
import NavBar, { NAVBAR_HEIGHT } from 'view/components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from 'view/components/Sidebar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  navbar: {
    marginTop: NAVBAR_HEIGHT,
  },
});

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const classes = useStyles();
  const { snackbarStore } = stores;

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={classes.root}>
      <NavBar onDrawerClick={handleSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <Sidebar
        onDrawerClick={handleSidebarClose}
        isSidebarOpen={isSidebarOpen}
      />
      <div className={classes.navbar}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
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

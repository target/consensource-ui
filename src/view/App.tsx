import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'config/theme';
import {
  AuthenticatedLayout,
  UnauthenticatedLayout,
} from 'view/components/Layout';
import stores from 'stores';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  // TODO: Display a global loading state if `isAuthenticating` is true
  // in order to prevent login screen flashing
  const Layout =
    stores.userStore.isAuthenticated || stores.userStore.isAuthenticating
      ? AuthenticatedLayout
      : UnauthenticatedLayout;

  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
});

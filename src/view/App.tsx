import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'config/theme';
import { useStores } from 'services/hooks';
import { stores, StoresContext } from 'stores';
import { observer } from 'mobx-react-lite';
import {
  AuthenticatedLayout,
  UnauthenticatedLayout,
} from 'view/components/Layout';

export const App = observer(() => {
  const { userStore } = useStores();

  // TODO: Display a global loading state if `isAuthenticating` is true
  // in order to prevent login screen flashing
  const Layout =
    userStore.isAuthenticated || userStore.isAuthenticating
      ? AuthenticatedLayout
      : UnauthenticatedLayout;

  return (
    <StoresContext.Provider value={stores}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </StoresContext.Provider>
  );
});

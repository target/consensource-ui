import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'config/theme';
import { stores, StoresContext, User } from 'stores';
import { useStores, AuthProvider } from 'services/hooks';
import { observer } from 'mobx-react-lite';
import {
  AuthenticatedLayout,
  UnauthenticatedLayout,
} from 'view/components/Layout';

// TODO: Remove hack using `isAuthenticated` and `isAuthenticating`
// once sesison tokens are in place
export const App = observer(() => {
  const {
    userStore: { user, isAuthenticated, isAuthenticating },
  } = useStores();

  return (
    <StoresContext.Provider value={stores}>
      <ThemeProvider theme={theme}>
        {isAuthenticated || isAuthenticating ? (
          <AuthProvider value={user || ({} as User)}>
            <AuthenticatedLayout />
          </AuthProvider>
        ) : (
          <UnauthenticatedLayout />
        )}
      </ThemeProvider>
    </StoresContext.Provider>
  );
});

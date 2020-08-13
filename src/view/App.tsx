import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'config/theme';
import { stores, User } from 'stores';
import { useStores } from 'services/hooks';
import { AuthProvider, StoresContext } from 'view/context';
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
          <AuthProvider user={user || ({} as User)}>
            <AuthenticatedLayout />
          </AuthProvider>
        ) : (
          <UnauthenticatedLayout />
        )}
      </ThemeProvider>
    </StoresContext.Provider>
  );
});

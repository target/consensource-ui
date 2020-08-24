import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'view/context';
import { User } from 'stores';
import { useStores } from 'services/hooks';
import { observer } from 'mobx-react-lite';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import { UnauthenticatedLayout } from './UnauthenticatedLayout';

// TODO: Remove hack using `isAuthenticated` and `isAuthenticating`
// once sesison tokens are in place
export const Layout = observer(() => {
  const {
    userStore: { user, isAuthenticated, isAuthenticating },
  } = useStores();

  return (
    <Router>
      {isAuthenticated || isAuthenticating ? (
        <AuthProvider user={user || ({} as User)}>
          <AuthenticatedLayout />
        </AuthProvider>
      ) : (
        <UnauthenticatedLayout />
      )}
    </Router>
  );
});

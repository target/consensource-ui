import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import stores from 'stores';

export interface PrivateRouteProps {
  path: string;
  component: FunctionComponent;
}

export const DEFAULT_UNAUTH_REDIRECT_LOCATION = '/signup';

/**
 * Wrapper around `<Route />` that will redirect a user to
 * `DEFAULT_UNAUTH_REDIRECT_LOCATION` if they are not signed in.
 *
 * Example (protects all routes under `/`):
 *
 * ```
 * <PrivateRoute path="/" component={Layout} />
 * ```
 */
export default function PrivateRoute({ path, component }: PrivateRouteProps) {
  const redirectLoggedOutUser = ({ location }: RouteComponentProps) => {
    if (stores.userStore.isSignedIn) {
      return React.createElement(component);
    }

    const redirectTo = {
      pathname: DEFAULT_UNAUTH_REDIRECT_LOCATION,
      state: { from: location },
    };

    return <Redirect to={redirectTo} />;
  };

  return <Route path={path} render={redirectLoggedOutUser} />;
}

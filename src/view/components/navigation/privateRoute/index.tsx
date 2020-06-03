import React, { FunctionComponent } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import stores from 'stores';

export interface PrivateRouteProps {
  path: string;
  component: FunctionComponent;
  redirectTo?: string;
}

export const DEFAULT_UNAUTH_REDIRECT_LOCATION = '/sign-up';

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
export default function PrivateRoute({
  path,
  component,
  redirectTo = DEFAULT_UNAUTH_REDIRECT_LOCATION,
}: PrivateRouteProps) {
  const redirectLoggedOutUser = ({ location }: RouteComponentProps) => {
    if (stores.userStore.isSignedIn) {
      return React.createElement(component);
    }

    const redirect = {
      pathname: redirectTo,
      state: { from: location },
    };

    return <Redirect to={redirect} />;
  };

  return <Route path={path} render={redirectLoggedOutUser} />;
}

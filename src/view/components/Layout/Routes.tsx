import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import * as Pages from 'view/pages';

/**
 * Routes that are shared between both the authenticated and unauthenticated views
 */
export const SharedRoutes = () => {
  return (
    <>
      <Route path="/search">
        <Pages.SearchFactories />
      </Route>

      <Route
        path="/factories/:factoryId"
        render={({
          match: {
            params: { factoryId },
          },
        }) => <Pages.FactoryProfile factoryId={factoryId} />}
      />
    </>
  );
};

export const UnauthenticatedRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route exact path="/">
        <Pages.Landing />
      </Route>

      <Route path="/login">
        <Pages.Login />
      </Route>

      <Route path="/sign-up">
        <Pages.SignUp />
      </Route>

      <SharedRoutes />

      <Route
        path="*"
        render={() => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: pathname },
            }}
          />
        )}
      />
    </Switch>
  );
};

export const AuthenticatedRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route exact path="/">
        <Pages.Dashboard />
      </Route>

      <Route path="/profile">
        <Pages.Profile />
      </Route>

      <SharedRoutes />

      <Route
        path="*"
        render={() => (
          <Redirect
            to={{
              pathname: '/',
              state: { from: pathname },
            }}
          />
        )}
      />
    </Switch>
  );
};

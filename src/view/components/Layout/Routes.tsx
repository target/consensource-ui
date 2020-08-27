import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import * as Pages from 'view/pages';

export const UnauthenticatedRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route path="/login">
        <Pages.Login />
      </Route>

      <Route path="/sign-up">
        <Pages.SignUp />
      </Route>

      <Route exact path="/">
        <Pages.Landing />
      </Route>

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
  return (
    <Switch>
      <Route exact path="/">
        <Pages.Dashboard />
      </Route>

      <Route path="/profile">
        <Pages.Profile />
      </Route>

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
    </Switch>
  );
};

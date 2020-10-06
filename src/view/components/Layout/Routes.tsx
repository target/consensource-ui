import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import * as Pages from 'view/pages';

/**
 * Routes that are shared between both the authenticated and unauthenticated views
 */
export const SharedRoutes = () => {
  const search = (
    <Route path="/search">
      <Pages.SearchFactories />
    </Route>
  );

  const factories = (
    <Route
      path="/factories/:factoryId"
      render={({
        match: {
          params: { factoryId },
        },
      }) => <Pages.FactoryProfile factoryId={factoryId} />}
    />
  );

  const certs = (
    <Route
      path="/certifications/:certificationId"
      render={({
        match: {
          params: { certificationId },
        },
      }) => <Pages.Certification certificationId={certificationId} />}
    />
  );

  return [search, factories, certs];
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

      {[...SharedRoutes()]}

      <Route
        path="*"
        render={() => {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: pathname },
              }}
            />
          );
        }}
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

      {[...SharedRoutes()]}

      <Route
        render={() => {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: pathname },
              }}
            />
          );
        }}
      />
    </Switch>
  );
};

import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import {
  Landing,
  SignUp,
  Login,
  Dashboard,
  Profile,
  SearchFactories,
  FactoryProfile,
} from 'view/pages';

export const UnauthenticatedRoutes = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/sign-up">
        <SignUp />
      </Route>

      <Route exact path="/">
        <Landing />
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
        <Dashboard />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/search">
        <SearchFactories />
      </Route>

      <Route
        path="/factories/:factoryId"
        render={({
          match: {
            params: { factoryId },
          },
        }) => <FactoryProfile factoryId={factoryId} />}
      />
    </Switch>
  );
};

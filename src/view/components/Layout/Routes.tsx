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

export function UnauthenticatedRoutes() {
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
              pathname: '/',
              state: { from: pathname },
            }}
          />
        )}
      />
    </Switch>
  );
}

export function AuthenticatedRoutes() {
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

      <Route path="/factories/:factoryId">
        <FactoryProfile />
      </Route>
    </Switch>
  );
}

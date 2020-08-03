import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

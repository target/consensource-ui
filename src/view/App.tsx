import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'view/components/Layout';
import { Landing } from 'view/pages/Landing';
import { PrivateRoute } from 'view/components/PrivateRoute';
import { SignUp } from 'view/pages/SignUp';
import { Login } from 'view/pages/Login';

export default function App() {
  return (
    <Router>
      <Switch>
        {/* Note: All routes that are under `/` but not protected
            by auth need to come before the <PrivateRoute /> */}
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

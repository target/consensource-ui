import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from 'view/pages/landing';
import Layout from 'view/pages/layout';
import PrivateRoute from 'view/components/PrivateRoute';
import SignUp from 'view/pages/signup';
import Login from 'view/pages/login';

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

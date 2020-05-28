import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'view/pages/home';
import Layout from 'view/pages/layout';
import PrivateRoute from 'view/components/navigation/privateRoute';
import SignUp from 'view/pages/signup';
import Login from 'view/pages/login';

export default function App() {
  return (
    <Router>
      <Switch>
        {/* Note: `/login` and `/sign-up` must come before the PrivateRoute 
        protecting all subpaths of `/` */}
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

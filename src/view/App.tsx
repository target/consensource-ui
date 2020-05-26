import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'view/pages/Home';
import Layout from 'view/pages/Layout';
import PrivateRoute from 'view/components/navigation/PrivateRoute';
import SignUp from 'view/pages/SignUp';
import Login from 'view/pages/Login';

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

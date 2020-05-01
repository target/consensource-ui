import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from 'components/Login';
import Layout from 'components/Layout';
import PrivateRoute from 'components/Layout/PrivateRoute';
import SignUp from 'components/SignUp';
import stores, { StoreContext } from 'stores';

export default function App() {
    return (
        <StoreContext.Provider value={stores}>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <PrivateRoute path="/" component={Layout}></PrivateRoute>
                </Switch>
            </Router>
        </StoreContext.Provider>
    );
}

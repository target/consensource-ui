import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'components/Dashboard';

export default function Layout() {
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
}

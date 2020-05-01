import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'components/Dashboard';
import Landing from 'images/landing.svg';

export default function Layout() {
    return (
        <>
            <img src={Landing} alt="background" />

            <Switch>
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </>
    );
}

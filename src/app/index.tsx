import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
} from 'react-router-dom';

import LoginPage, { fakeAuth } from './Login';
import Layout from './Layout';

export default function App() {
    return (
        <Router>
            <div>
                <AuthButton />

                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <PrivateRoute path="/">
                        <Layout />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

function AuthButton() {
    const history = useHistory();

    return fakeAuth.isAuthenticated ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

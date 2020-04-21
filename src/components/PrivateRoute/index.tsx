import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from 'services/auth';

interface PrivateRouteProps {
    path: string;
    component: FunctionComponent;
}

export default function PrivateRoute({ path, component }: PrivateRouteProps) {
    return (
        <Route
            path={path}
            render={({ location }) =>
                AuthService.isSignedIn() ? (
                    component
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

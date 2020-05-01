import React, { FunctionComponent, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StoreContext } from 'stores';

interface PrivateRouteProps {
    path: string;
    component: FunctionComponent;
}

export default function PrivateRoute({ path, component }: PrivateRouteProps) {
    const context = useContext(StoreContext);

    return (
        <Route
            path={path}
            render={({ location }) =>
                context.userStore.isSignedIn ? (
                    React.createElement(component)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signup',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

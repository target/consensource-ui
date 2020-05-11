import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import stores from 'stores';

interface PrivateRouteProps {
	path: string;
	component: FunctionComponent;
}

export default function PrivateRoute({ path, component }: PrivateRouteProps) {
	return (
		<Route
			path={path}
			render={({ location }) =>
				stores.userStore.isSignedIn ? (
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

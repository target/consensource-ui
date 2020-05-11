import React, { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import stores from 'stores';

export interface PrivateRouteProps {
	path: string;
	component: FunctionComponent;
}

export const DEFAULT_UNAUTH_REDIRECT_LOCATION = '/signup';

export default function PrivateRoute({ path, component }: PrivateRouteProps) {
	const redirectLoggedOutUser = ({ location: any }) => {
		if (stores.userStore.isSignedIn) {
			return React.createElement(component);
		}

		const redirectTo = {
			pathname: DEFAULT_UNAUTH_REDIRECT_LOCATION,
			state: { from: location },
		};

		return <Redirect to={redirectTo} />;
	};

	return <Route path={path} render={redirectLoggedOutUser} />;
}

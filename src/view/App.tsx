import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from 'view/Login';
import Layout from 'view/Layout';
import PrivateRoute from 'view/Navigation/PrivateRoute';
import SignUp from 'view/SignUp';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignUp} />
				<PrivateRoute path="/" component={Layout} />
			</Switch>
		</Router>
	);
}

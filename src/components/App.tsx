import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from 'components/Login';
import Layout from 'components/Layout';
import PrivateRoute from 'components/Navigation/PrivateRoute';
import SignUp from 'components/SignUp';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/signup" component={SignUp} />
				<PrivateRoute path="/" component={Layout} />
			</Switch>
		</Router>
	);
};

export default App;

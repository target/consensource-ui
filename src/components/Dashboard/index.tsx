import React from 'react';
import stores from 'stores';

const Dashboard = () => {
	return (
		<h1>{`Hello, ${
			stores.userStore.user && stores.userStore.user.username
		}`}</h1>
	);
};

export default Dashboard;

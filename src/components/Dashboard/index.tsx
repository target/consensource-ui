import React from 'react';
import stores from 'stores';

export default function Dashboard() {
	return (
		<h1>{`Hello, ${
			stores.userStore.user && stores.userStore.user.username
		}`}</h1>
	);
}

import React from 'react';
import stores from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';

const UserSignUp = () => {
	const state = useLocalStore(() => ({
		username: '',
		password: '',
	}));

	/**
	 * Create a user and an agent from the form info
	 */
	const submit = async (event: React.FormEvent) => {
		event.preventDefault();
		await stores.userStore.createUser(state.username, state.password);
	};

	return (
		<div>
			<h1>User Signup</h1>
			<form>
				<div>
					<label>username</label>
					<input
						value={state.username}
						onChange={(e) => (state.username = e.target.value)}
						placeholder="username"
						type="text"
						required
					/>
				</div>
				<div>
					<label>password</label>
					<input
						value={state.password}
						onChange={(e) => (state.password = e.target.value)}
						placeholder="password"
						type="text"
						required
					/>
				</div>

				<button onClick={submit}>Create User</button>
			</form>
		</div>
	);
};

export default observer(UserSignUp);

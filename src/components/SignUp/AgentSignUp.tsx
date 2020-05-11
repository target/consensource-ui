import React from 'react';
import { useHistory } from 'react-router-dom';
import stores from 'stores';
import { createAndSubmitAgent } from 'services/agent';
import { useLocalStore, observer } from 'mobx-react-lite';

const AgentSignUp = () => {
	const state = useLocalStore(() => ({
		name: '',
	}));

	const history = useHistory();

	/**
	 * Create a user and an agent from the form info
	 */
	const submit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
			createAndSubmitAgent(state, signer);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>Agent Signup</h1>
			<h2>{`${stores.batchStore.isWaitingOnBatch}`}</h2>
			<form>
				<div>
					<label>username</label>
					<input
						value={state.name}
						onChange={(e) => (state.name = e.target.value)}
						placeholder="name"
						type="text"
						required
					/>
				</div>

				<button onClick={submit}>Create Agent</button>
			</form>
		</div>
	);
};

export default observer(AgentSignUp);

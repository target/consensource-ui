import React from 'react';
import stores from 'stores';
import { useLocalStore, observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import TransactionButton from 'components/TransactionButton';
import createAgentTransaction from 'services/protobuf/transactions/agent';

function AgentSignUp() {
	const history = useHistory();
	const state = useLocalStore(() => ({
		name: '',
	}));

	/**
	 * Create a user and an agent from the form info
	 */
	const submitTransactionFn = () => {
		const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
		const txn = createAgentTransaction({ name: state.name }, signer);

		history.push('/dashboard');

		return txn;
	};

	return (
		<div>
			<h1>Agent Signup</h1>
			<form>
				<div>
					<label>name</label>
					<input
						value={state.name}
						onChange={(e) => (state.name = e.target.value)}
						placeholder="name"
						type="text"
						required
					/>
				</div>

				<TransactionButton submitTransactionFn={submitTransactionFn}>
					Create User
				</TransactionButton>
			</form>
		</div>
	);
}

export default observer(AgentSignUp);

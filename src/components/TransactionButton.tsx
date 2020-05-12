import React from 'react';
import { observer } from 'mobx-react-lite';
import stores from 'stores';
import createBatch from 'services/protobuf/batch';

export interface TransactionButtonProps {
	submitTransactionFn: () => sawtooth.protobuf.Transaction;
	children: React.ReactNode;
}
/**
 * Wrapper that takes a transaction and submits it in a single batch.
 * Triggers a snackbar notification with the status of the batch.
 */
function TransactionButton({
	submitTransactionFn,
	children,
}: TransactionButtonProps) {
	const onClick = async (event: React.FormEvent) => {
		event.preventDefault();

		const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
		const txn = submitTransactionFn();
		const batchListBytes = createBatch([txn], signer);

		await stores.batchStore.submitBatch(batchListBytes);
	};

	return (
		<button type="submit" onClick={onClick}>
			{children}
		</button>
	);
}

export default observer(TransactionButton);

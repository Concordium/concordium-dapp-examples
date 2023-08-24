import { AirdropTransactionInit } from 'entities/transaction-init-card';
import { LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT } from 'shared/config/local-storage.ts';

export function pushLocalStorageInit(transaction: AirdropTransactionInit) {
	const transactions: AirdropTransactionInit[] = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT) ||
			'[]',
	);
	transactions.push(transaction);
	localStorage.setItem(
		LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT,
		JSON.stringify(transactions),
	);
}

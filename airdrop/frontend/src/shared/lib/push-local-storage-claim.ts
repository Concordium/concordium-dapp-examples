import { AirdropTransactionClaim } from 'entities/transaction-claim-card';
import { LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM } from 'shared/config/local-storage.ts';

export function pushLocalStorageClaim(transaction: AirdropTransactionClaim) {
	const transactions: AirdropTransactionClaim[] = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM) ||
			'[]',
	);
	transactions.push(transaction);
	localStorage.setItem(
		LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM,
		JSON.stringify(transactions),
	);
}

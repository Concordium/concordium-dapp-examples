import { FC } from 'react';
import cls from './transactions-claim-list.module.css';
import {
	AirdropTransactionClaim,
	TransactionClaimCard,
} from 'entities/transaction-claim-card';
import classNames from 'classnames';
import { LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM } from 'shared/config/local-storage.ts';
import { TextAlert } from 'shared/components/text-alert';

interface TransactionsClaimListProps {
	className?: string;
}

export const TransactionsClaimList: FC<TransactionsClaimListProps> = ({
	className,
}) => {
	const transactions: AirdropTransactionClaim[] = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM) ||
			'[]',
	);

	transactions.forEach((transaction) => {
		transaction.claimDate = new Date(transaction.claimDate);
		transaction.selectedToken = +transaction.selectedToken;
	});

	transactions.reverse();
	return (
		<div className={classNames(cls.transactionsClaimList, className)}>
			<h2 className={cls.header}>Claim transactions</h2>
			<ul className={cls.transactions}>
				{transactions.length === 0 && (
					<TextAlert>No Claim Transactions</TextAlert>
				)}
				{transactions.map((transaction, key) => (
					<li key={key}>
						<TransactionClaimCard {...transaction} />
					</li>
				))}
			</ul>
		</div>
	);
};

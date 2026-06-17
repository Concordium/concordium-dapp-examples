import { FC } from 'react';
import cls from './transactions-init-list.module.css';
import {
	AirdropTransactionInit,
	TransactionInitCard,
} from 'entities/transaction-init-card';
import classNames from 'classnames';
import { LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT } from 'shared/config/local-storage.ts';
import { TextAlert } from 'shared/components/text-alert';

interface TransactionsInitListProps {
	className?: string;
}

export const TransactionsInitList: FC<TransactionsInitListProps> = ({
	className,
}) => {
	const transactions: AirdropTransactionInit[] = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT) ||
			'[]',
	);

	transactions.forEach((transaction) => {
		transaction.initDate = new Date(transaction.initDate);
		transaction.endTime = new Date(transaction.endTime);
		transaction.reserve = +transaction.reserve;
		transaction.nftLimit = +transaction.nftLimit;
		transaction.selectedIndex = Boolean(transaction.selectedIndex);
	});

	transactions.reverse();
	return (
		<div className={classNames(cls.transactionsInitList, className)}>
			<h2 className={cls.header}>init transactions</h2>
			<ul className={cls.transactions}>
				{transactions.length === 0 && (
					<TextAlert>No Init Transactions</TextAlert>
				)}
				{transactions.map((transaction, key) => (
					<li key={key}>
						<TransactionInitCard {...transaction} />
					</li>
				))}
			</ul>
		</div>
	);
};

import { FC } from 'react';
import cls from './settings-transactions.module.css';
import classNames from 'classnames';
import {
	LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM,
	LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT,
} from 'shared/config/local-storage.ts';

interface SettingsTransactionsProps {
	className?: string;
}

export const SettingsTransactions: FC<SettingsTransactionsProps> = ({
	className,
}) => {
	function cleanLocalStorageHandler() {
		cleanLocalStorageInitHandler();
		cleanLocalStorageClaimHandler();
	}
	function cleanLocalStorageInitHandler() {
		localStorage.setItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_INIT, '');
	}
	function cleanLocalStorageClaimHandler() {
		localStorage.setItem(LOCAL_STORAGE_KEY_AIRDROP_TRANSACTIONS_CLAIM, '');
	}
	return (
		<div className={classNames(cls.settingsTransactions, className)}>
			<h1 className={cls.header}>Transactions</h1>
			<div className={cls.settingsContainer}>
				<div className={cls.settingContainer}>
					<p className={cls.cleanTitle}>all transactions</p>
					<button
						className={cls.cleanButton}
						onClick={cleanLocalStorageHandler}
					>
						clean transactions
					</button>
				</div>
				<div className={cls.settingContainer}>
					<p className={cls.cleanTitle}>transactions init</p>
					<button
						className={cls.cleanButton}
						onClick={cleanLocalStorageInitHandler}
					>
						clean transactions init
					</button>
				</div>
				<div className={cls.settingContainer}>
					<p className={cls.cleanTitle}>transactions claim</p>
					<button
						className={cls.cleanButton}
						onClick={cleanLocalStorageClaimHandler}
					>
						clean transactions claim
					</button>
				</div>
			</div>
		</div>
	);
};

import { FC } from 'react';
import cls from './settings-contract.module.css';
import classNames from 'classnames';
import { FormSmartContract } from 'features/form-smart-contract/ui/form-smart-contract.tsx';

interface SettingsContractProps {
	className?: string;
}

export const SettingsContract: FC<SettingsContractProps> = ({ className }) => {
	return (
		<div className={classNames(cls.settingsContract, className)}>
			<h1 className={cls.header}>Smart Contract</h1>
			<div className={cls.settingsContainer}>
				<FormSmartContract />
			</div>
		</div>
	);
};

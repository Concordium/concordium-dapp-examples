import type { FC } from 'react';
import classNames from 'classnames';
import cls from './app-version.module.css';
import { version } from '../../../../../package.json';

interface AppVersionProps {
	className?: string;
}

export const AppVersion: FC<AppVersionProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.appVersion, className)}>
			current version: {version}
		</div>
	);
};

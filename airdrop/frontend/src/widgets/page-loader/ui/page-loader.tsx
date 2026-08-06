import { FC } from 'react';
import cls from './page-loader.module.css';
import { Spinner } from 'shared/components/spinner';
import classNames from 'classnames';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
	return (
		<div className={classNames(cls.pageLoader, className, 'page-wrapper')}>
			<Spinner />
		</div>
	);
};

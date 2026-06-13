import { FC } from 'react';
import cls from './spinner.module.css';
import classNames from 'classnames';

interface SpinnerProps {
	className?: string;
	variant?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Spinner: FC<SpinnerProps> = ({ className, variant = 'md' }) => {
	return <div className={classNames(cls.spinner, cls[variant], className)} />;
};

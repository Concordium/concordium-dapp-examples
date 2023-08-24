import { FC } from 'react';
import cls from './not-found.module.css';

interface NotFoundProps {
	className?: string;
}

export const NotFound: FC<NotFoundProps> = () => {
	return (
		<main className={cls.notFound}>
			<h2>404</h2>
			<p>page not found</p>
		</main>
	);
};

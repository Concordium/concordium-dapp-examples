import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cls from './styled-button.module.css';
import classNames from 'classnames';

interface Properties extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
	description?: string;
	className?: string;
}

export const StyledButton: FC<Properties> = (props) => {
	const { children, description, icon, className } = props;
	return (
		<button
			className={classNames(className, cls.styledButton)}
			{...props}
		>
			<h2 className={classNames(cls.title, !icon && cls.center)}>
				<span className={cls.children}>{children}</span>
				{!!icon && <span className={cls.icon}>{icon}</span>}
			</h2>
			<p className={cls.description}>{description}</p>
		</button>
	);
};

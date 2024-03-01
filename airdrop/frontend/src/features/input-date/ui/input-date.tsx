import { FC, InputHTMLAttributes } from 'react';
import cls from './input-date.module.css';
import classNames from 'classnames';

interface InputDateProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	register?: any;
}

export const InputDate: FC<InputDateProps> = (props) => {
	const { className, register, ...otherProps } = props;
	return (
		<div className={classNames(cls.inputDate, className)}>
			<div className={cls.inputBox}>
				<input
					type='datetime-local'
					{...register}
					{...otherProps}
				/>
				<span>{register.name}</span>
			</div>
		</div>
	);
};

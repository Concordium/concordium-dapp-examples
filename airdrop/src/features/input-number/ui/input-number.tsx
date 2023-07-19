import { type FC } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	type UseFormRegister,
} from 'react-hook-form';
import { TextAlert } from 'shared/components/text-alert';
import cls from './input-number.module.css';
import classNames from 'classnames';

export const numberRegExp = /^\d+$/;
// export const numberRegExp = /^([^0\D]\d+)|0$/;

interface NumberInputProperties<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	defaultValue?: number;
}

// replace any to Record<string, unknown>
type customFC = FC<NumberInputProperties<any>>;

export const InputNumber: customFC = <T extends FieldValues>(
	props: NumberInputProperties<T>,
) => {
	const { name, register, errors, defaultValue, className } = props;

	return (
		<div className={classNames(className, 'flex gap-2 flex-wrap')}>
			<div className={cls.inputBox}>
				<input
					type='number'
					required={true}
					defaultValue={defaultValue}
					{...register(name, {
						required: true,
						pattern: numberRegExp,
						min: 0,
						max: 100_000,
					})}
				/>
				<span>{name}</span>
			</div>
			<div className='self-center'>
				{errors[name]?.type === 'required' && (
					<TextAlert>{name} is required</TextAlert>
				)}
				{errors[name]?.type === 'pattern' && (
					<TextAlert>Input correct {name}</TextAlert>
				)}
				{errors[name]?.type === 'min' && (
					<TextAlert>The min {name} is 0</TextAlert>
				)}
				{errors[name]?.type === 'max' && (
					<TextAlert>The max {name} is 100'000</TextAlert>
				)}
			</div>
		</div>
	);
};

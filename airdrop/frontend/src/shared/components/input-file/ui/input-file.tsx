import { FC, InputHTMLAttributes } from 'react';
import cls from './input-file.module.css';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'shared/components/spinner';
import classNames from 'classnames';

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
	innerText?: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	isInvalid?: boolean;
	className?: string;
	formReg?: any;
}

export const InputFile: FC<InputFileProps> = (props) => {
	const {
		className,
		innerText,
		formReg,
		isLoading = false,
		isSuccess = false,
		isInvalid = false,
		...otherProps
	} = props;

	return (
		<label
			className={className}
			htmlFor={otherProps.id}
		>
			<div
				className={classNames(
					cls.inputFile,
					isInvalid && cls.inputFileError,
				)}
			>
				{innerText ? (
					<p>{innerText}</p>
				) : (
					<p>
						<span className=''>select</span>{' '}
						<span className='uppercase font-semibold'>
							{formReg.name}
						</span>
					</p>
				)}
				{innerText ? (
					isLoading ? (
						<Spinner variant='xs' />
					) : isSuccess ? (
						<CheckIcon className='h-6 w-6 text-green-700' />
					) : (
						<XMarkIcon className='h-6 w-6 text-red-700' />
					)
				) : (
					<p className={cls.accept}>{otherProps.accept}</p>
				)}
			</div>
			<input
				type='file'
				{...otherProps}
				{...formReg}
				hidden
			/>
		</label>
	);
};

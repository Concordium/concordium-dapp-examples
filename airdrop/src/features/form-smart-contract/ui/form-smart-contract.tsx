import { FC } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextAlert } from 'shared/components/text-alert';
import { LP_RAW_SCHEMA, RAW_MODULE_REFERENCE } from 'shared/config';
import {
	LOCAL_STORAGE_KEY_MODULE_REFERENCE,
	LOCAL_STORAGE_KEY_RAW_SCHEMA,
} from 'shared/config/local-storage.ts';
import {
	DEFAULT_LP_RAW_SCHEMA,
	DEFAULT_RAW_MODULE_REFERENCE,
} from 'shared/config/smart-contract.ts';

interface FormSmartContractWrapperProps {
	className?: string;
}

interface FormSmartContractProps {
	'Raw Schema': string;
	'Module Reference': string;
}

export const FormSmartContract: FC<FormSmartContractWrapperProps> = ({
	className,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSmartContractProps>();

	function resetHandler() {
		sessionStorage.setItem(
			LOCAL_STORAGE_KEY_MODULE_REFERENCE,
			DEFAULT_RAW_MODULE_REFERENCE,
		);
		sessionStorage.setItem(
			LOCAL_STORAGE_KEY_RAW_SCHEMA,
			DEFAULT_LP_RAW_SCHEMA,
		);
		window.location.reload();
	}

	const onAction: SubmitHandler<FormSmartContractProps> = async (
		data,
	): Promise<void> => {
		sessionStorage.setItem(
			LOCAL_STORAGE_KEY_MODULE_REFERENCE,
			data['Module Reference'],
		);
		sessionStorage.setItem(
			LOCAL_STORAGE_KEY_RAW_SCHEMA,
			data['Raw Schema'],
		);
		window.location.reload();
	};

	return (
		<form
			onSubmit={handleSubmit(onAction)}
			className={classNames(
				'min-w-[100%] flex flex-col gap-4',
				className,
			)}
		>
			<div className='flex gap-4 min-w-[100%]'>
				<p>Module Reference</p>
				<input
					type='text'
					className='w-[100%] border-2 border-gray-300 rounded-2xl px-4 py-2'
					defaultValue={RAW_MODULE_REFERENCE}
					{...register('Module Reference', { required: true })}
				/>
			</div>
			{errors['Module Reference']?.types?.required && (
				<TextAlert>Module Reference is required</TextAlert>
			)}
			<div className='flex gap-4 min-w-[100%]'>
				<p>Raw Schema</p>
				<textarea
					className='w-[100%] border-2 border-gray-300 rounded-2xl px-4 py-2 h-96'
					defaultValue={LP_RAW_SCHEMA}
					{...register('Raw Schema', { required: true })}
				/>
			</div>
			{errors['Module Reference']?.types?.required && (
				<TextAlert>Module Reference is required</TextAlert>
			)}

			<button
				type='submit'
				className='bg-blue-500 hover:bg-blue-400 p-4 rounded-2xl transition'
			>
				change
			</button>

			<button
				type='button'
				onClick={resetHandler}
				className='bg-amber-500 hover:bg-amber-400 p-4 rounded-2xl transition'
			>
				reset to default
			</button>
		</form>
	);
};

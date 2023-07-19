import { type FC } from 'react';

import { useFormInit } from '../hooks/use-form-init.ts';
import { InputNumber } from 'features/input-number';
import { InputDate } from 'features/input-date';
import { addDays } from 'shared/lib/addDays.ts';
import { TextAlert } from 'shared/components/text-alert';
import { StatusTransactionInit } from 'features/status-transaction-init';
import { ButtonDrop } from 'widgets/form-init/ui/button-drop.tsx';

export const FormInit: FC = () => {
	const {
		register,
		errors,
		handleAction,
		transactionHash,
		isLoading,
		createdContractId,
	} = useFormInit();

	return (
		<form
			onSubmit={handleAction}
			className='flex flex-col gap-4'
		>
			<InputNumber
				{...{ register, errors, name: 'nft limit', defaultValue: 10 }}
			/>

			<InputNumber
				{...{ register, errors, name: 'reserve', defaultValue: 3 }}
			/>

			<InputNumber
				{...{
					register,
					errors,
					name: 'nft limit per address',
					defaultValue: 6,
				}}
			/>

			<div className='flex flex-row gap-4'>
				<InputDate
					defaultValue={addDays(new Date(), 2)}
					register={register('nft time limit', {
						required: true,
					})}
				/>
				{errors['nft time limit']?.type === 'required' && (
					<TextAlert className='self-center'>
						nft time limit is required
					</TextAlert>
				)}
				{errors['nft time limit']?.type === 'min' && (
					<TextAlert className='self-center'>
						That time has passed
					</TextAlert>
				)}
			</div>

			{/*<div className='flex flex-row gap-4'>*/}
			{/*	<p>selected index</p>*/}
			{/*	<input*/}
			{/*		type='checkbox'*/}
			{/*		{...register('selected index')}*/}
			{/*	/>*/}
			{/*</div>*/}

			<ButtonDrop isLoading={isLoading} />

			{transactionHash && (
				<StatusTransactionInit
					transactionHash={transactionHash}
					contractIndex={createdContractId}
					isLoading={isLoading}
					errorCode={undefined}
				/>
			)}
		</form>
	);
};

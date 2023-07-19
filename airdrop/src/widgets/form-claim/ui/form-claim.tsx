import { type FC } from 'react';

import { useFormClaim } from '../hooks/use-form-claim.ts';
import { InputNumber } from 'features/input-number';
import { useAuth } from 'shared/hooks/use-auth.ts';
import { StyledButton } from 'shared/components/styled-button';
import { Spinner } from 'shared/components/spinner';
import { StatusTransactionClaim } from 'features/status-transaction-claim';

export const FormClaim: FC = () => {
	const {
		register,
		errors,
		handleAction,
		transactionHash,
		isLoading,
		errorCode,
	} = useFormClaim();

	const { isAuth } = useAuth();

	return (
		<form onSubmit={handleAction}>
			<div className='flex flex-col gap-4'>
				{/*<InputNumber*/}
				{/*	{...{*/}
				{/*		register,*/}
				{/*		errors,*/}
				{/*		name: 'selected NFT',*/}
				{/*		defaultValue: 0,*/}
				{/*	}}*/}
				{/*/>*/}

				<InputNumber
					{...{
						register,
						errors,
						name: 'amount of NFTs',
						defaultValue: 1,
					}}
				/>

				<StyledButton
					type='submit'
					icon={null}
					disabled={!isAuth}
				>
					{isLoading ? (
						<Spinner variant='xs' />
					) : isAuth ? (
						'Claim NFT'
					) : (
						'need to connect'
					)}
				</StyledButton>

				{transactionHash && (
					<StatusTransactionClaim
						transactionHash={transactionHash}
						isLoading={isLoading}
						errorCode={errorCode}
					/>
				)}
			</div>
		</form>
	);
};

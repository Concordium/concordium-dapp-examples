import { FC } from 'react';
import cls from './status-transaction-claim.module.css';
import classNames from 'classnames';
import { EXPLORER_URL } from 'shared/config/urls.ts';
import {
	ArrowTopRightOnSquareIcon,
	CheckIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { Spinner } from 'shared/components/spinner';
import { TextAlert } from 'shared/components/text-alert';
import { getErrorMessage } from 'shared/lib/get-error-message.ts';

interface ClaimTransactionStatusProps {
	transactionHash: string;
	isLoading: boolean;
	errorCode: number | undefined;
	className?: string;
}

export const StatusTransactionClaim: FC<ClaimTransactionStatusProps> = (
	props,
) => {
	const { className, isLoading, errorCode, transactionHash } = props;
	return (
		<div className={classNames(cls.statusTransactionClaim, className)}>
			<div className={cls.iconsBar}>
				<div>
					{isLoading && <Spinner variant='xs' />}
					{!!errorCode && (
						<XMarkIcon className='h-6 w-6 text-red-700' />
					)}
					{!isLoading && !errorCode && (
						<CheckIcon className='h-6 w-6 text-green-700' />
					)}
				</div>

				<a
					href={`${EXPLORER_URL}/${transactionHash}`}
					target='_blank'
				>
					<ArrowTopRightOnSquareIcon className='h-6 w-6 text-blue-700' />
				</a>
			</div>
			{!!errorCode && (
				<div className={cls.errorMessage}>
					{errorCode !== 0 && (
						<TextAlert icon={false}>
							{getErrorMessage(errorCode)}
						</TextAlert>
					)}
				</div>
			)}
		</div>
	);
};

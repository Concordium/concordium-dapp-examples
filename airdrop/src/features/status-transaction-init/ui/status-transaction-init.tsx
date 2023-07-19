import { FC } from 'react';
import cls from './status-transaction-init.module.css';
import classNames from 'classnames';
import { Spinner } from 'shared/components/spinner';
import {
	ArrowTopRightOnSquareIcon,
	CheckIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { EXPLORER_URL } from 'shared/config/urls.ts';
import { TextAlert } from 'shared/components/text-alert';
import { getErrorMessage } from 'shared/lib/get-error-message.ts';
import { RoutePath } from 'shared/config/route.ts';
import { Link } from 'react-router-dom';

interface StatusTransactionInitProps {
	transactionHash: string;
	contractIndex: bigint | undefined;
	isLoading: boolean;
	errorCode: number | undefined;
	className?: string;
}

export const StatusTransactionInit: FC<StatusTransactionInitProps> = (
	props,
) => {
	const { className, isLoading, errorCode, transactionHash, contractIndex } =
		props;

	return (
		<div className={classNames(cls.statusTransactionInit, className)}>
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

			{!!contractIndex && (
				<Link
					className={classNames(cls.link, cls.borderTop)}
					to={`${RoutePath.claim}/${contractIndex.toString()}/0`}
				>
					{`<${contractIndex}, 0>`}{' '}
				</Link>
			)}

			{!!errorCode && errorCode !== 0 && (
				<TextAlert
					icon={false}
					className={classNames(cls.errorMessage, cls.borderTop)}
				>
					{getErrorMessage(errorCode)}
				</TextAlert>
			)}
		</div>
	);
};

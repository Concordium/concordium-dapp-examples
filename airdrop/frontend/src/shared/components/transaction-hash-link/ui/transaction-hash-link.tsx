import { FC } from 'react';
import { EXPLORER_URL } from 'shared/config/urls.ts';

interface TransactionHashLinkProps {
	transactionHash: string;
}

export const TransactionHashLink: FC<TransactionHashLinkProps> = ({
	transactionHash,
}) => {
	return (
		<a
			className='text-blue-500 hover:text-blue-700'
			href={`${EXPLORER_URL}/${transactionHash}`}
			target='_blank'
		>
			<code>{transactionHash}</code>
		</a>
	);
};

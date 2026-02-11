import { FC } from 'react';
import { AirdropTransactionClaim } from 'entities/transaction-claim-card';
import { TransactionHashLink } from 'shared/components/transaction-hash-link';
import { IpfsCidLink } from 'shared/components/ipfs-cid-link';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/route.ts';
import { getErrorMessage } from 'shared/lib/get-error-message.ts';

export const TransactionClaimCard: FC<AirdropTransactionClaim> = (
	transaction,
) => {
	return (
		<div
			className={`p-4 border-[1px] border-gray-800 rounded-lg ${
				transaction.error ? 'bg-red-50' : 'bg-green-50'
			}`}
		>
			<p>date: {transaction.claimDate.toDateString()}</p>
			<p>time: {transaction.claimDate.toTimeString()}</p>
			<p>
				contract address:{' '}
				<Link
					className='text-blue-500 hover:text-blue-700'
					to={`${RoutePath.claim}/${transaction.contractIndex}/0`}
				>
					{`<${transaction.contractIndex}, 0>`}
				</Link>
			</p>
			<IpfsCidLink
				name='whitelist'
				link={transaction.whitelistUrl}
			/>
			<p>is on whitelist: {String(transaction.isOnWhitelist)}</p>
			<p>selected index: {String(transaction.selectedToken)}</p>
			<p>amount of tokens: {String(transaction.amountOfTokens)}</p>
			<p>
				status:{' '}
				{transaction.error
					? getErrorMessage(transaction.error)
					: 'success'}
			</p>
			<TransactionHashLink transactionHash={transaction.hash} />
		</div>
	);
};

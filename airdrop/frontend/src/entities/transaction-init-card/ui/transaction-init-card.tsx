import { FC } from 'react';
import { AirdropTransactionInit } from 'entities/transaction-init-card/model/airdrop-transaction-init.ts';
import { TransactionHashLink } from 'shared/components/transaction-hash-link';
import { IpfsCidLink } from 'shared/components/ipfs-cid-link';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/route.ts';
import { getErrorMessage } from 'shared/lib/get-error-message.ts';

export const TransactionInitCard: FC<AirdropTransactionInit> = (
	transaction,
) => {
	return (
		<div
			className={`flex flex-col gap-1 p-4 border-[1px] border-gray-800 bg-gray-100 rounded-lg ${
				transaction.error ? 'bg-red-50' : 'bg-green-50'
			}`}
		>
			<p>date: {transaction.initDate.toDateString()}</p>
			<p>time: {transaction.initDate.toTimeString()}</p>
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
				name='metadata'
				link={transaction.metadataUrl}
			/>
			<IpfsCidLink
				name='whitelist'
				link={transaction.whitelistUrl}
			/>
			<p>nft limit: {transaction.nftLimit}</p>
			<p>reserve: {transaction.reserve}</p>
			<p>nft limit per address: {transaction.nftLimitPerAddress}</p>
			<p>airdrop end time: {transaction.endTime.toString()}</p>
			<p>selected index: {String(transaction.selectedIndex)}</p>
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

import { TransactionsInitList } from 'widgets/transactions-init-list';
import { TransactionsClaimList } from 'widgets/transactions-claim-list';

export default function Transactions() {
	return (
		<main className='flex min-h-max flex-col items-center justify-between px-24 py-12'>
			<div className='grid grid-cols-1 gap-12'>
				<TransactionsInitList />
				<TransactionsClaimList />
			</div>
		</main>
	);
}

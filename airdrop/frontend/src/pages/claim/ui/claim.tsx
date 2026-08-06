import { FormClaim } from 'widgets/form-claim';
import { NftCard, NftCardSkeleton } from 'entities/nft-card';
import { usePageMetadata } from 'shared/hooks/use-page-metadata.ts';

export default function Claim() {
	const metadata = usePageMetadata();

	return (
		<main className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
			{metadata ? (
				<NftCard metadata={metadata} />
			) : (
				<NftCardSkeleton isLoading />
			)}
			<div className='grid grid-cols-2 gap-4'>
				<FormClaim />
			</div>
		</main>
	);
}

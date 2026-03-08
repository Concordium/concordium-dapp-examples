import { FC } from 'react';
import cls from './nft-card.module.css';
import classNames from 'classnames';

interface NftCardSkeletonProps {
	isLoading?: boolean;
	className?: string;
}

export const NftCardSkeleton: FC<NftCardSkeletonProps> = (props) => {
	const { className, isLoading } = props;
	return (
		<div
			className={classNames(
				cls.nftCard,
				className,
				cls.nftCardSkeleton,
				isLoading && 'animate-pulse',
			)}
		>
			<div />

			<div className={classNames(cls.info, 'animate-pulse')}>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</div>
		</div>
	);
};

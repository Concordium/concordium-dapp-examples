import { FC } from 'react';
import cls from './nft-card.module.css';
import classNames from 'classnames';
import { Metadata } from 'widgets/form-init/model/metadata.ts';

interface NftCardProps {
	className?: string;
	metadata: Metadata;
}

export const NftCard: FC<NftCardProps> = ({ className, metadata }) => {
	return (
		<div
			// @ts-ignore
			style={{ '--image-url': `url(${metadata.display.url})` }}
			className={classNames(
				cls.nftCard,
				className,
				`bg-[image:var(--image-url)]`,
			)}
		>
			<div className={cls.hideInfoArea} />
			<div className={cls.info}>
				<p className={cls.header}>{metadata.name}</p>
				<p className={cls.description}>{metadata.description}</p>
			</div>
		</div>
	);
};

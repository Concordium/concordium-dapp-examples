import { FC } from 'react';
import { IPFS_URL } from 'shared/config/urls.ts';

interface TransactionHashLinkProps {
	name?: string;
	link: string;
}

export const IpfsCidLink: FC<TransactionHashLinkProps> = ({ link, name }) => {
	return (
		<span className='flex gap-2 wrap'>
			<p>{name}: </p>
			<a
				className='text-blue-500 hover:text-blue-700'
				href={link}
				target='_blank'
			>
				<code>{link.replace(IPFS_URL + '/', '')}</code>
			</a>
		</span>
	);
};

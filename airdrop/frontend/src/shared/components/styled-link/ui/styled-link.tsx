import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Properties {
	children: ReactNode;
	description?: string;
	to: string;
}

export const StyledLink: FC<Properties> = ({ children, to, description }) => {
	return (
		<Link
			to={to}
			className='text-black dark:text-white group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
		>
			<h2 className={`mb-3 text-2xl font-semibold`}>
				{children}{' '}
				<span className='inline-block align-bottom transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
					<ArrowRightIcon className='h-7 w-7' />
				</span>
			</h2>
			<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
				{description}
			</p>
		</Link>
	);
};

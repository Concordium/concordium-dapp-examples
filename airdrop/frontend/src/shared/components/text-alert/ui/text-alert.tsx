import { FC, ReactNode } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface TextAlertProps {
	icon?: boolean;
	className?: string;
	children?: ReactNode;
}

export const TextAlert: FC<TextAlertProps> = ({
	className,
	icon = true,
	children,
}) => {
	return (
		<p
			className={`${className} text-xl font-semibold dark:text-red-500 text-red-700 inline-flex gap-2`}
		>
			{icon && (
				<span className='self-center'>
					<ExclamationTriangleIcon className='h-6 w-6' />
				</span>
			)}
			{children}
		</p>
	);
};

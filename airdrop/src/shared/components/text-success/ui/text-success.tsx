import { FC, ReactNode } from 'react';

interface TextSuccessProps {
	className?: string;
	children?: ReactNode;
}

export const TextSuccess: FC<TextSuccessProps> = ({ className, children }) => {
	return (
		<p className={`${className} text-xl font-semibold text-green-500`}>
			{children}
		</p>
	);
};

import { FC } from 'react';
import classNames from 'classnames';
import { StyledButton } from 'shared/components/styled-button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'shared/components/spinner';
import { useAuth } from 'shared/hooks/use-auth.ts';

interface ButtonFindProps {
	isLoading: boolean;
	className?: string;
}

export const ButtonFind: FC<ButtonFindProps> = (props) => {
	const { isLoading, className } = props;
	const { isAuth } = useAuth();
	return (
		<div className={classNames(className)}>
			<StyledButton
				icon={
					isAuth && !isLoading ? <MagnifyingGlassIcon /> : undefined
				}
				type='submit'
				disabled={!isAuth}
			>
				{isLoading ? (
					<Spinner variant={'xs'} />
				) : isAuth ? (
					'Find airdrop'
				) : (
					'need to connect'
				)}
			</StyledButton>
		</div>
	);
};

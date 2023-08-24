import { FC } from 'react';
import classNames from 'classnames';
import { StyledButton } from 'shared/components/styled-button';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'shared/components/spinner';
import { useAuth } from 'shared/hooks/use-auth.ts';

interface ButtonDropProps {
	isLoading: boolean;
	className?: string;
}

export const ButtonDrop: FC<ButtonDropProps> = (props) => {
	const { isLoading, className } = props;
	const { isAuth } = useAuth();
	return (
		<div className={classNames(className)}>
			<StyledButton
				type='submit'
				icon={isAuth && !isLoading ? <RocketLaunchIcon /> : undefined}
				disabled={!isAuth || isLoading}
			>
				{isLoading ? (
					<Spinner
						className='self-center'
						variant='xs'
					/>
				) : isAuth ? (
					'Drop'
				) : (
					'need to connect'
				)}
			</StyledButton>
		</div>
	);
};

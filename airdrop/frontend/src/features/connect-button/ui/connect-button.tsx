import { FC } from 'react';
import { useConnectButton } from '../hooks/use-connect-button.ts';
import { StyledButton } from 'shared/components/styled-button';
import { UserIcon } from '@heroicons/react/24/outline';

export const ConnectButton: FC = () => {
	const { toggleConnection, actionConnection } = useConnectButton();
	return (
		<StyledButton
			icon={<UserIcon />}
			onClick={toggleConnection}
			description={'wallet connection'}
		>
			{actionConnection}
		</StyledButton>
	);
};

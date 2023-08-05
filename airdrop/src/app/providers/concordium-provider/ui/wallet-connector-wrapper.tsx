import { FC, PropsWithChildren } from 'react';
import { WithWalletConnector } from '@concordium/react-components/dist/WithWalletConnector';
import { ConcordiumProvider } from './concordium-provider.tsx';
import { testnet } from 'shared/config';

export const WalletConnectorWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<WithWalletConnector network={testnet}>
			{(props) => {
				return (
					<ConcordiumProvider walletConnectionPropsDefault={props}>
						{children}
					</ConcordiumProvider>
				);
			}}
		</WithWalletConnector>
	);
};

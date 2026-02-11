import { FC, PropsWithChildren } from 'react';
import { WithWalletConnector } from '@concordium/react-components/dist/WithWalletConnector';
import { ConcordiumProvider } from './concordium-provider.tsx';
import { TESTNET } from '@concordium/react-components';

export const WalletConnectorWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<WithWalletConnector network={TESTNET}>
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

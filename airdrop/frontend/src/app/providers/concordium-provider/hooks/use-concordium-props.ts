import { useConnection } from '@concordium/react-components/dist/useConnection';
import { useConnect } from '@concordium/react-components';
import { useMemo } from 'react';
import { WalletConnectionProps } from '@concordium/react-components/dist/WithWalletConnector';
import { ConcordiumContextProps } from 'shared/config/concordium-context.ts';

export function useConcordiumProps(
	walletConnectionPropsDefault: WalletConnectionProps,
): ConcordiumContextProps {
	const { connectedAccounts, genesisHashes, activeConnector } =
		walletConnectionPropsDefault;

	const connection = useConnection(connectedAccounts, genesisHashes);

	const connect = useConnect(activeConnector, connection.setConnection);

	return useMemo(
		(): ConcordiumContextProps => ({
			...walletConnectionPropsDefault,
			...connection,
			...connect,
		}),

		[walletConnectionPropsDefault, connection, connect],
	);
}

import { createContext } from 'react';
import { WalletConnectionProps } from '@concordium/react-components/dist/WithWalletConnector';
import { Connection } from '@concordium/react-components/dist/useConnection';
import { Connect } from '@concordium/react-components';

export type ConcordiumContextProps = WalletConnectionProps &
	Connection &
	Connect;

export const ConcordiumContext = createContext<Partial<ConcordiumContextProps>>(
	{},
);

export const LOCAL_STORAGE_CONCORDIUM_KEY = 'walletConnectionProps';

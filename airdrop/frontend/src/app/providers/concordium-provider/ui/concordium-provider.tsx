import { FC, ReactNode } from 'react';
import { WalletConnectionProps } from '@concordium/react-components/dist/WithWalletConnector';
import { ConcordiumContext } from 'shared/config/concordium-context.ts';
import { useConcordiumProps } from '../hooks/use-concordium-props.ts';

interface ConcordiumProviderProps {
	walletConnectionPropsDefault: WalletConnectionProps;
	children: ReactNode;
}

export const ConcordiumProvider: FC<ConcordiumProviderProps> = ({
	walletConnectionPropsDefault,
	children,
}) => {
	const defaultProps = useConcordiumProps(walletConnectionPropsDefault);

	return (
		<ConcordiumContext.Provider value={{ ...defaultProps }}>
			{children}
		</ConcordiumContext.Provider>
	);
};

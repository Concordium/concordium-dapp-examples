import {
    BrowserWalletConnector,
    CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    WalletConnectConnector,
    WalletConnection,
    WalletConnectionDelegate,
    WalletConnector,
} from '@concordium/wallet-connectors';
import { SignClientTypes } from '@walletconnect/types';
import {
    Component,
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { NETWORK } from './constants';
import { activeWalletAtom, Wallet } from './store';
import { AccountAddress } from '@concordium/web-sdk';
import { updateMapEntry } from './util';

export const WALLET_CONNECT_OPTS: SignClientTypes.Options = {
    projectId: CONCORDIUM_WALLET_CONNECT_PROJECT_ID,
    metadata: {
        name: 'Concordium governance committee voting',
        description: 'Application for voting for the Concordium governance committee',
        url: '#',
        icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
};
/**
 * Describes the properties provided by any wallet context, i.e. {@linkcode browserWalletContext} or
 * {@linkcode walletConnectContext}.
 */
export type ConnectorContext = WalletConnector & {
    /** Shows if the connector is in the process of connecting */
    isConnecting: boolean;
    /** Shows if the connector is active */
    isActive: boolean;
};

const initialConnectorContext: ConnectorContext = {
    isConnecting: false,
    isActive: false,
    connect() {
        throw new Error('Not inititialized');
    },
    disconnect() {
        throw new Error('Not inititialized');
    },
    getConnections() {
        throw new Error('Not inititialized');
    },
};

const browserWalletContext = createContext<ConnectorContext>(initialConnectorContext);
const walletConnectContext = createContext<ConnectorContext>(initialConnectorContext);

/**
 * Provides access to managing connection(s) to the Concordium browser wallet
 */
export function useBrowserWallet() {
    return useContext(browserWalletContext);
}

/**
 * Provides access to managing connection(s) wallet connect compatible Concordium wallets, e.g. Concordium mobile
 * wallets.
 */
export function useWalletConnect() {
    return useContext(walletConnectContext);
}

/**
 * Hook for managing connections of a {@linkcode WalletConnector}.
 *
 * @param wc - A {@linkcode WalletConnector} to use.
 *
 * @returns A corresponding {@linkcode ConnectorContext}
 */
function useWalletConnector(wc: WalletConnector): ConnectorContext {
    const wallet = useAtomValue(activeWalletAtom);
    const [isConnecting, setIsConnecting] = useState(false);
    const isActive = useMemo(
        () => wallet?.connection !== undefined && wc.getConnections().includes(wallet?.connection),
        [wallet?.connection, wc],
    );

    const connect = useCallback(async () => {
        setIsConnecting(true);
        try {
            return await wc.connect();
        } finally {
            setIsConnecting(false);
        }
    }, [wc]);

    useEffect(() => {
        if (isActive && wallet?.account === undefined) {
            void wc.disconnect();
        }
    }, [wallet?.account, isActive, wc]);

    return {
        isConnecting,
        isActive,
        connect,
        disconnect: wc.disconnect,
        getConnections: wc.getConnections,
    };
}

type WalletProviderProps = PropsWithChildren<{
    connector: WalletConnector;
}>;

/**
 * Provides the context of a single {@linkcode WalletConnector} to the component tree below
 */
function WalletProvider({ connector, children }: WalletProviderProps) {
    const contextValue = useWalletConnector(connector);

    const Provider = useMemo(() => {
        if (connector instanceof BrowserWalletConnector) {
            return browserWalletContext.Provider;
        } else if (connector instanceof WalletConnectConnector) {
            return walletConnectContext.Provider;
        } else {
            throw new Error(`Unsupported connector`);
        }
    }, [connector]);

    return <Provider value={contextValue}>{children}</Provider>;
}

type WalletsProviderProps = PropsWithChildren<{
    /** Connector instance to the Concordium browser wallet */
    browser: BrowserWalletConnector;
    /** Connector instance to wallet connect compatible Concordium wallet */
    walletConnect: WalletConnectConnector;
    /** The currently active wallet */
    activeWallet: Wallet | undefined;
}>;

/**
 * Component whose sole purpose is to provide connection management functionality to the component tree below the
 * component acting as wallet connector delegate.
 */
function WalletsProvider({ browser, walletConnect, activeWallet, children }: WalletsProviderProps) {
    const setActiveWallet = useSetAtom(activeWalletAtom);

    useEffect(() => {
        setActiveWallet(activeWallet);
    }, [activeWallet, setActiveWallet]);

    return (
        <WalletProvider connector={browser}>
            <WalletProvider connector={walletConnect}>{children}</WalletProvider>
        </WalletProvider>
    );
}

type WalletConnectionManagerProps = PropsWithChildren;
interface WalletConnectionManagerState {
    browserWalletConnector: BrowserWalletConnector | undefined;
    walletConnectConnector: WalletConnectConnector | undefined;
    connections: WalletConnection[];
    accounts: Map<WalletConnection, AccountAddress.Type | undefined>;
    chains: Map<WalletConnection, string | undefined>;
}

/**
 * Manages connections for the different wallets the application integrates with. Connection details will be available to
 * the component tree below this component.
 */
export class WalletConnectionManager
    extends Component<WalletConnectionManagerProps, WalletConnectionManagerState>
    implements WalletConnectionDelegate
{
    constructor(props: WalletConnectionManagerProps) {
        super(props);

        this.state = {
            browserWalletConnector: undefined,
            walletConnectConnector: undefined,
            connections: [],
            accounts: new Map(),
            chains: new Map(),
        };
    }
    onChainChanged(connection: WalletConnection, genesisHash: string): void {
        this.setState((state) => ({
            ...state,
            chains: updateMapEntry(state.chains, connection, genesisHash),
        }));
    }
    onAccountChanged(connection: WalletConnection, address: string | undefined): void {
        this.setState((state) => ({
            ...state,
            accounts: updateMapEntry(
                state.accounts,
                connection,
                address !== undefined ? AccountAddress.fromBase58(address) : undefined,
            ),
        }));
    }
    onConnected(connection: WalletConnection, address: string | undefined): void {
        this.setState((state) => {
            // The first entry is the active connection.
            const connections = [connection, ...state.connections.filter((c) => c === connection)];
            return {
                ...state,
                connections,
                accounts: updateMapEntry(
                    state.accounts,
                    connection,
                    address !== undefined ? AccountAddress.fromBase58(address) : undefined,
                ),
            };
        });
    }
    onDisconnected(connection: WalletConnection): void {
        this.setState((state) => {
            const connections = state.connections.filter((c) => c !== connection);
            return {
                ...state,
                connections,
                accounts: updateMapEntry(state.accounts, connection, undefined),
                chains: updateMapEntry(state.chains, connection, undefined),
            };
        });
    }

    async componentDidMount(): Promise<void> {
        const bwPromise = BrowserWalletConnector.create(this);
        const wcPromise = WalletConnectConnector.create(WALLET_CONNECT_OPTS, this, NETWORK);
        const [bw, wc] = await Promise.all([bwPromise, wcPromise]);

        this.setState({ browserWalletConnector: bw, walletConnectConnector: wc });
    }

    render() {
        const { browserWalletConnector, walletConnectConnector } = this.state;
        if (browserWalletConnector === undefined || walletConnectConnector === undefined) {
            return null;
        }

        const connection = this.state.connections[0];
        const activeWallet: Wallet | undefined =
            connection === undefined
                ? undefined
                : {
                      chain: this.state.chains.get(connection),
                      account: this.state.accounts.get(connection),
                      connection,
                  };

        return (
            <WalletsProvider
                browser={browserWalletConnector}
                walletConnect={walletConnectConnector}
                activeWallet={activeWallet}
            >
                {this.props.children}
            </WalletsProvider>
        );
    }
}

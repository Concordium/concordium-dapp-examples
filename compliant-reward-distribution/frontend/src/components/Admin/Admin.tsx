import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { AdminGetAccountData } from './AdminGetAccountData';
import { AdminGetPendingApprovals } from './AdminGetPendingApprovals';
import { AdminSetClaimed } from './AdminSetClaimed';
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from '../../wallet-connection';
import { Button } from 'react-bootstrap';

interface Props {
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | undefined;
    connectProvider: (provider: WalletProvider) => void;
}

export function Admin(props: Props) {
    const { signer, grpcClient, provider, connectProvider } = props;

    return (
        <div className="centered">
            {!signer && (
                <div className="card">
                    <h2 className="centered white">Connect your wallet</h2>
                    <br />
                    <Button
                        variant="primary"
                        onClick={async () => {
                            connectProvider(await BrowserWalletProvider.getInstance());
                        }}
                    >
                        Browser wallet
                    </Button>
                    <br />
                    <Button
                        variant="primary"
                        onClick={async () => connectProvider(await WalletConnectProvider.getInstance())}
                    >
                        Android CryptoX Wallet
                    </Button>
                </div>
            )}

            <AdminGetPendingApprovals provider={provider} signer={signer} grpcClient={grpcClient} />
            <AdminGetAccountData provider={provider} signer={signer} grpcClient={grpcClient} />
            <AdminSetClaimed provider={provider} signer={signer} grpcClient={grpcClient} />
        </div>
    );
}

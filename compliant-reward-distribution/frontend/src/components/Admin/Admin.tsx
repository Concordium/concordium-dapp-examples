import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { AdminGetAccountData } from './AdminGetAccountData';
import { AdminGetPendingApprovals } from './AdminGetPendingApprovals';
import { AdminSetClaimed } from './AdminSetClaimed';
import { WalletProvider } from '../../wallet-connection';
import { useRef, version } from 'react';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { useWallet } from '../../context/WalletContext';
import ConnectWalletAdmin from './ConnectWalletAdmin';

interface Props {
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | undefined;
}

export function Admin(props: Props) {
    // const { signer, grpcClient, provider } = props;
    const { provider, connectedAccount } = useWallet();
    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);
    return (
        <div className="centered bg-dark min-vh-100">
            {connectedAccount ?
                <>
                    <div className="d-flex justify-content-center mb-3">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                        >
                            Version {version} ({capitalizedNetwork})
                        </a>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`#`}
                        >
                            {connectedAccount
                                ? connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)
                                : 'No Account Connected'}
                        </a>
                    </div>
                </>

                : <ConnectWalletAdmin />}
            <AdminGetPendingApprovals provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
            <AdminGetAccountData provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
            <AdminSetClaimed provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
        </div>
    );
}

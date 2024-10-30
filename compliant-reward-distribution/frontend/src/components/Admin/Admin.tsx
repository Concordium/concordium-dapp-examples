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
            
            <ConnectWalletAdmin />
            <AdminGetPendingApprovals provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
            <AdminGetAccountData provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
            <AdminSetClaimed provider={provider} signer={connectedAccount} grpcClient={grpcClient} />
        </div>
    );
}

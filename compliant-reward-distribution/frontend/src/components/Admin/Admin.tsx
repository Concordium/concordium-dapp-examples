import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { AdminGetAccountData } from './AdminGetAccountData';
import { AdminGetPendingApprovals } from './AdminGetPendingApprovals';
import { AdminSetClaimed } from './AdminSetClaimed';
import { WalletProvider } from '../../wallet-connection';

interface Props {
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | undefined;
}

export function Admin(props: Props) {
    const { signer, grpcClient, provider } = props;

    return (
        <div className="centered">
            <AdminGetPendingApprovals provider={provider} signer={signer} grpcClient={grpcClient} />
            <AdminGetAccountData provider={provider} signer={signer} grpcClient={grpcClient} />
            <AdminSetClaimed provider={provider} signer={signer} grpcClient={grpcClient} />
        </div>
    );
}

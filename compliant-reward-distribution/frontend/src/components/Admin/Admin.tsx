import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { AdminGetAccountData } from './AdminGetAccountData';
import { AdminGetPendingApprovals } from './AdminGetPendingApprovals';
import { AdminSetClaimed } from './AdminSetClaimed';
import { WalletProvider } from '../../wallet-connection';

interface Props {
    accountAddress: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | undefined;
}

export function Admin(props: Props) {
    const { accountAddress, grpcClient, provider } = props;

    return (
        <div className="centered">
            <AdminGetPendingApprovals provider={provider} signer={accountAddress} grpcClient={grpcClient} />
            <AdminGetAccountData provider={provider} signer={accountAddress} grpcClient={grpcClient} />
            <AdminSetClaimed provider={provider} signer={accountAddress} grpcClient={grpcClient} />
        </div>
    );
}

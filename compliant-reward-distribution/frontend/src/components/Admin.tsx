import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { AdminGetAccountData } from './AdminGetAccountData';
import { AdminGetPendingApprovals } from './AdminGetPendingApprovals';
import { AdminSetClaimed } from './AdminSetClaimed';

interface Props {
    accountAddress: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function Admin(props: Props) {
    const { accountAddress, grpcClient } = props;

    return (
        <div className="centered">
            <AdminGetPendingApprovals signer={accountAddress} grpcClient={grpcClient} />
            <AdminGetAccountData signer={accountAddress} grpcClient={grpcClient} />
            <AdminSetClaimed signer={accountAddress} grpcClient={grpcClient} />
        </div>
    );
}

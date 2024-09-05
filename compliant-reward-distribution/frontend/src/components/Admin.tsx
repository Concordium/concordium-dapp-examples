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
            <br />
            <br />
            <AdminGetPendingApprovals />
            <AdminGetAccountData signer={accountAddress} grpcClient={grpcClient} />
            <AdminSetClaimed signer={accountAddress} />
        </div>
    );
}

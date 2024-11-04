import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import JSONbig from 'json-bigint';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getRecentBlock, requestSignature } from '../../utils';
import { WalletProvider } from '../../wallet-connection';
import { LIMIT, OFFSET, SCHEMA_GET_PENDING_APPROVALS_MESSAGE } from '../../constants';
import { AccountData, getPendingApprovals } from '../../apiReqeuests';

interface Props {
    signer: string | null;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | null;
}

export function AdminGetPendingApprovals(props: Props) {
    const { signer, grpcClient, provider } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [pendingApprovals, setPendingApprovals] = useState<AccountData[] | undefined>(undefined);

    const { handleSubmit } = useForm<[]>({ mode: 'all' });

    async function onSubmit() {
        setError(undefined);
        setPendingApprovals(undefined);

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet. Have an account in your wallet.`);
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);
            if (!provider) {
                throw new Error('Provider is not available.');
            }
            const signature = await requestSignature(
                recentBlockHash,
                SCHEMA_GET_PENDING_APPROVALS_MESSAGE,
                { limit: LIMIT, offset: OFFSET },
                signer,
                provider,
            );

            const data = await getPendingApprovals(signer, signature, recentBlockHeight, LIMIT, OFFSET);
            setPendingApprovals(data);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered text-white">Get Pending Approvals</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Button className="bg-theme text-black" type="submit">
                        Get Pending Approvals
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}

                    {pendingApprovals && <pre className="pre">{JSONbig.stringify(pendingApprovals, undefined, 2)}</pre>}
                </Form>
            </div>
        </div>
    );
}

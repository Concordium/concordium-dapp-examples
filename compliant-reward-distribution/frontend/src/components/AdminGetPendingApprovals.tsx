import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { getARecentBlockHash, getPendingApprovals, requestSignature } from '../utils';
import JSONbig from 'json-bigint';
import { WalletProvider } from '../../wallet-connection';

interface Props {
    provider: WalletProvider | undefined;
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function AdminGetPendingApprovals(props: Props) {
    const { provider, signer, grpcClient } = props;

    const { handleSubmit } = useForm<[]>({ mode: 'all' });

    const [error, setError] = useState<string | undefined>(undefined);
    const [pendingApprovals, setPendingApprovals] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);
        setPendingApprovals(undefined);

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet.`);
            }

            const [recentBlockHash, recentBlockHeight] = await getARecentBlockHash(grpcClient);
            const limit = 5;
            const offset = 0;

            const schema =
                'FAADAAAADgAAAGNvbnRleHRfc3RyaW5nFgIHAAAAbWVzc2FnZRQAAgAAAAUAAABsaW1pdAQGAAAAb2Zmc2V0BAoAAABibG9ja19oYXNoFgI=';
            const signature = await requestSignature(recentBlockHash, schema, { limit, offset }, signer, provider);

            const data = await getPendingApprovals(signer, signature, recentBlockHeight, limit, offset);
            setPendingApprovals(JSONbig.stringify(data));
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Get Pending Approvals</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Button variant="secondary" type="submit">
                        Get Pending Approvals
                    </Button>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
            </div>

            {pendingApprovals && (
                <div className="card">
                    <pre className="pre">{JSON.stringify(JSON.parse(pendingApprovals), undefined, 2)}</pre>
                </div>
            )}
        </div>
    );
}

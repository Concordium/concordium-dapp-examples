import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { getARecentBlockHash, getPendingApprovals } from '../utils';
import JSONbig from 'json-bigint';

interface Props {
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function AdminGetPendingApprovals(props: Props) {
    const { signer, grpcClient } = props;

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
            console.log(recentBlockHash);
            const limit = 5;
            const offset = 0;
            // TODO: add signature generation

            const data = await getPendingApprovals(
                signer,
                'c4bb83e7d7a9e6fe7a1b5f527174f7e368db9385b25fce0f4e4b7190781e57b5de6ad65a7481f1038f859d4c4ba8c07ed649b84f9e3c17e2bbdb87cf527cd602',
                recentBlockHeight,
                limit,
                offset,
            );
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

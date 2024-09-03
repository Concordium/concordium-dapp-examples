import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { WalletProvider } from '../../wallet-connection';
import { ConcordiumGRPCClient, CredentialStatement } from '@concordium/web-sdk';
import { getStatement, submitZkProof } from '../utils';
import { CONTEXT_STRING } from '../constants';
import sha256 from 'sha256';

interface Props {
    accountAddress: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function ZkProofSubmission(props: Props) {
    const { provider, grpcClient } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [zkStatement, setZkStatement] = useState<CredentialStatement | undefined>(undefined);

    useEffect(() => {
        const fetchStatement = async () => {
            const statement: CredentialStatement = await getStatement();
            setZkStatement(statement);
        };

        fetchStatement();
    }, []);

    interface FormType { }
    const { handleSubmit } = useForm<FormType>({ mode: 'all' });

    async function onSubmit() {
        setError(undefined);

        if (grpcClient === undefined) {
            setError(`'grpcClient' is undefined`);
            throw Error(`'grpcClient' is undefined`);
        }

        const bestBlockHeight = (await grpcClient.client.getConsensusInfo(''))?.response.bestBlockHeight;

        if (bestBlockHeight === undefined) {
            setError(`Couldn't get 'bestBlockHeight' from chain`);
            throw Error(`Couldn't get 'bestBlockHeight' from chain`);
        }

        const recentBlockHeight = bestBlockHeight.value - 10n;

        const recentBlockHash = (
            await grpcClient.client.getBlocksAtHeight({
                // TODO: Type in web-sdk needs to be fixed to do this ergonomically.
                blocksAtHeight: {
                    oneofKind: 'absolute',
                    absolute: {
                        height: { value: recentBlockHeight },
                    },
                },
            })
        )?.response.blocks[0].value;

        if (recentBlockHash === undefined) {
            setError(`'recentBlockHash' is undefined`);
            throw Error(`'recentBlockHash' is undefined`);
        }

        const hashDigest = [recentBlockHash, CONTEXT_STRING];
        const challenge = sha256(hashDigest.flatMap((item) => Array.from(item)));

        if (zkStatement === undefined) {
            setError(`'zkStatement' is undefined`);
            throw Error(`'zkStatement' is undefined`);
        }

        if (provider === undefined) {
            setError(`'provider' is undefined`);
            throw Error(`'provider' is undefined`);
        }

        const presentation = await provider.requestVerifiablePresentation(challenge, [zkStatement]);

        try {
            await submitZkProof(presentation, recentBlockHeight);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Submit ZK Proof</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
            </div>
        </div>
    );
}

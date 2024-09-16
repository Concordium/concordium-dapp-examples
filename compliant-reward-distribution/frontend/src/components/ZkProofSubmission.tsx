import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import sha256 from 'sha256';
import { Buffer } from 'buffer';

import {
    AccountAddress,
    ConcordiumGRPCClient,
    CredentialDeploymentValues,
    CredentialStatement,
} from '@concordium/web-sdk';

import { WalletProvider } from '../wallet-connection';
import { getRecentBlock } from '../utils';
import { CONTEXT_STRING } from '../constants';
import { getStatement, submitZkProof } from '../apiReqeuests';

interface Props {
    accountAddress: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function ZkProofSubmission(props: Props) {
    const { provider, grpcClient, accountAddress } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean | undefined>(undefined);
    const [zkStatement, setZkStatement] = useState<CredentialStatement | undefined>(undefined);

    useEffect(() => {
        const fetchStatement = async () => {
            const statement: CredentialStatement = await getStatement();
            setZkStatement(statement);
        };

        fetchStatement();
    }, []);

    interface FormType {}
    const { handleSubmit } = useForm<FormType>({ mode: 'all' });

    async function onSubmit() {
        setError(undefined);
        setSuccessfulSubmission(undefined);

        try {
            if (!zkStatement) {
                throw Error(`'zkStatement' is undefined`);
            }

            if (!provider || !accountAddress) {
                throw Error(
                    `'provider' or 'accountAddress' are undefined. Connect your wallet and have an account created in it.`,
                );
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);

            const digest = [recentBlockHash, Buffer.from(CONTEXT_STRING)];
            const challenge = sha256(digest.flatMap((item) => Array.from(item)));

            const accountInfo = await grpcClient?.getAccountInfo(AccountAddress.fromBase58(accountAddress));
            const credIdConnectedAccount = (
                accountInfo?.accountCredentials[0].value.contents as CredentialDeploymentValues
            ).credId;

            const presentation = await provider.requestVerifiablePresentation(challenge, [zkStatement]);

            if (
                credIdConnectedAccount !==
                presentation.verifiableCredential[0].credentialSubject.id.replace(
                    /did:ccd:(mainnet|testnet):cred:/g,
                    '',
                )
            ) {
                throw Error(
                    `When approving the ZK proof in the wallet, select your connected account from the drop-down menu in the wallet (expect proof for account: ${accountAddress}).`,
                );
            }

            await submitZkProof(presentation, recentBlockHeight);

            setSuccessfulSubmission(true);
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <br />
                    <Button
                        variant="info"
                        id="accountAddress"
                        disabled={true}
                        hidden={successfulSubmission === undefined}
                    >
                        Success
                    </Button>
                </Form>
            </div>
        </div>
    );
}

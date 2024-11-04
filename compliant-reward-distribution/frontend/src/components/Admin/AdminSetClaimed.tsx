import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getRecentBlock, requestSignature, validateAccountAddress } from '../../utils';
import { WalletProvider } from '../../wallet-connection';
import { SCHEMA_SET_CLAIMED_MESSAGE } from '../../constants';
import { setClaimed } from '../../apiReqeuests';

interface Props {
    signer: string | null;
    grpcClient: ConcordiumGRPCClient | undefined;
    provider: WalletProvider | null;
}

export function AdminSetClaimed(props: Props) {
    const { signer, grpcClient, provider } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean | undefined>(undefined);

    interface FormType {
        address: string;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });
    const [address] = useWatch({
        control: control,
        name: ['address'],
    });

    async function onSubmit() {
        setError(undefined);
        setSuccessfulSubmission(undefined);

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
                SCHEMA_SET_CLAIMED_MESSAGE,
                [address],
                signer,
                provider,
            );

            await setClaimed(signer, signature, recentBlockHeight, address);
            setSuccessfulSubmission(true);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered text-white">Set Claimed</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            {...register('address', { required: true, validate: validateAccountAddress })}
                            placeholder="4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA"
                        />
                        {formState.errors.address && (
                            <Alert variant="info">Address is required. {formState.errors.address.message}</Alert>
                        )}
                        <Form.Text />
                    </Form.Group>

                    <Button className="bg-theme text-black" type="submit">
                        Set Claimed
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <br />

                    {successfulSubmission && <Alert variant="info">Success</Alert>}
                </Form>
            </div>
        </div>
    );
}

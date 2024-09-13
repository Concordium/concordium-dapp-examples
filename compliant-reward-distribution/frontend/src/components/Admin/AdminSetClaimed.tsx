import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getARecentBlockHash, requestSignature, setClaimed, validateAccountAddress } from '../../utils';
import { WalletProvider } from '../../wallet-connection';
import { SCHEMA_SET_CLAIMED_MESSAGE } from '../../constants';

interface Props {
    provider: WalletProvider | undefined;
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function AdminSetClaimed(props: Props) {
    const { provider, signer, grpcClient } = props;

    interface FormType {
        address: string;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [address] = useWatch({
        control: control,
        name: ['address'],
    });

    const [error, setError] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet.`);
            }

            const [recentBlockHash, recentBlockHeight] = await getARecentBlockHash(grpcClient);

            const signature = await requestSignature(recentBlockHash, SCHEMA_SET_CLAIMED_MESSAGE, [address], signer, provider);

            await setClaimed(signer, signature, recentBlockHeight, address);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Set Claimed</h2>
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

                    <Button variant="primary" type="submit">
                        Set Claimed
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </div>
        </div>
    );
}

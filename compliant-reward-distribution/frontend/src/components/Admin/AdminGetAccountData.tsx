import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import JSONbig from 'json-bigint';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getRecentBlock, requestSignature, validateAccountAddress } from '../../utils';
import { WalletProvider } from '../../wallet-connection';
import { SCHEMA_GET_ACCOUNT_DATA_MESSAGE } from '../../constants';
import { getAccountData } from '../../apiReqeuests';

interface Props {
    signer: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function AdminGetAccountData(props: Props) {
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
    const [accountData, setAccountData] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);
        setAccountData(undefined);

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet.`);
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);
            const signature = await requestSignature(
                recentBlockHash,
                SCHEMA_GET_ACCOUNT_DATA_MESSAGE,
                address,
                signer,
                provider,
            );

            const data = await getAccountData(signer, address, signature, recentBlockHeight);
            setAccountData(JSONbig.stringify(data));
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Get Account Data</h2>
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
                        Get Account Data
                    </Button>

                    <br />
                    {accountData && <pre className="pre">{JSON.stringify(JSON.parse(accountData), undefined, 2)}</pre>}

                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </div>
        </div>
    );
}
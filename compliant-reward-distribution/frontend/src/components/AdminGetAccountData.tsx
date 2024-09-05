import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { getAccountData, getARecentBlockHash, validateAccountAddress } from '../utils';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import JSONbig from 'json-bigint';

interface Props {
    signer: string | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function AdminGetAccountData(props: Props) {
    const { signer, grpcClient } = props;

    interface FormType {
        address: string | undefined;
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

        if (!address) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        if (!signer) {
            setError(`'signer' is undefined. Connect your wallet.`);
            throw Error(`'signer' is undefined. Connect your wallet.`);
        }

        try {
            const [recentBlockHash, recentBlockHeight] = await getARecentBlockHash(grpcClient);
            console.log(recentBlockHash);
            // TODO: add signature generation

            const data = await getAccountData(
                signer,
                address,
                'c4bb83e7d7a9e6fe7a1b5f527174f7e368db9385b25fce0f4e4b7190781e57b5de6ad65a7481f1038f859d4c4ba8c07ed649b84f9e3c17e2bbdb87cf527cd602',
                recentBlockHeight,
            );
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
                    <Button variant="secondary" type="submit">
                        Get Account Data
                    </Button>
                </Form>
                <br />
                {error && <Alert variant="danger">{error}</Alert>}
            </div>

            {accountData && (
                <div className="card">
                    <pre className="pre">{JSON.stringify(JSON.parse(accountData), undefined, 2)}</pre>
                </div>
            )}
        </div>
    );
}

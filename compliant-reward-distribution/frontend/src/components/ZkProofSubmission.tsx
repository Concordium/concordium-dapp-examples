import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

import { WalletProvider } from '../../wallet-connection';

interface Props {
    accountAddress: string | undefined;
    provider: WalletProvider | undefined;
}

export function ZkProofSubmission(props: Props) {
    const { provider } = props;

    interface FormType {
        zkStatement: JSON | undefined;
    }
    const { control, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [zkStatement] = useWatch({
        control: control,
        name: ['zkStatement'],
    });

    const [error, setError] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);

        if (zkStatement === undefined) {
            setError(`'statement' input field is undefined`);
            throw Error(`'statement' input field is undefined`);
        }

        if (provider === undefined) {
            setError(`'provider' is undefined`);
            throw Error(`'provider' is undefined`);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Submit ZK Proof</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* <Form.Group className="col mb-3">
                        <Form.Label>ZK statement</Form.Label>
                        <Form.Control {...register('zkStatement', { required: true })} placeholder="Enter metadata URL" />
                        {formState.errors.zkStatement && <Alert variant="info"> ZK statement is required </Alert>}
                        <Form.Text />
                    </Form.Group> */}
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
            </div>
        </div>
    );
}

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

export function AdminGetPendingApprovals() {
    interface FormType {
        address: string | undefined;
    }
    const { control, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [address] = useWatch({
        control: control,
        name: ['address'],
    });

    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (!address) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
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
        </div>
    );
}

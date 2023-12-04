import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { viewItemState } from 'src/reading_from_blockchain';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';

interface ConnectionProps {
    grpcClient: ConcordiumGRPCClient | undefined;
}

/* A component that manages the input fields and corresponding state to update a smart contract instance on the chain.
 * This components creates an `Update` transaction.
 */
export default function ViewItem(props: ConnectionProps) {
    const { grpcClient } = props;

    const [itemState, setItemState] = useState('');
    const [itemStateError, setItemStateError] = useState<string | undefined>(undefined);

    type FormType = {
        itemIndex: string;
    };
    const form = useForm<FormType>({ mode: 'all' });

    function onSubmit(data: FormType) {
        setItemStateError(undefined);
        setItemState('');

        if (grpcClient) {
            viewItemState(grpcClient, data.itemIndex)
                .then((returnValue) => {
                    if (returnValue !== undefined) {
                        setItemState(JSON.stringify(returnValue));
                    }
                })
                .catch((e) => {
                    setItemStateError((e as Error).message);
                });
        }
    }

    return (
        <>
            <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Label>Step 3: View your item</Form.Label>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Item Index</Form.Label>
                    <Form.Control {...form.register('itemIndex', { required: true })} />
                    {form.formState.errors.itemIndex && (
                        <Alert key="info" variant="info">
                            {' '}
                            Item Index is required{' '}
                        </Alert>
                    )}
                    <Form.Text />
                </Form.Group>
                <Button variant="primary" type="submit">
                    View item
                </Button>
            </Form>

            {itemState && (
                <div>
                    Item state:
                    <pre>{JSON.stringify(JSON.parse(itemState), undefined, 2)}</pre>
                </div>
            )}
            {itemStateError && <div style={{ color: 'red' }}>Error: {itemStateError}.</div>}
        </>
    );
}

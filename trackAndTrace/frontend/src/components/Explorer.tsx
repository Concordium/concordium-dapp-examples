import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

/**
 * This function gets the historical ItemStatusChangedEvents for a given itemID.
 * Note: For simplicity of this demo dapp, pagination is currently hardcoded at the backend.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including a vector of historical ItemStatusChangedEvents.
 */
export async function getItemStatusChangedEvents(itemID: number) {
    const response = await fetch(`api/getItemStatusChangedEvents`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(Number(itemID)),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get item's change status events: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as string;
    if (body) {
        return body;
    }
    throw new Error("Unable to get item's change status events");
}

export function Explorer() {
    type FormType = {
        itemID: number | undefined;
    };
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [itemID] = useWatch({
        control: control,
        name: ['itemID'],
    });

    const [info, setInfo] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setInfo(undefined);

        if (itemID === undefined) {
            throw Error('itemID undefined');
        }

        let data = await getItemStatusChangedEvents(itemID);

        setInfo(JSON.stringify(data));
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Track The Journey Of Your Products</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Item ID</Form.Label>
                        <Form.Control
                            {...register('itemID', { required: true })}
                            placeholder="Enter the tracking number ID"
                        />
                        {formState.errors.itemID && <Alert variant="info"> Item ID is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Search for Product Journey
                    </Button>
                    {info && <Alert variant="info">{info}</Alert>}
                </Form>
            </div>
        </div>
    );
}

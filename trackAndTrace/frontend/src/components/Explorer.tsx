import { Dispatch, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import * as constants from '../constants';

interface ChangeItem {
    block_time: string;
    transaction_hash: string;
    new_status: string;
    additional_data: { bytes: number[] };
    event_index: number;
    item_id: number;
}

interface CreateItem {
    block_time: string;
    transaction_hash: string;
    event_index: number;
    initial_status: string;
}

/**
 * This function gets the historical ItemStatusChangedEvents for a given itemID.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including a vector of historical ItemStatusChangedEvents.
 */
async function getItemStatusChangedEvents(itemID: number, setItemChanged: Dispatch<ChangeItem[]>) {
    const response = await fetch(`api/getItemStatusChangedEvents`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            item_id: itemID,
            limit: 30,
            offset: 0,
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get item's change status events: ${JSON.stringify(error)}`);
    }
    const dataItemChanged = await response.json();
    if (dataItemChanged) {
        setItemChanged(dataItemChanged.data);
    } else {
        throw new Error(`Unable to get item's change status events`);
    }
}

/**
 * This function gets the historical ItemCreatedEvent for a given itemID.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including an option of the historical ItemCreateEvent.
 */
async function getItemCreatedEvent(itemID: number, setItemCreated: Dispatch<CreateItem>) {
    const response = await fetch(`api/getItemCreatedEvent`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(itemID),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get item's create event: ${JSON.stringify(error)}`);
    }
    const dataItemCreated = await response.json();
    if (dataItemCreated) {
        if (dataItemCreated.data) {
            setItemCreated(dataItemCreated.data);
        } else {
            throw new Error(`Item not found in database.`);
        }
    } else {
        throw new Error(`Unable to get item's create event`);
    }
}

export function Explorer() {
    interface FormType {
        itemID: number | undefined;
    }
    const { control, register, formState, handleSubmit, setValue } = useForm<FormType>({ mode: 'all' });

    const [itemID] = useWatch({
        control: control,
        name: ['itemID'],
    });

    const [itemChanged, setItemChanged] = useState<ChangeItem[] | undefined>(undefined);
    const [itemCreated, setItemCreated] = useState<CreateItem | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);
        setItemChanged(undefined);
        setItemCreated(undefined);

        if (itemID === undefined) {
            setError(`'itemID' input field is undefined`);
            throw Error(`'itemID' input field is undefined`);
        }

        try {
            await getItemCreatedEvent(itemID, setItemCreated);
            await getItemStatusChangedEvents(itemID, setItemChanged);
        } catch (error) {
            setError(`Couldn't get data from database. Orginal error: ${(error as Error).message}`);
        }
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
                            type="number"
                            placeholder="Enter the tracking number ID"
                            onChange={(e) => {
                                setValue('itemID', parseInt(e.target.value));
                            }}
                        />
                        {formState.errors.itemID && <Alert variant="info"> Item ID is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Search for Product Journey
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
                {itemChanged !== undefined && itemCreated !== undefined && (
                    <>
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Transaction Hash</th>
                                    <th>New Status</th>
                                </tr>
                            </thead>
                            <tbody id="table">
                                <tr>
                                    <td>{new Date(itemCreated.block_time).toLocaleString()}</td>
                                    <td>
                                        <a
                                            className="link"
                                            target="_blank"
                                            rel="noreferrer"
                                            href={`${constants.CCD_SCAN_URL}/?dcount=1&dentity=transaction&dhash=${itemCreated.transaction_hash}`}
                                        >
                                            {itemCreated.transaction_hash.slice(0, 5)}...
                                            {itemCreated.transaction_hash.slice(-5)}
                                        </a>
                                    </td>
                                    <td>{itemCreated.initial_status}</td>
                                </tr>

                                {itemChanged.map((event: ChangeItem, parentIndex) => {
                                    return (
                                        <tr key={parentIndex}>
                                            <td>{new Date(event.block_time).toLocaleString()}</td>
                                            <td>
                                                <a
                                                    className="link"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`${constants.CCD_SCAN_URL}/?dcount=1&dentity=transaction&dhash=${event.transaction_hash}`}
                                                >
                                                    {event.transaction_hash.slice(0, 5)}...
                                                    {event.transaction_hash.slice(-5)}
                                                </a>
                                            </td>
                                            <td>{event.new_status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

/**
 * This function gets the historical ItemStatusChangedEvents for a given itemID.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including a vector of historical ItemStatusChangedEvents.
 */
export async function getItemStatusChangedEvents(itemID: number) {
    const response = await fetch(`api/getItemStatusChangedEvents`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            item_id: Number(itemID),
            limit: 30,
            offset: 0,
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get item's change status events: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as string;
    if (body) {
        return body;
    }
    throw new Error(`Unable to get item's change status events`);
}

/**
 * This function gets the historical ItemCreatedEvent for a given itemID.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including an option of the historical ItemCreateEvent.
 */
export async function getItemCreatedEvent(itemID: number) {
    const response = await fetch(`api/getItemCreatedEvent`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(Number(itemID)),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get item's created event: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as string;
    if (body) {
        return body;
    }
    throw new Error(`Unable to get item's created event`);
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

    const [isDataFetched, setIsDataFetched] = useState(false);

    // Function to render item changed data into the table
    function renderItemChangedData(data: any) {
        const tableBody = document.getElementById('table');
        if (tableBody) {
            data.data.forEach((event: any) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(event.block_time).toLocaleString()}</td>
                    <td>
                        <a class="link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${event.transaction_hash}">
                            ${event.transaction_hash.slice(0, 5)}...${event.transaction_hash.slice(-5)}
                        </a>
                    </td>
                    <td>${event.new_status}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    // Function to render item created data into the table
    function renderItemCreatedData(data: any) {
        const tableBody = document.getElementById('table');
        let event = data.data;

        if (tableBody) {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${new Date(event.block_time).toLocaleString()}</td>
            <td>
                <a class="link"
                   target="_blank"
                   rel="noreferrer"
                   href="https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${event.transaction_hash}">
                   ${event.transaction_hash.slice(0, 5)}...${event.transaction_hash.slice(-5)}
                </a>
            </td>
            <td>Created</td>
        `;
            tableBody.appendChild(row);
        }
    }

    async function onSubmit() {
        setIsDataFetched(false);

        if (itemID === undefined) {
            throw Error('itemID undefined');
        }

        setIsDataFetched(true);

        // Clear table.
        const tableBody = document.getElementById('table');
        if (tableBody) {
            tableBody.innerHTML = '';
        }

        let dataItemCreated = await getItemCreatedEvent(itemID);
        renderItemCreatedData(dataItemCreated);

        let dataItemChanged = await getItemStatusChangedEvents(itemID);
        renderItemChangedData(dataItemChanged);
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
                        />
                        {formState.errors.itemID && <Alert variant="info"> Item ID is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Search for Product Journey
                    </Button>
                </Form>

                {isDataFetched && (
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
                            <tbody id="table"></tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

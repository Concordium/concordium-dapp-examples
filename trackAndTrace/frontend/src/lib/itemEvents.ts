import { Dispatch } from 'react';

export type ItemStatus = 'Produced' | 'InTransit' | 'InStore' | 'Sold';

export interface ChangeItem {
    block_time: string;
    transaction_hash: string;
    event_index: number;
    item_id: number;
    metadata_url: { hash: string | null; url: string } | null;
    new_status: ItemStatus;
    additional_data: { bytes: number[] };
}

export interface CreateItem {
    block_time: string;
    transaction_hash: string;
    event_index: number;
    item_id: number;
    metadata_url: { hash: string | null; url: string } | null;
    initial_status: ItemStatus;
    additional_data: { bytes: number[] };
}

/**
 * This function gets the historical ItemStatusChangedEvents for a given itemID.
 *
 * @param itemID - The itemID.
 * @throws If the server responds with an error or the response of the server is malformed.
 * @returns A json object including a vector of historical ItemStatusChangedEvents.
 */
export async function getItemStatusChangedEvents(itemID: number, setItemChanged: Dispatch<ChangeItem[]>) {
    const response = await fetch(`http://localhost:8080/api/getItemStatusChangedEvents`, {
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
export async function getItemCreatedEvent(itemID: number, setItemCreated: Dispatch<CreateItem>) {
    const response = await fetch(`http://localhost:8080/api/getItemCreatedEvent`, {
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

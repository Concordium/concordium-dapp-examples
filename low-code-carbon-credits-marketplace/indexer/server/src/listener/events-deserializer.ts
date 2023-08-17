import { deserializeEventValue } from 'server-rust-bindings';
import { toContractNameFromInitName, toContractNameFromReceiveName } from '../utils';

export const deserializeUpdateContractEvents = (
    contractEvents: string[],
    schema: string,
    receiveName: string
): unknown[] => {
    return deserializeContractEvents(contractEvents, schema, toContractNameFromReceiveName(receiveName));
};

export const deserializeInitContractEvents = (
    contractEvents: string[],
    schema: string,
    initName: string
): unknown[] => {
    return deserializeContractEvents(contractEvents, schema, toContractNameFromInitName(initName));
};

export const deserializeContractEvents = (
    contractEvents: string[],
    schema: string,
    contractName: string
): unknown[] => {
    return contractEvents.map((e) => deserializeContractEvent(e, schema, contractName));
};

const deserializeContractEvent = (contractEvent: string, schema: string, contractName: string): unknown => {
    const schemaHex = Buffer.from(schema, 'base64').toString('hex');
    const eventJson = deserializeEventValue(contractEvent, schemaHex, contractName);

    // If an error os thrown here. It means there is some issue with the deserialization.
    return JSON.parse(eventJson);
};

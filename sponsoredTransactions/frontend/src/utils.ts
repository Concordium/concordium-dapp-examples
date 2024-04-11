/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { createContext } from 'react';
import { AccountTransactionType, CcdAmount, UpdateContractPayload } from '@concordium/web-sdk';
import { WalletConnection, typeSchemaFromBase64 } from '@concordium/react-components';
import { SPONSORED_TX_CONTRACT_NAME, CONTRACT_SUB_INDEX, MINT_PARAMETER_SCHEMA } from './constants';

/**
 * Send update operator signature to backend.
 */
export async function submitUpdateOperator(
    backend: string,
    signer: string,
    nonce: string,
    signature: string,
    expiryTimeSignature: string,
    operator: string,
    addOperator: boolean,
): Promise<TxHashResponse> {
    if (signer === '') {
        alert('Insert a signer address.');
        throw new Error('Insert a signer address.');
    }

    if (signer.length !== 50) {
        alert('Signer address needs to have 50 digits.');
        throw new Error('Signer address needs to have 50 digits.');
    }

    if (nonce === '') {
        alert('Insert a nonce.');
        throw new Error('Insert a nonce.');
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        throw new Error('Your nonce needs to be a number.');
    }

    if (signature === '') {
        throw new Error('Insert a signature.');
    }

    if (signature.length !== 128) {
        throw new Error('Signature needs to have 128 digits.');
    }

    if (operator === '') {
        throw new Error('Insert an operator address.');
    }

    if (operator.length !== 50) {
        throw new Error('Operator address needs to have 50 digits.');
    }

    const response = await fetch(`${backend}/submitUpdateOperator`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),

        body: JSON.stringify({
            signer,
            nonce: Number(nonce),
            signature,
            operator,
            add_operator: addOperator,
            timestamp: expiryTimeSignature,
        }),
    });
    if (!response.ok) {
        const error = (await response.json()) as unknown;
        throw new Error(`Unable to submit update operator: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as TxHashResponse;
    if (body) {
        return body;
    }
    throw new Error('Unable to submit update operator');
}

/**
 * Send transfer signature to backend.
 */
export async function submitTransfer(
    backend: string,
    signer: string,
    nonce: string,
    signature: string,
    expiryTimeSignature: string,
    tokenID: string,
    from: string,
    to: string,
): Promise<TxHashResponse> {
    if (signer === '') {
        throw new Error('Insert an signer address.');
    }

    if (signer.length !== 50) {
        throw new Error('Signer address needs to have 50 digits.');
    }

    if (nonce === '') {
        throw new Error('Insert a nonce.');
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        throw new Error('Your nonce needs to be a number.');
    }

    if (signature === '') {
        throw new Error('Insert a signature.');
    }

    if (signature.length !== 128) {
        throw new Error('Signature needs to have 128 digits.');
    }

    if (tokenID === '') {
        throw new Error('Insert a tokenID.');
    }

    if (tokenID.length !== 8) {
        throw new Error('TokenID needs to have 8 digits.');
    }

    if (from === '') {
        throw new Error('Insert an `from` address.');
    }

    if (from.length !== 50) {
        throw new Error('`From` address needs to have 50 digits.');
    }

    if (to === '') {
        throw new Error('Insert a `to` address.');
    }

    if (to.length !== 50) {
        throw new Error('`To` address needs to have 50 digits.');
    }

    const response = await fetch(`${backend}/submitTransfer`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signer,
            nonce: Number(nonce),
            signature,
            token_id: tokenID,
            from,
            to,
            timestamp: expiryTimeSignature,
        }),
    });
    if (!response.ok) {
        const error = (await response.json()) as unknown;
        throw new Error(`Unable to submit transfer: ${JSON.stringify(error)}`);
    }
    const body = (await response.json()) as TxHashResponse;
    if (body) {
        return body;
    }
    throw new Error('Unable to submit transfer');
}

/**
 * Action for minting a token to the user's account.
 */
export async function mint(connection: WalletConnection, account: string) {
    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0n)),
            address: {
                index: BigInt(Number(process.env.SMART_CONTRACT_INDEX)),
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME}.mint`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,

        {
            parameters: {
                owner: { Account: [account] },
            },
            schema: typeSchemaFromBase64(MINT_PARAMETER_SCHEMA),
        },
    );
}

/**
 * Global application state.
 */
export interface State {
    isConnected: boolean;
    account: string | undefined;
}

export const state = createContext<State>({ isConnected: false, account: undefined });

export interface TxHashResponse {
    tx_hash: string;
}

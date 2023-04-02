/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { createContext } from 'react';
import { AccountTransactionType, CcdAmount, UpdateContractPayload } from '@concordium/web-sdk';
import { WalletConnection } from '@concordium/react-components';
import {
    SPONSORED_TX_CONTRACT_NAME,
    SPONSORED_TX_CONTRACT_INDEX,
    CONTRACT_SUB_INDEX,
    SPONSORED_TX_RAW_SCHEMA,
    EXPIRY_TIME_SIGNATURE,
} from './constants';

/**
 * Send update operator signature to backend.
 */
export async function submitUpdateOperator(backend: string, signer: string, nonce: string, signature: string, operator: string, addOperator: boolean) {

    if (signer === undefined || signer === '') {
        alert('Insert an signer address.');
        return '';
    }

    if (signer.length !== 50) {
        alert('Signer address needs to have 50 digits.');
        return '';
    }

    if (nonce === undefined || nonce === '') {
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (signature === undefined || signature === '') {
        alert('Insert a signature.');
        return '';
    }

    if (signature.length !== 128) {
        alert('Signature needs to have 128 digits.');
        return '';
    }

    if (operator === undefined || operator === '') {
        alert('Insert an operator address.');
        return '';
    }

    if (operator.length !== 50) {
        alert('Operator address needs to have 50 digits.');
        return '';
    }

    const expiryTimeSignature = new Date(Date.parse(EXPIRY_TIME_SIGNATURE));

    const response = await fetch(`${backend}/submitUpdateOperator`, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ signer, nonce, signature, operator, add_operator: addOperator, timestamp: expiryTimeSignature.getTime().toString() }),
    });
    if (!response.ok) {
        throw new Error('Unable to submit');
    }
    const body = await response.json();
    if (body) {
        return body;
    }
    throw new Error('Unable to submit update operator');
}

/**
 * Send transfer signature to backend.
 */
export async function submitTransfer(backend: string,
    signer: string,
    nonce: string,
    signature: string,
    tokenID: string,
    from: string,
    to: string) {

    if (signer === undefined || signer === '') {
        alert('Insert an signer address.');
        return '';
    }

    if (signer.length !== 50) {
        alert('Signer address needs to have 50 digits.');
        return '';
    }

    if (nonce === undefined || nonce === '') {
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (signature === undefined || signature === '') {
        alert('Insert a signature.');
        return '';
    }

    if (signature.length !== 128) {
        alert('Signature needs to have 128 digits.');
        return '';
    }

    if (tokenID === undefined || tokenID === '') {
        alert('Insert a tokenID.');
        return '';
    }

    if (tokenID.length !== 8) {
        alert('TokenID needs to have 8 digits.');
        return '';
    }

    if (from === undefined || from === '') {
        alert('Insert an `from` address.');
        return '';
    }

    if (from.length !== 50) {
        alert('`From` address needs to have 50 digits.');
        return '';
    }

    if (to === undefined || to === '') {
        alert('Insert an `to` address.');
        return '';
    }

    if (to.length !== 50) {
        alert('`To` address needs to have 50 digits.');
        return '';
    }

    const expiryTimeSignature = new Date(Date.parse(EXPIRY_TIME_SIGNATURE));

    const response = await fetch(`${backend}/submitTransfer`, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ signer, nonce, signature, token_id: tokenID, from, to, timestamp: expiryTimeSignature.getTime().toString() }),
    });
    if (!response.ok) {
        throw new Error('Unable to submit');
    }
    const body = await response.json();
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
                index: SPONSORED_TX_CONTRACT_INDEX,
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME}.mint`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
            owner: { Account: [account] },
        },
        SPONSORED_TX_RAW_SCHEMA
    );
}

/**
 * Action for registering a public key in the cis3_nft smart contract instance.
 */
export async function register(connection: WalletConnection, account: string, publicKey: string) {

    if (publicKey === undefined || publicKey === '') {
        alert('Insert a public key.');
        return '';
    }

    if (publicKey.length !== 64) {
        alert('Public key needs to have 64 digits.');
        return '';
    }

    const publicKeyLowerCase = publicKey.toLowerCase();

    return connection.signAndSendTransaction(
        account,
        AccountTransactionType.Update,
        {
            amount: new CcdAmount(BigInt(0n)),
            address: {
                index: SPONSORED_TX_CONTRACT_INDEX,
                subindex: CONTRACT_SUB_INDEX,
            },
            receiveName: `${SPONSORED_TX_CONTRACT_NAME}.registerPublicKeys`,
            maxContractExecutionEnergy: 30000n,
        } as unknown as UpdateContractPayload,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [
            [
                {
                    account,
                    public_key: publicKeyLowerCase,
                },
            ],
        ],
        SPONSORED_TX_RAW_SCHEMA
    );
}

/**
 * Global application state.
 */
export type State = {
    isConnected: boolean;
    account: string | undefined;
};

export const state = createContext<State>({ isConnected: false, account: undefined });

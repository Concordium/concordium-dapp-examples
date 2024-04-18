import { Timestamp } from '@concordium/web-sdk';
import * as Contract from '../generated/module_smart_contract_wallet';
import { Hex, signMessage } from './keys';
import JSONBig from 'json-bigint';
import { Buffer } from 'buffer/';
import { client, createTokenAmount, getNonce } from './contract';

const EXPIRY_OFFSET_MS = 1000 * 60 * 5; // 5 minutes

/**
 * Matches the `InputParams` type from the server side
 */
type TransferRequest = {
    fromPublicKey: Hex;
    toPublicKey: Hex;
    nonce: bigint;
    signature: Hex;
    expiryTime: bigint;
    tokenAmount: bigint;
};

/**
 * Send a transfer to the server
 *
 * @param amount - the amount to transfer
 * @param to - the receiver smart contract wallet
 */
export async function transfer(amount: bigint, to: Hex): Promise<void> {
    const [pubKey, nonce] = await getNonce();
    const expiryTime = BigInt(new Date().getTime() + EXPIRY_OFFSET_MS);
    const message: Contract.ViewInternalTransferMessageHashTokenAmountParameter = {
        entry_point: 'internalTransferCis2Tokens',
        nonce,
        expiry_time: Timestamp.fromMillis(expiryTime),
        service_fee_recipient: pubKey,
        service_fee_amount: createTokenAmount(0),
        simple_transfers: [{ to, transfer_amount: createTokenAmount(amount) }],
    };

    const messageHashResult = await Contract.dryRunViewInternalTransferMessageHashTokenAmount(await client, message);
    const messageHash = Contract.parseReturnValueViewInternalTransferMessageHashTokenAmount(messageHashResult);

    if (messageHash === undefined) {
        throw new Error('Failed to get parameter from contract');
    }

    const transfer: TransferRequest = {
        fromPublicKey: pubKey,
        toPublicKey: to,
        signature: Buffer.from(await signMessage(Buffer.from(messageHash).toString('hex'))).toString('hex'),
        nonce,
        expiryTime,
        tokenAmount: amount,
    };
    const response = fetch(`/api/submitTransaction`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSONBig.stringify(transfer),
    });

    console.log(response);
}

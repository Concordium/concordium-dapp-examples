import { ConcordiumGRPCWebClient, ContractAddress, Timestamp } from '@concordium/web-sdk';
import * as Contract from '../generated/module_smart_contract_wallet';
import { CONTRACT_ADDRESS, NODE_HOST, NODE_PORT, SPONSORED_TRANSACTION_BACKEND } from './constants';
import { Hex, getPublicKey, signMessage } from './keys';
import JSONBig from 'json-bigint';

const grpc = new ConcordiumGRPCWebClient(NODE_HOST, NODE_PORT);
const contract = Contract.create(grpc, CONTRACT_ADDRESS);

const TOKEN_ID = ''; // EUROe token ID
const TOKEN_ADDRESS = ContractAddress.create(7260, 0); // EUROe contract address

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

const createTokenAmount = (
    amount: bigint | number,
): Contract.ViewInternalTransferMessageHashTokenAmountParameter['service_fee_amount'] => ({
    token_amount: amount,
    token_id: TOKEN_ID,
    cis2_token_contract_address: TOKEN_ADDRESS,
});

async function getNonce(): Promise<[Hex, bigint]> {
    const pubKey = Buffer.from(await getPublicKey()).toString('hex');
    const nonce = Contract.parseReturnValueNonceOf(await Contract.dryRunNonceOf(await contract, [pubKey]));

    if (nonce?.[0] === undefined) {
        throw new Error('Failed to get nonce for key');
    }

    return [pubKey, BigInt(nonce[0])];
}

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

    const messageHashResult = await Contract.dryRunViewInternalTransferMessageHashTokenAmount(await contract, message);
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
    const response = fetch(`${SPONSORED_TRANSACTION_BACKEND}/api/submitTransaction`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSONBig.stringify(transfer),
    });

    console.log(response);
}

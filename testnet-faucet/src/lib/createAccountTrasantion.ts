import {
    AccountAddress,
    AccountTransaction,
    AccountTransactionHeader,
    AccountTransactionType,
    CcdAmount,
    NextAccountNonce,
    TransactionExpiry,
} from '@concordium/web-sdk';
import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';

export default async function createAccountTransaction(
    client: ConcordiumGRPCNodeClient,
    sender: string,
    receiver: string,
): Promise<AccountTransaction> {
    const { CCD_DEFAULT_AMOUNT } = process.env;
    if (!CCD_DEFAULT_AMOUNT) {
        throw new Error('CCD_DEFAULT_AMOUNT env var undefined');
    }
    const senderAddress = AccountAddress.fromBase58(sender);
    const nextNonce: NextAccountNonce = await client.getNextAccountNonce(senderAddress);
    const toAddress = AccountAddress.fromBase58(receiver);

    const header: AccountTransactionHeader = {
        expiry: TransactionExpiry.futureMinutes(60),
        nonce: nextNonce.nonce,
        sender: senderAddress,
    };
    const simpleTransfer = {
        amount: CcdAmount.fromMicroCcd(CCD_DEFAULT_AMOUNT),
        toAddress,
    };
    return {
        header: header,
        payload: simpleTransfer,
        type: AccountTransactionType.Transfer,
    };
}

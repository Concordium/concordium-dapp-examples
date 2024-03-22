import { Result, ResultAsync } from 'neverthrow';
import { resultFromTruthy, resultFromTruthyResult } from './util';
import { WalletApi } from '@concordium/browser-wallet-api-helpers';

export async function sign(client: WalletApi, account: string, message: string) {
    return JSON.stringify(await client.signMessage(account, message));
}

// TODO Replace this crap with wrapper of 'client.sendTransaction' and just use that instead...
export function wrapPromise<C, S>(send: (client: C, session: S) => Promise<string>) {
    return (client: C, session: S) => ResultAsync.fromPromise(send(client, session), (e) => (e as Error).message);
}

export function trySendTransaction(
    client: Result<WalletApi, string> | undefined,
    account: string | undefined,
    send: (client: WalletApi, account: string) => ResultAsync<string, string>,
) {
    return Result.combine<[Result<WalletApi, string>, Result<string, string>]>([
        resultFromTruthyResult(client, 'not initialized'),
        resultFromTruthy(account, 'no account connected'),
    ])
        .asyncAndThen(([client, account]) => send(client, account))
        .map((txHash) => {
            alert(txHash);
            return txHash;
        });
}

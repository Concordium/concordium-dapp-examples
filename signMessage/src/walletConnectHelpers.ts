import SignClient from '@walletconnect/sign-client';
import { Result, ResultAsync } from 'neverthrow';
import { resultFromTruthy, resultFromTruthyResult } from './util';
import { WALLET_CONNECT_SESSION_NAMESPACE } from './config';
import { SessionTypes } from '@walletconnect/types';

export function resolveAccount(session: SessionTypes.Struct) {
    const fullAddress = session.namespaces[WALLET_CONNECT_SESSION_NAMESPACE].accounts[0];
    return fullAddress.substring(fullAddress.lastIndexOf(':') + 1);
}

interface SignAndSendTransactionError {
    code: number;
    message: string;
}

function isSignAndSendTransactionError(obj: object): obj is SignAndSendTransactionError {
    return 'code' in obj && 'message' in obj;
}

export async function signMessage(
    signClient: SignClient,
    session: SessionTypes.Struct,
    chainId: string,
    message: string,
) {
    try {
        const signature = await signClient.request({
            topic: session.topic,
            request: {
                method: 'sign_message',
                params: {
                    message,
                },
            },
            chainId,
        });
        return JSON.stringify(signature);
    } catch (e) {
        const err = e as object;
        if (isSignAndSendTransactionError(err) && err.code === 5000) {
            throw new Error('transaction rejected in wallet');
        }
        throw e;
    }
}

export function trySend(
    client: Result<SignClient, string> | undefined,
    session: SessionTypes.Struct | undefined,
    send: (client: SignClient, session: SessionTypes.Struct) => ResultAsync<string, string>,
) {
    return Result.combine<[Result<SignClient, string>, Result<SessionTypes.Struct, string>]>([
        resultFromTruthyResult(client, 'not initialized'),
        resultFromTruthy(session, 'no session connected'),
    ]).asyncAndThen(([client, account]) => send(client, account));
}

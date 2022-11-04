import {Alert, Button} from "react-bootstrap";
import {WalletApi} from "@concordium/browser-wallet-api-helpers";
import {Result, ResultAsync} from "neverthrow";
import {resultFromTruthy, resultFromTruthyResult} from "./util";

interface Props {
    client: WalletApi,
    connectedAccount: string | undefined;
    setConnectedAccount: (a: string | undefined) => void;
}

async function connect(client: WalletApi, setConnectedAccount: (a: string | undefined) => void) {
    const account = await client.connect();
    return setConnectedAccount(account);
}

export async function sign(client: WalletApi, account: string, message: string) {
    return JSON.stringify(await client.signMessage(account, message));
}

// TODO Replace this crap with wrapper of 'client.sendTransaction' and just use that instead...
export function wrapPromise<C, S>(send: (client: C, session: S) => Promise<string>) {
    return (client: C, session: S) =>
        ResultAsync.fromPromise(
            send(client, session),
            e => (e as Error).message,
        );
}

export function trySendTransaction(client: Result<WalletApi, string> | undefined, account: string | undefined, send: (client: WalletApi, account: string) => ResultAsync<string, string>) {
    return Result.combine<[Result<WalletApi, string>, Result<string, string>]>([
        resultFromTruthyResult(client, "not initialized"),
        resultFromTruthy(account, "no account connected"),
    ])
        .asyncAndThen(
            ([client, account]) => send(client, account),
        )
        .map(txHash => {
            alert(txHash);
            return txHash;
        })
}

export default function BrowserWallet(props: Props) {
    const {client, connectedAccount, setConnectedAccount} = props;

    return (
        <>
            {connectedAccount && (
                <>
                    <Alert variant="success">
                        <p>
                            Connected to account <code>{connectedAccount}</code>.
                        </p>
                        <p>
                            The wallet currently only exposes the "most recently selected" connected account,
                            even if more than one is actually connected.
                            Select and disconnect accounts through the wallet.
                        </p>
                    </Alert>
                </>
            )}
            {!connectedAccount && (
                <>
                    <p>No wallet connection</p>
                    <Button onClick={() => connect(client, setConnectedAccount).catch(console.error)}>
                        Connect
                    </Button>
                </>
            )}
        </>
    );
}

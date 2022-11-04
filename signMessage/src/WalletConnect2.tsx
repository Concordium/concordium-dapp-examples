import SignClient from "@walletconnect/sign-client";
import {Alert, Button} from "react-bootstrap";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {SessionTypes} from "@walletconnect/types";
import {Result, ResultAsync} from "neverthrow";
import {resultFromTruthy, resultFromTruthyResult} from "./util";
import {
    JsonRpcClient,
} from "@concordium/web-sdk";
import {CHAIN_ID, WALLET_CONNECT_SESSION_NAMESPACE} from "./config";

async function connect(client: SignClient, setConnectedSession: (session: SessionTypes.Struct) => void) {
    try {
        const {uri, approval} = await client.connect({
            requiredNamespaces: {
                ccd: {
                    methods: [
                        'sign_message',
                    ],
                    chains: [CHAIN_ID],
                    events: ['chain_changed', 'accounts_changed'],
                },
            },
        });

        // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
        if (uri) {
            console.log('opening QR code modal');
            QRCodeModal.open(uri, () => {
                console.debug('QR code modal closed');
            });
        }

        // Await session approval from the wallet.
        const session = await approval();
        setConnectedSession(session);
    } finally {
        // Close the QRCode modal in case it was open.
        QRCodeModal.close();
    }
}

async function disconnect(client: SignClient, session: SessionTypes.Struct, clearConnectedSession: () => void) {
    const {topic} = session;
    const reason = {code: 1337, message: "something something reason"};
    await client.disconnect({topic, reason})
    clearConnectedSession();
}

export function resolveAccount(session: SessionTypes.Struct) {
    const fullAddress = session.namespaces[WALLET_CONNECT_SESSION_NAMESPACE].accounts[0];
    return fullAddress.substring(fullAddress.lastIndexOf(":") + 1);
}

interface SignAndSendTransactionResult {
    hash: string;
}

interface SignAndSendTransactionError {
    code: number;
    message: string;
}

function isSignAndSendTransactionError(obj: any): obj is SignAndSendTransactionError {
    return 'code' in obj && 'message' in obj;
}

export async function signMessage(signClient: SignClient, session: SessionTypes.Struct, rpcClient: JsonRpcClient, chainId: string, message: string) {
    try {
        const {hash} = await signClient.request({
            topic: session.topic,
            request: {
                method: "sign_message",
                params: {
                    message
                },
            },
            chainId,
        }) as SignAndSendTransactionResult;
        return hash;
    } catch (e) {
        if (isSignAndSendTransactionError(e) && e.code === 5000) {
            throw new Error('transaction rejected in wallet');
        }
        throw e;
    }
}

export function trySend(client: Result<SignClient, string> | undefined, session: SessionTypes.Struct | undefined, send: (client: SignClient, session: SessionTypes.Struct) => ResultAsync<string, string>) {
    return Result.combine<[Result<SignClient, string>, Result<SessionTypes.Struct, string>]>([
        resultFromTruthyResult(client, "not initialized"),
        resultFromTruthy(session, "no session connected"),
    ])
        .asyncAndThen(
            ([client, account]) => send(client, account),
        )
}

interface Props {
    client: SignClient;
    connectedSession?: SessionTypes.Struct;
    setConnectedSession: (session: SessionTypes.Struct | undefined) => void;
    connectionError: string | undefined;
}

export default function WalletConnect2(props: Props) {
    const {client, connectedSession, setConnectedSession, connectionError} = props;

    return (
        <>
            {!connectedSession && (
                <Button onClick={() => connect(client, setConnectedSession).catch(console.error)}>Connect</Button>
            )}
            {connectedSession && (
                <>
                    <Alert variant="success">
                        Connected:
                        <ul>
                            <li>Topic: {connectedSession.topic}</li>
                            <li>Relay protocol: {connectedSession.relay.protocol}</li>
                            <li>Relay data: {connectedSession.relay.data}</li>
                            <li>Expiry: {connectedSession.expiry}</li>
                            <li>Acknowledged: {connectedSession.acknowledged}</li>
                            <li>Controller: {connectedSession.controller}</li>
                            <li>
                                Namespaces:
                                <ul>
                                    {
                                        Object.entries(connectedSession.namespaces).map(
                                            ([key, ns]) => {
                                                return (
                                                    <li key={key}>
                                                        Key: {key}
                                                        Accounts: {ns.accounts.join(", ")}
                                                        Methods: {ns.methods.join(", ")}
                                                        Events: {ns.events.join(", ")}
                                                        Extension: {JSON.stringify(ns.extension)}
                                                    </li>
                                                );
                                            }
                                        )
                                    }
                                </ul>
                            </li>
                            <li>
                                Required namespaces:
                                <ul>
                                    {
                                        Object.entries(connectedSession.requiredNamespaces).map(
                                            ([key, ns]) => {
                                                return (
                                                    <li key={key}>
                                                        Key: {key}
                                                        Chains: {ns.chains.join(", ")}
                                                        Methods: {ns.methods.join(", ")}
                                                        Events: {ns.events.join(", ")}
                                                        Extension: {JSON.stringify(ns.extension)}
                                                    </li>
                                                );
                                            }
                                        )
                                    }
                                </ul>
                            </li>
                            <li>Self public key: {connectedSession.self.publicKey}</li>
                            <li>Self metadata name: {connectedSession.self.metadata.name}</li>
                            <li>Self metadata url: {connectedSession.self.metadata.url}</li>
                            <li>Self metadata icons: {connectedSession.self.metadata.icons.join(", ")}</li>
                            <li>Self metadata description: {connectedSession.self.metadata.description}</li>
                            <li>Peer public key: {connectedSession.peer.publicKey}</li>
                            <li>Peer metadata name: {connectedSession.peer.metadata.name}</li>
                            <li>Peer metadata url: {connectedSession.peer.metadata.url}</li>
                            <li>Peer metadata icons: {connectedSession.peer.metadata.icons.join(", ")}</li>
                            <li>Peer metadata description: {connectedSession.peer.metadata.description}</li>
                        </ul>
                    </Alert>
                    {connectionError && (
                        <Alert variant="danger">
                            Ping error: {connectionError}
                        </Alert>
                    )}
                    <Button
                        onClick={
                            () =>
                                disconnect(
                                    client,
                                    connectedSession,
                                    () => setConnectedSession(undefined),
                                )
                                    .catch(console.error)
                        }>
                        Disconnect
                    </Button>
                </>
            )}
        </>
    );
}

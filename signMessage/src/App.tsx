import React, {useCallback, useEffect, useState} from 'react';

import './App.css';
import {Alert, Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {HttpProvider, JsonRpcClient} from "@concordium/web-sdk";
import {
    CHAIN_ID,
    JSON_RPC_URL,
    PING_INTERVAL_MS,
    WALLET_CONNECT_PROJECT_ID,
} from "./config";
import {Result, ResultAsync} from "neverthrow";
import {detectConcordiumProvider, WalletApi} from "@concordium/browser-wallet-api-helpers";
import SignClient from "@walletconnect/sign-client";
import WalletConnect2, {signMessage, trySend} from "./WalletConnect2";
import {SessionTypes} from "@walletconnect/types";
import BrowserWallet, {trySendTransaction, sign, wrapPromise} from "./BrowserWallet";

const rpc = new JsonRpcClient(new HttpProvider(JSON_RPC_URL));

type Wallet = "browserwallet" | "walletconnect2";

export default function App() {
    const [wallet, setWallet] = useState<Wallet>();

    // Wallet clients: React only manages their existence, not their internal state.
    const [browserwalletClient, setBrowserwalletClient] = useState<Result<WalletApi, string>>();
    const [walletconnect2Client, setWalletconnect2Client] = useState<Result<SignClient, string>>();

    // Wallet state.
    const [browserwalletConnectedAccount, setBrowserwalletConnectedAccount] = useState<string>();
    const [walletconnect2ConnectedSession, setWalletconnect2ConnectedSession] = useState<SessionTypes.Struct>();
    const [walletconnect2ConnectionError, setWalletconnect2ConnectionError] = useState<string>();

    const [message, setMessage] = useState<string>('');

    // Attempt to initialize Browser Wallet Client.
    useEffect(
        () => {
            ResultAsync.fromPromise(
                detectConcordiumProvider()
                    .then(client => {
                        // Listen for relevant events from the wallet.
                        client.on('accountChanged', account => {
                            console.debug('browserwallet event: accountChange', {account});
                            setBrowserwalletConnectedAccount(account);
                        });
                        client.on('accountDisconnected', () => {
                            console.debug('browserwallet event: accountDisconnected');
                            client.getMostRecentlySelectedAccount().then(setBrowserwalletConnectedAccount);
                        });
                        client.on('chainChanged', (chain) => {
                            console.debug('browserwallet event: chainChanged', {chain});
                        });
                        // Check if you are already connected
                        client.getMostRecentlySelectedAccount().then(setBrowserwalletConnectedAccount);
                        return client;
                    }),
                () => "browser wallet did not initialize in time" // promise rejects without message
            )
                .then(setBrowserwalletClient);
        }, []);
    // Attempt to initialize Wallet Connect Client.
    useEffect(
        () => {
            ResultAsync.fromPromise(
                SignClient.init({
                    projectId: WALLET_CONNECT_PROJECT_ID,
                    metadata: {
                        name: "SignMessage",
                        description: "Example dApp",
                        url: "#",
                        icons: ["https://walletconnect.com/walletconnect-logo.png"],
                    },
                }).then(client => {
                    // Register event handlers (from official docs).
                    client.on("session_event", (event) => {
                        // Handle session events, such as "chainChanged", "accountsChanged", etc.
                        console.debug('Wallet Connect event: session_event', {event});
                    });
                    client.on("session_update", ({topic, params}) => {
                        const {namespaces} = params;
                        const session = client.session.get(topic);
                        // Overwrite the `namespaces` of the existing session with the incoming one.
                        const updatedSession = {...session, namespaces};
                        // Integrate the updated session state into your dapp state.
                        console.debug('Wallet Connect event: session_update', {updatedSession});
                    });
                    client.on("session_delete", () => {
                        // Session was deleted -> reset the dapp state, clean up from user session, etc.
                        setWalletconnect2ConnectedSession(undefined);
                        alert('Mobile walle disconnected');
                        console.debug('Wallet Connect event: session_delete');
                    });
                    return client;
                }),
                e => {
                    console.debug('Wallet Connect: init error', e)
                    return (e as Error).message;
                },
            ).then(setWalletconnect2Client);
        },
        []
    );

    // Ping Wallet Connect periodically.
    // TODO Move to WC component.
    useEffect(
        () => {
            if (walletconnect2Client && walletconnect2ConnectedSession) {
                console.log("setting up ping loop");
                const interval = setInterval(
                    () => {
                        // console.debug("attempting to ping");
                        walletconnect2Client.asyncAndThen(
                            c => {
                                return ResultAsync.fromPromise(
                                    c.ping({topic: walletconnect2ConnectedSession.topic}),
                                    e => `${e} (${typeof e})`,
                                );
                            }
                        )
                            .then(
                                r => r.match(
                                    () => {
                                        // console.debug("ping successful");
                                    },
                                    e => {
                                        console.error(`ping failed: ${e}`)
                                        setWalletconnect2ConnectionError(e)
                                    },
                                )
                            );
                    },
                    PING_INTERVAL_MS,
                );
                return () => {
                    console.debug("tearing down ping loop");
                    clearInterval(interval);
                };
            }
        }
        ,
        [walletconnect2Client, walletconnect2ConnectedSession],
    )
    ;

    const handleSubmitSign = useCallback(
        () => {
            if (wallet === "browserwallet") {
                trySendTransaction(
                    browserwalletClient,
                    browserwalletConnectedAccount,
                    wrapPromise(
                        (client, account) =>
                            sign(client, account, message),
                    ),
                )
            } else if (wallet === "walletconnect2" && rpc) {
                trySend(
                    walletconnect2Client,
                    walletconnect2ConnectedSession,
                    wrapPromise(
                        (client, session) =>
                            signMessage(
                                client,
                                session,
                                rpc,
                                CHAIN_ID,
                                message,
                            )
                    ),
                )
                    .then(r => r.match(
                        message => alert("Message signed: " + message),
                        e => alert("cannot sign message:" + e)
                    ))
            }
        },
        [wallet, browserwalletClient, walletconnect2Client, browserwalletConnectedAccount, walletconnect2ConnectedSession, message],
    );
    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <Button
                        className="w-100"
                        variant={wallet === "browserwallet" ? "dark" : "light"}
                        onClick={() => wallet === "browserwallet" ? setWallet(undefined) : setWallet("browserwallet")}
                    >Use Browser Wallet</Button>
                </Col>
                <Col>
                    <Button
                        className="w-100"
                        variant={wallet === "walletconnect2" ? "dark" : "light"}
                        onClick={() => wallet === "walletconnect2" ? setWallet(undefined) : setWallet("walletconnect2")}
                    >Use WalletConnect v2</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <>
                        {wallet === "browserwallet" && (
                            <>
                                {!browserwalletClient && (
                                    <Spinner animation="border"/>
                                )}
                                {browserwalletClient?.match(
                                    c => (
                                        <BrowserWallet
                                            client={c}
                                            connectedAccount={browserwalletConnectedAccount}
                                            setConnectedAccount={setBrowserwalletConnectedAccount}
                                        />
                                    ),
                                    e => (
                                        <Alert variant="danger">
                                            Browser Wallet is not available: {e} (is the extension installed?).
                                        </Alert>
                                    ),
                                )}
                            </>
                        )}
                        {wallet === "walletconnect2" && (
                            <>
                                {!walletconnect2Client && (
                                    <Spinner animation="border"/>
                                )}
                                {walletconnect2Client?.match(
                                    c => (
                                        <WalletConnect2
                                            client={c}
                                            connectedSession={walletconnect2ConnectedSession}
                                            setConnectedSession={setWalletconnect2ConnectedSession}
                                            connectionError={walletconnect2ConnectionError}
                                        />
                                    ),
                                    e => (
                                        <Alert variant="danger">Wallet Connect is not available: {e}.</Alert>
                                    )
                                )}
                            </>
                        )}
                    </>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <button onClick={handleSubmitSign}>Sign</button>
                </Col>
            </Row>
        </Container>
    );
}

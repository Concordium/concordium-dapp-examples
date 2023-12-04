/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';
import JSONbig from 'json-bigint';
import Switch from 'react-switch';
import { Alert } from 'react-bootstrap';
import {
    toBuffer,
    serializeTypeValue,
    deserializeTypeValue,
    AccountAddress,
    ConcordiumGRPCClient,
    Timestamp,
} from '@concordium/web-sdk';
import {
    useGrpcClient,
    WalletConnectionProps,
    useConnection,
    useConnect,
    typeSchemaFromBase64,
    TESTNET,
    useWalletConnectorSelector,
} from '@concordium/react-components';
import { viewItemState } from 'src/reading_from_blockchain';
import { version } from '../package.json';

import MintTokens from './components/MintTokens';
import AddItemToAuction from './components/AddItemToAuction';
import ViewItem from './components/ViewItem';

import { submitBid, bid } from './utils';
import {
    SPONSORED_TX_CONTRACT_NAME,
    NONCE_OF_PARAMETER_SCHEMA,
    NONCE_OF_RETURN_VALUE_SCHEMA,
    SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE,
    CONTRACT_SUB_INDEX,
    BROWSER_WALLET,
    TRANSFER_SCHEMA,
    REFRESH_INTERVAL,
    VERIFIER_URL,
    SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA,
} from './constants';

/**
 * Send bidding signature to backend.
 */
interface ItemState {
    auction_state: object;
    creator: AccountAddress;
    end: Timestamp;
    highest_bid: string;
    highest_bidder: object;
    name: string;
    start: Timestamp;
    token_id: string;
}

const blackCardStyle = {
    backgroundColor: 'black',
    color: 'white',
    width: '650px',
    borderRadius: 10,
    margin: '10px 0px 10px 0px',
    padding: '10px 18px',
    border: '1px solid #308274',
};

const ButtonStyle = {
    color: 'white',
    borderRadius: 10,
    margin: '7px 0px 7px 0px',
    padding: '10px',
    width: '100%',
    border: '1px solid #26685D',
    backgroundColor: '#308274',
    cursor: 'pointer',
    fontWeight: 300,
    fontSize: '14px',
};

const ButtonStyleDisabled = {
    color: 'white',
    borderRadius: 10,
    margin: '7px 0px 7px 0px',
    padding: '10px',
    width: '100%',
    border: '1px solid #4B4A4A',
    backgroundColor: '#979797',
    cursor: 'pointer',
    fontWeight: 300,
    fontSize: '14px',
};

const InputFieldStyle = {
    backgroundColor: '#181817',
    color: 'white',
    borderRadius: 10,
    width: '100%',
    border: '1px solid #308274',
    margin: '7px 0px 7px 0px',
    padding: '10px 20px',
};

async function generateTransferMessage(
    setPayload: (arg0: number[]) => void,
    setTokenIDAuction: (arg0: string) => void,
    grpcClient: ConcordiumGRPCClient | undefined,
    expiryTimeSignature: string,
    account: string,
    nonce: string,
    amount: string | undefined,
    itemIndexAuction: string | undefined
) {
    if (amount === undefined) {
        alert('Insert an amount.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (itemIndexAuction === undefined) {
        alert('Insert a itemIndexAuction.');
        return '';
    }

    if (grpcClient === undefined) {
        alert('grpcClient undefined.');
        return '';
    }

    try {
        const returnValue = await viewItemState(grpcClient, itemIndexAuction);

        const itemState = returnValue as unknown as ItemState;

        setTokenIDAuction(itemState.token_id);

        const data = serializeTypeValue(
            Number(itemIndexAuction),
            toBuffer(SERIALIZATION_HELPER_SCHEMA_ADDITIONAL_DATA, 'base64')
        );

        const transfer = [
            {
                amount,
                data: data.toString('hex'), // e.g. 0100 (for item with index 1)
                from: {
                    Account: [account],
                },
                to: {
                    Contract: [
                        {
                            index: Number(process.env.AUCTION_CONTRACT_INDEX),
                            subindex: 0,
                        },
                        'bid',
                    ],
                },
                token_id: itemState.token_id,
            },
        ];

        const payload = serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, 'base64'));
        setPayload(Array.from(payload));

        const message = {
            contract_address: {
                index: Number(process.env.CIS2_TOKEN_CONTRACT_INDEX),
                subindex: 0,
            },
            nonce: Number(nonce),
            timestamp: expiryTimeSignature,
            entry_point: 'transfer',
            payload: Array.from(payload),
        };

        const serializedMessage = serializeTypeValue(
            message,
            toBuffer(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE, 'base64')
        );

        return serializedMessage;
    } catch (error) {
        console.log(error);
        alert(error);
        return '';
    }
}

async function getPublicKey(rpcClient: ConcordiumGRPCClient, account: string) {
    const res = await rpcClient.getAccountInfo(new AccountAddress(account));
    const publicKey = res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;
    return publicKey;
}

async function getNonceOf(rpcClient: ConcordiumGRPCClient, account: string) {
    const param = serializeTypeValue(
        {
            queries: [
                {
                    account,
                },
            ],
        },
        toBuffer(NONCE_OF_PARAMETER_SCHEMA, 'base64')
    );

    const res = await rpcClient.invokeContract({
        method: `${SPONSORED_TX_CONTRACT_NAME}.nonceOf`,
        contract: { index: BigInt(Number(process.env.CIS2_TOKEN_CONTRACT_INDEX)), subindex: CONTRACT_SUB_INDEX },
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME}.nonceOf' of contract '${
                process.env.CIS2_TOKEN_CONTRACT_INDEX
            }' failed. Response: ${JSONbig.stringify(res)}`
        );
    }

    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const returnValues: any[][] = deserializeTypeValue(
        toBuffer(res.returnValue, 'hex'),
        toBuffer(NONCE_OF_RETURN_VALUE_SCHEMA, 'base64')
    );

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME}.nonceOf' method of contract '${process.env.CIS2_TOKEN_CONTRACT_INDEX}' failed`
        );
    } else {
        // Return next nonce of a user
        return returnValues[0][0];
    }
}

function clearInputFields() {
    const operator = document.getElementById('operator') as HTMLTextAreaElement;
    if (operator !== null) {
        operator.value = '';
    }

    const from = document.getElementById('from') as HTMLTextAreaElement;
    if (from !== null) {
        from.value = '';
    }

    const to = document.getElementById('to') as HTMLTextAreaElement;
    if (to !== null) {
        to.value = '';
    }

    const tokenID = document.getElementById('tokenID') as HTMLTextAreaElement;
    if (tokenID !== null) {
        tokenID.value = '';
    }

    const nonce = document.getElementById('nonce') as HTMLTextAreaElement;
    if (nonce !== null) {
        nonce.value = '';
    }

    const signer = document.getElementById('signer') as HTMLTextAreaElement;
    if (signer !== null) {
        signer.value = '';
    }
}

export default function SponsoredTransactions(props: WalletConnectionProps) {
    const { network, activeConnectorType, activeConnector, activeConnectorError, connectedAccounts, genesisHashes } =
        props;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, connectError } = useConnect(activeConnector, setConnection);
    const { isConnected, select } = useWalletConnectorSelector(BROWSER_WALLET, connection, {
        ...props,
    });
    const grpcClient = useGrpcClient(TESTNET);

    const [publicKeyError, setPublicKeyError] = useState('');
    const [nextNonceError, setNextNonceError] = useState('');

    const [isUpdateOperatorTab, setUpdateOperatorTab] = useState<boolean>(true);

    const [nextNonce, setNextNonce] = useState<number>(0);
    const [accountInfoPublicKey, setAccountInfoPublicKey] = useState('');

    const [expiryTime, setExpiryTime] = useState('');
    const [tokenIDAuction, setTokenIDAuction] = useState<string | undefined>(undefined);
    const [nonce, setNonce] = useState('');
    const [signer, setSigner] = useState('');
    const [itemIndexAuction, setItemIndexAuction] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [payload, setPayload] = useState<number[]>([]);

    const [signature, setSignature] = useState('');
    const [signingError, setSigningError] = useState('');

    const changeNonceHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setNonce(target.value);
    }, []);

    const changeSignerHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setSigner(target.value);
    }, []);

    const changeAmountHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setAmount(target.value);
    }, []);

    const changeItemIndexAuctionHandler = useCallback((event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setItemIndexAuction(target.value);
    }, []);

    const [txHash, setTxHash] = useState('');
    const [transactionError, setTransactionError] = useState('');

    useEffect(() => {
        // Refresh next nonce periodically.
        if (grpcClient && account) {
            const interval = setInterval(() => {
                getNonceOf(grpcClient, account)
                    .then((nonceValue) => {
                        if (nonceValue !== undefined) {
                            setNextNonce(nonceValue);
                        }
                        setNextNonceError('');
                    })
                    .catch((e) => {
                        setNextNonceError((e as Error).message);
                        setNextNonce(0);
                    });
            }, REFRESH_INTERVAL.asMilliseconds());
            return () => clearInterval(interval);
        }
    }, [grpcClient, account]);

    useEffect(() => {
        // Get next nonce record from smart contract.
        if (grpcClient && account) {
            getNonceOf(grpcClient, account)
                .then((nonceValue) => {
                    if (nonceValue !== undefined) {
                        setNextNonce(nonceValue);
                    }
                    setNextNonceError('');
                })
                .catch((e) => {
                    setNextNonceError((e as Error).message);
                    setNextNonce(0);
                });
        }
    }, [grpcClient, account]);

    useEffect(() => {
        // Get publicKey record from chain.
        if (grpcClient && account) {
            getPublicKey(grpcClient, account)
                .then((publicKey) => {
                    if (publicKey !== undefined) {
                        setAccountInfoPublicKey(publicKey);
                    }
                    setPublicKeyError('');
                })
                .catch((e) => {
                    setPublicKeyError((e as Error).message);
                    setAccountInfoPublicKey('');
                });
        }
    }, [grpcClient, account]);

    useEffect(() => {
        select();
    }, []);

    return (
        <div style={blackCardStyle}>
            <h2>Explore Sponsored Transactions</h2>
            <div>
                {activeConnectorError && <Alert variant="danger">Connector Error: {activeConnectorError}.</Alert>}
                {!activeConnectorError && activeConnectorType && !activeConnector && (
                    <p>
                        <i>Loading connector...</i>
                    </p>
                )}
                {connectError && <Alert variant="danger">Connect Error: {connectError}.</Alert>}
                {!isConnected && (
                    <button
                        style={ButtonStyle}
                        type="button"
                        onClick={() => {
                            connect();
                        }}
                    >
                        Connect
                    </button>
                )}
                {account && (
                    <>
                        <div className="text">Connected to</div>
                        <button
                            className="link"
                            type="button"
                            onClick={() => {
                                window.open(
                                    `https://testnet.ccdscan.io/?dcount=1&dentity=account&daddress=${account}`,
                                    '_blank',
                                    'noopener,noreferrer'
                                );
                            }}
                        >
                            {account}
                        </button>
                        <br />
                        <br />
                        <div> Your public key is: </div>
                        <div className="loadingText">{accountInfoPublicKey}</div>
                        {publicKeyError && <div style={{ color: 'red' }}>Error: {publicKeyError}.</div>}
                        <br />
                        <div> Your next nonce is: </div>
                        <div className="loadingText">{nextNonce}</div>
                        {nextNonceError && <div style={{ color: 'red' }}>Error: {nextNonceError}.</div>}
                    </>
                )}
                {genesisHash && genesisHash !== network.genesisHash && (
                    <p style={{ color: 'red' }}>
                        Unexpected genesis hash: Please ensure that your wallet is connected to network{' '}
                        <code>{network.name}</code>.
                    </p>
                )}
            </div>
            <hr />
            {connection && account && accountInfoPublicKey && (
                <>
                    <div>Transaction status{txHash === '' ? '' : ' (May take a moment to finalize)'}</div>
                    {!txHash && transactionError && <div style={{ color: 'red' }}>Error: {transactionError}.</div>}
                    {!txHash && !transactionError && <div className="loadingText">None</div>}
                    {txHash && (
                        <>
                            <button
                                className="link"
                                type="button"
                                onClick={() => {
                                    window.open(
                                        `https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${txHash}`,
                                        '_blank',
                                        'noopener,noreferrer'
                                    );
                                }}
                            >
                                {txHash}
                            </button>
                            <br />
                        </>
                    )}
                </>
            )}
            <hr />
            {connection && account !== undefined && (
                <>
                    <div className="containerSpaceBetween">
                        <p>Mint tokens and add Item to auction</p>
                        <Switch
                            onChange={() => {
                                setUpdateOperatorTab(!isUpdateOperatorTab);
                                setSignature('');
                                setSigningError('');
                                setTxHash('');
                                setTransactionError('');
                                setNonce('');
                                setSigner('');

                                clearInputFields();
                            }}
                            onColor="#308274"
                            offColor="#308274"
                            onHandleColor="#174039"
                            offHandleColor="#174039"
                            checked={!isUpdateOperatorTab}
                            checkedIcon={false}
                            uncheckedIcon={false}
                        />
                        <p>Transfer via a sponsored transaction</p>
                    </div>
                    {!isUpdateOperatorTab && (
                        <>
                            <label>
                                <p style={{ marginBottom: 0 }}>Amount of Cis2 tokens:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="amount"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeAmountHandler}
                                />
                            </label>
                            <label>
                                <p style={{ marginBottom: 0 }}>Item index auction:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="itemIndexAuction"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeItemIndexAuctionHandler}
                                />
                            </label>
                            <label>
                                <p style={{ marginBottom: 0 }}>Nonce:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="nonce"
                                    type="text"
                                    placeholder={nextNonce.toString()}
                                    onChange={changeNonceHandler}
                                />
                            </label>
                            <button
                                style={ButtonStyle}
                                type="button"
                                onClick={async () => {
                                    setSigningError('');
                                    setSignature('');

                                    // Signatures should expire in one day. Add 1 day to the current time.
                                    const date = new Date();
                                    date.setTime(date.getTime() + 86400 * 1000);

                                    // RFC 3339 format (e.g. 2030-08-08T05:15:00Z)
                                    const expiryTimeSignature = date.toISOString();
                                    setExpiryTime(expiryTimeSignature);

                                    const serializedMessage = await generateTransferMessage(
                                        setPayload,
                                        setTokenIDAuction,
                                        grpcClient,
                                        expiryTimeSignature,
                                        account,
                                        nonce,
                                        amount,
                                        itemIndexAuction
                                    );

                                    if (serializedMessage !== '') {
                                        const promise = connection.signMessage(account, {
                                            type: 'BinaryMessage',
                                            value: serializedMessage,
                                            schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA_PERMIT_MESSAGE),
                                        });

                                        promise
                                            .then((permitSignature) => {
                                                setSignature(permitSignature[0][0]);
                                            })
                                            .catch((err: Error) => setSigningError((err as Error).message));
                                    } else {
                                        setSigningError('Serialization Error');
                                    }
                                }}
                            >
                                Generate Signature
                            </button>
                            <br />
                            {signingError && <div style={{ color: 'red' }}>Error: {signingError}.</div>}
                            {signature !== '' && (
                                <>
                                    <div> Your generated signature is: </div>
                                    <div className="loadingText">{signature}</div>
                                </>
                            )}
                            <br />
                            <button
                                style={ButtonStyle}
                                type="button"
                                onClick={async () => {
                                    setTxHash('');
                                    setTransactionError('');
                                    const tx = bid(connection, account, nonce, payload, expiryTime, signature);
                                    tx.then(setTxHash).catch((err: Error) =>
                                        setTransactionError((err as Error).message)
                                    );
                                }}
                            >
                                Bid via browser wallet
                            </button>
                            <label>
                                <p style={{ marginBottom: 0 }}>Signer:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="signer"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeSignerHandler}
                                />
                            </label>
                            <button
                                style={signature === '' ? ButtonStyleDisabled : ButtonStyle}
                                disabled={signature === ''}
                                type="button"
                                onClick={async () => {
                                    setTxHash('');
                                    setTransactionError('');

                                    const tx = submitBid(
                                        VERIFIER_URL,
                                        signer,
                                        nonce,
                                        signature,
                                        expiryTime,
                                        tokenIDAuction,
                                        account,
                                        amount,
                                        itemIndexAuction
                                    );

                                    tx.then((txHashReturned) => {
                                        setTxHash(txHashReturned.tx_hash);
                                        if (txHashReturned.tx_hash !== '') {
                                            setSignature('');

                                            setNonce('');
                                            setSigner('');
                                            clearInputFields();
                                        }
                                    }).catch((err: Error) => setTransactionError((err as Error).message));
                                }}
                            >
                                Submit Sponsored Transaction
                            </button>
                        </>
                    )}
                    {isUpdateOperatorTab && (
                        <>
                            <hr />
                            <MintTokens
                                account={account}
                                connection={connection}
                                setTxHash={setTxHash}
                                setTransactionError={setTransactionError}
                            />
                            <hr />
                            <AddItemToAuction
                                account={account}
                                connection={connection}
                                setTxHash={setTxHash}
                                setTransactionError={setTransactionError}
                            />
                            <hr />
                            <ViewItem grpcClient={grpcClient} />
                            <hr />
                        </>
                    )}
                </>
            )}
            <div>
                <br />
                Version: {version} |{' '}
                <a
                    style={{ color: 'white' }}
                    href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/sponsoredTransactions/index.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    Learn more about sponsored tx here
                </a>
                <br />
            </div>
        </div>
    );
}

/* eslint-disable no-console */
/* eslint-disable no-alert */

import React, { useEffect, useState, ChangeEvent } from 'react';
import Switch from 'react-switch';
import { toBuffer, JsonRpcClient, serializeTypeValue, deserializeTypeValue } from '@concordium/web-sdk';
import {
    withJsonRpcClient,
    WalletConnectionProps,
    useConnection,
    useConnect,
    typeSchemaFromBase64,
} from '@concordium/react-components';
import { version } from '../package.json';

import { submitUpdateOperator, submitTransfer, mint } from './utils';
import {
    SPONSORED_TX_CONTRACT_NAME,
    SPONSORED_TX_CONTRACT_INDEX,
    NONCE_OF_PARAMETER_SCHEMA,
    NONCE_OF_RETURN_VALUE_SCHEMA,
    SERIALIZATION_HELPER_SCHEMA,
    CONTRACT_SUB_INDEX,
    BROWSER_WALLET,
    WALLET_CONNECT,
    UPDATE_OPERATOR_SCHEMA,
    TRANSFER_SCHEMA,
    EXPIRY_TIME_SIGNATURE,
    REFRESH_INTERVAL,
} from './constants';

import { WalletConnectionTypeButton } from './WalletConnectorTypeButton';

const VERIFIER_URL = '/api';

const blackCardStyle = {
    backgroundColor: 'black',
    color: 'white',
    width: '500px',
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

async function calculateTransferMessage(nonce: string, tokenID: string, from: string, to: string) {
    if (nonce === '') {
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (tokenID === '') {
        alert('Insert a tokenID.');
        return '';
    }

    if (tokenID.length !== 8) {
        alert('TokenID needs to have 8 digits.');
        return '';
    }

    if (from === '') {
        alert('Insert an `from` address.');
        return '';
    }

    if (from.length !== 50) {
        alert('`From` address needs to have 50 digits.');
        return '';
    }

    if (to === '') {
        alert('Insert an `to` address.');
        return '';
    }

    if (to.length !== 50) {
        alert('`To` address needs to have 50 digits.');
        return '';
    }

    const transfer = [
        {
            amount: '1',
            data: [],
            from: {
                Account: [from],
            },
            to: {
                Account: [to],
            },
            token_id: tokenID,
        },
    ];

    const payload = serializeTypeValue(transfer, toBuffer(TRANSFER_SCHEMA, 'base64'));

    const message = {
        contract_address: {
            index: Number(SPONSORED_TX_CONTRACT_INDEX),
            subindex: 0,
        },
        nonce: Number(nonce),
        timestamp: EXPIRY_TIME_SIGNATURE,
        entry_point: 'transfer',
        payload: Array.from(payload),
    };

    const serializedMessage = serializeTypeValue(message, toBuffer(SERIALIZATION_HELPER_SCHEMA, 'base64'));

    return serializedMessage;
}

async function calculateUpdateOperatorMessage(nonce: string, operator: string, addOperator: boolean) {
    if (nonce === '') {
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (operator === '') {
        alert('Insert an operator address.');
        return '';
    }

    if (operator.length !== 50) {
        alert('Operator address needs to have 50 digits.');
        return '';
    }

    const operatorAction = addOperator
        ? {
            Add: [],
        }
        : {
            Remove: [],
        };

    const updateOperator = [
        {
            operator: {
                Account: [operator],
            },
            update: operatorAction,
        },
    ];

    const payload = serializeTypeValue(updateOperator, toBuffer(UPDATE_OPERATOR_SCHEMA, 'base64'));


    const message = {
        contract_address: {
            index: Number(SPONSORED_TX_CONTRACT_INDEX),
            subindex: 0,
        },
        nonce: Number(nonce),
        timestamp: EXPIRY_TIME_SIGNATURE,
        entry_point: 'updateOperator',
        payload: Array.from(payload),
    };

    const serializedMessage = serializeTypeValue(message, toBuffer(SERIALIZATION_HELPER_SCHEMA, 'base64'));

    return serializedMessage;
}

async function getPublicKey(rpcClient: any, account: string) {
    const res = await rpcClient.getAccountInfo(account);
    const publicKey = res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;
    return publicKey;
}

async function getNonceOf(rpcClient: any, account: string) {
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
        contract: { index: SPONSORED_TX_CONTRACT_INDEX, subindex: CONTRACT_SUB_INDEX },
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME}.nonceOf' of contract '${SPONSORED_TX_CONTRACT_INDEX}' failed`
        );
    }

    // @ts-ignore
    const returnValues: any[][] = deserializeTypeValue(
        toBuffer(res.returnValue, 'hex'),
        toBuffer(NONCE_OF_RETURN_VALUE_SCHEMA, 'base64')
    );

    if (returnValues === undefined) {
        throw new Error(
            `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME}.publicKeyOf' method of contract '${SPONSORED_TX_CONTRACT_INDEX}' failed`
        );
    }

    if (returnValues !== undefined) {
        // Return next nonce of a user
        return returnValues[0][0];
    }

    throw new Error(
        `Deserializing the returnValue from the '${SPONSORED_TX_CONTRACT_NAME}.publicKeyOf' method of contract '${SPONSORED_TX_CONTRACT_INDEX}' failed`
    );
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
    const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);

    const [publicKeyError, setPublicKeyError] = useState('');
    const [nextNonceError, setNextNonceError] = useState('');

    const [isPermitUpdateOperator, setPermitUpdateOperator] = useState<boolean>(true);

    const [nextNonce, setNextNonce] = useState<number>(0);
    const [accountInfoPublicKey, setAccountInfoPublicKey] = useState('');

    const [operator, setOperator] = useState('');
    const [addOperator, setAddOperator] = useState<boolean>(true);
    const [tokenID, setTokenID] = useState('');
    const [to, setTo] = useState('');
    const [nonce, setNonce] = useState('');
    const [from, setFrom] = useState('');
    const [signer, setSigner] = useState('');

    const [signature, setSignature] = useState('');
    const [signingError, setSigningError] = useState('');

    const changeOperatorHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setOperator(target.value);
    };

    const changeTokenIDHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setTokenID(target.value);
    };

    const changeToHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setTo(target.value);
    };

    const changeFromHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setFrom(target.value);
    };

    const changeNonceHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setNonce(target.value);
    };

    const changeSignerHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setSigner(target.value);
    };

    // // Refresh publicKey/nonce periodically.
    // // eslint-disable-next-line consistent-return
    // useEffect(() => {

    //     if (connection && account) {
    //         const interval = setInterval(() => {
    //             console.log('refreshing');
    //             withJsonRpcClient(connection, (rpcClient) => viewPublicKey(rpcClient, account))
    //                 .then((record) => {
    //                     if (record !== undefined) {
    //                         setPublicKey(record[0]);
    //                         setNextNonce(record[1]);
    //                         setNonce(record[1]);
    //                         const nonce = document.getElementById('nonce') as HTMLTextAreaElement;
    //                         if (nonce !== null) {
    //                             nonce.value = record[1];
    //                         }
    //                     }
    //                     setPublicKeyError('');
    //                 })
    //                 .catch((e) => {
    //                     setPublicKeyError((e as Error).message);
    //                     setPublicKey('');
    //                     setNextNonce(0);
    //                     setNonce('');
    //                 });
    //         }, REFRESH_INTERVAL.asMilliseconds());
    //         return () => clearInterval(interval);
    //     }
    // }, [connection, account, viewPublicKey]);

    // useEffect(() => {
    //     // View publicKey record from smart contract.
    //     if (connection && account) {
    //         withJsonRpcClient(connection, (rpcClient) => viewPublicKey(rpcClient, account))
    //             .then((record) => {
    //                 if (record !== undefined) {
    //                     setPublicKey(record[0]);
    //                     setNextNonce(record[1]);
    //                     setNonce(record[1]);
    //                     const nonce = document.getElementById('nonce') as HTMLTextAreaElement;
    //                     if (nonce !== null) {
    //                         nonce.value = record[1];
    //                     }
    //                 }
    //                 setPublicKeyError('');
    //             })
    //             .catch((e) => {
    //                 setPublicKeyError((e as Error).message);
    //                 setPublicKey('');
    //                 setNextNonce(0);
    //                 setNonce('');
    //             });
    //     }
    // }, [connection, account]);

    useEffect(() => {
        // Get publicKey record from chain.
        if (connection && account) {
            withJsonRpcClient(connection, (rpcClient) => getPublicKey(rpcClient, account))
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
    }, [connection, account]);

    useEffect(() => {
        // Get next nonce record from smart contract.
        if (connection && account) {
            withJsonRpcClient(connection, (rpcClient) => getNonceOf(rpcClient, account))
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
    }, [connection, account]);

    const [txHash, setTxHash] = useState('');
    const [transactionError, setTransactionError] = useState('');

    const [isWaitingForTransaction, setWaitingForUser] = useState(false);
    return (
        <div style={blackCardStyle}>
            <h1 className="header">Explore Sponsored Transactions</h1>
            <div className="containerSpaceBetween">
                <WalletConnectionTypeButton
                    buttonStyle={ButtonStyle}
                    disabledButtonStyle={ButtonStyleDisabled}
                    connectorType={BROWSER_WALLET}
                    connectorName="Browser Wallet"
                    setWaitingForUser={setWaitingForUser}
                    connection={connection}
                    {...props}
                />
                {/* TODO: Enable walletConnect again once mobile wallets are updated to sign Objects/Bytes
                with a schema with the `signMessage` function without the hex encoding.
                 <WalletConnectionTypeButton
                    buttonStyle={ButtonStyle}
                    disabledButtonStyle={ButtonStyleDisabled}
                    connectorType={WALLET_CONNECT}
                    connectorName="Wallet Connect"
                    setWaitingForUser={setWaitingForUser}
                    connection={connection}
                    {...props}
                /> */}
            </div>
            <div>
                {activeConnectorError && <p style={{ color: 'red' }}>Connector Error: {activeConnectorError}.</p>}
                {!activeConnectorError && !isWaitingForTransaction && activeConnectorType && !activeConnector && (
                    <p>
                        <i>Loading connector...</i>
                    </p>
                )}
                {connectError && <p style={{ color: 'red' }}>Connect Error: {connectError}.</p>}
                {!connection && !isWaitingForTransaction && activeConnectorType && activeConnector && (
                    <p>
                        <button style={ButtonStyle} type="button" onClick={connect}>
                            {isConnecting && 'Connecting...'}
                            {!isConnecting && activeConnectorType === BROWSER_WALLET && 'Connect Browser Wallet'}
                            {!isConnecting && activeConnectorType === WALLET_CONNECT && 'Connect Mobile Wallet'}
                        </button>
                    </p>
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
            {connection && account !== undefined && (
                <>
                    <div className="containerSpaceBetween">
                        <p>Update operator via a sponsored transaction</p>
                        <Switch
                            onChange={() => {
                                setPermitUpdateOperator(!isPermitUpdateOperator);
                                setSignature('');
                                setSigningError('');
                                setTxHash('');
                                setTransactionError('');
                                setNonce('');
                                setSigner('');
                                setTokenID('');
                                setFrom('');
                                setTo('');
                                setOperator('');
                                clearInputFields();
                            }}
                            onColor="#308274"
                            offColor="#308274"
                            onHandleColor="#174039"
                            offHandleColor="#174039"
                            checked={!isPermitUpdateOperator}
                            checkedIcon={false}
                            uncheckedIcon={false}
                        />
                        <p>Transfer via a sponsored transaction</p>
                    </div>
                    {isPermitUpdateOperator && (
                        <>
                            <label>
                                <p style={{ marginBottom: 0 }}>Operator Address:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="operator"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeOperatorHandler}
                                />
                            </label>
                            <div className="containerSpaceBetween">
                                <p>Add operator</p>
                                <Switch
                                    onChange={() => {
                                        setAddOperator(!addOperator);
                                    }}
                                    onColor="#308274"
                                    offColor="#308274"
                                    onHandleColor="#174039"
                                    offHandleColor="#174039"
                                    checked={!addOperator}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                                <p>Remove operator</p>
                            </div>
                        </>
                    )}
                    {!isPermitUpdateOperator && (
                        <>
                            <div>Mint a token to your account first:</div>
                            <button
                                style={ButtonStyle}
                                type="button"
                                onClick={async () => {
                                    setTxHash('');
                                    setTransactionError('');
                                    setWaitingForUser(true);
                                    const tx = mint(connection, account);
                                    tx.then(setTxHash)
                                        .catch((err: Error) => setTransactionError((err as Error).message))
                                        .finally(() => setWaitingForUser(false));
                                }}
                            >
                                Mint an NFT token
                            </button>
                            <label>
                                <p style={{ marginBottom: 0 }}>Token ID:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="tokenID"
                                    type="text"
                                    placeholder="00000006"
                                    onChange={changeTokenIDHandler}
                                />
                            </label>
                            <label>
                                <p style={{ marginBottom: 0 }}>From Address:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="from"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeFromHandler}
                                />
                            </label>
                            <label>
                                <p style={{ marginBottom: 0 }}>To Address:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="to"
                                    type="text"
                                    placeholder="4HoVMVsj6TwJr6B5krP5fW9qM4pbo6crVyrr7N95t2UQDrv1fq"
                                    onChange={changeToHandler}
                                />
                            </label>
                        </>
                    )}
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
                            const serializedMessage = isPermitUpdateOperator
                                ? await calculateUpdateOperatorMessage(nonce, operator, addOperator)
                                : await calculateTransferMessage(nonce, tokenID, from, to);

                            if (serializedMessage !== '') {
                                const promise = connection.signMessage(
                                    account,
                                    {
                                        type: 'BinaryMessage',
                                        value: serializedMessage,
                                        schema: typeSchemaFromBase64(SERIALIZATION_HELPER_SCHEMA),
                                    }
                                );

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
                            setWaitingForUser(true);

                            const tx = isPermitUpdateOperator
                                ? submitUpdateOperator(VERIFIER_URL, signer, nonce, signature, operator, addOperator)
                                : submitTransfer(VERIFIER_URL, signer, nonce, signature, tokenID, from, to);

                            tx.then((txHashReturned) => {
                                setTxHash(txHashReturned.tx_hash);
                                if (txHashReturned.tx_hash !== '') {
                                    setSignature('');
                                    setTokenID('');
                                    setFrom('');
                                    setTo('');
                                    setOperator('');
                                    setNonce('');
                                    setSigner('');
                                    clearInputFields();
                                }
                            })
                                .catch((err: Error) => setTransactionError((err as Error).message))
                                .finally(() => {
                                    setWaitingForUser(false);
                                });
                        }}
                    >
                        Submit Sponsored Transaction
                    </button>
                </>
            )}
            {!connection && (
                <button style={ButtonStyleDisabled} type="button" disabled>
                    Waiting for connection...
                </button>
            )}
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

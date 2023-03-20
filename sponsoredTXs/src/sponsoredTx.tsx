/* eslint-disable no-console */
import React, { useEffect, useState, ChangeEvent } from 'react';
import Switch from 'react-switch';
import {
    toBuffer,
    deserializeReceiveReturnValue,
    serializeUpdateContractParameters,
    JsonRpcClient,
} from '@concordium/web-sdk';
import { withJsonRpcClient, WalletConnectionProps, useConnection, useConnect } from '@concordium/react-components';
import { version } from '../package.json';

import { register, mint, submitUpdateOperatorSponsoredTx, submitTransferSponsoredTx } from './utils';
import {
    SPONSORED_TX_CONTRACT_NAME,
    SPONSORED_TX_CONTRACT_INDEX,
    SPONSORED_TX_RAW_SCHEMA,
    CONTRACT_SUB_INDEX,
    BROWSER_WALLET,
    WALLET_CONNECT,
    EXPIRY_TIME_SIGNATURE,
    REFRESH_INTERVAL,
} from './constants';

import { WalletConnectionTypeButton } from './WalletConnectorTypeButton';

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

const ButtonStyleSelected = {
    color: 'white',
    borderRadius: 10,
    margin: '7px 0px 7px 0px',
    padding: '10px',
    width: '100%',
    border: '0px solid',
    backgroundColor: '#174039',
    cursor: 'pointer',
    fontWeight: 300,
    fontSize: '14px',
};

const ButtonStyleNotSelected = {
    color: 'white',
    borderRadius: 10,
    margin: '7px 0px 7px 0px',
    padding: '10px',
    width: '100%',
    border: '0px solid',
    backgroundColor: '#308274',
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
    if (nonce === undefined || nonce === '') {
        // eslint-disable-next-line no-alert
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        // eslint-disable-next-line no-alert
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (tokenID === undefined || tokenID === '') {
        // eslint-disable-next-line no-alert
        alert('Insert a tokenID.');
        return '';
    }

    if (tokenID.length !== 8) {
        // eslint-disable-next-line no-alert
        alert('TokenID needs to have 8 digits.');
        return '';
    }

    if (to === undefined || to === '') {
        // eslint-disable-next-line no-alert
        alert('Insert an `to` address.');
        return '';
    }

    if (to.length !== 50) {
        // eslint-disable-next-line no-alert
        alert('`To` address needs to have 50 digits.');
        return '';
    }

    if (from === undefined || from === '') {
        // eslint-disable-next-line no-alert
        alert('Insert an `from` address.');
        return '';
    }

    if (from.length !== 50) {
        // eslint-disable-next-line no-alert
        alert('`From` address needs to have 50 digits.');
        return '';
    }

    const message = {
        contract_address: {
            index: Number(SPONSORED_TX_CONTRACT_INDEX),
            subindex: 0,
        },
        entry_point: 'contract_transfer',
        nonce: Number(nonce),
        payload: {
            Transfer: [
                [
                    {
                        amount: '1',
                        data: '',
                        from: {
                            Account: [from],
                        },
                        to: {
                            Account: [to],
                        },
                        token_id: tokenID,
                    },
                ],
            ],
        },
        timestamp: EXPIRY_TIME_SIGNATURE,
    };

    const param = serializeUpdateContractParameters(
        SPONSORED_TX_CONTRACT_NAME,
        'serializationHelper',
        message,
        toBuffer(SPONSORED_TX_RAW_SCHEMA, 'base64')
    );

    const hexMessage = Array.from(param, function convertToHex(byte) {
        /* eslint-disable no-bitwise */
        return `0${(byte & 0xff).toString(16)}`.slice(-2);
    }).join('');

    return hexMessage;
}

async function calculateUpdateOperatorMessage(nonce: string, operator: string, addOperator: boolean) {
    if (nonce === undefined || nonce === '') {
        // eslint-disable-next-line no-alert
        alert('Insert a nonce.');
        return '';
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(nonce))) {
        // eslint-disable-next-line no-alert
        alert('Your nonce needs to be a number.');
        return '';
    }

    if (operator === undefined || operator === '') {
        // eslint-disable-next-line no-alert
        alert('Insert an operator address.');
        return '';
    }

    if (operator.length !== 50) {
        // eslint-disable-next-line no-alert
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

    const message = {
        contract_address: {
            index: Number(SPONSORED_TX_CONTRACT_INDEX),
            subindex: 0,
        },
        entry_point: 'contract_update_operator',
        nonce: Number(nonce),
        payload: {
            UpdateOperator: [
                [
                    {
                        operator: {
                            Account: [operator],
                        },
                        update: operatorAction,
                    },
                ],
            ],
        },
        timestamp: EXPIRY_TIME_SIGNATURE,
    };

    const param = serializeUpdateContractParameters(
        SPONSORED_TX_CONTRACT_NAME,
        'serializationHelper',
        message,
        toBuffer(SPONSORED_TX_RAW_SCHEMA, 'base64')
    );

    const hexMessage = Array.from(param, function convertToHex(byte) {
        /* eslint-disable no-bitwise */
        return `0${(byte & 0xff).toString(16)}`.slice(-2);
    }).join('');

    return hexMessage;
}

async function viewPublicKey(rpcClient: JsonRpcClient, account: string) {
    const param = serializeUpdateContractParameters(
        SPONSORED_TX_CONTRACT_NAME,
        'publicKeyOf',
        {
            queries: [
                {
                    account,
                },
            ],
        },
        toBuffer(SPONSORED_TX_RAW_SCHEMA, 'base64')
    );

    const res = await rpcClient.invokeContract({
        method: `${SPONSORED_TX_CONTRACT_NAME}.publicKeyOf`,
        contract: { index: SPONSORED_TX_CONTRACT_INDEX, subindex: CONTRACT_SUB_INDEX },
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${SPONSORED_TX_CONTRACT_NAME}.publicKeyOf' of contract '${SPONSORED_TX_CONTRACT_INDEX}' failed`
        );
    }

    const returnValues = deserializeReceiveReturnValue(
        toBuffer(res.returnValue, 'hex'),
        toBuffer(SPONSORED_TX_RAW_SCHEMA, 'base64'),
        SPONSORED_TX_CONTRACT_NAME,
        'publicKeyOf',
        2
    );

    if (returnValues === undefined || returnValues[0][0]?.None !== undefined) {
        // [public key, nonce]
        return ['', 0];
    }

    if (returnValues[0][0]?.Some[0][0] !== undefined) {
        // [public key, nonce]
        return [`0x${returnValues[0][0].Some[0][0]}`, returnValues[0][0].Some[0][1]];
    }

    return ['PublicKeyError', 0];
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

    const userInputPublicKey = document.getElementById('userInputPublicKey') as HTMLTextAreaElement;
    if (userInputPublicKey !== null) {
        userInputPublicKey.value = '';
    }
}

export default function SPONSOREDTXS(props: WalletConnectionProps) {
    const { network, activeConnectorType, activeConnector, activeConnectorError, connectedAccounts, genesisHashes } =
        props;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);

    const [publicKeyError, setPublicKeyError] = useState('');

    const [isPermitUpdateOperator, setPermitUpdateOperator] = useState<boolean>(true);

    const [publicKey, setPublicKey] = useState('');
    const [nextNonce, setNextNonce] = useState<number>(0);

    const [userInputPublicKey, setUserInputPublicKey] = useState('');
    const [operator, setOperator] = useState('');
    const [addOperator, setAddOperator] = useState<boolean>(true);
    const [tokenID, setTokenID] = useState('');
    const [to, setTo] = useState('');
    const [nonce, setNonce] = useState('');
    const [from, setFrom] = useState('');
    const [signer, setSigner] = useState('');

    const [signature, setSignature] = useState('');
    const [signingError, setSigningError] = useState('');

    const changeUserInputPublicKeyHandler = (event: ChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        setUserInputPublicKey(target.value);
    };

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

    // Refresh publicKey/nonce periodically.
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (connection && account) {
            const interval = setInterval(() => {
                console.log('refreshing');
                withJsonRpcClient(connection, (rpcClient) => viewPublicKey(rpcClient, account))
                    .then((record) => {
                        if (record !== undefined) {
                            setPublicKey(record[0]);
                            setNextNonce(record[1] + 1);
                        }
                        setPublicKeyError('');
                    })
                    .catch((e) => {
                        setPublicKeyError((e as Error).message);
                        setPublicKey('');
                        setNextNonce(0);
                    });
            }, REFRESH_INTERVAL.asMilliseconds());
            return () => clearInterval(interval);
        }
    }, [connection, account, viewPublicKey]);

    useEffect(() => {
        // View publicKey record.
        if (connection && account) {
            withJsonRpcClient(connection, (rpcClient) => viewPublicKey(rpcClient, account))
                .then((record) => {
                    if (record !== undefined) {
                        setPublicKey(record[0]);
                        setNextNonce(record[1] + 1);
                    }
                    setPublicKeyError('');
                })
                .catch((e) => {
                    setPublicKeyError((e as Error).message);
                    setPublicKey('');
                    setNextNonce(0);
                });
        }
    }, [connection, account]);

    const [isRegisterPublicKeyPage, setIsRegisterPublicKeyPage] = useState(true);
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
                <WalletConnectionTypeButton
                    buttonStyle={ButtonStyle}
                    disabledButtonStyle={ButtonStyleDisabled}
                    connectorType={WALLET_CONNECT}
                    connectorName="Wallet Connect"
                    setWaitingForUser={setWaitingForUser}
                    connection={connection}
                    {...props}
                />
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
                        <div className="containerSpaceBetween">
                            <button
                                style={!isRegisterPublicKeyPage ? ButtonStyleNotSelected : ButtonStyleSelected}
                                type="button"
                                onClick={() => {
                                    setIsRegisterPublicKeyPage(true);
                                    setSignature('');
                                    setSigningError('');
                                    setTokenID('');
                                    setFrom('');
                                    setTo('');
                                    setOperator('');
                                    setNonce('');
                                    setSigner('');
                                    setTransactionError('');
                                    setTxHash('');
                                    setUserInputPublicKey('');
                                    clearInputFields();
                                }}
                            >
                                Register Public Key
                            </button>
                            <Switch
                                onChange={() => {
                                    setIsRegisterPublicKeyPage(!isRegisterPublicKeyPage);
                                    setSignature('');
                                    setSigningError('');
                                    setTokenID('');
                                    setFrom('');
                                    setTo('');
                                    setOperator('');
                                    setNonce('');
                                    setSigner('');
                                    setTransactionError('');
                                    setTxHash('');
                                    setUserInputPublicKey('');
                                    clearInputFields();
                                }}
                                onColor="#308274"
                                offColor="#308274"
                                onHandleColor="#174039"
                                offHandleColor="#174039"
                                checked={!isRegisterPublicKeyPage}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />
                            <button
                                style={isRegisterPublicKeyPage ? ButtonStyleNotSelected : ButtonStyleSelected}
                                type="button"
                                onClick={() => {
                                    setIsRegisterPublicKeyPage(false);
                                    setSignature('');
                                    setSigningError('');
                                    setTokenID('');
                                    setFrom('');
                                    setTo('');
                                    setOperator('');
                                    setNonce('');
                                    setSigner('');
                                    setTransactionError('');
                                    setTxHash('');
                                    setUserInputPublicKey('');
                                    clearInputFields();
                                }}
                            >
                                Submit Sponsored Tx
                            </button>
                        </div>
                    </>
                )}
                {genesisHash && genesisHash !== network.genesisHash && (
                    <p style={{ color: 'red' }}>
                        Unexpected genesis hash: Please ensure that your wallet is connected to network{' '}
                        <code>{network.name}</code>.
                    </p>
                )}
            </div>
            {connection && isRegisterPublicKeyPage && account !== undefined && (
                <>
                    {!publicKey && (
                        <>
                            <label>
                                <p style={{ marginBottom: 0 }}>Insert your public key:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="userInputPublicKey"
                                    type="text"
                                    placeholder="14fe0aed941aa0a0be1119d7b7dd70bfca475310c531f1b5a179b336c075db65"
                                    onChange={changeUserInputPublicKeyHandler}
                                />
                            </label>
                            <button
                                style={ButtonStyle}
                                type="button"
                                onClick={() => {
                                    setTxHash('');
                                    setTransactionError('');
                                    setWaitingForUser(true);
                                    const tx = register(connection, account, userInputPublicKey);
                                    tx.then(setTxHash)
                                        .catch((err: Error) => setTransactionError((err as Error).message))
                                        .finally(() => setWaitingForUser(false));
                                }}
                            >
                                Insert a public key
                            </button>
                            <p>
                                {' '}
                                For testing, go to the `export private key` tab in the Concordium browser wallet and
                                click the `Export` button to download your keyfile. You find a `verifyKey` (your public
                                key) in the exported file. Insert the public key above.
                            </p>
                        </>
                    )}
                    <br />
                    {publicKey !== '' && (
                        <>
                            <div> Your registered public key is: </div>
                            <div className="loadingText">{publicKey}</div>
                            <div> Your next nonce is: </div>
                            <div className="loadingText">{nextNonce}</div>
                        </>
                    )}
                </>
            )}
            {connection && !isRegisterPublicKeyPage && account !== undefined && (
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
                    {publicKey === '' && <div style={{ color: 'red' }}>Register a public key first.</div>}
                    {isPermitUpdateOperator && publicKey !== '' && (
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
                    {!isPermitUpdateOperator && publicKey !== '' && (
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
                                Mint a NFT token
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
                    {publicKey !== '' && (
                        <>
                            <label>
                                <p style={{ marginBottom: 0 }}>Nonce:</p>
                                <input
                                    className="input"
                                    style={InputFieldStyle}
                                    id="nonce"
                                    type="text"
                                    placeholder="5"
                                    onChange={changeNonceHandler}
                                />
                            </label>
                            <button
                                style={ButtonStyle}
                                type="button"
                                onClick={async () => {
                                    setSigningError('');
                                    setSignature('');
                                    const message = isPermitUpdateOperator
                                        ? await calculateUpdateOperatorMessage(nonce, operator, addOperator)
                                        : await calculateTransferMessage(nonce, tokenID, from, to);
                                    if (message !== '') {
                                        const promise = connection.signMessage(account, message);
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
                            {publicKey !== '' && (
                                <>
                                    <div> Your registered public key is: </div>
                                    <div className="loadingText">{publicKey}</div>
                                    <div> Your next nonce is: </div>
                                    <div className="loadingText">{nextNonce}</div>
                                </>
                            )}
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
                                        ? submitUpdateOperatorSponsoredTx(
                                              connection,
                                              account,
                                              signer,
                                              nonce,
                                              signature,
                                              operator,
                                              addOperator
                                          )
                                        : submitTransferSponsoredTx(
                                              connection,
                                              account,
                                              signer,
                                              nonce,
                                              signature,
                                              tokenID,
                                              from,
                                              to
                                          );
                                    tx.then((txHashReturned) => {
                                        setTxHash(txHashReturned);
                                        if (txHashReturned !== '') {
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
                </>
            )}
            {!connection && (
                <button style={ButtonStyleDisabled} type="button" disabled>
                    Waiting for connection...
                </button>
            )}
            {connection && account && (
                <p>
                    {isRegisterPublicKeyPage && !publicKey && (
                        <>
                            <div>Transaction status{txHash === '' ? '' : ' (May take a moment to finalize)'}</div>
                            {!txHash && transactionError && (
                                <div style={{ color: 'red' }}>Error: {transactionError}.</div>
                            )}
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
                    {!isRegisterPublicKeyPage && publicKey && (
                        <>
                            <div>Transaction status{txHash === '' ? '' : ' (May take a moment to finalize)'}</div>
                            {!txHash && transactionError && (
                                <div style={{ color: 'red' }}>Error: {transactionError}.</div>
                            )}
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
                    {publicKeyError && <div style={{ color: 'red' }}>Error: {publicKeyError}.</div>}
                </p>
            )}
            <div>
                <br />
                Version: {version} |{' '}
                <a
                    style={{ color: 'white' }}
                    href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/"
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

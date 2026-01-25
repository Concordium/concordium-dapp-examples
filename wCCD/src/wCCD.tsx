/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import {
    toBuffer,
    deserializeReceiveReturnValue,
    serializeUpdateContractParameters,
    ConcordiumGRPCClient,
    AccountAddress,
    ReceiveName,
    ContractAddress,
    Parameter,
    ContractName,
    ReturnValue,
    EntrypointName,
    BlockHash,
} from '@concordium/web-sdk';
import * as leb from '@thi.ng/leb128';
import { multiply, round } from 'mathjs';

import {
    useGrpcClient,
    WalletConnectionProps,
    useConnect,
    useConnection,
    BrowserWalletConnector,
} from '@concordium/react-components';
import { wrap, unwrap } from './utils';
import {
    CONTRACT_SUB_INDEX,
    CONTRACT_NAME,
    VIEW_FUNCTION_RAW_SCHEMA,
    BALANCEOF_FUNCTION_RAW_SCHEMA,
    BROWSER_WALLET,
    WALLET_CONNECT,
} from './constants';

import ArrowIcon from './assets/Arrow.svg?react';
import RefreshIcon from './assets/Refresh.svg?react';
import { WalletConnectionTypeButton } from './WalletConnectorTypeButton';

const blackCardStyle = {
    backgroundColor: 'black',
    color: 'white',
    width: '484px',
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

interface ViewAdmin {
    admin: { Account: string[] };
}

async function viewAdmin(rpcClient: ConcordiumGRPCClient, WCCD_CONTRACT_INDEX: bigint): Promise<string> {
    const res = await rpcClient.invokeContract({
        method: ReceiveName.fromString(`${CONTRACT_NAME}.view`),
        contract: ContractAddress.create(WCCD_CONTRACT_INDEX, CONTRACT_SUB_INDEX),
        parameter: Parameter.empty(),
    });
    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${CONTRACT_NAME}.view' of contract '${WCCD_CONTRACT_INDEX}' failed`,
        );
    }
    const returnValues = deserializeReceiveReturnValue(
        new Uint8Array(ReturnValue.toBuffer(res.returnValue)).buffer,
        new Uint8Array(toBuffer(VIEW_FUNCTION_RAW_SCHEMA, 'base64')).buffer,
        ContractName.fromString(CONTRACT_NAME),
        EntrypointName.fromString('view'),
        2,
    ) as ViewAdmin;
    return returnValues.admin.Account[0];
}

async function updateWCCDBalanceAccount(rpcClient: ConcordiumGRPCClient, account: string, WCCD_CONTRACT_INDEX: bigint) {
    const param = serializeUpdateContractParameters(
        ContractName.fromString(CONTRACT_NAME),
        EntrypointName.fromString('balanceOf'),
        [
            {
                address: {
                    Account: [account],
                },
                token_id: '',
            },
        ],
        new Uint8Array(toBuffer(BALANCEOF_FUNCTION_RAW_SCHEMA, 'base64')).buffer,
    );

    const res = await rpcClient.invokeContract({
        method: ReceiveName.fromString(`${CONTRACT_NAME}.balanceOf`),
        contract: ContractAddress.create(WCCD_CONTRACT_INDEX, CONTRACT_SUB_INDEX),
        parameter: param,
    });
    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${CONTRACT_NAME}.balanceOf' of contract '${WCCD_CONTRACT_INDEX}' failed`,
        );
    }
    // The return value is an array. The value stored in the array starts at position 4 of the return value.
    return BigInt(leb.decodeULEB128(toBuffer(ReturnValue.toHexString(res.returnValue).slice(4), 'hex'))[0]);
}

function addWCCDToWallet(
    _accountAddress: string,
    connection: BrowserWalletConnector,
    tokenIds: string[],
    contractAddressSource: number | bigint,
    contractSubindex: number | bigint,
) {
    const accountAddress = AccountAddress.fromBase58(_accountAddress);
    const contractAddress = ContractAddress.create(contractAddressSource, contractSubindex);
    return connection.client.addCIS2Tokens(accountAddress, tokenIds, contractAddress);
}

interface ConnectionProps {
    walletConnectionProps: WalletConnectionProps;
    wCCDContractIndex: bigint;
}

export default function wCCD(props: ConnectionProps) {
    const { walletConnectionProps, wCCDContractIndex } = props;

    const { network, activeConnectorType, activeConnector, activeConnectorError, connectedAccounts, genesisHashes } =
        walletConnectionProps;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);

    const [admin, setAdmin] = useState<string>();
    const [adminError, setAdminError] = useState('');
    const [accountExistsOnNetwork, setAccountExistsOnNetwork] = useState(true);

    const grpcClient = useGrpcClient(network);

    useEffect(() => {
        // Update admin contract.
        if (grpcClient && connection) {
            viewAdmin(grpcClient, wCCDContractIndex)
                .then((a) => {
                    setAdmin(a);
                    setAdminError('');
                })
                .catch((e) => setAdminError((e as Error).message));
        }
    }, [grpcClient, connection]);

    const [isWrapping, setIsWrapping] = useState(true);
    const [hash, setHash] = useState('');
    const [transactionError, setTransactionError] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [amountAccount, setAmountAccount] = useState<bigint>();
    const [amountAccountError, setAmountAccountError] = useState('');
    const inputValue = useRef<HTMLInputElement | null>(null);
    const [receiver, setReceiver] = useState(account);

    const [rpcGenesisHash, setRpcGenesisHash] = useState<string>();
    const [rpcError, setRpcError] = useState('');

    // Sync connected account to receiver input
    useEffect(() => {
        if (account !== undefined) {
            setReceiver(account);
        }
    }, [account]);

    useEffect(() => {
        if (grpcClient && connection && account) {
            updateWCCDBalanceAccount(grpcClient, account, wCCDContractIndex)
                .then((a) => {
                    setAmountAccount(a);
                    setAmountAccountError('');
                })
                .catch((e) => setAmountAccountError((e as Error).message));
        } else {
            // No active connection or it doesn't have an associated account: Reset all transactions and RPC results.
            setAmountAccount(undefined);
            setAmountAccountError('');
            setAdmin(undefined);
            setAdminError('');
            setHash('');
            setTransactionError('');
        }
    }, [grpcClient, connection, account, isFlipped]);

    useEffect(() => {
        if (grpcClient && connection && account) {
            setRpcGenesisHash(undefined);
            grpcClient
                .getConsensusStatus()
                .then((status) => status.genesisBlock)
                .then((genHash) => {
                    setRpcGenesisHash(BlockHash.toHexString(genHash));
                    setRpcError('');
                })
                .catch((e) => {
                    setRpcGenesisHash(undefined);
                    setRpcError((e as Error).message);
                });
        }
    }, [grpcClient, connection, account]);

    useEffect(() => {
        if (grpcClient && connection && account) {
            setAccountExistsOnNetwork(true);
            grpcClient
                .getAccountInfo(AccountAddress.fromBase58(account))
                .then((returnValue) => {
                    if (returnValue === null) {
                        setAccountExistsOnNetwork(false);
                        setRpcError('');
                    }
                })
                .catch((e) => {
                    setAccountExistsOnNetwork(false);
                    setRpcError((e as Error).message);
                });
        }
    }, [grpcClient, connection, account]);

    const [isWaitingForTransaction, setWaitingForUser] = useState(false);
    return (
        <>
            <h1>
                {network.name === 'testnet' ? (
                    <p style={{ color: 'white' }}>TESTNET</p>
                ) : (
                    <p style={{ color: 'red' }}>MAINNET</p>
                )}
            </h1>

            <h1 className="header">CCD &#8644; wCCD Smart Contract</h1>
            <h3>Wrap and unwrap your CCDs and wCCDs on the Concordium {network.name}</h3>
            <div style={blackCardStyle}>
                <div>
                    <WalletConnectionTypeButton
                        buttonStyle={ButtonStyle}
                        disabledButtonStyle={ButtonStyleDisabled}
                        connectorType={BROWSER_WALLET}
                        connectorName="Browser Wallet"
                        setWaitingForUser={setWaitingForUser}
                        connection={connection}
                        {...walletConnectionProps}
                    />
                    <WalletConnectionTypeButton
                        buttonStyle={ButtonStyle}
                        disabledButtonStyle={ButtonStyleDisabled}
                        connectorType={WALLET_CONNECT}
                        connectorName="Wallet Connect"
                        setWaitingForUser={setWaitingForUser}
                        connection={connection}
                        {...walletConnectionProps}
                    />
                </div>
                {(!accountExistsOnNetwork ||
                    !!(rpcGenesisHash && rpcGenesisHash !== network.genesisHash) ||
                    (genesisHash && genesisHash !== network.genesisHash)) && (
                    <p style={{ color: 'red' }}>
                        If you use a browser wallet, please ensure that your browser wallet is connected to network `
                        {network.name}` and you have an account in that wallet that is connected to this website. If you
                        use a mobile wallet, please ensure that you use the `{network.name}` mobile wallet app and you
                        have an account in that wallet that is connected to this website.
                    </p>
                )}
                {rpcError && <div style={{ color: 'red' }}>Error: {rpcError}.</div>}
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
                                        `https://${
                                            network.name === 'testnet' ? `testnet.` : ``
                                        }ccdscan.io/?dcount=1&dentity=account&daddress=${account}`,
                                        '_blank',
                                        'noopener,noreferrer',
                                    );
                                }}
                            >
                                {account}
                            </button>
                            <div className="text">wCCD Balance of connected account</div>
                            <div className="containerSpaceBetween">
                                {amountAccountError && <div style={{ color: 'red' }}>{amountAccountError}.</div>}
                                <div className="largeText">
                                    {!amountAccountError && amountAccount === undefined && <i>N/A</i>}
                                    {!amountAccountError &&
                                        amountAccount !== undefined &&
                                        Number(amountAccount) / 1000000}
                                </div>
                                <button
                                    className="buttonInvisible"
                                    type="button"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    {isFlipped ? (
                                        <RefreshIcon
                                            style={{ transform: 'rotate(90deg)' }}
                                            height="20px"
                                            width="20px"
                                        />
                                    ) : (
                                        <RefreshIcon height="20px" width="20px" />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="containerSwitch">
                    <div className="largeText">CCD &nbsp; &nbsp; </div>
                    <button className="switch" type="button" onClick={() => setIsWrapping(!isWrapping)}>
                        {isWrapping ? (
                            <ArrowIcon
                                style={{ padding: '2px 2px 0px 0px', borderRadius: '5' }}
                                height="20px"
                                width="20px"
                            />
                        ) : (
                            <ArrowIcon
                                style={{ padding: '2px 2px 0px 0px', borderRadius: '5', transform: 'scaleX(-1)' }}
                                height="20px"
                                width="20px"
                            />
                        )}
                    </button>
                    <div className="largeText">&nbsp; &nbsp; wCCD</div>
                </div>
                <label>
                    <input
                        className="input"
                        style={InputFieldStyle}
                        type="number"
                        placeholder="0.000000"
                        ref={inputValue}
                    />
                    {account !== undefined && (
                        <>
                            <p style={{ marginBottom: 0 }}>
                                Account receiving the {isWrapping ? 'wrapped' : 'unwrapped'} CCD
                            </p>
                            <input
                                className="input"
                                style={InputFieldStyle}
                                type="text"
                                placeholder="Specify receiving account address"
                                value={receiver}
                                onChange={(e) => setReceiver(e.target.value)}
                            />
                        </>
                    )}
                    {!connection ? (
                        <button style={ButtonStyleDisabled} type="button" disabled>
                            Waiting for connection...
                        </button>
                    ) : (
                        <button
                            style={account === undefined ? ButtonStyleDisabled : ButtonStyle}
                            type="button"
                            disabled={account === undefined}
                            onClick={() => {
                                if (
                                    inputValue.current === undefined ||
                                    inputValue.current?.valueAsNumber === undefined
                                ) {
                                    window.alert(
                                        'Input a number into the CCD/wCCD amount field with max 6 decimal places.',
                                    );
                                    return;
                                }

                                const input = inputValue.current?.valueAsNumber;
                                // Amount needs to be in WEI
                                const amount = round(multiply(input, 1000000));

                                if (connection && account && grpcClient) {
                                    setHash('');
                                    setTransactionError('');
                                    setWaitingForUser(true);
                                    const tx = (isWrapping ? wrap : unwrap)(
                                        connection,
                                        grpcClient,
                                        account,
                                        wCCDContractIndex,
                                        CONTRACT_SUB_INDEX,
                                        amount,
                                        receiver,
                                    );
                                    tx.then(setHash)
                                        .catch((err) => setTransactionError((err as Error).message))
                                        .finally(() => setWaitingForUser(false));
                                }
                            }}
                        >
                            {isWrapping ? 'Wrap' : 'Unwrap'}
                        </button>
                    )}
                    {connection instanceof BrowserWalletConnector && activeConnectorType === BROWSER_WALLET && (
                        <button
                            style={account === undefined ? ButtonStyleDisabled : ButtonStyle}
                            type="button"
                            disabled={account === undefined}
                            onClick={() => {
                                if (account) {
                                    void addWCCDToWallet(
                                        account,
                                        connection,
                                        [''],
                                        wCCDContractIndex,
                                        CONTRACT_SUB_INDEX,
                                    );
                                }
                            }}
                        >
                            Add Token to wallet
                        </button>
                    )}
                </label>
                {connection && (
                    <>
                        <p>
                            <div>Transaction status{hash === '' ? '' : ' (May take a moment to finalize)'}</div>
                            {!hash && transactionError && (
                                <div style={{ color: 'red' }}>Error: {transactionError}.</div>
                            )}
                            {!hash && !transactionError && <div className="loadingText">None</div>}
                            {hash && (
                                <>
                                    <button
                                        className="link"
                                        type="button"
                                        onClick={() => {
                                            window.open(
                                                `https://${
                                                    network.name === 'testnet' ? `testnet.` : ``
                                                }ccdscan.io/?dcount=1&dentity=transaction&dhash=${hash}`,
                                                '_blank',
                                                'noopener,noreferrer',
                                            );
                                        }}
                                    >
                                        {hash}
                                    </button>
                                    <br />
                                </>
                            )}
                        </p>
                        <p>
                            The admin of the wCCD smart contract instance is
                            <br />
                            {adminError && <div style={{ color: 'red' }}>{adminError}.</div>}
                            {!adminError && admin === undefined && <div className="loadingText">Loading...</div>}
                            {!adminError && admin !== undefined && (
                                <button
                                    className="link"
                                    type="button"
                                    onClick={() => {
                                        window.open(
                                            `https://${
                                                network.name === 'testnet' ? `testnet.` : ``
                                            }ccdscan.io/?dcount=1&dentity=account&daddress=${admin}`,
                                            '_blank',
                                            'noopener,noreferrer',
                                        );
                                    }}
                                >
                                    {admin}
                                </button>
                            )}
                        </p>
                    </>
                )}
            </div>
        </>
    );
}

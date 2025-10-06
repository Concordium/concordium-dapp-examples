// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import Switch from 'react-switch';
import {
    toBuffer,
    deserializeReceiveReturnValue,
    serializeUpdateContractParameters,
    ConcordiumGRPCClient,
    ContractName,
    EntrypointName,
    ContractAddress,
    ReceiveName,
    ReturnValue,
} from '@concordium/web-sdk';
import sha256 from 'sha256';
import { useGrpcClient, TESTNET, WalletConnectionProps, useConnection, useConnect } from '@concordium/react-components';
import { version } from '../package.json';

import { register } from './utils';
import {
    E_SEALING_CONTRACT_NAME,
    E_SEALING_CONTRACT_INDEX,
    E_SEALING_RAW_SCHEMA,
    CONTRACT_SUB_INDEX,
    BROWSER_WALLET,
    WALLET_CONNECT,
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

interface ViewFile {
    timestamp: string | null;
    witness: string | null;
}

async function viewFile(rpcClient: ConcordiumGRPCClient, fileHashHex: string): Promise<ViewFile> {
    const param = serializeUpdateContractParameters(
        ContractName.fromString(E_SEALING_CONTRACT_NAME),
        EntrypointName.fromString('getFile'),
        fileHashHex,
        new Uint8Array(toBuffer(E_SEALING_RAW_SCHEMA, 'base64')).buffer,
    );

    const res = await rpcClient.invokeContract({
        method: ReceiveName.fromString(`${E_SEALING_CONTRACT_NAME}.getFile`),
        contract: ContractAddress.create(E_SEALING_CONTRACT_INDEX, CONTRACT_SUB_INDEX),
        parameter: param,
    });

    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(
            `RPC call 'invokeContract' on method '${E_SEALING_CONTRACT_NAME}.view' of contract '${E_SEALING_CONTRACT_INDEX}' failed`,
        );
    }

    const returnValues = deserializeReceiveReturnValue(
        new Uint8Array(ReturnValue.toBuffer(res.returnValue)).buffer,
        new Uint8Array(toBuffer(E_SEALING_RAW_SCHEMA, 'base64')).buffer,
        ContractName.fromString(E_SEALING_CONTRACT_NAME),
        EntrypointName.fromString('getFile'),
        2,
    ) as { Some: ViewFile[] };

    if (returnValues.Some !== undefined) {
        return returnValues.Some[0];
    }
    return { timestamp: null, witness: null };
}

export default function SEALING(props: WalletConnectionProps) {
    const { network, activeConnectorType, activeConnector, activeConnectorError, connectedAccounts, genesisHashes } =
        props;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, isConnecting, connectError } = useConnect(activeConnector, setConnection);
    const grpcClient = useGrpcClient(TESTNET);

    const [isLoading, setLoading] = useState(false);

    const [getFileError, setGetFileError] = useState('');
    const [fileHashHex, setFileHashHex] = useState('');

    const [selectedFile, setSelectedFile] = useState<File>();

    const [witness, setWitness] = useState<string | null>('');
    const [timestamp, setTimestamp] = useState<string | null>('');

    const changeHandler = (event: ChangeEvent) => {
        const test = event.target as HTMLInputElement;
        if (test.files) {
            const file = test.files[0];
            setSelectedFile(file);
        }
    };

    useEffect(() => {
        // View file record.
        if (grpcClient && fileHashHex !== '') {
            viewFile(grpcClient, fileHashHex)
                .then((record) => {
                    setGetFileError('');
                    setTimestamp(record.timestamp);
                    setWitness(record.witness);
                })
                .catch((e) => {
                    setGetFileError((e as Error).message);
                    setTimestamp('');
                    setWitness('');
                });
        }
    }, [grpcClient, fileHashHex]);

    const [isRegisterFilePage, setIsRegisterFilePage] = useState(true);
    const [hash, setHash] = useState('');
    const [transactionError, setTransactionError] = useState('');
    const [loadingError, setLoadingError] = useState('');

    const file = useRef<HTMLInputElement | null>(null);

    const [isWaitingForTransaction, setWaitingForUser] = useState(false);
    return (
        <div style={blackCardStyle}>
            <h1 className="header">Register a file on Concordium</h1>
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
                                    'noopener,noreferrer',
                                );
                            }}
                        >
                            {account}
                        </button>
                        <br />
                        <br />
                        <div className="containerSpaceBetween">
                            <button
                                style={!isRegisterFilePage ? ButtonStyleNotSelected : ButtonStyleSelected}
                                type="button"
                                onClick={() => {
                                    setIsRegisterFilePage(true);
                                    setFileHashHex('');
                                    setWitness('');
                                    setTimestamp('');
                                    setHash('');
                                }}
                            >
                                Registration Tab
                            </button>
                            <Switch
                                onChange={() => {
                                    setIsRegisterFilePage(!isRegisterFilePage);
                                    setFileHashHex('');
                                    setWitness('');
                                    setTimestamp('');
                                    setHash('');
                                }}
                                onColor="#308274"
                                offColor="#308274"
                                onHandleColor="#174039"
                                offHandleColor="#174039"
                                checked={!isRegisterFilePage}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />
                            <button
                                style={isRegisterFilePage ? ButtonStyleNotSelected : ButtonStyleSelected}
                                type="button"
                                onClick={() => {
                                    setIsRegisterFilePage(false);
                                    setFileHashHex('');
                                    setWitness('');
                                    setTimestamp('');
                                    setHash('');
                                }}
                            >
                                Display Tab
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

            {account !== undefined && (
                <>
                    <label>
                        <p style={{ marginBottom: 0 }}>Select a file:</p>
                        <input
                            className="input"
                            style={InputFieldStyle}
                            type="file"
                            onChange={changeHandler}
                            ref={file}
                        />
                    </label>
                    <button
                        style={ButtonStyle}
                        type="button"
                        onClick={async () => {
                            try {
                                if (selectedFile !== undefined) {
                                    setFileHashHex('');
                                    setLoading(true);
                                    const arrayBuffer = await selectedFile.arrayBuffer();
                                    const byteArray = new Uint8Array(arrayBuffer);
                                    const newFileHashHex = sha256(byteArray.toString());
                                    setFileHashHex(newFileHashHex);
                                    setLoadingError('');
                                    setLoading(false);
                                } else {
                                    alert('Choose a file to compute the file hash');
                                }
                            } catch (err) {
                                setLoadingError((err as Error).message);
                            }
                        }}
                    >
                        Compute File Hash
                    </button>
                    <p style={{ marginBottom: 0 }}>File hash of selected file:</p>
                    {loadingError && <div style={{ color: 'red' }}>Error: {loadingError}.</div>}
                    {isLoading && <div className="loadingText">Loading...</div>}
                    {fileHashHex !== '' && <div className="loadingText">0x{fileHashHex}</div>}
                    <br />
                </>
            )}
            {!connection && (
                <button style={ButtonStyleDisabled} type="button" disabled>
                    Waiting for connection...
                </button>
            )}
            {connection && isRegisterFilePage && account && grpcClient && (
                <button
                    style={fileHashHex === '' ? ButtonStyleDisabled : ButtonStyle}
                    type="button"
                    disabled={fileHashHex === ''}
                    onClick={() => {
                        if (witness !== null) {
                            alert(
                                `This file hash is already registered \n${witness} (withness) \n${timestamp} (timestamp)`,
                            );
                        } else {
                            setHash('');
                            setTransactionError('');
                            setWaitingForUser(true);
                            const tx = (isRegisterFilePage ? register : register)(
                                connection,
                                grpcClient,
                                account,
                                fileHashHex,
                                E_SEALING_CONTRACT_INDEX,
                                CONTRACT_SUB_INDEX,
                            );
                            tx.then(setHash)
                                .catch((err) => setTransactionError((err as Error).message))
                                .finally(() => setWaitingForUser(false));
                        }
                    }}
                >
                    Register File Hash
                </button>
            )}
            {connection && account && (
                <p>
                    {isRegisterFilePage && (
                        <>
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
                                                `https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${hash}`,
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
                        </>
                    )}
                    {getFileError && <div style={{ color: 'red' }}>Error: {getFileError}.</div>}
                    {!isRegisterFilePage && witness !== '' && (
                        <>
                            <div>On-chain Record:</div>
                            <div className="loadingText">{witness ?? 'Not registered'} (witness)</div>
                            <div className="loadingText">{timestamp ?? 'Not registered'} (timestamp)</div>
                        </>
                    )}
                </p>
            )}
            <div>
                <br />
                Version: {version} |{' '}
                <a
                    style={{ color: 'white' }}
                    href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/eSealing/index.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    Learn more about the eSealing service here
                </a>
                <br />
            </div>
        </div>
    );
}

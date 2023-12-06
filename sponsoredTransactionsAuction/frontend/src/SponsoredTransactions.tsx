/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import {
    useGrpcClient,
    WalletConnectionProps,
    useConnection,
    useConnect,
    TESTNET,
    useWalletConnectorSelector,
} from '@concordium/react-components';

import MintTokens from './components/MintTokens';
import AddItemToAuction from './components/AddItemToAuction';
import ViewItem from './components/ViewItem';
import Bid from './components/Bid';

import { BROWSER_WALLET, REFRESH_INTERVAL } from './constants';
import { getNonceOf, getPublicKey } from './reading_from_blockchain';
import { AccountLink, TxHashLink } from './components/CCDScanLinks';
import Footer from './components/Footer';

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

    const [nextNonce, setNextNonce] = useState<number>(0);
    const [accountInfoPublicKey, setAccountInfoPublicKey] = useState('');

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
        <div className="blackCardStyle">
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
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => {
                            connect();
                        }}
                    >
                        Connect
                    </Button>
                )}
                {account && (
                    <>
                        <div className="text">Connected to</div>
                        <AccountLink account={account} />
                        <br />
                        <br />
                        <div> Your public key is: </div>
                        <div className="loadingText">{accountInfoPublicKey}</div>
                        {publicKeyError && <Alert variant="danger">Error: {publicKeyError}. </Alert>}
                        <br />
                        <div> Your next nonce is: </div>
                        <div className="loadingText">{nextNonce}</div>
                        {nextNonceError && <Alert variant="danger">Error: {nextNonceError}. </Alert>}
                    </>
                )}
                {genesisHash && genesisHash !== network.genesisHash && (
                    <Alert variant="danger">
                        Error: Unexpected genesis hash: Please ensure that your wallet is connected to the network{' '}
                        <code>{network.name}</code>.
                    </Alert>
                )}
            </div>
            {connection && account && accountInfoPublicKey && (
                <>
                    <hr />
                    <div>Transaction status{txHash === '' ? '' : ' (May take a moment to finalize)'}</div>
                    {txHash && <TxHashLink txHash={txHash} />}
                    {!txHash && !transactionError && <div className="loadingText">None</div>}
                    {!txHash && transactionError && <Alert variant="danger">Error: {transactionError}. </Alert>}
                    <br />
                    <hr />
                </>
            )}

            {connection && account !== undefined && (
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
                        txHash={txHash}
                        grpcClient={grpcClient}
                    />
                    <hr />
                    <ViewItem grpcClient={grpcClient} />
                    <hr />
                    <Bid
                        grpcClient={grpcClient}
                        connection={connection}
                        account={account}
                        setTxHash={setTxHash}
                        setTransactionError={setTransactionError}
                    />
                    <hr />

                    <Footer />
                </>
            )}
        </div>
    );
}

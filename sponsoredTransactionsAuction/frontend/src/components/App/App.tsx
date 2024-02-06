import { useCallback, useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

import {
    useGrpcClient,
    WalletConnectionProps,
    useConnection,
    useConnect,
    TESTNET,
    useWalletConnectorSelector,
} from '@concordium/react-components';
import { AccountAddress, TransactionHash } from '@concordium/web-sdk';

import MintTokens from '../MintTokens';
import AddItemToAuction from '../AddItemToAuction';
import ViewItem from '../ViewItem';
import Bid from '../Bid';
import { AccountLink, TxHashLink } from '../CCDScanLinks';
import Footer from '../Footer';

import { BROWSER_WALLET, REFRESH_INTERVAL } from '../../constants';

import { nonceOf } from '../../cis2_token_contract';
import * as Cis2MultiContract from '../../../generated/cis2_multi_cis2_multi';

/**
 * The main component that manages the wallet connection.
 * It imports and displays the four components `MintTokens`, `AddItemToAuction`, `ViewItem`, and `Bid`.
 */
export default function App(props: WalletConnectionProps) {
    const { network, activeConnectorType, activeConnector, activeConnectorError, connectedAccounts, genesisHashes } =
        props;

    const { connection, setConnection, account, genesisHash } = useConnection(connectedAccounts, genesisHashes);
    const { connect, connectError } = useConnect(activeConnector, setConnection);
    const { isConnected, select } = useWalletConnectorSelector(BROWSER_WALLET, connection, {
        ...props,
    });
    const grpcClient = useGrpcClient(TESTNET);

    const [publicKeyError, setPublicKeyError] = useState<undefined | string>(undefined);
    const [publicKey, setPublicKey] = useState<string | undefined>(undefined);

    const [nextNonceError, setNextNonceError] = useState<undefined | string>(undefined);
    const [nextNonce, setNextNonce] = useState<number | bigint>(0);

    const [txHash, setTxHash] = useState<undefined | TransactionHash.Type>(undefined);
    const [transactionError, setTransactionError] = useState<string | undefined>(undefined);

    /**
     * This function querries the nonce (CIS3 standard) of an acccount in the cis2_multi contract.
     */
    const refreshNonce = useCallback(() => {
        if (grpcClient && account) {
            const nonceOfParam: Cis2MultiContract.NonceOfParameter = [AccountAddress.fromBase58(account)];

            nonceOf(nonceOfParam)
                .then((nonceValue: Cis2MultiContract.ReturnValueNonceOf) => {
                    if (nonceValue !== undefined) {
                        setNextNonce(nonceValue[0]);
                    }
                    setNextNonceError(undefined);
                })
                .catch((e) => {
                    setNextNonceError((e as Error).message);
                    setNextNonce(0);
                });
        }
    }, [grpcClient, account]);

    useEffect(() => {
        refreshNonce();
        // Refresh the next nonce value periodically.
        const interval = setInterval(refreshNonce, REFRESH_INTERVAL.asMilliseconds());
        return () => clearInterval(interval);
    }, [refreshNonce]);

    /**
     * This function gets the public key of an account. The function can be used
     * for accounts generated in the browser and mobile wallets
     * that have just one public-private key pair in their two-level key map.
     */
    const getPublicKey = useCallback(
        (account: string | undefined) => {
            if (grpcClient && account) {
                grpcClient
                    .getAccountInfo(AccountAddress.fromBase58(account))
                    .then((res) => {
                        const publicKeyValue =
                            res?.accountCredentials[0].value.contents.credentialPublicKeys.keys[0].verifyKey;

                        if (publicKeyValue !== undefined) {
                            setPublicKey(publicKeyValue);
                        }
                        setPublicKeyError(undefined);
                    })
                    .catch((e) => {
                        setPublicKeyError((e as Error).message);
                        setPublicKey(undefined);
                    });
            }
        },
        [grpcClient],
    );

    useEffect(() => {
        // Get the publicKey record of an account from the chain.
        getPublicKey(account);
    }, [account, getPublicKey]);

    useEffect(() => {
        select();
    }, [select]);

    return (
        <div className="black-card-style">
            <h2>Explore Sponsored Transactions</h2>
            <div>
                {activeConnectorError && (
                    <>
                        <Alert variant="danger">Connector Error: {activeConnectorError}.</Alert>
                        <br />
                    </>
                )}
                {!activeConnectorError && activeConnectorType && !activeConnector && (
                    <p>
                        <i>Loading connector...</i>
                    </p>
                )}
                {connectError && (
                    <>
                        <Alert variant="danger">Connect Error: {connectError}.</Alert>
                        <br />
                    </>
                )}
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
                        <div> Your public key is: </div>
                        <div className="loading-text">{publicKey}</div>
                        {publicKeyError && <Alert variant="danger">Error: {publicKeyError}. </Alert>}
                        <br />
                        <div> Your next nonce is: </div>
                        <div className="loading-text">{nextNonce.toString()}</div>
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
            {connection && account && publicKey && (
                <>
                    <hr />
                    <div>Transaction status{txHash === undefined ? '' : ' (May take a moment to finalize)'}</div>
                    {txHash && <TxHashLink txHash={txHash} />}
                    {!txHash && !transactionError && <div className="loading-text">None</div>}

                    {!txHash && transactionError && (
                        <>
                            <br />
                            <Alert variant="danger">Error: {transactionError}. </Alert>
                        </>
                    )}
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
                        grpcClient={grpcClient}
                    />
                    <hr />
                    <ViewItem grpcClient={grpcClient} />
                    <hr />
                    <Bid
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

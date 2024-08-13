// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { getStatement, getChallenge, authorize } from './util';

interface ConnectionProps {
    verifier: string;
    account?: string;
    authToken?: string;
    setAccount: (account: string | undefined) => void;
    setAuthToken: (token: string) => void;
}

/**
 * Component that allows the user to connect with their wallet and authorize with the backend
 */
export default function Connection({ verifier, account, authToken, setAccount, setAuthToken }: ConnectionProps) {
    const handleConnect = useCallback(
        () =>
            detectConcordiumProvider()
                .then((provider) => provider.connect())
                .then(setAccount),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleAuthorize = useCallback(async () => {
        if (!account) {
            throw new Error('Unreachable');
        }
        const provider = await detectConcordiumProvider();
        const challenge = await getChallenge(verifier, account);
        const statement = await getStatement(verifier);
        const presentation = await provider.requestVerifiablePresentation(challenge, [statement]);
        const newAuthToken = await authorize(verifier, presentation);
        setAuthToken(newAuthToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    return (
        <div className="connection-banner">
            <h3>Status</h3>
            {account && (
                <>
                    Connected to{' '}
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
                        {account}{' '}
                    </button>
                    <div>
                        {!authToken && (
                            <button
                                className="connect-button"
                                type="button"
                                onClick={() => handleAuthorize().catch((e: Error) => alert(e.message))}
                            >
                                Authorize
                            </button>
                        )}
                        {authToken && <p>Authorized</p>}
                    </div>
                </>
            )}
            {!account && (
                <>
                    <p>No wallet connection</p>
                    <button className="connect-button" type="button" onClick={handleConnect}>
                        Connect
                    </button>
                </>
            )}
        </div>
    );
}

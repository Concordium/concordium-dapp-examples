import { Button } from 'react-bootstrap';
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from '../wallet-connection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    connectedAccount: string | undefined;
    connectProvider: (provider: WalletProvider) => void;
}

export function ConnectWallet(props: Props) {
    const { connectedAccount, connectProvider } = props;

    const navigate = useNavigate();

    // When account is connected, continue to the next page.
    useEffect(() => {
        if (connectedAccount) navigate('/tweetSubmission');
    }, [connectedAccount, navigate]);

    // We need the user to agree to our terms and conditions before they can connect their wallet.
    const [userAgreededToTAndC, setUserAgreededToTAndC] = useState<boolean>(false);

    return (
        <>
            <div className="centered">
                <div className="card">
                    {!userAgreededToTAndC && (
                        <>
                            <h2 className="centered white">Terms And Conditions</h2>
                            <br />
                            <div className="white">
                                By continuing, you agree to{' '}
                                <a
                                    className="customGreen"
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                                >
                                    Concordium Terms of Service
                                </a>{' '}
                                and acknowledge that you have read and understood the Concordium Privacy Policy.
                            </div>
                            <br />
                            <br />
                            <Button variant="primary" onClick={async () => setUserAgreededToTAndC(true)}>
                                Agree
                            </Button>
                        </>
                    )}
                    {userAgreededToTAndC && (
                        <>
                            <h2 className="centered white">Connect Your Wallet</h2>
                            <br />
                            <Button
                                variant="primary"
                                onClick={async () => {
                                    connectProvider(await BrowserWalletProvider.getInstance());
                                }}
                            >
                                Browser wallet
                            </Button>
                            <br />
                            <Button
                                variant="primary"
                                onClick={async () => connectProvider(await WalletConnectProvider.getInstance())}
                            >
                                Android CryptoX Wallet
                            </Button>
                            <br />
                            <Button
                                className="gray"
                                disabled={true}
                                onClick={async () => connectProvider(await WalletConnectProvider.getInstance())}
                            >
                                iOS CryptoX Wallet [Coming Soon]
                            </Button>
                            <br />
                            {connectedAccount && (
                                <>
                                    <div className="centered">Connected Account:</div>
                                    <Button
                                        variant="info"
                                        id="accountAddress"
                                        disabled={true}
                                        hidden={connectedAccount === undefined}
                                    >
                                        {connectedAccount ? connectedAccount : 'No Account Connected'}
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

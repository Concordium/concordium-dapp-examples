import { Button } from 'react-bootstrap';
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from '../wallet-connection';
import { useNavigate } from 'react-router-dom';

interface Props {
    connectedAccount: string | undefined;
    connectProvider: (provider: WalletProvider) => void;
}

export function ConnectWallet(props: Props) {
    const navigate = useNavigate();
    const { connectedAccount, connectProvider } = props;

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Connect your wallet</h2>
                <Button
                    variant="primary"
                    onClick={async () => navigate('/zkProofSubmission')}
                >
                    zkProofSubmission
                </Button>
                <Button
                    variant="primary"
                    onClick={async () => connectProvider(await BrowserWalletProvider.getInstance())}
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
                    variant="primary"
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
            </div>
        </div>
    );
}

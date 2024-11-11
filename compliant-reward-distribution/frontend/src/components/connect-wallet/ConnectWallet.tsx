import { useEffect, useState } from 'react';
import { version } from '../../../package.json';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/ConnectWallet.scss';
import BackButton from '../elements/BackButton';
import icon from '../../../public/images/Frame 41371.svg';
import icon2 from '../../../public/images/CryptoXIcon.webp';
import '../../styles/ProgressStep.scss';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from '../../wallet-connection';
import ProgressStep from '../elements/ProgressStep';
import { GENESIS_HASH } from '../../constants';

const ConnectWallet = () => {
    const navigate = useNavigate();
    const { provider, setProvider, setConnectedAccount } = useWallet();

    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);

    const [error, setError] = useState<string | undefined>(undefined);

    const connectProvider = async (provider: WalletProvider) => {
        const account = await provider.connect();
        if (account) {
            setConnectedAccount(account);
            setProvider(provider);
        } else {
            throw new Error(
                'Ensure you have a Concordium wallet that is connected with at least one account present in the wallet.',
            );
        }
    };
    useEffect(() => {
        try {
            if (provider) {
                return () => {
                    provider?.disconnect?.().then(() => provider.removeAllListeners());
                };
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [provider]);

    useEffect(() => {
        try {
            const handleAccountChange = (newAccount: string) => {
                setConnectedAccount(newAccount);
            };

            provider?.on('accountChanged', handleAccountChange);

            return () => {
                provider?.off('accountChanged', handleAccountChange);
            };
        } catch (error) {
            console.error('Error:', error);
        }
    }, [provider, setConnectedAccount]);

    return (
        <Container fluid className="d-flex flex-column min-vh-100 text-light bg-dark" style={{ position: 'relative' }}>
            <BackButton redirectURL={'/'} />
            <div className="d-flex justify-content-center mb-3">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                >
                    Version {version} ({capitalizedNetwork})
                </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <ProgressStep number={1} active={true} />
                <ProgressStep number={2} active={false} />
                <ProgressStep number={3} active={false} />
            </div>
            <Container className="connect-wallet-container text-center pt-2">
                <h1 className="connect-wallet-title">Connect your wallet</h1>
                {/* Browser Wallet */}
                <Container
                    onClick={async () => {
                        try {
                            const provider = await BrowserWalletProvider.getInstance();
                            await connectProvider(provider);
                            const genesisHash = await provider.getConnectedGenesisHash();
                            if (genesisHash != GENESIS_HASH) {
                                throw new Error(`Please change the network in the browser wallet to ${CONFIG.network}`);
                            }
                            navigate('/tweetPost');
                        } catch (error) {
                            setError((error as Error).message);
                        }
                    }}
                    className="wallet-option p-4 cursor-pointer rounded-lg"
                >
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon} alt="Browser Wallet" className="wallet-icon me-2" />
                            <span className="wallet-text">Browser Wallet</span>
                        </Col>
                    </Row>
                </Container>

                {/* Android Wallet */}
                <Container
                    onClick={async () => {
                        try {
                            await connectProvider(await WalletConnectProvider.getInstance());
                            navigate('/tweetPost');
                        } catch (error) {
                            setError((error as Error).message);
                        }
                    }}
                    className="wallet-option p-4 rounded-lg cursor-pointer mt-2"
                >
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon2} alt="Android CryptoX Wallet" className="wallet-icon me-2" />
                            <span className="wallet-text">Android CryptoX Wallet</span>
                        </Col>
                    </Row>
                </Container>

                {/* iOS Wallet */}
                <Container
                    onClick={async () => {
                        // connectProvider(await WalletConnectProvider.getInstance())
                    }}
                    className="wallet-option p-4 rounded-lg mt-2 bg-transparent border-theme"
                >
                    <Row className="align-items-center justify-content-between ">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon2} alt="iOS CryptoX Wallet" className="wallet-icon me-2" />
                            <div className="d-flex flex-column text-start">
                                <span className="wallet-text wallet-title">iOS CryptoX Wallet</span>
                                <span className="wallet-text wallet-subtitle">
                                    {'['}Coming Soon{']'}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </Container>
        </Container>
    );
};

export default ConnectWallet;

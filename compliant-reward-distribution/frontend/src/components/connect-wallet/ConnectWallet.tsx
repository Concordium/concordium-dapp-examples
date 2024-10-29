import React, { useEffect, useRef, useState, version } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/ConnectWallet.scss';
import BackButton from '../elements/BackButton';
import icon from "/images/Frame 41371.svg";
import icon2 from "/images/CryptoXIcon.webp";
import '../../styles/ProgressStep.scss';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import QRCode from "qrcode";
import { BrowserWalletProvider, WalletConnectProvider, WalletProvider } from '../../wallet-connection';

interface ProgressStepProps {
    number: number;
    active: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ number, active }) => (
    <div className="progress-step d-flex align-items-center">
        <div
            className={`step-circle d-flex align-items-center justify-content-center ${active ? 'active' : 'inactive'
                }`}
        >
            {number}
        </div>
        {number < 3 && (
            <div
                className={`step-line ${active ? 'active' : 'inactive'
                    }`}
            />
        )}
    </div>
);

const ConnectWallet = () => {
    const navigate = useNavigate();
    const { provider, connectedAccount, setProvider, setConnectedAccount } = useWallet();
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [selectedWalletOption, setSelectedWalletOption] = useState<
        string | null
    >(null);
    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);

    const connectProvider = async (provider: WalletProvider) => {
        const account = await provider.connect();
        console.log("account", account)
        if (account) {
            setConnectedAccount(account);
        }
        setProvider(provider);
        navigate('/tweetPost')
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
            const handleAccountChange = (newAccount: any) => {
                setConnectedAccount(newAccount);
            };

            provider?.on('accountChanged', handleAccountChange);

            return () => {
                provider?.off('accountChanged', handleAccountChange);
            };
        } catch (error) {
            console.error('Error:', error);
        }
    }, [provider]);


    const generateQRCode = async (walletUrl: string) => {
        try {
            const url = await QRCode.toDataURL(walletUrl);
            setQrCodeUrl(url);
        } catch (error) {
            console.error("Failed to generate QR code", error);
        }
    };
    const connectConcordiumWallet = async () => {
        connectProvider(await BrowserWalletProvider.getInstance())
    };
    const handleWalletClick = (walletName: string, walletUrl: string) => {
        if (selectedWalletOption === walletName) {
            setSelectedWalletOption(null);
            setQrCodeUrl(null);
        } else {
            setSelectedWalletOption(walletName);
            if (walletUrl) {
                generateQRCode(walletUrl);
            } else {
                setQrCodeUrl(null);
            }
        }
        if (walletName === "Browser Wallet") {
            connectConcordiumWallet()
        }
    };

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
                <Container onClick={async (e) => {
                    connectProvider(await BrowserWalletProvider.getInstance())
                }} className="wallet-option p-4 rounded-lg">
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon} alt="Browser Wallet" className="wallet-icon me-2" />
                            <span className="wallet-text">Browser Wallet</span>
                        </Col>
                        {/* <Col xs="auto" className="d-flex justify-content-end">
                            <div
                                className={`wallet-border ${selectedWalletOption === "Browser Wallet" ? "selected" : ""}`}
                            >
                                <div className={`wallet-dot ${selectedWalletOption === "Browser Wallet" ? "filled" : ""}`}></div>
                            </div>
                        </Col> */}
                    </Row>
                </Container>

                {/* Android Wallet */}
                <Container onClick={async (e) => {
                    connectProvider(await WalletConnectProvider.getInstance())
                }} className="wallet-option p-4 rounded-lg cursor-pointer mt-2">
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon2} alt="Android CryptoX Wallet" className="wallet-icon me-2" />
                            <span className="wallet-text">Android CryptoX Wallet</span>
                        </Col>
                        {/* <Col xs="auto" className="d-flex justify-content-end">
                            <div
                                className={`wallet-border ${selectedWalletOption === "Android CryptoX Wallet" ? "selected" : ""}`}
                            >
                                <div className={`wallet-dot ${selectedWalletOption === "Android CryptoX Wallet" ? "filled" : ""}`}></div>
                            </div>
                        </Col> */}
                    </Row>
                </Container>

                {/* iOS Wallet */}
                <Container onClick={async (e) => {
                    connectProvider(await WalletConnectProvider.getInstance())
                }} className="wallet-option p-4 rounded-lg cursor-pointer mt-2">
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex align-items-center">
                            <img src={icon2} alt="iOS CryptoX Wallet" className="wallet-icon me-2" />
                            <span className="wallet-text">iOS CryptoX Wallet</span>
                        </Col>
                        {/* <Col xs="auto" className="d-flex justify-content-end">
                            <div
                                className={`wallet-border ${selectedWalletOption === "iOS CryptoX Wallet" ? "selected" : ""}`}
                            >
                                <div className={`wallet-dot ${selectedWalletOption === "iOS CryptoX Wallet" ? "filled" : ""}`}></div>
                            </div>
                        </Col> */}
                    </Row>
                </Container>

            </Container>

        </Container>
    );
};

export default ConnectWallet;

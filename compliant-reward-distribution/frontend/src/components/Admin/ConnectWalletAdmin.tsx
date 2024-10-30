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


const ConnectWalletAdmin = () => {
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
        <Container fluid className="d-flex flex-column text-light bg-dark" style={{ position: 'relative' }}>
            <div className="d-flex align-items-center">
                <BackButton redirectURL={'/'} />
                <Button onClick={(e) => {
                    if (CONFIG.network === "testnet") {
                        window.open(`https://testnet.ccdscan.io/?dcount=1&dentity=account&daddress=${connectedAccount}`, "_blank")
                    } else {
                        window.open(`https://ccdscan.io/?dcount=1&dentity=account&daddress=${connectedAccount}`, "_blank")
                    }
                }} variant="primary" className="ms-auto mt-2 account-button text-black bg-theme">
                    {connectedAccount
                        ? connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)
                        : 'No Account Connected'}
                </Button>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                >
                    Version {version} ({capitalizedNetwork})
                </a>
            </div>
            {connectedAccount ? null :
                <Container className="connect-wallet-container text-center pt-2">
                    <h1 className="connect-wallet-title">Connect your wallet</h1>
                    {/* Browser Wallet */}
                    <Container onClick={async (e) => {
                        connectProvider(await BrowserWalletProvider.getInstance())
                    }} className="wallet-option cursor-pointer p-4 rounded-lg">
                        <Row className="align-items-center justify-content-between">
                            <Col xs="auto" className="d-flex align-items-center">
                                <img src={icon} alt="Browser Wallet" className="wallet-icon me-2" />
                                <span className="wallet-text">Browser Wallet</span>
                            </Col>
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
                        </Row>
                    </Container>
                </Container>
            }
        </Container>
    );
};

export default ConnectWalletAdmin;

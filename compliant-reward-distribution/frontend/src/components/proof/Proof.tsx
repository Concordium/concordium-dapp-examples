import React, { useRef, useState, version } from 'react';

import BackButton from '../elements/BackButton';
import profileImage from "/images/Ellipse 1.svg";
import verifyImage from "/images/Verified.svg";
import '../../styles/ConnectWallet.scss';
import '../../styles/ProgressStep.scss';
import '../../styles/Proof.scss';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

import { Check } from "lucide-react";
import SkeletonLoading from './Skeleton';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { useWallet } from '../../context/WalletContext';
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

const Proof = () => {
    const navigate = useNavigate();
    const { connectedAccount } = useWallet();
    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);
    const [verifyProgress, setVerifyProgress] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setVerifyProgress(true);
        }, 1000);
    };
    return (
        <Container fluid className="d-flex flex-column min-vh-100 text-light bg-dark" style={{ position: 'relative' }}>
            {isLoading ? (
                <SkeletonLoading />
            ) : (
                <>
                    {/* <BackButton redirectURL={'/tweetPost'} /> */}
                    <div className="d-flex align-items-center">
                        <BackButton redirectURL={'/tweetPost'} />
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
                    <div className="d-flex justify-content-center mb-3">
                        <ProgressStep number={1} active={true} />
                        <ProgressStep number={2} active={true} />
                        <ProgressStep number={3} active={false} />
                    </div>
                    <Container className="connect-wallet-container text-center pt-2">
                        <h1 className="connect-wallet-title">Proof of eligibility</h1>
                        <div className="verification-container mb-5">
                            {verifyProgress ? (
                                <Container className="user-info-container w-339 space-y-2">
                                    <Row>
                                        <Col>
                                            <p className="label-text">User name</p>
                                            <p className="info-text border-bottom">John Douglas</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="label-text">Passport number</p>
                                            <p className="info-text border-bottom">US991298</p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <p className="label-text">Age</p>
                                            <div className="d-flex align-items-center border-bottom">
                                                <Check size={20} className="text-green mr-2" />
                                                <p className="info-text mt-3">Over 18 years old</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <p className="label-text mt-2">Your country</p>
                                            <div className="d-flex align-items-center border-bottom">
                                                <Check size={20} className="text-green mr-2" />
                                                <p className="info-text">Eligible nationality</p>
                                            </div>
                                        </Col>
                                    </Row>

                                </Container>
                            ) : (
                                <div className="w-full">
                                    <p className="text-gray-300 text-[12px] font-normal font-satoshi-sans mb-[8px]">
                                        To collect your reward, you must verify the below data
                                        <br /> using your ConcordiumID.
                                    </p>

                                    <ul className="space-y-2 text-gray-300">
                                        <li className="verification-list-item">
                                            <span className="bullet"></span>
                                            Your full name
                                        </li>
                                        <li className="verification-list-item">
                                            <span className="bullet"></span>
                                            Your ID number
                                        </li>
                                        <li className="verification-list-item">
                                            <span className="bullet"></span>
                                            That you are over 18 years old
                                        </li>
                                        <li className="verification-list-item">
                                            <span className="bullet"></span>
                                            That your nationality is eligible *
                                        </li>
                                    </ul>


                                    <p className="note-text text-[12px] font-normal pt-[29px] text-gray-400 font-satoshi-sans">
                                        * Not eligible nationalities are: USA, Iran, North Korea,
                                        occupied regions of Ukraine.
                                    </p>
                                </div>
                            )}
                        </div>

                    </Container>
                    <div className="d-flex justify-content-center mb-3"> {/* Flex container to center the button */}
                        {verifyProgress ?
                            <Button
                                onClick={(e) => {
                                    navigate('/submission')
                                }}
                                variant="light"
                                className="px-5 py-3 rounded-pill bg-white text-black fw-semibold"
                                style={{ width: "239px", height: "56px" }}
                            >
                                Finish
                            </Button>
                            :
                            <Button
                                onClick={(e) => {
                                    handleVerify()
                                }}
                                variant="light"
                                className="px-5 py-3 rounded-pill bg-white text-black fw-semibold"
                                style={{ width: "239px", height: "56px" }}
                            >
                                Verify
                            </Button>
                        }
                    </div>
                </>
            )}
        </Container>
    );
};

export default Proof;

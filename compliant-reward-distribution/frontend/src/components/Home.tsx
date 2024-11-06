import { useState } from 'react';
import { version } from '../../package.json';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss';

export default function Component() {
    const navigate = useNavigate();
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);
    const [step, setStep] = useState<number>(1);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <Container fluid className="d-flex flex-column min-vh-100 text-light bg-dark" style={{ position: 'relative' }}>
            <div className="d-flex justify-content-center mb-3">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                >
                    Version {version} ({capitalizedNetwork})
                </a>
            </div>
            {step === 1 ? (
                <main className="flex-grow-1 d-flex flex-column align-items-center pt-5 mt-4">
                    <div className="text-center">
                        <h1 className="display-6 text-theme mb-4" style={{ fontFamily: 'var(--font-satoshi-sans)' }}>
                            Concordium Rewards
                        </h1>

                        <div className="position-relative d-flex align-items-center justify-content-center mb-5">
                            <div className="position-relative">
                                <img
                                    src="../../images/Frame 1983.svg"
                                    alt="twitter"
                                    width={75}
                                    height={75}
                                    className="text-dark position-absolute"
                                    style={{ left: '-50px' }} // Positioning the first image to the left
                                />
                                <img
                                    src="../../images/Frame 1984.svg"
                                    alt="Concordium logo"
                                    width={75}
                                    height={75}
                                    className="text-secondary"
                                />
                            </div>
                        </div>

                        <div>
                            <h2
                                className="h4 text-start text-theme mb-3"
                                style={{ fontFamily: 'var(--font-satoshi-sans)' }}
                            >
                                Create post on X and get 1,000 CCD:
                            </h2>
                            <ol
                                className="text-start ps-3"
                                style={{ fontFamily: 'var(--font-satoshi-sans)', fontSize: '14px', fontWeight: 400 }}
                            >
                                <li className="mb-3">Connect your wallet</li>
                                <li className="mb-3">
                                    Post about Concordium on X (Twitter) with the #Concordium
                                    <br />
                                    <span style={{ paddingLeft: '16px' }}>hashtag</span>
                                </li>
                                <li>Confirm that you are of eligible age and nationality</li>
                            </ol>
                        </div>

                        {/* Get Started Button */}
                        <div className="d-flex justify-content-center mt-5 mb-3">
                            {' '}
                            {/* Flex container to center the button */}
                            <Button
                                onClick={() => {
                                    setStep(2);
                                }}
                                variant="light"
                                className="px-5 py-3 rounded-pill bg-white text-black fw-semibold"
                                style={{ width: '239px', height: '56px' }}
                            >
                                Get started
                            </Button>
                        </div>
                    </div>
                </main>
            ) : (
                <main className="flex-grow-1 d-flex flex-column align-items-center pt-5 mt-4">
                    <div className="text-center">
                        <h1 className="display-6 text-theme mb-4" style={{ fontFamily: 'var(--font-satoshi-sans)' }}>
                            Terms And Conditions
                        </h1>
                    </div>
                    <div className="checkbox-container">
                        <input onChange={handleCheckboxChange} type="checkbox" id="terms" className="checkbox-input" />
                        <label htmlFor="terms" className="checkbox-label">
                            By continuing, you agree to{' '}
                            <a href="https://www.concordium.com/privacy-policy" target="_blank" rel="noreferrer">
                                Concordium Terms of Service
                            </a>
                            and acknowledge that you have read and understand the Concordium Privacy Policy.
                        </label>
                    </div>
                    {/* Get Started Button */}
                    <div className="d-flex justify-content-center mt-5 mb-3">
                        {' '}
                        {/* Flex container to center the button */}
                        <Button
                            onClick={() => {
                                if (isChecked) {
                                    navigate('/connectWallet');
                                }
                            }}
                            variant="light"
                            className="px-5 py-3 rounded-pill bg-white text-black fw-semibold"
                            style={{ width: '239px', height: '56px' }}
                        >
                            Agree
                        </Button>
                    </div>
                </main>
            )}
        </Container>
    );
}

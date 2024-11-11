import { useState } from 'react';
import { version } from '../../../package.json';
import BackButton from '../elements/BackButton';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.scss';

export default function TermsAndConditions() {
    const navigate = useNavigate();
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <Container fluid className="d-flex flex-column min-vh-100 text-light bg-dark" style={{ position: 'relative' }}>
            {/* Back Button with Left Arrow Icon */}
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
        </Container>
    );
}

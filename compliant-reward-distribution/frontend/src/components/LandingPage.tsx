import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="centered">
            <div className="card">
                <h1 className="centered customGreen">Concordium Rewards</h1>

                <br />

                <div className="centered">
                    <Image src="/assets/LandingPage.png" alt="Concordium Logo" fluid />
                </div>

                <br />

                <h2 className="centered customGreen">Create post on X and get 1000 CCD rewards:</h2>

                <br />
                <br />

                <ul className="noBullets white">
                    <li>1. Connect your wallet</li>
                    <li>2. Post about Concordium on X (Twitter) with the #Concordium hashtag</li>
                    <li>3. Confirm that you are of eligible age and nationality.</li>
                </ul>

                <br />

                <Button variant="primary" type="submit" onClick={async () => navigate('/connectWallet')}>
                    Get Started
                </Button>

                <br />
            </div>
        </div>
    );
}

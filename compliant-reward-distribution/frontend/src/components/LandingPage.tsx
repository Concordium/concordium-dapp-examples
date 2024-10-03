import { Button, Image } from 'react-bootstrap';

export function LandingPage() {
    return (
        <div className="centered">
            <div className="card">
                <h1 className="centered h1">Concordium Rewards</h1>

                <br />

                <div className="centered">
                    <Image src="./src/pictures/LandingPage.png" alt="Concordium Logo" fluid />
                </div>

                <br />

                <h2 className="centered h2">Create post on X and get 1000 CCD rewards:</h2>

                <br />
                <br />

                <ul className="list">
                    <li>1. Connect your wallet</li>
                    <li>2. Post about Concordium on X (Twitter) with the #Concordium hashtag</li>
                    <li>3. Confirm that you are of eligible age and nationality.</li>
                </ul>

                <br />

                <Button variant="primary" type="submit" onClick={async () => (window.location.href = 'connectWallet')}>
                    Get Started
                </Button>

                <br />
            </div>
        </div>
    );
}

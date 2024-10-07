import { Button } from 'react-bootstrap';

export function FinalPage() {
    return (
        <div className="centered">
            <div className="card">
                <h1 className="centered customGreen">You are awesome!</h1>

                <br />

                <div className="white">
                    We will check your submission and send the reward straight to your wallet. In the meantime stay
                    updated with the latest from Concordium.
                </div>

                <br />

                <Button
                    variant="primary"
                    type="submit"
                    onClick={async () => (window.location.href = 'https://www.concordium.com/')}
                >
                    Go to Concordium.com
                </Button>

                <br />
            </div>
        </div>
    );
}

import { Card, Container, Spinner } from 'react-bootstrap';

export function Loader() {
    return (
        <Container className="py-5">
            <Card>
                <Card.Body className="loader-card">
                    <Spinner animation="border" size="sm" />
                    <p className="text-secondary small mb-0">Loading Wallet provider...</p>
                </Card.Body>
            </Card>
        </Container>
    );
}

import { Card, Container } from 'react-bootstrap';

export function BlockListedMessage({ name }: { name: string }) {
    return (
        <Container className="py-5">
            <Card>
                <Card.Body>
                    <p className="text-secondary small mb-1">
                        You connected to <b>{name}</b>.
                    </p>
                    <p className="text-secondary small mb-0">This network is currently not allowed.</p>
                </Card.Body>
            </Card>
        </Container>
    );
}

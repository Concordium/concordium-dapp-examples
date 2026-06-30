import { Alert } from 'react-bootstrap';

export function ErrorMessage({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <Alert variant="danger" className="py-2 small">
            {message}
        </Alert>
    );
}

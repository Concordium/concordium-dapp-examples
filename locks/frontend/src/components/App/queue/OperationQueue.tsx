import { Alert, Button, Card, Spinner } from 'react-bootstrap';

import { ErrorMessage } from '../components/ErrorMessage';

import type { QueuedOperation, Status } from '../types';

export function OperationQueue({
    operations,
    canSubmit,
    submitStatus,
    transactionHash,
    onRemove,
    onSubmit,
}: {
    operations: QueuedOperation[];
    canSubmit: boolean;
    submitStatus: Status;
    transactionHash: string;
    onRemove: (id: number) => void;
    onSubmit: () => Promise<void>;
}) {
    return (
        <aside className="operation-queue">
            <Button className="w-100" disabled={!canSubmit || submitStatus.type === 'loading'} onClick={onSubmit}>
                {submitStatus.type === 'loading' && <Spinner animation="border" size="sm" className="me-2" />}
                Submit transaction
            </Button>
            <ErrorMessage message={submitStatus.type === 'error' ? submitStatus.message : undefined} />
            {transactionHash && (
                <Alert variant="success" className="small">
                    <span>Transaction hash</span>
                    <code className="d-block text-break">{transactionHash}</code>
                </Alert>
            )}
            <div className="queue-list">
                {operations.length === 0 && (
                    <Card className="queue-card">
                        <Card.Body>
                            <p className="text-secondary small mb-0">No operations added.</p>
                        </Card.Body>
                    </Card>
                )}
                {operations.map((operation, index) => (
                    <Card key={operation.id} className="queue-card">
                        <Card.Body>
                            <div className="queue-card-header">
                                <Card.Title>
                                    {index + 1}. {operation.type}
                                </Card.Title>
                                <Button variant="outline-secondary" size="sm" onClick={() => onRemove(operation.id)}>
                                    X
                                </Button>
                            </div>
                            <dl>
                                {operation.preview.map((field) => (
                                    <div key={field.label}>
                                        <dt>{field.label}</dt>
                                        <dd>{field.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </aside>
    );
}

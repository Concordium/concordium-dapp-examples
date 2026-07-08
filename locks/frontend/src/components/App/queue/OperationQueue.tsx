import { Alert, Button, Card, Spinner } from 'react-bootstrap';

import { shortenValue } from '../utils';

import type { QueuedOperation, Status } from '../types';

type OperationQueueStatusTone = 'muted' | 'error' | 'success' | 'warning';

interface OperationQueueStatus {
    tone: OperationQueueStatusTone;
    title: string;
    message: string;
}

const TRANSACTION_ERROR = (message: string): OperationQueueStatus => ({
    tone: 'error',
    title: 'Transaction error',
    message,
});
const SUBMITTING_TRANSACTION = (message: string): OperationQueueStatus => ({
    tone: 'muted',
    title: 'Submitting transaction',
    message,
});
const NOT_CONNECTED: OperationQueueStatus = {
    tone: 'muted',
    title: 'Wallet not connected',
    message: 'Connect Browser Wallet before submitting.',
};
const GRPC_UNAVAILABLE: OperationQueueStatus = {
    tone: 'error',
    title: 'GRPC unavailable',
    message: 'Wallet transport is not ready.',
};
const NO_OPERATIONS: OperationQueueStatus = {
    tone: 'muted',
    title: 'No operations queued',
    message: 'Add at least one operation to continue.',
};
const ESTIMATED_LOCK_ID_RECALCULATED: OperationQueueStatus = {
    tone: 'warning',
    title: 'Estimated Lock ID recalculated',
    message: 'Please ensure related operations point to the proper Lock ID.',
};
const READY_TO_SUBMIT: OperationQueueStatus = {
    tone: 'success',
    title: 'Ready to submit',
    message: 'All good! You can now submit the transaction.',
};

const formatPreviewValue = (value: string) =>
    value
        .split('\n; ')
        .map((part) => {
            if (part.length < 28) {
                return part;
            }

            return part.replace(/[1-9A-HJ-NP-Za-km-z]{36,}/g, (match) => shortenValue(match, 12, 6));
        })
        .join('\n');

const useOperationQueueStatus = ({
    operations,
    walletConnected,
    grpcAvailable,
    submitStatus,
    showEstimatedLockIdWarning,
}: {
    operations: QueuedOperation[];
    walletConnected: boolean;
    grpcAvailable: boolean;
    submitStatus: Status;
    showEstimatedLockIdWarning: boolean;
}) => {
    if (submitStatus.type === 'loading') return SUBMITTING_TRANSACTION(submitStatus.message);
    if (submitStatus.type === 'error') return TRANSACTION_ERROR(submitStatus.message);
    if (showEstimatedLockIdWarning) return ESTIMATED_LOCK_ID_RECALCULATED;
    if (!walletConnected) return NOT_CONNECTED;
    if (!grpcAvailable) return GRPC_UNAVAILABLE;
    if (!operations.length) return NO_OPERATIONS;

    return READY_TO_SUBMIT;
};

export function OperationQueue({
    operations,
    walletConnected,
    grpcAvailable,
    submitStatus,
    transactionHash,
    showEstimatedLockIdWarning,
    onRemove,
    onSubmit,
}: {
    operations: QueuedOperation[];
    walletConnected: boolean;
    grpcAvailable: boolean;
    submitStatus: Status;
    transactionHash: string;
    showEstimatedLockIdWarning: boolean;
    onRemove: (id: number) => void;
    onSubmit: () => Promise<void>;
}) {
    const canSubmit = walletConnected && grpcAvailable && operations.length > 0;
    const statusMessage = useOperationQueueStatus({
        operations,
        walletConnected,
        grpcAvailable,
        submitStatus,
        showEstimatedLockIdWarning,
    });

    return (
        <aside className="operation-queue">
            <Card className="queue-panel">
                <Card.Body>
                    <div className="submit-panel">
                        <Button
                            className="w-100"
                            disabled={!canSubmit || submitStatus.type === 'loading'}
                            onClick={onSubmit}
                        >
                            {submitStatus.type === 'loading' && (
                                <Spinner animation="border" size="sm" className="me-2" />
                            )}
                            Submit transaction
                        </Button>
                    </div>

                    <div className="queue-heading">
                        <h2>Queued operations ({operations.length})</h2>
                    </div>

                    <div className="queue-list">
                        {operations.length === 0 && (
                            <Card className="queue-card queue-card-empty">
                                <Card.Body>
                                    <p>No operations added.</p>
                                </Card.Body>
                            </Card>
                        )}
                        {operations.map((operation, index) => (
                            <Card key={operation.id} className="queue-card">
                                <Card.Body>
                                    <div className="queue-card-header">
                                        <div className="queue-title">
                                            <span className="queue-index">{index + 1}</span>
                                            <Card.Title>{operation.type}</Card.Title>
                                        </div>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            aria-label={`Remove ${operation.type}`}
                                            onClick={() => onRemove(operation.id)}
                                        >
                                            X
                                        </Button>
                                    </div>
                                    <dl>
                                        {operation.preview.map((field) => (
                                            <div key={field.label}>
                                                <dt>{field.label}</dt>
                                                <dd title={field.value}>{formatPreviewValue(field.value)}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

                    {transactionHash && (
                        <Alert variant="success" className="transaction-hash small">
                            <span>Transaction hash</span>
                            <code className="d-block text-break">{transactionHash}</code>
                        </Alert>
                    )}

                    <div className={`queue-status queue-status-${statusMessage.tone}`}>
                        <span className="queue-status-icon" aria-hidden="true">
                            {statusMessage.tone === 'success' ? '✓' : '!'}
                        </span>
                        <div>
                            <h3>{statusMessage.title}</h3>
                            <p>{statusMessage.message}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </aside>
    );
}

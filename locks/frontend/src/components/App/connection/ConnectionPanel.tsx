import type { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { Button, Card } from 'react-bootstrap';

import { ErrorMessage } from '../components/ErrorMessage';
import { Section } from '../components/Section';

import type { Status } from '../types';

export function ConnectionPanel({
    provider,
    connectedAccount,
    status,
    onConnect,
}: {
    provider?: WalletApi;
    connectedAccount?: string | null;
    status: Status;
    onConnect: () => Promise<void>;
}) {
    return (
        <Section title="Connection">
            <Card>
                <Card.Body className="connection-panel">
                    <Button onClick={onConnect} disabled={!provider || status.type === 'loading'}>
                        {status.type === 'loading' ? 'Connecting...' : 'Connect Browser Wallet'}
                    </Button>
                    <div className="connection-details">
                        <div>
                            <span>Connected Account</span>
                            <code>{connectedAccount ?? '-'}</code>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
        </Section>
    );
}

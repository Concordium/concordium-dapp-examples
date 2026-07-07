import type { WalletApi } from '@concordium/browser-wallet-api-helpers';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

import { ErrorMessage } from '../components/ErrorMessage';
import { Section } from '../components/Section';

import type { Status } from '../types';

function useCopy(connectedAccount?: string | null): [string, () => void] {
    const COPY_RESET_DELAY_MS = 3000;
    const INITIAL_TEXT = 'Copy';
    const [copyText, setCopyText] = useState(INITIAL_TEXT);

    const copyAccount = () => {
        if (connectedAccount) {
            void navigator.clipboard?.writeText(connectedAccount);
            setCopyText('Copied');
            setTimeout(() => {
                setCopyText(INITIAL_TEXT);
            }, COPY_RESET_DELAY_MS);
        }
    };

    return [copyText, copyAccount];
}

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
    const [copyText, copyAccount] = useCopy(connectedAccount);

    return (
        <Section title="Connection">
            <Card>
                <Card.Body className="connection-panel">
                    <div className="connection-action">
                        <Button onClick={onConnect} disabled={!provider || status.type === 'loading'}>
                            <span className="button-icon" aria-hidden="true" />
                            {status.type === 'loading' ? 'Connecting...' : 'Connect Browser Wallet'}
                        </Button>
                    </div>
                    <div className="connection-detail">
                        <span>Connected Account</span>
                        <div className="account-value">
                            <code title={connectedAccount ?? undefined}>
                                {connectedAccount ? connectedAccount : '-'}
                            </code>
                            {connectedAccount && (
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    size="sm"
                                    aria-label="Copy connected account"
                                    onClick={copyAccount}
                                >
                                    {copyText}
                                </Button>
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
        </Section>
    );
}

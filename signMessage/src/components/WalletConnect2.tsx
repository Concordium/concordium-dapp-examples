import SignClient from '@walletconnect/sign-client';
import { Alert, Button } from 'react-bootstrap';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { SessionTypes } from '@walletconnect/types';
import { CHAIN_ID } from '../config';

async function connect(client: SignClient, setConnectedSession: (session: SessionTypes.Struct) => void) {
    try {
        const { uri, approval } = await client.connect({
            requiredNamespaces: {
                ccd: {
                    methods: ['sign_message'],
                    chains: [CHAIN_ID],
                    events: ['chain_changed', 'accounts_changed'],
                },
            },
        });

        // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
        if (uri) {
            console.log('opening QR code modal');
            QRCodeModal.open(uri, () => {
                console.debug('QR code modal closed');
            });
        }

        // Await session approval from the wallet.
        const session = await approval();
        setConnectedSession(session);
    } finally {
        // Close the QRCode modal in case it was open.
        QRCodeModal.close();
    }
}

async function disconnect(client: SignClient, session: SessionTypes.Struct, clearConnectedSession: () => void) {
    const { topic } = session;
    const reason = { code: 1337, message: 'something something reason' };
    await client.disconnect({ topic, reason });
    clearConnectedSession();
}

interface Props {
    client: SignClient;
    connectedSession?: SessionTypes.Struct;
    setConnectedSession: (session: SessionTypes.Struct | undefined) => void;
    connectionError: string | undefined;
}

export default function WalletConnect2(props: Props) {
    const { client, connectedSession, setConnectedSession, connectionError } = props;

    return (
        <>
            {!connectedSession && (
                <Button onClick={() => connect(client, setConnectedSession).catch(console.error)}>Connect</Button>
            )}
            {connectedSession && (
                <>
                    <Alert variant="success">
                        Connected:
                        <ul>
                            <li>Topic: {connectedSession.topic}</li>
                            <li>Relay protocol: {connectedSession.relay.protocol}</li>
                            <li>Relay data: {connectedSession.relay.data}</li>
                            <li>Expiry: {connectedSession.expiry}</li>
                            <li>Acknowledged: {connectedSession.acknowledged}</li>
                            <li>Controller: {connectedSession.controller}</li>
                            <li>
                                Namespaces:
                                <ul>
                                    {Object.entries(connectedSession.namespaces).map(([key, ns]) => {
                                        return (
                                            <li key={key}>
                                                Key: {key}
                                                Accounts: {ns.accounts.join(', ')}
                                                Methods: {ns.methods.join(', ')}
                                                Events: {ns.events.join(', ')}
                                                Extension: {JSON.stringify(ns.extension)}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                            <li>
                                Required namespaces:
                                <ul>
                                    {Object.entries(connectedSession.requiredNamespaces).map(([key, ns]) => {
                                        return (
                                            <li key={key}>
                                                Key: {key}
                                                Chains: {ns.chains.join(', ')}
                                                Methods: {ns.methods.join(', ')}
                                                Events: {ns.events.join(', ')}
                                                Extension: {JSON.stringify(ns.extension)}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                            <li>Self public key: {connectedSession.self.publicKey}</li>
                            <li>Self metadata name: {connectedSession.self.metadata.name}</li>
                            <li>Self metadata url: {connectedSession.self.metadata.url}</li>
                            <li>Self metadata icons: {connectedSession.self.metadata.icons.join(', ')}</li>
                            <li>Self metadata description: {connectedSession.self.metadata.description}</li>
                            <li>Peer public key: {connectedSession.peer.publicKey}</li>
                            <li>Peer metadata name: {connectedSession.peer.metadata.name}</li>
                            <li>Peer metadata url: {connectedSession.peer.metadata.url}</li>
                            <li>Peer metadata icons: {connectedSession.peer.metadata.icons.join(', ')}</li>
                            <li>Peer metadata description: {connectedSession.peer.metadata.description}</li>
                        </ul>
                    </Alert>
                    {connectionError && <Alert variant="danger">Ping error: {connectionError}</Alert>}
                    <Button
                        onClick={() =>
                            disconnect(client, connectedSession, () => setConnectedSession(undefined)).catch(
                                console.error,
                            )
                        }
                    >
                        Disconnect
                    </Button>
                </>
            )}
        </>
    );
}

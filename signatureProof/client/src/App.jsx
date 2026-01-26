import { useState, useEffect } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';

export default function App() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [status, setStatus] = useState({ type: 'idle', message: '' });
    const [result, setResult] = useState(null);

    useEffect(() => {
        detectConcordiumProvider()
            .then(setProvider)
            .catch(() => setStatus({ type: 'error', message: 'Concordium Wallet not found' }));
    }, []);

    const connect = async () => {
        try {
            setStatus({ type: 'loading', message: 'Connecting wallet...' });
            const acc = await provider.connect();
            setAccount(acc);
            setStatus({ type: 'idle', message: '' });
        } catch {
            setStatus({ type: 'error', message: 'Connection rejected' });
        }
    };

    const verify = async () => {
        setStatus({ type: 'loading', message: 'Requesting challenge...' });
        setResult(null);

        try {
            // 1. Get challenge from server
            const challengeRes = await fetch('/api/challenge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account }),
            });
            const { id, challenge, error: challengeError } = await challengeRes.json();
            if (challengeError) throw new Error(challengeError);

            // 2. Sign with wallet
            setStatus({ type: 'loading', message: 'Sign the message in your wallet...' });
            const signature = await provider.signMessage(account, challenge);

            // 3. Verify on server
            setStatus({ type: 'loading', message: 'Verifying signature...' });
            const verifyRes = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, account, signature }),
            });
            const data = await verifyRes.json();

            if (data.verified) {
                setResult({ success: true, account: data.account });
                setStatus({ type: 'success', message: 'Verification successful!' });
            } else {
                throw new Error(data.error || 'Verification failed');
            }
        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        }
    };

    const reset = () => {
        setResult(null);
        setStatus({ type: 'idle', message: '' });
    };

    const disconnect = () => {
        setAccount(null);
        setResult(null);
        setStatus({ type: 'idle', message: '' });
    };

    return (
        <div className="container py-5" style={{ maxWidth: 600 }}>
            <div className="text-center mb-4">
                <h1>🔐 Signature Proof</h1>
                <p className="text-secondary">Prove ownership of your Concordium account (Testnet)</p>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    {!provider ? (
                        <div className="text-center">
                            <p>Concordium Wallet not detected.</p>
                            <a 
                                href="https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg" 
                                target="_blank" 
                                rel="noopener"
                                className="btn btn-outline-primary"
                            >
                                Install Concordium Wallet
                            </a>
                        </div>
                    ) : !account ? (
                        <div className="text-center">
                            <p>Connect your wallet to begin verification.</p>
                            <button 
                                className="btn btn-primary" 
                                onClick={connect} 
                                disabled={status.type === 'loading'}
                            >
                                {status.type === 'loading' ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                        </div>
                    ) : result?.success ? (
                        <div className="text-center">
                            <div className="alert alert-success">
                                <strong>✅ Verified!</strong>
                            </div>
                            <p className="text-secondary small">You proved ownership of:</p>
                            <code className="d-block text-break mb-3">{result.account}</code>
                            <button className="btn btn-secondary me-2" onClick={reset}>
                                Verify Again
                            </button>
                            <button className="btn btn-outline-secondary" onClick={disconnect}>
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-secondary small mb-1">Connected account:</p>
                            <code className="d-block text-break mb-3">{account}</code>
                            <button
                                className="btn btn-primary me-2"
                                onClick={verify}
                                disabled={status.type === 'loading'}
                            >
                                {status.type === 'loading' ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        {status.message}
                                    </>
                                ) : (
                                    'Sign & Verify'
                                )}
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={disconnect}
                                disabled={status.type === 'loading'}
                            >
                                Disconnect
                            </button>
                        </div>
                    )}

                    {status.type === 'error' && (
                        <div className="alert alert-danger mt-3 mb-0">
                            ❌ {status.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">How it works</h5>
                    <ol className="mb-0">
                        <li><strong>Connect</strong> your Concordium Browser Wallet</li>
                        <li><strong>Sign</strong> a unique challenge message</li>
                        <li><strong>Server verifies</strong> your signature against on-chain credentials</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

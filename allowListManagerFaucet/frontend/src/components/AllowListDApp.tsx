import { useEffect, useState, MouseEventHandler } from 'react';
import {
    CredentialStatements,
    AtomicStatementV2,
    StatementTypes,
    CredentialStatement,
    VerifiablePresentation,
    HexString,
} from '@concordium/web-sdk';
import { BrowserWalletProvider, WalletProvider } from '../services/wallet-connection';
import { getVerifierURL } from '../services/verification-service';
import { Buffer } from 'buffer';

const TOKEN_ID = process.env.TOKEN_ID;
const BACKEND_URL = process.env.BACKEND_URL;

export default function AllowListDApp() {
    const [provider, setProvider] = useState<WalletProvider>();
    const [selectedAccount, setSelectedAccount] = useState<string>();
    const [proofStatus, setProofStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [transactionHashes, setTransactionHashes] = useState<{ [key: string]: string }>({});
    const [showProofDetails, setShowProofDetails] = useState(false);
    const [currentProof, setCurrentProof] = useState<string | null>(null);
    const [tokenBalance, setTokenBalance] = useState<string>('');
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [isOnAllowList, setIsOnAllowList] = useState<boolean | null>(null);
    const [allowListChecking, setAllowListChecking] = useState(false);

    useEffect(() => {
        if (provider !== undefined) {
            provider.on('accountChanged', (account) => {
                setSelectedAccount(account);
                // Fetch balance when account changes
                if (account) {
                    fetchTokenBalance(account);
                    checkAllowListStatus(account);
                } else {
                    setTokenBalance('');
                    setIsOnAllowList(null);
                }
            });
            return () => {
                provider?.disconnect?.().then(() => provider.removeAllListeners());
            };
        }
    }, [provider]);

    // Fetch token balance when account is connected
    useEffect(() => {
        if (selectedAccount && provider) {
            fetchTokenBalance(selectedAccount);
            checkAllowListStatus(selectedAccount);
        }
    }, [selectedAccount, provider]);

    const connectProvider = async (provider: WalletProvider) => {
        const accounts = await provider.connect();
        setProvider(provider);
        setSelectedAccount(accounts?.[0]);
    };

    const fetchTokenBalance = async (accountAddress: string) => {
        if (!accountAddress) return;

        setBalanceLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/mint/balance/${TOKEN_ID}/${accountAddress}`);
            if (response.ok) {
                const balanceData = await response.json();
                setTokenBalance(balanceData.balance);
            } else {
                console.error('Failed to fetch balance:', response.statusText);
                setTokenBalance('Error');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            setTokenBalance('Error');
        } finally {
            setBalanceLoading(false);
        }
    };

    const checkAllowListStatus = async (accountAddress: string) => {
        if (!accountAddress) return;

        setAllowListChecking(true);
        try {
            const response = await fetch(`${BACKEND_URL}/allowlist/verify-user/${accountAddress}/${TOKEN_ID}`);
            if (response.ok) {
                const statusData = await response.json();
                setIsOnAllowList(statusData.isOnAllowList);
            } else {
                console.error('Failed to check allow list status:', response.statusText);
                setIsOnAllowList(null);
            }
        } catch (error) {
            console.error('Error checking allow list status:', error);
            setIsOnAllowList(null);
        } finally {
            setAllowListChecking(false);
        }
    };

    const requestCitizenshipProof = async () => {
        if (!provider || !selectedAccount) {
            setMessage('Please connect wallet first');
            return;
        }

        setIsLoading(true);
        setProofStatus('Requesting EU nationality proof...');
        setMessage('');

        try {
            // Create a statement to check if nationality is in the EU countries
            const euCountryCodes = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];

            const nationalityStatement: AtomicStatementV2 = {
                type: StatementTypes.AttributeInSet,
                attributeTag: 'nationality',
                set: euCountryCodes
            };

            const credentialStatements: CredentialStatements = [{
                statement: [nationalityStatement],
                idQualifier: {
                    type: 'cred' as const, // Use 'cred' for identity provider
                    issuers: [0] // Identity Provider 0 on testnet/devnet
                }
            } as CredentialStatement];

            // Generate challenge
            const challengeBuffer = new Uint8Array(32);
            crypto.getRandomValues(challengeBuffer);
            const challenge = Buffer.from(challengeBuffer).toString('hex') as HexString;

            // Request verifiable presentation from wallet
            let proof: VerifiablePresentation;
            try {
                proof = await provider.requestVerifiablePresentation(challenge, credentialStatements);
                setCurrentProof(proof.toString());
            } catch (err: any) {
                if (err instanceof Error) {
                    setProofStatus(`Could not get proof: ${err.message}`);
                    setMessage('Failed to get proof from wallet');
                } else {
                    console.error(err);
                    setProofStatus('Error getting proof');
                }
                setIsLoading(false);
                return;
            }

            setProofStatus('Verifying proof...');
            const resp = await fetch(`${getVerifierURL()}/v0/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: proof.toString(),
            });

            if (resp.ok) {
                setProofStatus('✅ Proof verified successfully!');
                setMessage('EU nationality verified. Starting token allocation process...');
                await startAllowListProcess();
            } else {
                const body = await resp.json();
                setProofStatus(`❌ Proof verification failed`);
                setMessage(`Failed to verify EU nationality: ${JSON.stringify(body)}`);
            }
        } catch (error: any) {
            console.error('Error requesting proof:', error);
            setProofStatus(`Error: ${error.message}`);
            setMessage('Failed to request nationality proof');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectBrowser: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            const browserProvider = await BrowserWalletProvider.getInstance();
            await connectProvider(browserProvider);
            setMessage('Connected to browser wallet');
        } catch (error: any) {
            setMessage(`Failed to connect: ${error.message}`);
        }
    };

    const handleDisconnect = async () => {
        if (provider) {
            await provider.disconnect?.();
            setProvider(undefined);
            setSelectedAccount(undefined);
            setTokenBalance('');
            setIsOnAllowList(null);
            setMessage('Disconnected from wallet');
            // Clear any other state as needed
            setProofStatus('');
            setTransactionHashes({});
            setCurrentProof(null);
        }
    };

    const startAllowListProcess = async () => {
        if (!provider || !selectedAccount) {
            setMessage('Missing required data for allowlist process');
            return;
        }

        setIsLoading(true);
        setMessage('Initiating token allocation process...');

        try {
            const response = await fetch(`${BACKEND_URL}/allowlist/add-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAccount: selectedAccount,
                    tokenId: TOKEN_ID
                }),
            });

            if (!response.ok) {
                throw new Error(`Backend request failed: ${response.statusText}`);
            }

            const processStatus = await response.json();
            const processId = processStatus.processId;

            setMessage(`Process started: ${processId}`);
            await pollProcessStatus(processId);

        } catch (error: any) {
            console.error('Error in allowlist process:', error);
            setMessage(`Failed to start allowlist process: ${error.message}`);
            setProofStatus('❌ Failed to start allowlist process');
        } finally {
            setIsLoading(false);
        }
    };

    const pollProcessStatus = async (processId: string) => {
        const maxAttempts = 90;
        let attempts = 0;

        const poll = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/allowlist/status/${processId}`);
                if (!response.ok) {
                    throw new Error('Failed to get process status');
                }

                const status = await response.json();
                updateProcessStatus(status);

                if (status.status === 'completed') {
                    setProofStatus('✅ Successfully added to allow list and received tokens!');
                    setMessage('🎉 Process completed successfully!\n✅ Added to allow list\n✅ Tokens minted\n✅ Tokens transferred to your account');

                    if (status.result) {
                        const txHashes: { [key: string]: string } = {};
                        if (status.result.allowListTransactionHash) {
                            txHashes['Allow List'] = status.result.allowListTransactionHash;
                        }
                        if (status.result.mintTransactionHash) {
                            txHashes['Mint'] = status.result.mintTransactionHash;
                        }
                        if (status.result.transferTransactionHash) {
                            txHashes['Transfer'] = status.result.transferTransactionHash;
                        }
                        setTransactionHashes(txHashes);
                    }

                    setIsOnAllowList(true);
                    if (selectedAccount) {
                        setTimeout(() => fetchTokenBalance(selectedAccount), 2000);
                    }
                    return;
                } else if (status.status === 'failed') {
                    setProofStatus('❌ Process failed');
                    setMessage(`Process failed: ${status.error}`);
                    return;
                } else if (attempts >= maxAttempts) {
                    setProofStatus('❌ Process timeout');
                    setMessage('Process timed out - please check status manually');
                    return;
                }

                attempts++;
                setTimeout(poll, 5000);
            } catch (error: any) {
                console.error('Error polling status:', error);
                setMessage(`Error checking status: ${error.message}`);
            }
        };

        poll();
    };

    const updateProcessStatus = (status: any) => {
        const completedSteps = status.steps.filter((step: any) => step.status === 'completed').length;
        const totalSteps = status.steps.length;
        const progress = Math.round((completedSteps / totalSteps) * 100);

        const currentStep = status.steps.find((step: any) => step.status === 'processing');
        if (currentStep) {
            setProofStatus(`🔄 ${currentStep.step}... (${progress}%)`);
        } else {
            setProofStatus(`⏳ Processing... (${progress}%)`);
        }

        const stepDetails = status.steps.map((step: any) => {
            const icon = step.status === 'completed' ? '✅' :
                step.status === 'processing' ? '🔄' :
                    step.status === 'failed' ? '❌' : '⏳';
            const txInfo = step.transactionHash ? ` (TX: ${step.transactionHash.substring(0, 8)}...)` : '';
            return `${icon} ${step.step}${txInfo}`;
        }).join('\n');

        setMessage(`Blockchain Transaction Status:\n${stepDetails}\n\nProcess: 📋 Eligibility → 🏭 Mint → 💸 Transfer\nNote: Each step takes ~4 seconds to finalize on Concordium`);
    };

    const getButtonState = () => {
        if (!provider || isLoading) {
            return { disabled: true, text: isLoading ? 'Processing...' : `Verify EU Nationality & Get ${TOKEN_ID}` };
        }

        if (isOnAllowList === true) {
            return { disabled: true, text: `Already Received ${TOKEN_ID} ✅` };
        }

        return { disabled: false, text: `Verify EU Nationality & Get ${TOKEN_ID}` };
    };

    const buttonState = getButtonState();

    const messageStyle = {
        whiteSpace: 'pre-line' as const,
        wordBreak: 'break-word' as const,
        fontFamily: 'monospace',
        fontSize: '0.9rem'
    };

    return (
        <main className="min-vh-100 bg-light">
            <nav className="navbar navbar-dark bg-dark shadow-sm mb-5">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img
                            src="/concordium_favicon.svg"
                            alt="Concordium"
                            height="30"
                            className="me-3"
                        />
                        <span className="fw-light">Allow List Manager</span>
                    </a>
                </div>
            </nav>

            <div className="container py-4">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <h5 className="card-title fw-light mb-4">
                                    <i className="bi bi-wallet2 me-2"></i>Wallet Connection
                                </h5>
                                <p className="text-muted small mb-4">Connect your Concordium wallet to get started</p>
                                <div className="d-grid gap-3">
                                    <button
                                        className="btn btn-outline-dark py-3"
                                        onClick={handleConnectBrowser}
                                        disabled={provider !== undefined}
                                    >
                                        <i className="bi bi-laptop me-2"></i>Browser Wallet
                                    </button>
                                </div>
                                {provider && selectedAccount && (
                                    <div className="mt-4">
                                        <div className="alert alert-success border-0">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                <div className="w-100">
                                                    <strong>Connected</strong>
                                                    <div className="mt-1">
                                                        <code className="text-success" style={{ fontSize: '0.85rem' }}>
                                                            {selectedAccount}
                                                        </code>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Allow List Status Display */}
                                        <div className="mt-3">
                                            <div className="card border-0 bg-light">
                                                <div className="card-body p-3">
                                                    <h6 className="card-title fw-light mb-2">
                                                        <i className="bi bi-shield-check me-2"></i>Allow List Status
                                                    </h6>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            {allowListChecking ? (
                                                                <span className="text-muted">
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                    Checking...
                                                                </span>
                                                            ) : isOnAllowList === true ? (
                                                                <span className="fw-bold text-success">
                                                                    <i className="bi bi-check-circle-fill me-1"></i>
                                                                    On Allow List
                                                                </span>
                                                            ) : isOnAllowList === false ? (
                                                                <span className="fw-bold text-warning">
                                                                    <i className="bi bi-dash-circle-fill me-1"></i>
                                                                    Not on Allow List
                                                                </span>
                                                            ) : (
                                                                <span className="text-muted">
                                                                    <i className="bi bi-question-circle me-1"></i>
                                                                    Status Unknown
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => selectedAccount && checkAllowListStatus(selectedAccount)}
                                                            disabled={allowListChecking || !selectedAccount}
                                                        >
                                                            <i className="bi bi-arrow-clockwise"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-grid mt-2">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={handleDisconnect}
                                            >
                                                <i className="bi bi-power me-2"></i>Disconnect Wallet
                                            </button>
                                        </div>

                                        {/* Token Balance Display */}
                                        <div className="mt-3">
                                            <div className="card border-0 bg-light">
                                                <div className="card-body p-3">
                                                    <h6 className="card-title fw-light mb-2">
                                                        <i className="bi bi-coin me-2"></i>{TOKEN_ID} Balance
                                                    </h6>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            {balanceLoading ? (
                                                                <span className="text-muted">
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                    Loading...
                                                                </span>
                                                            ) : (
                                                                <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
                                                                    {tokenBalance || '0'} {TOKEN_ID}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => selectedAccount && fetchTokenBalance(selectedAccount)}
                                                            disabled={balanceLoading || !selectedAccount}
                                                        >
                                                            <i className="bi bi-arrow-clockwise"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <h5 className="card-title fw-light mb-4">
                                    <i className="bi bi-globe-europe-africa me-2"></i>EU Nationality Verification
                                </h5>
                                <p className="text-muted small mb-4">
                                    Verify your EU nationality to be added to the token's allow list and receive tokens.
                                </p>

                                {/* Process flow description */}
                                <div className="alert alert-info border-0 mb-3">
                                    <div className="small">
                                        <strong>Proof of concept, how it works:</strong>
                                        <ol className="mb-0 mt-1 ps-3">
                                            <li>Verify you're eligible for the {TOKEN_ID} tokens</li>
                                            <li>Add to allow list</li>
                                            <li>Mint 10 new {TOKEN_ID} tokens</li>
                                            <li>Transfer tokens directly to your wallet</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button
                                        className={`btn py-3 ${buttonState.disabled ? 'btn-secondary' : 'btn-dark'}`}
                                        onClick={requestCitizenshipProof}
                                        disabled={buttonState.disabled}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            buttonState.text
                                        )}
                                    </button>
                                </div>

                                {proofStatus && (
                                    <div className="mt-4">
                                        <div className={`alert border-0 ${proofStatus.includes('✅') ? 'alert-success' :
                                            proofStatus.includes('❌') ? 'alert-danger' :
                                                'alert-info'
                                            }`}>
                                            {proofStatus}
                                        </div>
                                    </div>
                                )}

                                {currentProof && (
                                    <button
                                        className="btn btn-sm btn-link text-muted mt-2 p-0"
                                        onClick={() => setShowProofDetails(!showProofDetails)}
                                    >
                                        <i className="bi bi-info-circle me-1"></i>
                                        {showProofDetails ? 'Hide' : 'View'} proof details
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {(message || Object.keys(transactionHashes).length > 0 || showProofDetails) && (
                    <div className="row mt-4">
                        <div className="col-12">
                            {message && (
                                <div className={`alert border-0 shadow-sm ${message.includes('Failed') || message.includes('Error') ?
                                        'alert-danger' : 'alert-info'
                                    }`}>
                                    <i className={`bi me-2 ${message.includes('Failed') || message.includes('Error') ?
                                            'bi-exclamation-triangle' : 'bi-info-circle'
                                        }`}></i>
                                    <span style={messageStyle}>{message}</span>
                                </div>
                            )}

                            {Object.keys(transactionHashes).length > 0 && (
                                <div className="card border-0 shadow-sm mt-3">
                                    <div className="card-body">
                                        <h6 className="card-title fw-light mb-3">
                                            <i className="bi bi-receipt me-2"></i>Transaction Details
                                        </h6>
                                        {Object.entries(transactionHashes).map(([type, hash]) => (
                                            <div key={type} className="mb-3">
                                                <p className="small text-muted mb-1">{type} Transaction:</p>
                                                <p className="font-monospace small text-break">{hash}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {showProofDetails && currentProof && (
                                <div className="card border-0 shadow-sm mt-3">
                                    <div className="card-body">
                                        <h6 className="card-title fw-light mb-3">
                                            <i className="bi bi-code-square me-2"></i>Proof Details
                                        </h6>
                                        <pre className="bg-light p-3 rounded small" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                            {JSON.stringify(JSON.parse(currentProof), null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
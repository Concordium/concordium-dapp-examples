import { useEffect, useState } from 'react';
import {
    CredentialStatements,
    AtomicStatementV2,
    StatementTypes,
    CredentialStatement,
    VerifiablePresentation,
    HexString,
} from '@concordium/web-sdk';
import {
    useConnection,
    useConnect,
    WalletConnectionProps,
} from '@concordium/react-components';
import { BROWSER_WALLET, WALLET_CONNECT } from '../../constants';
import { Buffer } from 'buffer';

declare global {
    interface Window {
        runtimeConfig: {
            BACKEND_URL: string;
            VERIFIER_URL: string;
        };
        concordium?: {
            requestAccounts(): Promise<string[]>;
        };
    }
}

interface ProofStatementConfig {
    type: 'AttributeInSet' | 'AttributeNotInSet' | 'AttributeInRange';
    attributeTag: string;
    set?: string[];
    lower?: string;
    upper?: string;
}

interface ProofConfig {
    description: string;
    statements: ProofStatementConfig[];
    issuers: number[];
}

interface TokenConfig {
    id: string;
    amount: number;
    hasAllowList: boolean;
    proof?: ProofConfig;
    iconUrl?: string;
    description?: string;
}

const BACKEND_URL = window.runtimeConfig?.BACKEND_URL || 'http://localhost:3001';
const VERIFIER_URL = window.runtimeConfig?.VERIFIER_URL || 'https://web3id-verifier.testnet.concordium.com';

const EU_COUNTRY_CODES = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];

const DEFAULT_EU_PROOF: ProofConfig = {
    description: 'EU nationality',
    statements: [{ type: 'AttributeInSet', attributeTag: 'countryOfResidence', set: EU_COUNTRY_CODES }],
    issuers: [0],
};

function buildCredentialStatements(proof: ProofConfig): CredentialStatements {
    const statements: AtomicStatementV2[] = proof.statements.map(s => {
        switch (s.type) {
            case 'AttributeInSet':
                return { type: StatementTypes.AttributeInSet, attributeTag: s.attributeTag, set: s.set! };
            case 'AttributeNotInSet':
                return { type: StatementTypes.AttributeNotInSet, attributeTag: s.attributeTag, set: s.set! };
            case 'AttributeInRange':
                return { type: StatementTypes.AttributeInRange, attributeTag: s.attributeTag, lower: s.lower!, upper: s.upper! };
        }
    });
    return [{ statement: statements, idQualifier: { type: 'cred' as const, issuers: proof.issuers } } as CredentialStatement];
}


export default function AllowListDApp(props: WalletConnectionProps) {

    const { connection, setConnection, account } = useConnection(
        props.connectedAccounts,
        props.genesisHashes
    );
    const { connect, isConnecting } = useConnect(
        props.activeConnector,
        setConnection
    );

    // Process / proof state
    const [proofStatus, setProofStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [transactionHash, setTransactionHash] = useState<string>('');
    const [showProofDetails, setShowProofDetails] = useState(false);
    const [currentProof, setCurrentProof] = useState<string | null>(null);
    const [intentedConnectorType, setIntentedConnectorType] = useState<typeof BROWSER_WALLET | typeof WALLET_CONNECT | null>(null);

    // Token config
    const [configuredTokens, setConfiguredTokens] = useState<TokenConfig[]>([]);
    const [selectedTokenId, setSelectedTokenId] = useState<string>('');

    // Per-token balances — eligibility is derived directly from these:
    // undefined       → not yet fetched (unknown eligibility)
    // null            → no token entry on the account (never held) → eligible
    // '0' or any str → entry exists (held before, even if spent) → ineligible
    const [tokenBalances, setTokenBalances] = useState<Record<string, string | null>>({});
    const [balancesLoading, setBalancesLoading] = useState(false);

    const isMultiToken = configuredTokens.length > 1;
    const selectedToken = configuredTokens.find(t => t.id === selectedTokenId) ?? null;

    // Eligibility is derived purely from whether the account has a token entry:
    // undefined → still loading (unknown), null → no entry (never held) → eligible, string → entry exists → ineligible
    const getTokenEligibility = (token: TokenConfig): boolean | null => {
        const balance = tokenBalances[token.id];
        if (balance === undefined) return null;
        return balance === null;
    };

    // Load token list from backend; fall back to runtimeConfig values
    useEffect(() => {
        fetch(`${BACKEND_URL}/token-distribution/tokens`)
            .then(r => r.ok ? r.json() : Promise.reject())
            .then((tokens: TokenConfig[]) => {
                setConfiguredTokens(tokens);
                setSelectedTokenId(tokens[0]?.id ?? '');
            })
            .catch(() => {
                setConfiguredTokens([]);
            });
    }, []);

    // Clear status when the selected token changes.
    useEffect(() => {
        setProofStatus('');
        setMessage('');
        setTransactionHash('');
        setCurrentProof(null);
        setShowProofDetails(false);
    }, [selectedTokenId]);


    // Clear status and in-progress state when the account changes.
    useEffect(() => {
        setProofStatus('');
        setMessage('');
        setTransactionHash('');
        setCurrentProof(null);
        setShowProofDetails(false);
        setIsLoading(false);
    }, [account]);

    // When account or token list changes, fetch balances for all tokens.
    // Eligibility is derived from balances, so this is the only fetch needed.
    useEffect(() => {
        if (account && configuredTokens.length > 0) {
            fetchAllBalances(account, configuredTokens);
        } else if (!account) {
            setTokenBalances({});
        }
    }, [account, configuredTokens]);

    const fetchAllBalances = async (accountAddress: string, tokens: TokenConfig[]) => {
        setBalancesLoading(true);
        const results = await Promise.all(tokens.map(async (token) => {
            try {
                const r = await fetch(`${BACKEND_URL}/token-distribution/balance/${token.id}/${accountAddress}`);
                if (r.ok) {
                    const data = await r.json();
                    // null from backend = no token entry = never held
                    return [token.id, data.balance] as [string, string | null];
                }
            } catch { /* ignore */ }
            // On error, treat as null (never held) so the user can attempt to claim;
            // the backend will enforce the rule authoritatively.
            return [token.id, null] as [string, null];
        }));
        const balances = Object.fromEntries(results) as Record<string, string | null>;
        setTokenBalances(balances);
        setBalancesLoading(false);

        // Auto-select first eligible token (null = no entry = eligible)
        if (balances[selectedTokenId] !== null) {
            const firstEligible = tokens.find(t => balances[t.id] === null);
            if (firstEligible) setSelectedTokenId(firstEligible.id);
        }
    };

    const requestCitizenshipProof = async () => {
        if (!connection || !account) {
            setMessage('Please connect wallet first');
            return;
        }

        // Tokens without an allow list skip the proof step entirely
        if (!effectiveProof) {
            await startTokenDistribution();
            return;
        }

        setIsLoading(true);
        setProofStatus(`Requesting ${effectiveProof.description} proof...`);
        setMessage('');
        setTransactionHash('');

        try {
            const credentialStatements = buildCredentialStatements(effectiveProof);

            const challengeBuffer = new Uint8Array(32);
            crypto.getRandomValues(challengeBuffer);
            const challenge = Buffer.from(challengeBuffer).toString('hex') as HexString;

            let proof: VerifiablePresentation;
            try {
                proof = await connection.requestVerifiablePresentation(challenge, credentialStatements);
                setCurrentProof(proof.toString());
            } catch (err: any) {
                const message = err instanceof Error ? err.message : String(err);
                setProofStatus(`Could not get proof: ${message}`);
                setMessage('Failed to get proof from wallet');
                setIsLoading(false);
                return;
            }

            setProofStatus('Verifying proof...');
            const resp = await fetch(`${VERIFIER_URL}/v0/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: proof.toString(),
            });

            if (resp.ok) {
                setProofStatus('✅ Proof verified successfully!');
                setMessage(`${effectiveProof.description} verified. Starting token distribution...`);
                await startTokenDistribution();
            } else {
                const body = await resp.json();
                setProofStatus(`❌ Proof verification failed`);
                setMessage(`Failed to verify ${effectiveProof.description}: ${JSON.stringify(body)}`);
            }
        } catch (error: any) {
            console.error('Error requesting proof:', error);
            setProofStatus(`Error: ${error.message}`);
            setMessage(`Failed to request ${effectiveProof.description} proof`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (connection) {
            await connection.disconnect();
            setConnection(undefined);
            setIntentedConnectorType(null);
            setTokenBalances({});
            setMessage('Disconnected from wallet');
            setProofStatus('');
            setTransactionHash('');
            setCurrentProof(null);
        }
    };

    useEffect(() => {
        if (
            props.activeConnector &&
            !connection &&
            !isConnecting &&
            connect &&
            intentedConnectorType &&
            props.activeConnectorType === intentedConnectorType
        ) {
            console.log('About to connect with connector:', props.activeConnector);
            connect();
            setIntentedConnectorType(null);
        }
    }, [props.activeConnector, props.activeConnectorType, connection, isConnecting, connect, intentedConnectorType]);

    const startTokenDistribution = async () => {
        if (!connection || !account) {
            setMessage('Missing required data for token distribution');
            return;
        }

        setIsLoading(true);
        setMessage('Initiating token distribution process...');

        try {
            const response = await fetch(`${BACKEND_URL}/token-distribution/distribute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userAccount: account, tokenId: selectedTokenId }),
            });

            if (!response.ok) {
                throw new Error(`Backend request failed: ${response.statusText}`);
            }

            const processStatus = await response.json();
            await pollProcessStatus(processStatus.processId);

        } catch (error: any) {
            console.error('Error in token distribution:', error);
            setMessage(`Failed to start token distribution: ${error.message}`);
            setProofStatus('❌ Failed to start token distribution');
        } finally {
            setIsLoading(false);
        }
    };

    const pollProcessStatus = (processId: string): Promise<void> => {
        return new Promise((resolve) => {
            const maxAttempts = 90;
            let attempts = 0;

            const poll = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/token-distribution/status/${processId}`);
                    if (!response.ok) throw new Error('Failed to get process status');

                    const status = await response.json();
                    updateProcessStatus(status);

                    if (status.status === 'completed') {
                        const isAllowListOnly = (selectedToken?.amount ?? 1) === 0;
                        setProofStatus(isAllowListOnly ? '✅ Added to allow list successfully!' : '✅ Tokens received successfully!');
                        const allowListLine = selectedToken?.hasAllowList ? '✅ Added to allow list\n' : '';
                        const mintTransferLines = isAllowListOnly ? '' : '✅ Tokens minted\n✅ Tokens transferred to your account\n';
                        setMessage(`🎉 Process completed successfully!\n${allowListLine}${mintTransferLines}\nAll operations completed in a single transaction!`);

                        if (status.result?.transactionHash) {
                            setTransactionHash(status.result.transactionHash);
                        }

                        // Optimistically mark balance as non-zero so the button disables immediately,
                        // preventing a second claim in the same visit before the real fetch returns.
                        setTokenBalances(prev => ({
                            ...prev,
                            [selectedTokenId]: String(selectedToken?.amount ?? 1),
                        }));

                        // Refresh real balances after finalization settles on-chain
                        if (account) {
                            setTimeout(() => fetchAllBalances(account, configuredTokens), 2000);
                        }
                        resolve();
                        return;
                    } else if (status.status === 'failed') {
                        setProofStatus('❌ Process failed');
                        setMessage(`Process failed: ${status.error}`);
                        resolve();
                        return;
                    } else if (attempts >= maxAttempts) {
                        setProofStatus('❌ Process timeout');
                        setMessage('Process timed out - please check status manually');
                        resolve();
                        return;
                    }

                    attempts++;
                    setTimeout(poll, 5000);
                } catch (error: any) {
                    console.error('Error polling status:', error);
                    setMessage(`Error checking status: ${error.message}`);
                    resolve();
                }
            };

            poll();
        });
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

        setMessage(`Blockchain Transaction Status:\n${stepDetails}\n\nNote: All operations execute in a single atomic transaction using Token.sendOperations()!`);
    };

    const selectedEligibility = selectedToken ? getTokenEligibility(selectedToken) : null;
    const effectiveProof: ProofConfig | null = selectedToken?.hasAllowList
        ? (selectedToken.proof ?? DEFAULT_EU_PROOF)
        : null;

    const getButtonState = () => {
        const isAllowListOnly = (selectedToken?.amount ?? 1) === 0;
        const action = isAllowListOnly ? 'Join Allow List' : `Get ${selectedTokenId}`;
        const claimText = effectiveProof
            ? `Verify ${effectiveProof.description} & ${action}`
            : action;

        if (!connection || isLoading) {
            return { disabled: true, text: isLoading ? 'Processing...' : claimText };
        }

        if (selectedEligibility === false) {
            return { disabled: true, text: isAllowListOnly ? `Already Added to Allow List ✅` : `Already Received ${selectedTokenId} ✅` };
        }

        return { disabled: false, text: claimText };
    };

    const buttonState = getButtonState();

    const messageStyle = {
        whiteSpace: 'pre-line' as const,
        wordBreak: 'break-word' as const,
        fontFamily: 'monospace',
        fontSize: '0.9rem'
    };

    const EligibilityBadge = ({ token }: { token: TokenConfig }) => {
        const eligibility = getTokenEligibility(token);
        const badgeStyle = { fontSize: '0.7rem', minWidth: '5.5rem', textAlign: 'center' as const };
        if (isLoading && token.id === selectedTokenId) {
            return <span className="badge rounded-pill text-bg-warning" style={badgeStyle}>Pending</span>;
        }
        if (balancesLoading && eligibility === null) {
            return <span className="spinner-border spinner-border-sm text-muted" style={{ width: '0.8rem', height: '0.8rem', borderWidth: '0.15em' }} />;
        }
        if (eligibility === true) {
            return <span className="badge rounded-pill text-bg-success" style={badgeStyle}>Unclaimed</span>;
        }
        if (eligibility === false) {
            return <span className="badge rounded-pill text-bg-secondary" style={badgeStyle}>Received</span>;
        }
        return null;
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
                        <span className="fw-light fs-4">Token Distribution dApp</span>
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
                                        onClick={async () => {
                                            // requestAccounts prompts the wallet to show all accounts for selection.
                                            // connect() (fired by useEffect after setActiveConnectorType) then resolves
                                            // silently since permission is already established.
                                            await window.concordium?.requestAccounts().catch(() => {});
                                            setIntentedConnectorType(BROWSER_WALLET);
                                            props.setActiveConnectorType(BROWSER_WALLET);
                                        }}
                                        disabled={connection !== undefined}
                                    >
                                        <i className="bi bi-laptop me-2"></i>Browser Wallet
                                    </button>
                                    <button
                                        className="btn btn-outline-primary py-3"
                                        onClick={() => {
                                            setIntentedConnectorType(WALLET_CONNECT);
                                            props.setActiveConnectorType(WALLET_CONNECT);
                                        }}
                                        disabled={connection !== undefined || isConnecting}
                                    >
                                        {isConnecting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-phone me-2"></i>Mobile Wallet (WalletConnect)
                                            </>
                                        )}
                                    </button>
                                </div>

                                {connection && account && (
                                    <div className="mt-4">
                                        <div className="alert alert-success border-0 mb-3">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                <div className="w-100">
                                                    <strong>Connected</strong>
                                                    <div className="mt-1">
                                                        <code className="text-success" style={{ fontSize: '0.85rem' }}>
                                                            {account}
                                                        </code>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Token list with per-token eligibility and balance */}
                                        <div className="card border-0 bg-light mb-3">
                                            <div className="card-body p-3">
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <h6 className="card-title fw-light mb-0">
                                                        <i className="bi bi-coin me-2"></i>Tokens
                                                    </h6>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => fetchAllBalances(account, configuredTokens)}
                                                        disabled={balancesLoading}
                                                        title="Refresh balances"
                                                    >
                                                        <i className="bi bi-arrow-clockwise"></i>
                                                    </button>
                                                </div>

                                                <div className="d-flex flex-column gap-1">
                                                    {configuredTokens.map(token => {
                                                        const eligibility = getTokenEligibility(token);
                                                        const isIneligible = eligibility === false;
                                                        const isSelected = selectedTokenId === token.id;

                                                        return (
                                                            <div
                                                                key={token.id}
                                                                className={`d-flex align-items-center justify-content-between rounded px-2 py-2 ${isSelected ? 'bg-white shadow-sm border' : ''
                                                                    }`}
                                                                style={{
                                                                    opacity: isIneligible ? 0.55 : 1,
                                                                    cursor: isMultiToken && !isIneligible && !isLoading ? 'pointer' : 'default',
                                                                }}
                                                                onClick={() => {
                                                                    if (isMultiToken && !isIneligible && !isLoading) setSelectedTokenId(token.id);
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-center gap-2">
                                                                    {isMultiToken && (
                                                                        <input
                                                                            type="radio"
                                                                            className="form-check-input mt-0 flex-shrink-0"
                                                                            name="tokenSelector"
                                                                            checked={isSelected}
                                                                            disabled={isIneligible || isLoading}
                                                                            onChange={() => setSelectedTokenId(token.id)}
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <span className="fw-medium">{token.id}</span>
                                                                        <span className="text-muted ms-1" style={{ fontSize: '0.78rem' }}>
                                                                            ({token.amount})
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                                                                        {balancesLoading
                                                                            ? '…'
                                                                            : `${tokenBalances[token.id] ?? '0'}`}
                                                                    </span>
                                                                    <EligibilityBadge token={token} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={handleDisconnect}
                                            >
                                                <i className="bi bi-power me-2"></i>Disconnect Wallet
                                            </button>
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
                                    <i className="bi bi-coin me-2"></i>
                                    Get Tokens
                                </h5>
                                {!connection ? (
                                    <div className="d-flex flex-column gap-2">
                                        {configuredTokens.length === 0 ? (
                                            <p className="text-muted small">Loading available tokens...</p>
                                        ) : configuredTokens.map(token => {
                                            const tokenProof = token.hasAllowList ? (token.proof ?? DEFAULT_EU_PROOF) : null;
                                            return (
                                                <div key={token.id} className="card border-0 bg-light">
                                                    <div className="card-body p-3">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div
                                                                className="rounded-circle bg-dark d-flex align-items-center justify-content-center flex-shrink-0 overflow-hidden"
                                                                style={{ width: '2.5rem', height: '2.5rem' }}
                                                            >
                                                                {token.iconUrl ? (
                                                                    <img src={token.iconUrl} alt={token.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                ) : (
                                                                    <i className="bi bi-coin text-white fs-6"></i>
                                                                )}
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="fw-semibold">{token.id}</div>
                                                                {token.description && (
                                                                    <div className="small text-muted">{token.description}</div>
                                                                )}
                                                                {token.amount === 0 ? (
                                                                    <div className="small text-secondary fst-italic">Allow list addition only</div>
                                                                ) : (
                                                                    <div className="small">Claim {token.amount} PLTs</div>
                                                                )}
                                                                {tokenProof ? (
                                                                    <div className="small mt-1 text-primary">
                                                                        <i className="bi bi-shield-lock me-1"></i>
                                                                        Requires {tokenProof.description} verification
                                                                    </div>
                                                                ) : (
                                                                    <div className="small mt-1 text-success">
                                                                        <i className="bi bi-check-circle me-1"></i>
                                                                        No verification required
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-muted small mb-4">
                                            {effectiveProof
                                                ? `This token requires ${effectiveProof.description} verification.`
                                                : 'No verification required — claim this token directly.'}
                                        </p>

                                        {/* Process flow description */}
                                        <div className="alert alert-info border-0 mb-3">
                                            <div className="small">
                                                <strong>Proof of concept, how it works:</strong>
                                                <ol className="mb-0 mt-1 ps-3">
                                                    <li>Verify you're eligible for {selectedTokenId}</li>
                                                    {selectedToken?.hasAllowList && <li>Add to allow list</li>}
                                                    {(selectedToken?.amount ?? 1) > 0 && <li>Mint {selectedToken?.amount} new {selectedTokenId} PLTs</li>}
                                                    {(selectedToken?.amount ?? 1) > 0 && <li>Transfer PLTs directly to your wallet</li>}
                                                </ol>
                                                <p className="mb-0 mt-2">
                                                    <em>✨ All operations execute atomically in one transaction - instant and secure!</em>
                                                </p>
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
                                                    proofStatus.includes('❌') ? 'alert-danger' : 'alert-info'}`}>
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {(message || transactionHash || showProofDetails) && (
                    <div className="row mt-4">
                        <div className="col-12">
                            {message && (
                                <div className={`alert border-0 shadow-sm ${message.includes('Failed') || message.includes('Error') ?
                                    'alert-danger' : 'alert-info'}`}>
                                    <i className={`bi me-2 ${message.includes('Failed') || message.includes('Error') ?
                                        'bi-exclamation-triangle' : 'bi-info-circle'}`}></i>
                                    <span style={messageStyle}>{message}</span>
                                </div>
                            )}

                            {transactionHash && (
                                <div className="card border-0 shadow-sm mt-3">
                                    <div className="card-body">
                                        <h6 className="card-title fw-light mb-3">
                                            <i className="bi bi-receipt me-2"></i>Transaction Details
                                        </h6>
                                        <div className="mb-3">
                                            <p className="small text-muted mb-1">Transaction Hash:</p>
                                            <p className="font-monospace small text-break">{transactionHash}</p>
                                            <p className="small text-muted mt-2">
                                                <i className="bi bi-info-circle me-1"></i>
                                                {selectedToken?.hasAllowList && (selectedToken?.amount ?? 1) === 0
                                                    ? 'This single transaction performed all operations: allow list addition only!'
                                                    : selectedToken?.hasAllowList
                                                        ? 'This single transaction performed all operations: allow list addition, token minting, and transfer!'
                                                        : 'This single transaction performed all operations: token minting and transfer!'}
                                            </p>
                                        </div>
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

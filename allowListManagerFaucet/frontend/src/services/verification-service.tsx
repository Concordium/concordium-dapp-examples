import { CredentialStatements, CredentialStatement, VerifiablePresentation } from '@concordium/web-sdk';
//import { VERIFIER_URL } from constants.ts
import { Buffer } from 'buffer';
import { WalletProvider } from './wallet-connection';
import { useState } from 'react';
import { TopLevelStatements } from '../types/types';
import { VERIFIER_URL } from '../../constants';

export function getVerifierURL(): string {
    return VERIFIER_URL;
}

async function submitProof(
    statement: CredentialStatements,
    provider: WalletProvider,
    setMessages: (updateMessage: (oldMessages: string[]) => string[]) => void,
    setProofData?: (proof: string) => void  // optional param to store proof data
) {
    let proof: VerifiablePresentation;
    const challengeBuffer = new Uint8Array(32);
    crypto.getRandomValues(challengeBuffer);
    const challenge = Buffer.from(challengeBuffer).toString('hex');
    console.log(statement);

    try {
        proof = await provider.requestVerifiablePresentation(challenge, statement);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err instanceof Error) {
            setMessages((oldMessages) => [...oldMessages, `Could not get proof: ${err.message}`]);
        } else {
            console.log(err);
        }
        return;
    }
    console.log(proof.toString());
    console.log(proof);

    const resp = await fetch(`${getVerifierURL()}/v0/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: proof.toString(),
    });

    if (resp.ok) {
        setMessages((oldMessages) => [...oldMessages, 'Proof OK']);
        if (setProofData) {
            setProofData(proof.toString());
        }
    } else {
        const body = await resp.json();
        setMessages((oldMessages) => [...oldMessages, `Proof not OK: (${resp.status}) ${body}`]);
    }
}

export function SubmitProof(
    all_statements: TopLevelStatements,
    provider: WalletProvider | undefined
): [(messages: string[]) => any, React.JSX.Element] {
    const [messages, setMessages] = useState<string[]>([]);
    const [currentProof, setCurrentProof] = useState<string | null>(null);
    const [isProofDetailsOpen, setIsProofDetailsOpen] = useState<boolean>(false);

    const request = all_statements.map((s) => {
        switch (s.type) {
            case 'account':
                return {
                    statement: s.statement.statement,
                    idQualifier: {
                        type: 'cred',
                        issuers: s.statement.idps.map((x) => x.id),
                    },
                } as CredentialStatement;
            case 'web3id':
                return {
                    statement: s.statement.statement,
                    idQualifier: {
                        type: 'sci',
                        issuers: s.statement.issuers,
                    },
                } as CredentialStatement;
        }
    });

    const handleViewDetails = () => {
        if (currentProof) {
            setIsProofDetailsOpen(true);
        }
    };

    const handleCloseDetails = () => {
        setIsProofDetailsOpen(false);
    };

    return [
        setMessages,
        <div>
            <div>
                {provider !== undefined && (
                    <button
                        title="Submit the statement as a verified presentation request to the wallet."
                        onClick={() => submitProof(request, provider, setMessages, setCurrentProof)}
                        type="button"
                        className="col-sm-4 btn btn-primary"
                    >
                        {'Prove'}
                    </button>
                )}
            </div>
            <hr />
            <div>
                <ol>
                    {messages.map((m, index) => {
                        if (m === 'Proof OK' && currentProof) {
                            return (
                                <li key={index} className="alert alert-success d-flex justify-content-between align-items-center">
                                    <span>{m}</span>
                                    <button
                                        onClick={handleViewDetails}
                                        className="btn btn-sm btn-outline-success"
                                    >
                                        View Details
                                    </button>
                                </li>
                            );
                        }
                        return <li key={index} className="alert alert-success">{m}</li>;
                    })}
                </ol>
            </div>
        </div>,
    ];
}
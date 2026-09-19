import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';
import type { ProofConfig, ProofStatementConfig } from './token-distribution.service.js';

/**
 * Raised for authorization/verification failures that should be surfaced to the
 * caller with the given HTTP status code (403/429 etc.) rather than a generic 500.
 */
export class VerificationError extends Error {
    constructor(
        readonly statusCode: number,
        message: string,
    ) {
        super(message);
    }
}

interface IssuedChallenge {
    challenge: string;
    userAccount: string;
    createdAt: number;
    used: boolean;
}

interface VerifiedPresentationResponse {
    blockHash?: string;
    blockTime?: string;
    challenge?: string;
    credentialStatements?: PresentedCredentialStatement[];
}

interface PresentedCredentialStatement {
    idQualifier?: { issuers?: number[]; type?: string };
    statement?: PresentedAtomicStatement | PresentedAtomicStatement[];
}

interface PresentedAtomicStatement {
    type?: string;
    attributeTag?: string;
    set?: string[];
    lower?: string;
    upper?: string;
}

/**
 * Performs server-side verification of Verifiable Presentations produced by the
 * wallet, and issues single-use, expiring challenges that bind a presentation to
 * a specific distribution request.
 *
 * The backend must never trust client-side verification: every distribution that
 * requires a proof is re-verified here against the configured web3id verifier
 * before any tokens are minted or transferred.
 */
@Injectable()
export class VerifierService {
    private readonly logger = new Logger(VerifierService.name);
    private readonly verifierUrl: string;
    private readonly challengeTtlMs: number;
    private readonly challenges = new Map<string, IssuedChallenge>();

    constructor(private readonly configService: ConfigService) {
        this.verifierUrl = this.configService.get<string>(
            'VERIFIER_URL',
            'https://web3id-verifier.testnet.concordium.com',
        );
        this.challengeTtlMs =
            parseInt(this.configService.get('CHALLENGE_TTL_SECONDS', '300')) * 1000;
    }

    /** Issues a fresh single-use challenge for the given account, invalidating any previous one. */
    issueChallenge(userAccount: string): string {
        this.reapExpired();
        const challenge = randomBytes(32).toString('hex');
        this.challenges.set(userAccount, {
            challenge,
            userAccount,
            createdAt: Date.now(),
            used: false,
        });
        this.logger.log(`Issued verification challenge for account ${userAccount}`);
        return challenge;
    }

    /**
     * Verifies the given presentation server-side and ensures it is bound to the
     * challenge previously issued for the account, and that it satisfies the
     * token's configured proof.
     */
    async verifyPresentation(
        presentation: string,
        userAccount: string,
        expectedProof: ProofConfig,
    ): Promise<void> {
        const issued = this.challenges.get(userAccount);
        if (!issued || issued.used) {
            throw new VerificationError(
                400,
                'No pending verification challenge for this account. Please request a new one.',
            );
        }
        if (Date.now() - issued.createdAt > this.challengeTtlMs) {
            this.challenges.delete(userAccount);
            throw new VerificationError(
                400,
                'Verification challenge has expired. Please request a new one.',
            );
        }

        // Unconditionally consume the challenge: a failed distribution requires a
        // fresh challenge, preventing replay of a single proof.
        issued.used = true;

        let verifiedBody: VerifiedPresentationResponse;
        try {
            const resp = await fetch(`${this.verifierUrl}/v0/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: presentation,
            });
            if (!resp.ok) {
                this.logger.warn(`Verifier rejected presentation (HTTP ${resp.status})`);
                throw new VerificationError(
                    400,
                    `Presentation was rejected by the verifier (HTTP ${resp.status})`,
                );
            }
            verifiedBody = (await resp.json()) as VerifiedPresentationResponse;
        } catch (error) {
            if (error instanceof VerificationError) {
                throw error;
            }
            this.logger.warn(`Could not reach verifier or parse its response: ${error.message}`);
            throw new VerificationError(503, 'Verification service unavailable');
        }

        if (verifiedBody.challenge !== issued.challenge) {
            throw new VerificationError(
                400,
                'Presentation is not bound to the issued challenge',
            );
        }

        this.assertStatementsMatch(verifiedBody.credentialStatements ?? [], expectedProof);

        this.challenges.delete(userAccount);
    }

    private assertStatementsMatch(
        presentedStatements: PresentedCredentialStatement[],
        expectedProof: ProofConfig,
    ): void {
        if (presentedStatements.length === 0) {
            throw new VerificationError(400, 'Presentation contains no credential statements');
        }

        if (expectedProof.issuers.length > 0) {
            const allowedIssuers = new Set(expectedProof.issuers);
            const issuedByAllowedIssuer = presentedStatements.some((s) =>
                (s.idQualifier?.issuers ?? []).some((issuer) => allowedIssuers.has(issuer)),
            );
            if (!issuedByAllowedIssuer) {
                throw new VerificationError(
                    400,
                    'Presentation was not issued by a permitted issuer',
                );
            }
        }

        const presentedAtomic = presentedStatements.flatMap((s) =>
            Array.isArray(s.statement) ? s.statement : [s.statement],
        );

        for (const expected of expectedProof.statements) {
            const matched = presentedAtomic.some((p) => atomicStatementMatches(p, expected));
            if (!matched) {
                throw new VerificationError(
                    400,
                    `Presentation does not satisfy required statement on attribute ${expected.attributeTag}`,
                );
            }
        }
    }

    private reapExpired() {
        const now = Date.now();
        for (const [key, entry] of this.challenges) {
            if (now - entry.createdAt > this.challengeTtlMs) {
                this.challenges.delete(key);
            }
        }
    }
}

function valuesEqual(a: string[] | undefined, b: string[] | undefined): boolean {
    if (!a || !b || a.length !== b.length) {
        return false;
    }
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((v, i) => v === sortedB[i]);
}

function atomicStatementMatches(
    presented: PresentedAtomicStatement,
    expected: ProofStatementConfig,
): boolean {
    if (presented.type !== expected.type) {
        return false;
    }
    if (presented.attributeTag !== expected.attributeTag) {
        return false;
    }
    if (expected.set !== undefined && !valuesEqual(presented.set, expected.set)) {
        return false;
    }
    if (expected.lower !== undefined && String(presented.lower) !== String(expected.lower)) {
        return false;
    }
    if (expected.upper !== undefined && String(presented.upper) !== String(expected.upper)) {
        return false;
    }
    return true;
}
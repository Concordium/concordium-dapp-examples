import { CredentialStatement, AtomicStatementV2, VerifiablePresentation } from '@concordium/web-sdk';

/**
 * Fetch the item names from the backend
 */
export async function getNames(verifier: string): Promise<string[]> {
    const response = await fetch(`${verifier}/names`, { method: 'get' });
    const body = (await response.json()) as string;
    return JSON.parse(body) as string[];
}

/**
 * Fetch a challenge from the backend
 */
export async function getChallenge(verifier: string, accountAddress: string): Promise<string> {
    const response = await fetch(`${verifier}/challenge?address=` + accountAddress, { method: 'get' });
    const body = (await response.json()) as ChallengeResponse;
    return body.challenge;
}

/**
 * Fetch the statement to prove from the backend
 */
export async function getStatement(verifier: string): Promise<CredentialStatement> {
    const response = await fetch(`${verifier}/statement`, { method: 'get' });
    const body = (await response.json()) as string;

    const credentialStatement: CredentialStatement = {
        // We use the testnet identity provider 0 (run by Concordium).
        idQualifier: {
            type: 'cred',
            issuers: [0],
        },
        statement: JSON.parse(body) as AtomicStatementV2[],
    };

    return credentialStatement;
}

/**
 *  Authorize with the backend, and get a auth token.
 */
export async function authorize(verifier: string, presentation: VerifiablePresentation): Promise<string> {
    const response = await fetch(`${verifier}/prove`, {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ presentation }),
    });
    if (!response.ok) {
        throw new Error('Unable to authorize: ' + (await response.text()));
    }
    const body = (await response.json()) as string;
    if (body) {
        return body;
    }
    throw new Error('Unable to authorize');
}

interface ChallengeResponse {
    challenge: string;
}

import { AccountAddress, AtomicStatementV2, CredentialStatement, VerifiablePresentation } from '@concordium/web-sdk';

interface AccountData {
    // The account address that was indexed.
    accountAddress: AccountAddress.Type;
    // The timestamp of the block the event was included in.
    blockTime: string;
    // The transaction hash that the event was recorded in.
    transactionHash: string;
    // A boolean specifying if the account has already claimed its rewards (got
    // a reward payout). Every account can only claim rewards once.
    claimed: boolean;
    // A boolean specifying if this account address has submitted all tasks
    // and the regulatory conditions have been proven via a ZK proof.
    // A manual check of the completed tasks is required now before releasing
    // the reward.
    pendingApproval: boolean;
}

interface TweetData {
    // The account address that submitted the tweet.
    accountAddress: AccountAddress.Type;
    // A tweet id submitted by the above account address (task 1).
    tweetId: string | undefined;
    // A boolean specifying if the text content of the tweet is eligible for
    // the reward. The content of the text was verified by this backend
    // before this flag is set (or will be verified manually).
    tweetValid: boolean;
    // A version that specifies the setting of the tweet verification. This
    // enables us to update the tweet verification logic in the future and
    // invalidate older versions.
    tweetVerificationVersion: number;
    // The timestamp when the tweet was submitted.
    tweetSubmitTime: string;
}

interface ZkProofData {
    // The account address that submitted the zk proof.
    accountAddress: AccountAddress.Type;
    // A hash of the concatenated revealed `national_id_number` and
    // `nationality` to prevent claiming with different accounts for the
    // same identity.
    uniquenessHash: string;
    // A boolean specifying if the identity associated with the account is
    // eligible for the reward (task 2). An associated ZK proof was
    // verified by this backend before this flag is set.
    zkProofValid: boolean;
    // A version that specifies the setting of the ZK proof during the
    // verification. This enables us to update the ZK proof-verification
    // logic in the future and invalidate older proofs.
    zkProofVerificationVersion: number;
    // The timestamp when the ZK proof verification was submitted.
    zkProofVerificationSubmitTime: string;
}

interface AccountData {
    accountData: AccountData | undefined;
    tweetData: TweetData | undefined;
    zkProofData: ZkProofData | undefined;
}

/**
 * Generates `POST` and `GET` request options.
 *
 * @param method - The HTTP method (`'POST'` or `'GET'`).
 * @param body - Optional request body (required for `POST`, ignored for `GET`).
 * @returns The request options for the specified method.
 * @throws An error if the method is invalid or if the body is incorrectly provided for the method.
 */
function createRequestOptions(method: string, body?: string): RequestInit {
    switch (method) {
        case 'GET':
            return {
                method: 'GET',
            };
        case 'POST':
            if (!body) {
                throw new Error(`Body is required for method: ${method}`);
            }
            return {
                method: 'POST',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: body,
            };
        default:
            throw new Error(`Invalid method: ${method}`);
    }
}

/**
 * Sends a `GET`/`POST` request to the backend and optionally parses the response into a given type `T`.
 *
 * @param T - Optional return value type `T`.
 * @param endpoint - The API endpoint.
 * @param method - The HTTP method (`'POST'` or `'GET'`).
 * @param parseReturnValue - Optional request to parse the return value into provided type `T`.
 * @param body - Optional request body (required for `POST`, ignored for `GET`).
 * @returns A promise that can be resolved into the parsed return value of type `T`.
 *
 * @throws An error if the method is invalid, if the body is incorrectly provided for the method,
 * if the parsing of the return value fails, or if the backend responses with an error.
 */
async function sendBackendRequest<T = undefined>(
    endpoint: string,
    method: string,
    parseReturnValue: boolean,
    body?: string,
): Promise<T> {
    const api = `api/${endpoint}`;

    const requestOption = createRequestOptions(method, body);

    const response = await fetch(api, requestOption);

    if (!response.ok) {
        let parsedError;

        try {
            parsedError = await response.json();
        } catch (e) {
            throw new Error(
                `Unable to send request to the backend '${api}'; StatusCode: ${response.status}; StatusText: ${response.statusText};`,
            );
        }

        throw new Error(`Unable to send request to the backend '${api}'; Error: ${JSON.stringify(parsedError)}`);
    }

    if (parseReturnValue) {
        // Parse the response as type `T`
        try {
            return (await response.json()) as T;
        } catch (e) {
            throw new Error(`Failed to parse the response from the backend into expected type.`);
        }
    }

    return undefined as unknown as T;
}

/**
 * Updates the `claimed` field of an account in the backend database.
 *
 * @param signer - The address that signed the message.
 * @param signature - The signature from the above signer.
 * @param recentBlockHeight - The recent block height. The corresponding block hash is included in the signed message.
 * @param accountAddress - The account address that should be set its field to `claimed` in the backend database.
 *
 * @throws An error if the backend responses with an error.
 */
export async function setClaimed(signer: string, signature: string, recentBlockHeight: bigint, accountAddress: string) {
    const body = JSON.stringify({
        signingData: {
            signer,
            message: {
                accountAddresses: [accountAddress],
            },
            signature,
            blockHeight: Number(recentBlockHeight),
        },
    });

    return await sendBackendRequest('setClaimed', 'POST', false, body);
}

/**
 * Fetches the pending approvals from the backend.
 *
 * @param signer - The address that signed the message.
 * @param signature - The signature from the above signer.
 * @param recentBlockHeight - The recent block height. The corresponding block hash is included in the signed message.
 * @param limit - The maximum number of records to retrieve.
 * @param offset - The starting point for record retrieval, useful for pagination.
 *
 * @throws An error if the backend responses with an error, or parsing of the return value fails.
 */
export async function getPendingApprovals(
    signer: string,
    signature: string,
    recentBlockHeight: bigint,
    limit: number,
    offset: number,
): Promise<AccountData[] | undefined> {
    const body = JSON.stringify({
        signingData: {
            signer,
            message: {
                limit,
                offset,
            },
            signature,
            blockHeight: Number(recentBlockHeight),
        },
    });

    return await sendBackendRequest<AccountData[]>('getPendingApprovals', 'POST', true, body);
}

/**
 * Fetches account data from the backend.
 *
 * @param signer - The address that signed the message.
 * @param signature - The signature from the above signer.
 * @param recentBlockHeight - The recent block height. The corresponding block hash is included in the signed message.
 *
 * @throws An error if the backend responses with an error, or parsing of the return value fails.
 */
export async function getAccountData(
    signer: string,
    accountAddress: string,
    signature: string,
    recentBlockHeight: bigint,
): Promise<AccountData> {
    const body = JSON.stringify({
        signingData: {
            signer,
            message: {
                accountAddress,
            },
            signature,
            blockHeight: Number(recentBlockHeight),
        },
    });

    return await sendBackendRequest<AccountData>('getAccountData', 'POST', true, body);
}

/**
 * Fetches the statement to prove from the backend.
 *
 * @throws An error if the backend responses with an error, or parsing of the return value fails.
 */
export async function getStatement(): Promise<CredentialStatement> {
    const statement = await sendBackendRequest<{ data: AtomicStatementV2[] }>('getZKProofStatements', 'GET', true);

    const credentialStatement: CredentialStatement = {
        idQualifier: {
            type: 'cred',
            // We allow all identity providers on mainnet and on testnet.
            // This list is longer than necessary to include all current/future
            // identity providers on mainnet and testnet.
            issuers: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        statement: statement.data,
    };

    return credentialStatement;
}

/**
 * Submit a tweet to the backend.
 *
 * @param signer - The address that signed the message.
 * @param signature - The signature from the above signer.
 * @param recentBlockHeight - The recent block height. The corresponding block hash is included in the signed message.
 * @param tweet - The tweet URL string.
 *
 * @throws An error if the backend responses with an error.
 */
export async function submitTweet(signer: string, signature: string, recentBlockHeight: bigint, tweet: string) {
    const body = JSON.stringify({
        signingData: {
            signer,
            message: {
                tweet,
            },
            signature,
            blockHeight: Number(recentBlockHeight),
        },
    });

    return await sendBackendRequest('postTweet', 'POST', false, body);
}

/**
 * Submit a ZK proof to the backend.
 *
 * @param presentation - The presentation including the ZK proof.
 * @param recentBlockHeight - The recent block height. The corresponding block hash is included in challenge of the ZK proof.
 *
 * @throws An error if the backend responses with an error.
 */
export async function submitZkProof(presentation: VerifiablePresentation, recentBlockHeight: bigint) {
    const body = JSON.stringify({
        blockHeight: Number(recentBlockHeight),
        presentation: presentation,
    });

    return await sendBackendRequest('postZKProof', 'POST', false, body);
}

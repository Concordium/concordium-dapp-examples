import JSONBig from 'json-bigint';
import { AtomicStatementV2, CredentialStatement, VerifiablePresentation } from '@concordium/web-sdk';

/**
 * Represents the stored data in the database of an indexed account (excluding tweet/zkProof data).
 *
 * @property accountAddress - The account address that was indexed.
 * @property blockTime - The timestamp of the block in which the event was included.
 * @property transactionHash - The transaction hash where the event was recorded.
 * @property claimed - Indicates whether the account has already claimed its reward (each account can only claim rewards once).
 * @property pendingApproval - Indicates whether the account has submitted all tasks and proven regulatory
 * conditions via a ZK proof. A manual check of the completed tasks is required before releasing the reward.
 */
interface StateData {
    accountAddress: string;
    blockTime: string;
    transactionHash: string;
    claimed: boolean;
    pendingApproval: boolean;
}

/**
 * Represents the data for a submitted tweet by an account.
 *
 * @property accountAddress - The account address that submitted the tweet.
 * @property tweetId - A tweet ID submitted by the associated account address (task 1).
 * @property tweetValid - Indicates whether the tweet's text content is eligible for the reward.
 * The content of the text was verified by the backend before this flag is set (or will be verified
 * by the admins manually).
 * @property tweetVerificationVersion - A version number that specifies the setting for tweet verification,
 * enabling updates to the verification logic and enabling invalidating older versions.
 * @property tweetSubmitTime - The timestamp when the tweet was submitted.
 */
interface TweetData {
    accountAddress: string;
    tweetId: string | undefined;
    tweetValid: boolean;
    tweetVerificationVersion: number;
    tweetSubmitTime: string;
}

/**
 * Represents the data for a ZK (Zero-Knowledge) proof submitted by an account.
 *
 * @property accountAddress - The account address that submitted the ZK proof.
 * @property uniquenessHash - A hash of the concatenated revealed `national_id_number` and `nationality`,
 * ensuring the same identity cannot claim with different accounts.
 * @property zkProofValid - Indicates whether the identity associated with the account is
 * eligible for the reward (task 2). An associated ZK proof was verified by this backend before this flag is set.
 * @property zkProofVerificationVersion - A version number that specifies the setting used during the ZK proof verification,
 * enabling updates to the verification logic and enabling invalidating older versions.
 * @property zkProofVerificationSubmitTime - The timestamp when the ZK proof was submitted.
 */
interface ZkProofData {
    accountAddress: string;
    uniquenessHash: string;
    zkProofValid: boolean;
    zkProofVerificationVersion: number;
    zkProofVerificationSubmitTime: string;
}

/**
 * Represents the stored data in the database of an account.
 *
 * @property stateData - Remaining stored data in the database if the account was indexed (excluding tweet/zkProof data).
 * @property tweetData - Stored data of a submitted tweet if present.
 * @property zkProofData - Stored data of a submitted ZK proof if present.
 */
export interface AccountData {
    stateData: StateData | undefined;
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
function createRequestOptions(method: string, body?: object): RequestInit {
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
                body: JSONBig.stringify(body),
            };
        default:
            throw new Error(`Invalid method: ${method}`);
    }
}

/**
 * Sends a `GET`/`POST` request to the backend.
 *
 * @param endpoint - The API endpoint.
 * @param method - The HTTP method (`'POST'` or `'GET'`).
 * @param body - Optional request body (required for `POST`, ignored for `GET`).
 * @returns A promise that can be resolved into the response.
 *
 * @throws An error if the method is invalid, if the body is incorrectly provided for the method,
 * or if the backend responses with an error.
 */
async function sendBackendRequest(endpoint: string, method: string, body?: object): Promise<Response> {
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
    return response;
}

/**
 * Parses the `GET`/`POST` response from the backend into a given type `T`.
 *
 * @param T - Return value type `T`.
 * @param response - The response to be parsed.
 * @returns A promise that can be resolved into the parsed return value of type `T`.
 *
 * @throws An error if the parsing of the return value fails.
 */
async function parseResponse<T = undefined>(response: Response): Promise<T> {
    try {
        // Parse the response as type `T`
        return JSONBig.parse(await response.text()) as T;
    } catch (e) {
        throw new Error(`Failed to parse the response from the backend into expected type.`);
    }
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
    const body = {
        signingData: {
            signer,
            message: {
                accountAddresses: [accountAddress],
            },
            signature,
            blockHeight: recentBlockHeight,
        },
    };

    return await sendBackendRequest('setClaimed', 'POST', body);
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
    const body = {
        signingData: {
            signer,
            message: {
                limit,
                offset,
            },
            signature,
            blockHeight: recentBlockHeight,
        },
    };

    const response = await sendBackendRequest('getPendingApprovals', 'POST', body);
    return await parseResponse<AccountData[]>(response);
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
    const body = {
        signingData: {
            signer,
            message: {
                accountAddress,
            },
            signature,
            blockHeight: recentBlockHeight,
        },
    };

    const response = await sendBackendRequest('getAccountData', 'POST', body);
    return await parseResponse<AccountData>(response);
}

/**
 * Fetches the statement to prove from the backend.
 *
 * @throws An error if the backend responses with an error, or parsing of the return value fails.
 */
export async function getStatement(): Promise<CredentialStatement> {
    const response = await sendBackendRequest('getZKProofStatements', 'GET');
    const statement = await parseResponse<{ data: AtomicStatementV2[] }>(response);

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
    const body = {
        signingData: {
            signer,
            message: {
                tweet,
            },
            signature,
            blockHeight: recentBlockHeight,
        },
    };

    return await sendBackendRequest('postTweet', 'POST', body);
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
    const body = {
        blockHeight: recentBlockHeight,
        presentation: presentation,
    };

    return await sendBackendRequest('postZKProof', 'POST', body);
}

import {
    AccountAddress,
    AtomicStatementV2,
    ConcordiumGRPCClient,
    CredentialStatement,
    VerifiablePresentation,
} from '@concordium/web-sdk';

import { WalletProvider } from './wallet-connection';

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
 * Fetch pending approvals from the backend
 */
export async function setClaimed(signer: string, signature: string, recentBlockHeight: bigint, accountAddress: string) {
    const response = await fetch(`api/setClaimed`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer,
                message: {
                    accountAddresses: [accountAddress],
                },
                signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(
            `Unable to set claimed in the database; StatusCode:${response.status}; StatusText:${response.statusText}; Error: ${JSON.stringify(error)}`,
        );
    }
}

/**
 * Fetch pending approvals from the backend
 */
export async function getPendingApprovals(
    signer: string,
    signature: string,
    recentBlockHeight: bigint,
    limit: number,
    offset: number,
): Promise<AccountData[] | undefined> {
    const response = await fetch(`api/getPendingApprovals`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer,
                message: {
                    limit,
                    offset,
                },
                signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(
            `Unable to get pending approvals from the backend; StatusCode:${response.status}; StatusText:${response.statusText}; Error: ${JSON.stringify(error)}`,
        );
    }

    const body = (await response.json()) as AccountData[];

    if (!body) {
        throw new Error(`Unable to get pending approvals from the backend`);
    }
    return body;
}

/**
 * Fetch account data from the backend
 */
export async function getARecentBlockHash(grpcClient: ConcordiumGRPCClient | undefined): Promise<[Uint8Array, bigint]> {
    if (!grpcClient) {
        throw Error(`'grpcClient' is undefined`);
    }

    const bestBlockHeight = (await grpcClient.client.getConsensusInfo(''))?.response.bestBlockHeight;

    if (!bestBlockHeight) {
        throw Error(`Couldn't get 'bestBlockHeight' from chain`);
    }

    const recentBlockHeight = bestBlockHeight.value - 10n;

    const recentBlockHash = (
        await grpcClient.client.getBlocksAtHeight({
            // TODO: Type in web-sdk needs to be fixed to do this ergonomically.
            blocksAtHeight: {
                oneofKind: 'absolute',
                absolute: {
                    height: { value: recentBlockHeight },
                },
            },
        })
    )?.response.blocks[0].value;

    if (!recentBlockHash) {
        throw Error(`Couldn't get 'recentBlockHash' from chain`);
    }
    return [recentBlockHash, recentBlockHeight];
}

/**
 * Fetch account data from the backend
 */
export async function getAccountData(
    signer: string,
    accountAddress: string,
    signature: string,
    recentBlockHeight: bigint,
): Promise<AccountData> {
    const response = await fetch(`api/getAccountData`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer,
                message: {
                    accountAddress,
                },
                signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(
            `Unable to get account data the backend; StatusCode:${response.status}; StatusText:${response.statusText}; Error: ${JSON.stringify(error)}`,
        );
    }

    const body = (await response.json()) as AccountData;

    if (!body) {
        throw new Error(`Unable to get account data from the backend`);
    }
    return body;
}

/**
 * Request signature from wallet.
 */
export async function requestSignature(
    recentBlockHash: Uint8Array,
    schema: string,
    message: string | string[] | object,
    signer: string,
    provider: WalletProvider | undefined,
): Promise<string> {
    if (!provider) {
        throw Error(`'provider' is undefined. Connect your wallet.`);
    }

    const signatures = await provider.signMessage(signer, message, recentBlockHash, schema);
    if (Object.keys(signatures).length !== 1 || Object.keys(signatures[0]).length !== 1) {
        throw Error(`Dapp only supports single singer accounts`);
    }
    return signatures[0][0];
}

/**
 * Fetch the statement to prove from the backend
 */
export async function getStatement(): Promise<CredentialStatement> {
    const response = await fetch(`api/getZKProofStatements`, { method: 'GET' });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get the ZK statement from the backend: ${JSON.stringify(error)}`);
    }

    const body = (await response.json()).data as AtomicStatementV2[];

    if (!body) {
        throw new Error(`Unable to get the ZK statement from the backend`);
    }

    const credentialStatement: CredentialStatement = {
        idQualifier: {
            type: 'cred',
            // We allow all identity providers on mainnet and on testnet.
            // This list is longer than necessary to include all current/future
            // identity providers on mainnet and testnet.
            // This list should be updated to only include the identity providers that you trust.
            issuers: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        statement: body,
    };

    return credentialStatement;
}

/**
 * Submit Tweet to the backend
 */
export async function submitTweet(signer: string, signature: string, recentBlockHeight: bigint, tweet: string) {
    const response = await fetch(`api/postTweet`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer,
                message: {
                    tweet,
                },
                signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        let finalError;

        try {
            finalError = await response.json();
        } catch (e) {
            throw new Error(
                `Unable to submit Tweet to the backend; StatusCode: ${response.status}; StatusText: ${response.statusText};`,
            );
        }

        throw new Error(`Unable to submit Tweet to the backend; Error: ${JSON.stringify(finalError)}`);
    }
}

/**
 * Submit ZK proof to the backend
 */
export async function submitZkProof(presentation: VerifiablePresentation, recentBlockHeight: bigint) {
    const response = await fetch(`api/postZKProof`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            blockHeight: Number(recentBlockHeight),
            presentation: presentation,
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(
            `Unable to submit ZK proof to the backend; StatusCode:${response.status}; StatusText:${response.statusText}; Error: ${JSON.stringify(error)}`,
        );
    }
}

/**
 * This function validates if a string represents a valid accountAddress in base58 encoding.
 * The length, characters, and the checksum are validated.
 *
 * @param accountAddress - An account address represented as a base58 encoded string.
 * @returns An error message if validation fails.
 */
export function validateAccountAddress(accountAddress: string | undefined) {
    if (accountAddress) {
        try {
            AccountAddress.fromBase58(accountAddress);
        } catch (e) {
            return `Please enter a valid account address. It is a base58 string with a fixed length of 50 characters. Original error: ${
                (e as Error).message
            }.`;
        }
    }
}

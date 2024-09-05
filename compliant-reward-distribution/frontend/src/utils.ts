import {
    AccountAddress,
    AtomicStatementV2,
    ConcordiumGRPCClient,
    CredentialStatement,
    VerifiablePresentation,
} from '@concordium/web-sdk';
import { BACKEDN_BASE_URL } from './constants';

interface AccountData {
    // The account address that was indexed.
    accountAddress: AccountAddress.Type;
    // The timestamp of the block the event was included in.
    blockTime: string; // DateTime<Utc>,
    // The transaction hash that the event was recorded in.
    transactionHash: string; // TransactionHash,
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
export async function getPendingApprovals(
    signer: string,
    signature: string,
    recentBlockHeight: bigint,
    limit: number,
    offset: number,
): Promise<AccountData[] | undefined> {
    const response = await fetch(`${BACKEDN_BASE_URL}api/getPendingApprovals`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer: signer,
                message: {
                    limit,
                    offset,
                },
                signature: signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get pending approvals from the backend: ${JSON.stringify(error)}`);
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
    const response = await fetch(`${BACKEDN_BASE_URL}api/getAccountData`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            signingData: {
                signer: signer,
                message: {
                    accountAddress: accountAddress,
                },
                signature: signature,
                blockHeight: Number(recentBlockHeight),
            },
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to get account data the backend: ${JSON.stringify(error)}`);
    }

    const body = (await response.json()) as AccountData;

    if (!body) {
        throw new Error(`Unable to get account data from the backend`);
    }
    return body;
}

/**
 * Fetch the statement to prove from the backend
 */
export async function getStatement(): Promise<CredentialStatement> {
    const response = await fetch(`${BACKEDN_BASE_URL}api/getZKProofStatements`, { method: 'GET' });

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
 * Submit ZK proof to the backend
 */
export async function submitZkProof(presentation: VerifiablePresentation, recentBlockHeight: bigint) {
    const response = await fetch(`${BACKEDN_BASE_URL}api/postZKProof`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
            blockHeight: Number(recentBlockHeight),
            presentation: presentation,
        }),
    });

    if (!response.ok) {
        const error = (await response.json()) as Error;
        throw new Error(`Unable to submit ZK proof to the backend: ${JSON.stringify(error)}`);
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

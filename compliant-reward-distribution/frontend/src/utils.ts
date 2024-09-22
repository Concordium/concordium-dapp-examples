import { AccountAddress, BlockHash, ConcordiumGRPCClient } from '@concordium/web-sdk';

import { WalletProvider } from './wallet-connection';
import { RECENT_BLOCK_DURATION } from './constants';

interface RecentBlock {
    blockHeight: bigint;
    blockHash: BlockHash.Type;
}

/**
 * Gets the recent block hash and height by querying the connected node.
 * The recent block is the block that is `RECENT_BLOCK_DURATION` blocks
 * behind the best block (top of chain).
 *
 * @param grpcClient - Connection to a blockchain node.
 * @returns The recent block hash and height.
 *
 * @throws An error if the node responses with one.
 */
export async function getRecentBlock(grpcClient: ConcordiumGRPCClient | undefined): Promise<RecentBlock> {
    if (!grpcClient) {
        throw Error(`'grpcClient' is undefined`);
    }

    const bestBlockHeight = (await grpcClient.client.getConsensusInfo(''))?.response.bestBlockHeight;

    if (!bestBlockHeight) {
        throw Error(`Couldn't get 'bestBlockHeight' from chain`);
    }

    const recentBlockHeight = bestBlockHeight.value - RECENT_BLOCK_DURATION;

    const recentBlockHash = (await grpcClient.getBlocksAtHeight(recentBlockHeight))[0];

    if (!recentBlockHash) {
        throw Error(`Couldn't get 'recentBlockHash' from chain`);
    }
    return { blockHash: recentBlockHash, blockHeight: recentBlockHeight };
}

/**
 * Request a signature from the connected wallet.
 *
 * @param recentBlockHash - A recent block hash.
 * @param schema - The schema to display the message in the wallet.
 * @param message - The message to sign in the wallet.
 * @param signer - The signer account (is only respected when the browser wallet is connected).
 * @param provider - The wallet provider.
 * @returns The signature.
 *
 * @throws An error if the wallet responses with one, it the message can not be serialized/deserialized
 * with the given schema, if the `provider` is undefined, or if a multi-sig account is used as signer.
 */
export async function requestSignature(
    recentBlockHash: BlockHash.Type,
    schema: string,
    message: string | string[] | object,
    signer: string,
    provider: WalletProvider | undefined,
): Promise<string> {
    if (!provider) {
        throw Error(`'provider' is undefined. Connect your wallet. Have an account in your wallet.`);
    }

    const signatures = await provider.signMessage(signer, message, recentBlockHash, schema);
    if (Object.keys(signatures).length !== 1 || Object.keys(signatures[0]).length !== 1) {
        throw Error(`Dapp only supports single singer accounts`);
    }
    return signatures[0][0];
}

/**
 * Validates if a string represents a valid accountAddress in base58 encoding.
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

/**
 * Validates if a string represents a valid tweet URL.
 *
 * @param url - An url string of a tweet posted on Twitter.
 * @returns An error message if validation fails.
 */
export function validateTweetUrl(url: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^https:\/\/(x\.com|twitter\.com)\/[^\/]+\/status\/(\d+)$/;
    if (!url.match(regex)) {
        return `Not a valid tweet URL (expected format: https://x.com/MaxMustermann/status/1818198789817077916 or https://twitter.com/JohnDoe/status/1818198789817077916)`;
    }
}

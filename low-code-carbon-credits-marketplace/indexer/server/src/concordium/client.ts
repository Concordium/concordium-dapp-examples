import {
    ConcordiumGRPCClient,
    ContractAddress,
    createConcordiumClient,
} from '@concordium/node-sdk';
import { credentials } from '@grpc/grpc-js/';

export const getConcordiumClient = (
    nodeEndpoint: string,
    nodePort: number
): ConcordiumGRPCClient => {
    return createConcordiumClient(
        nodeEndpoint,
        nodePort,
        credentials.createInsecure(),
        { timeout: 15000 }
    );
};

export const getBlockHeight = async (
    client: ConcordiumGRPCClient,
    blockHash?: string
): Promise<bigint> => {
    if (!blockHash) {
        return BigInt(1);
    }

    const block = await client.getBlockInfo(blockHash);
    return block.blockHeight;
};

export const getMaxBlockHeight = async (
    client: ConcordiumGRPCClient
): Promise<bigint> => {
    const consensusStatus = await client.getConsensusStatus();
    return consensusStatus.lastFinalizedBlockHeight;
};

export const getFinalizedBlockAtHeight = async (
    client: ConcordiumGRPCClient,
    blockHeight: bigint
): Promise<string> => {
    const blocks = await client.getBlocksAtHeight(blockHeight);
    if (blocks.length > 1) {
        throw new Error('multiple blocks recieved');
    }

    return blocks[0];
};

export const getContractModule = async (
    client: ConcordiumGRPCClient,
    address: ContractAddress,
    blockHash: string
): Promise<string> => {
    const instanceInfo = await client.getInstanceInfo(address, blockHash);

    return instanceInfo.sourceModule.moduleRef;
};

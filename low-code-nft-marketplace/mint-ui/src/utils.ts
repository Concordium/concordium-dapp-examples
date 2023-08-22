import { IPFS_GATEWAY_URL } from './Constants';

export const toIpfsGatewayUrl = (ipfsUrl?: string) => {
    return (ipfsUrl || '').replace('ipfs://', IPFS_GATEWAY_URL);
};

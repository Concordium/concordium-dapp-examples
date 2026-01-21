import { ConcordiumGRPCNodeClient, credentials } from '@concordium/web-sdk/nodejs';

export default function createGRPCNodeClient(): ConcordiumGRPCNodeClient {
    const { NODE_PORT, NODE_URL } = process.env;
    if (!NODE_PORT || !NODE_URL) {
        throw new Error('NDDE_PORT or NODE_URL env vars not defined.');
    }
    return new ConcordiumGRPCNodeClient(NODE_URL as string, Number(NODE_PORT), credentials.createSsl());
}

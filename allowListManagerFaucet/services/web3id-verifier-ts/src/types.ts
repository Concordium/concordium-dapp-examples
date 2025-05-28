import { Network } from '@concordium/web-sdk/types';

/**
 * Configuration for the verifier.
 */
export interface AppConfig {
    /** The gRPC V2 interface of the node. */
    endpoint: URL;
    /** The address to listen on for the API. */
    listenAddress: URL;
    /** Request timeout in milliseconds. */
    requestTimeout: number;
    /** The network to which the verifier is connected. */
    network: Network;
}

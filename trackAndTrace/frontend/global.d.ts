/// <reference types="vite/client" />

type TargetNetwork = 'testnet' | 'mainnet';

declare namespace NodeJS {
    export interface ProcessEnv {
        /** The {@linkcode TargetNetwork} passed from environment variables at run time */
        readonly TRACK_AND_TRACE_NETWORK: TargetNetwork;
        /** The track and trace contract address passed from environment variables at run time */
        readonly TRACK_AND_TRACE_CONTRACT_ADDRESS: string;
        /** The Concordium node URL passed from environment variables at run time */
        readonly TRACK_AND_TRACE_NODE: string;
        /** The URL of the sponsored transaction backend API */
        readonly TRACK_AND_TRACE_SPONSORED_BACKEND_API: string;
    }
}

/**
 * The configuration built into the application when served from the backend API
 */
interface Config {
    /** The URL of the node. Must have grpc-web enabled. */
    node: string;
    /** The contract address of the track and trace instance used. */
    contractAddress: { index: string; subindex: string };
    /** The concordium network used. */
    network: TargetNetwork;
    /** The Pinata JSON Web Token. */
    pinataJWT: string;
    /** The base URL of the Pinata Gateway. */
    pinataGateway: string;
    /** The URL of the sponsored transaction backend API. */
    sponsoredTransactionBackend: string;
}

/** The configuration built into the application when served from the backend API */
declare const CONFIG: Config;

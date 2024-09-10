/// <reference types="vite/client" />

type TargetNetwork = 'testnet' | 'mainnet';

declare namespace NodeJS {
    export interface ProcessEnv {
        /** The {@linkcode TargetNetwork} passed from environment variables at run time */
        readonly NETWORK: TargetNetwork;
        /** The Concordium node URL passed from environment variables at run time */
        readonly CONCORDIUM_NODE: string;
    }
}

/**
 * The configuration built into the application when served from the backend API
 */
interface Config {
    /** The URL of the node. Must have grpc-web enabled. */
    node: string;
    /** The concordium network used. */
    network: TargetNetwork;
}

/** The configuration built into the application when served from the backend API */
declare const CONFIG: Config;

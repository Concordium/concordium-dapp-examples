/// <reference types="vite/client" />

type TargetNetwork = 'testnet';

declare namespace NodeJS {
    export interface ProcessEnv {
        /** The {@linkcode TargetNetwork} passed from environment variables at build time */
        readonly CCD_ELECTION_NETWORK: TargetNetwork;
        /** The election contract address passed from environment variables at build time */
        readonly CIS2_TOKEN_CONTRACT_INDEX: number;
        /** The Concordium node URL passed from environment variables at build time */
        readonly AUCTION_CONTRACT_INDEX: number;
    }
}

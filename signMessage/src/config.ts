import {GtuAmount} from "@concordium/web-sdk";

export const JSON_RPC_URL = "https://json-rpc.testnet.concordium.com";
export const WALLET_CONNECT_PROJECT_ID = "76324905a70fe5c388bab46d3e0564dc";
export const WALLET_CONNECT_SESSION_NAMESPACE = "ccd";
export const DEFAULT_CONTRACT_INDEX = BigInt(81);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
export const CHAIN_ID = "ccd:testnet";
export const ZERO_AMOUNT = new GtuAmount(BigInt(0));
export const CCDSCAN_URL = "testnet.ccdscan.io";
export const PING_INTERVAL_MS = 5000;

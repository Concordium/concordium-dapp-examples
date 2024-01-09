import { Buffer } from 'buffer/';

import { ModuleReference } from '@concordium/web-sdk';

import { ContractInfo, ContractName } from './models/ConcordiumContractClient';

/**
 * Contract Address for Marketplace. You should specify your contract's index when you initialized it.
 */
export const MARKET_CONTRACT_ADDRESS = {
  index: BigInt(process.env.REACT_APP_DEFAULT_MARKET_ADDRESS_INDEX!),
  subindex: BigInt(process.env.REACT_APP_DEFAULT_MARKET_ADDRESS_SUBINDEX!),
};
export const CARBON_CREDIT_CONTRACT_ADDRESS = {
  index: BigInt(process.env.REACT_APP_DEFAULT_CARBON_CREDIT_ADDRESS_INDEX!),
  subindex: BigInt(process.env.REACT_APP_DEFAULT_CARBON_CREDIT_ADDRESS_SUBINDEX!),
};
export const PROJECT_TOKEN_CONTRACT_ADDRESS = {
  index: BigInt(process.env.REACT_APP_DEFAULT_PROJECT_TOKEN_ADDRESS_INDEX!),
  subindex: BigInt(process.env.REACT_APP_DEFAULT_PROJECT_TOKEN_ADDRESS_SUBINDEX!),
};
const MODULE_REF = process.env.REACT_APP_MODULE_REF!;
const MODULE_SCHEMA = process.env.REACT_APP_MODULE_SCHEMA!;
const FRACTIONALIZER_MODULE_REF = MODULE_REF;
const CARBON_CREDIT_CONTRACT_SCHEMA = MODULE_SCHEMA;
export const CARBON_CREDIT_CONTRACT_INFO: ContractInfo = {
  contractName: process.env.REACT_APP_CARBON_CREDIT_CONTRACT_NAME! as ContractName,
  moduleRef: new ModuleReference(FRACTIONALIZER_MODULE_REF),
  schemaBuffer: Buffer.from(CARBON_CREDIT_CONTRACT_SCHEMA, "base64"),
};
/**
 * Marketplace Contract Schema.
 * Serialization code depends on this Schema. Any changes to the schema should have a corresponding change in MarketplaceDeserialzer.ts code.
 */
// Module Reference and Contract Schema for the Marketplace Contract
// Both module ref and the contract schema should be changed after a new contract deployed (if there are changes)
const MARKET_CONTRACT_SCHEMA = MODULE_SCHEMA;
const MARKET_MODULE_REF = MODULE_REF;

export const MARKETPLACE_CONTRACT_INFO: ContractInfo = {
  contractName: process.env.REACT_APP_MARKET_CONTRACT_NAME! as ContractName,
  schemaBuffer: Buffer.from(MARKET_CONTRACT_SCHEMA, "base64"),
  moduleRef: new ModuleReference(MARKET_MODULE_REF),
};
// Module Reference and Contract Schema for the CIS2-Multi
// Both module ref and the contract schema should be changed after a new contract deployed (if there are changes)
const PROJECT_TOKEN_CONTRACT_MODULE_REF = MODULE_REF;
const PROJECT_TOKEN_CONTRACT_SCHEMA = MODULE_SCHEMA;
export const PROJECT_TOKEN_CONTRACT_INFO: ContractInfo = {
  contractName: process.env.REACT_APP_PROJECT_TOKEN_CONTRACT_NAME! as ContractName,
  moduleRef: new ModuleReference(PROJECT_TOKEN_CONTRACT_MODULE_REF),
  schemaBuffer: Buffer.from(PROJECT_TOKEN_CONTRACT_SCHEMA, "base64"),
};
export const IPFS_GATEWAY_URL = process.env.REACT_APP_IPFS_GATEWAY_URL!;

// Concordium Node Config Options
export const CONNCORDIUM_NODE_ENDPOINT = process.env.REACT_APP_CONCORDIUM_NODE_ENDPOINT!;
export const CONCORDIUM_NODE_PORT = process.env.REACT_APP_CONCORDIUM_NODE_PORT!;
export const EXPLORER_URL_TXN_HASH = process.env.REACT_APP_EXPLORER_URL_TXN_HASH!;

// Wert Config Options
export const WERT_PRIVATE_KEY = process.env.REACT_APP_WERT_PRIVATE_KEY;
export const WERT_PARTNER_ID = process.env.REACT_APP_WERT_PARTNER_ID;
export const WERT_NETWORK = process.env.REACT_APP_WERT_NETWORK;
export const WERT_ORIGIN = process.env.REACT_APP_WERT_ORIGIN;

// Login Via Google Config Options
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// Indexer Config Options
export const INDEXER_API_URL = process.env.REACT_APP_INDEXER_API_URL!;

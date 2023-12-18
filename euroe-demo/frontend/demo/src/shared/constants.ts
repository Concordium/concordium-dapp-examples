import { TESTNET, MAINNET } from '@concordium/wallet-connectors';
import { ContractAddress } from '@concordium/web-sdk';

const IS_MAINNET = process.env.CCD_ELECTION_NETWORK === 'mainnet';
const { hostname, port, protocol } = new URL(process.env.CCD_ELECTION_NODE);

/** The Concordium network used for the application. */
export const NETWORK = IS_MAINNET ? MAINNET : TESTNET;
/** The Concordium node url used for querying data. */
export const GRPC_ADDRESS = `${protocol}//${hostname}`;
/** The port of the GRPC interface of the node accessible at {@linkcode GRPC_ADDRESS} */
export const GRPC_PORT = Number(port);
/** The URL of the backend API */
export const BACKEND_API = process.env.CCD_ELECTION_BACKEND_API;

const [, index, subindex] =
    process.env.CCD_ELECTION_CONTRACT_ADDRESS.match(/<(\d*),(\d*)>/) ??
    (() => {
        throw new Error('Unexpected format of environment variable "CONTRACT_ADDRESS"');
    })();
/** The contract address of the election smart contract */
export const CONTRACT_ADDRESS = ContractAddress.create(BigInt(index), BigInt(subindex));

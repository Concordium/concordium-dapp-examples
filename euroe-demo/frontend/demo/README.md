# Concordium governance committee voting dApp

## Application functionality

-   Users connect through concordium wallet
-   Users (re-)cast votes by selecting from a list of candidates from election contract instance
-   Users can follow the progress of their vote

## Installation

Assuming the project has already been cloned, installation of the dependencies required to build/run the project is done
by executing the following:

```bash
yarn install
```

### Generate election contract client

The application build relies on a generated contract, which is generated from the contract module source. As such, the
contract module must first be built:

_Requires [cargo-concordium](https://developer.concordium.software/en/mainnet/smart-contracts/guides/setup-tools.html#setup-tools) to be installed on the host machine_

```bash
yarn build-election-contract && yarn generate-contract-client
```

## Environment variables

```bash
CCD_ELECTION_NETWORK="testnet" # If not specified, defaults to "testnet"
CCD_ELECTION_CONTRACT_ADDRESS="<7357,0>" # No default value
CCD_ELECTION_NODE="http://localhost:20001" # If not specififed, default to "http://localhost:20001"
CCD_ELECTION_BACKEND_API="http://localhost:8080" # If not specified, defaults to "http://localhost:8080"
```

## Development workflow

To run the project during development, the following will provide a workflow with hot module replacement:

```bash
yarn dev
```

A development server is started, which can be accessed at the url logged in the console (usually http://localhost:5173).

## Building for production

To build the application for production use, do:

```bash
yarn build
```

Subsequently, the production build can be previewed by running:

```bash
yarn preview
```

A web server will start, which can be accessed at the url logged in the console (usually http://localhost:4173).

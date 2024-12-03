# Track and Trace Front end

## Setup

Make sure to have the following installed:

- [NodeJs](https://nodejs.org).
- Rust and cargo (Recommended to install using [rustup](https://rustup.rs)).
- Recent version of [cargo concordium](https://crates.io/crates/cargo-concordium). Install using `cargo install --locked cargo-concordium`.

## Frontend

To setup and install dependencies for the frontend navigate to the `frontend` directory and run:

```bash
yarn install
```

### Development

Set the environment variable `TRACK_AND_TRACE_CONTRACT_ADDRESS`, or prefix it before the `yarn dev` call below.

This front end calls three backend endpoints:

- `/api/submitTransaction` from the [sponsored transaction backend service](../sponsored-transaction-service)
- `/api/getItemStatusChangedEvents` from the [backend server](../indexer)
- `/api/getItemCreatedEvent` from the [backend server](../indexer)

See the [Environment variables](#environment-variables) section below for configuration options regarding the sponsored service.

To start a development environment make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn dev
```

e.g.

```bash
TRACK_AND_TRACE_CONTRACT_ADDRESS="<8901,0>" yarn dev
```

This will launch a development server with hot module replacement enabled.

_Please note that calls to the backend server do not work in the development setup._

If you want to set up the whole project together with running the backend services so that the 3 endpoints work. Follow the instructions in the project's [README.md](../README.md).

### Environment variables

These environment variables are available in the frontend.
You must always set `TRACK_AND_TRACE_CONTRACT_ADDRESS`. The rest have default values that may work for your setup.

When hosting the frontend via the [backend server](../indexer), the values environment variables are passed in via the server.

```bash
TRACK_AND_TRACE_CONTRACT_ADDRESS=<8901,0> # Contract address of the track and trace contract. *Must be set.*
TRACK_AND_TRACE_NETWORK=testnet # The network to use mainnet/testnet (defaults to 'testnet')
TRACK_AND_TRACE_NODE=https://grpc.testnet.concordium.com:20000 # The gRPC endpoint of a node in the chosen network (defaults to 'https://grpc.testnet.concordium.com:20000')
TRACK_AND_TRACE_SPONSORED_BACKEND_API=http://localhost:8000 # Endpoint to the sponsored transaction service (defaults to 'http://localhost:8000')
```

### Build

To start building the frontend make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn build
```

This will bundle the project into `frontend/dist` directory which should be hosted by the [backend server](../indexer).

### Generate smart contract clients

This project is set up to generate a TypeScript smart contract client, directly from the smart contract module and the embedded schema. Make sure to build the smart contract module as described below.

To build the smart contract module, navigate to the `frontend` directory and run:

```bash
yarn build:contracts
```

To generate the smart contract client for the frontend navigate to the `frontend` directory and run:

```bash
yarn generate
```

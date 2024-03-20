# Track and Trace Front end

## Setup

Make sure to have the following installed:

-   [NodeJs](https://nodejs.org).
-   Rust and cargo (Recommended to install using [rustup](https://rustup.rs)).
-   Recent version of [cargo concordium](https://crates.io/crates/cargo-concordium). Install using `cargo install --locked cargo-concordium`.

## Frontend

To setup and install dependencies for the frontend navigate to the `frontend` directory and run:

```bash
yarn install
```

### Development

Set the two environmental variables `SPONSORED_TRANSACTION_BACKEND_BASE_URL` and the `TRACK_AND_TRACE_CONTRACT_INDEX`, or prefix them before the `yarn dev` call below.

`SPONSORED_TRANSACTION_BACKEND_BASE_URL` is the base url of your [sponsored transaction backend service](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/sponsored-transaction-service)

`TRACK_AND_TRACE_CONTRACT_INDEX` is the track and trace contract address.

This front end calls three backend endpoints:

-   `/api/submitTransaction` from the [sponsored transaction backend service](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/sponsored-transaction-service)
-   `/api/getItemStatusChangedEvents` from the [backend server](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/indexer)
-   `/api/getItemCreatedEvent` from the [backend server](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/indexer)

You can build and launch this front end without setting up the backend services as described in this paragraph. In that case, calling the above endpoints via the front end will fail. To start
a development environment make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn dev
```

This will launch a development server with hot module replacement enabled.

If you want to set up the whole project together with running the backend services so that the 3 endpoints work. Follow the instructions in the project's [README.md](../README.md).

### Build

Set the two environmental variables `SPONSORED_TRANSACTION_BACKEND_BASE_URL` and the `TRACK_AND_TRACE_CONTRACT_INDEX`, or prefix them before the `yarn build` call below.

`SPONSORED_TRANSACTION_BACKEND_BASE_URL` is the base url of your [sponsored transaction backend service](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/sponsored-transaction-service)

`TRACK_AND_TRACE_CONTRACT_INDEX` is the track and trace contract index.

This front end calls three backend endpoints:

-   `/api/submitTransaction` from the [sponsored transaction backend service](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/sponsored-transaction-service)
-   `/api/getItemStatusChangedEvents` from the [backend server](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/indexer)
-   `/api/getItemCreatedEvent` from the [backend server](https://github.com/Concordium/concordium-dapp-examples/tree/main/trackAndTrace/indexer)

To start building the frontend make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn build
```

This will bundle the project into `frontend/dist` directory.

Note: If you want to build the front end with working backend services, make sure you set the value `SPONSORED_TRANSACTION_BACKEND_BASE_URL` in the `package.json` file correctly and its backend service is up and running.

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

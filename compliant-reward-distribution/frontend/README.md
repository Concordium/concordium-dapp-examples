# Front end

## Setup

Make sure to have the following installed:

-   [NodeJs](https://nodejs.org).
-   [yarn](https://yarnpkg.com/getting-started/install) or a similar package manager.
-   Rust and cargo (Recommended to install using [rustup](https://rustup.rs)).

## Frontend

To setup and install dependencies for the frontend navigate to the `frontend` directory and run:

```bash
yarn install
```

### Development

Set the environment variable `NETWORK` and `CONCORDIUM_NODE`, or prefix it before the `yarn dev` call.
Not setting the environment variables will run the frontend with the default `testnet` configuration.

```bash
yarn dev
```

or

```bash
NETWORK="mainnet" CONCORDIUM_NODE="https://grpc.mainnet.concordium.software:20000" yarn dev
```

This will launch a development server with hot module replacement enabled.

_Please note that calls to the backend server do not work in the development setup._

If you want to set up the whole project together with running the backend services so that the endpoints work. Follow the instructions in the project's [README.md](../indexer-and-server/README.md).

This frontend calls following backend endpoints:

-   `api/setClaimed`
-   `api/getPendingApprovals`
-   `api/getAccountData`
-   `api/getZKProofStatements`
-   `api/postTweet`
-   `api/postZKProof`

from the [backend server](../indexer-and-server)

### Environment variables

These environment variables are available in the frontend.

When hosting the frontend via the [backend server](../indexer-and-server), the values of the environment variables are passed in via the server.

```bash
NETWORK=testnet # The network to use mainnet/testnet (defaults to 'testnet')
CONCORDIUM_NODE=https://grpc.testnet.concordium.com:20000 # The gRPC endpoint of a node in the chosen network (defaults to 'https://grpc.testnet.concordium.com:20000')
```

### Build

```bash
yarn build
```

This will bundle the project into `frontend/dist` directory which should be hosted by the [backend server](../indexer-and-server).

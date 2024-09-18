# Track and Trace Project

## Hosted front end

[Hosted front end link](https://trackntrace.testnet.concordium.com/)

## Overview

This project contains a complete implementation of a track and trace solution with [CIS-3](https://proposals.concordium.software/CIS/cis-3.html) compliant sponsored transactions.

It has five primary components.

- A [smart contract](./smart-contract/README.md), located in `./smart-contract`
- A [frontend](./frontend/README.md), located in `./frontend`
- An [indexer](./indexer/README.md) service, located in `./indexer`
- A [sponsored transaction service](./sponsored-transaction-service/README.md), located in `./sponsored-transaction-service`
  - This service is generic and compatible with any CIS-3 contracts.
- A [server](./indexer/README.md) that hosts the frontend, located in `./indexer`

Explanations for each component reside in README.md files inside their respective folder.

You can run the services and servers manually as explained in the READMEs or use the docker files in `./dockerfiles`.

However, the easiest option is to use [docker-compose](https://docs.docker.com/compose/) with the configuration file `./docker-compose.yml`.

For this to work, you should do the following:

1. Deploy and initialize your version of the Track and Trace smart contract.
2. [Export your account keys from the Browser Wallet](https://developer.concordium.software/en/mainnet/net/guides/export-key.html) and generate a `./private-keys` folder to save the key file into it.
3. Set the following environment variables:
   - Set the `TRACK_AND_TRACE_CONTRACT_ADDRESS` variable to the contract address of your contract instance.
   - Set the `TRACK_AND_TRACE_PRIVATE_KEY_FILE` variable to the path of your keys from step 2.
   - (Optional) Set the `TRACK_AND_TRACE_NETWORK` variable to the correct net (testnet/mainnet). Defaults to testnet.
   - (Optional) Set the `TRACK_AND_TRACE_NODE` to the gRPC endpoint of the node you want to use. Make sure it runs on the right net, i.e., testnet or mainnet. Defaults to `https://grpc.testnet.concordium.com:20000`.
4. Run `docker-compose up` to build and start all the services.

e.g.

```bash
TRACK_AND_TRACE_CONTRACT_ADDRESS="<8901,0>" TRACK_AND_TRACE_PRIVATE_KEY_FILE="./private-keys/4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export" docker-compose up
```

You might need to run the above command twice, if the postgres database container is too slow
to be set up for the first time and as a result the indexer or server throw an error because
they are already trying to connect. Stopping the command and re-running the command will load
the already setup postgres database container.

5. Access the frontend at `http://localhost:8080`
   - The sponsored transaction service runs on port `8000` by default, and the postgres database runs on `5432`. Both are configurable in the `./docker-compose.yml` file.

## Switching to a different contract address

The indexer service saves the contract address used into the underlying PostgreSQL database.
If you want to use a different contract address than initially set up, you therefore need to delete the PostgreSQL database before running the `docker-compose up` command again.

To do so, run the following command:

``` shell
   docker volume rm trackandtrace_postgres_data
```

# Compliance Reward Distribution Dapp

## Architecture

![Architecture](./Architecture.png)

## Hosted front end

[Soon](https://github.com/Concordium/concordium-dapp-examples)

## Overview

The project has three primary components.

- A [frontend](./frontend/README.md), located in `./frontend`
- An [indexer](./indexer-and-server/README.md) service, located in `./indexer-and-server`
- A [server](./indexer-and-server/README.md) that hosts the frontend, located in `./indexer-and-server`

Explanations for each component reside in README.md files inside their respective folder.

You can run the services and servers manually as explained in the READMEs or use the docker files in `./dockerfiles`.

However, the easiest option is to use [docker-compose](https://docs.docker.com/compose/) with the configuration file `./docker-compose.yml`.

For this to work, you should do the following:

1. Set the following environment variables:
   - (Optional) Set the `NETWORK` variable to the correct network (`testnet`/`mainnet`). Defaults to `testnet`.
   - (Optional) Set the `CONCORDIUM_NODE` to the gRPC endpoint of the node you want to use. Make sure it runs on the right network, i.e., testnet or mainnet. Defaults to `https://grpc.testnet.concordium.com:20000`.
2. Run `docker-compose up` to build and start all the services.

e.g.

```bash
NETWORK="mainnet" CONCORDIUM_NODE="https://grpc.mainnet.concordium.software:20000" docker-compose up
```

3. Access the frontend at `http://localhost:8080`
   - The postgres database runs on port `5432`. It is configurable in the `./docker-compose.yml` file.


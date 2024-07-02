## Track and trace indexer

There are two binaries in this project. An `indexer` that indexes data into a database and a `server` that serves data from the database.

The easiest way to run the `indexer` and `server` is to use [docker-compose](https://docs.docker.com/compose/) as described in the Track and Trace project's main [README.md](../README.md) file.

## Prerequisites

- `PostgreSQL` installed or running it in a docker container: https://www.postgresql.org/download/
-  A database connection to `PostgreSQL`: If you use the default connection `host=localhost dbname=indexer user=postgres password=password port=5432`, make sure you have created the database `indexer` as follows:

Open a terminal-based front-end to PostgreSQL:
```
sudo -u postgres psql
```

Create the `indexer` database:
```
CREATE DATABASE indexer;
```

Alternatively, you can run the Postgres database in a docker container. The command below will create an indexer db automatically:
```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB="indexer" --rm postgres
```

## Build the `indexer` and `server`

To build the tools make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce two binaries (`indexer` and `server`) in the `target/release` directory.

# The `indexer` binary

It is a tool for indexing event data from the track and trace contract into a postgres database. The database is configured with the tables from the file `../resources/schema.sql`. The monitored events `ItemStatusChangedEvent` and `ItemCreatedEvent` are indexed in their respective tables. A third table `settings` exists to store global configurations (e.g.: the contract address, latest block processed, and the genesis block hash).

The global configurations are set when the indexer is started for the first time. Re-starting the indexer will check if its current settings are compatible will the stored indexer settings to prevent corrupting the database. In addition, the settings can be queried by the front end to check compatibility.

When the indexer is started for the first time, it will look up when the smart contract instance was created and use that block as the starting block. When the indexer is re-started with the same database settings, it resumes indexing from the `latest_processed_block_height+1` as stored in the database.

All monitored events in a block are atomically added in one database transaction to postgres. This ensures a simple recovery process since we always process the complete block or roll back the database to the beginning of the block. In addition, the indexer has a re-try logic and will try to re-connect to the database pool and re-submit any failed database transaction.

Each event can be uniquely identified by the `transaction_hash` and `event_index`. The `event_index` is the index from the array of logged events in a transaction.

## Run the `indexer`

```console
cargo run --bin indexer -- --node https://grpc.testnet.concordium.com:20000 --contract "<8901,0>" --log-level debug
```

## Configure the `indexer`

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--contract` is the contract index of the track-and-trace smart contract, e.g. <8901,0>.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

## The `server` binary

You have to build the front end in the folder `../frontend` before running this command.

## Run the `server`

```console
cargo run --bin server
```

## Configure the `server`

There are a few options to configure the server:

- `--listen-address` is the listen address where the server will be listen on. If not specified, the default value `0.0.0.0:8080` is used.

- `--frontend` is the path to the directory where the frontend assets are located. If not specified, the default value `../frontend/dist` is used.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

The following option are also available, which are forwarded to the frontend:

- `--node` specifies the gRPC interface of a Concordium node. (Defaults to `https://grpc.testnet.concordium.com:20000`)

- `--network` specifies the network to use, i.e., `mainnet` or `testnet`. Defaults to `testnet`.

- `--contract-address` specifies the contract address of the track and trace contract (format is `<1234,0>`).

- `--sponsored-transaction-backend` specifies the endpoint to the sponsored transaction backend. (Defaults to `http://localhost:8000`).

An example of running the service with basic settings and testnet node would be:

``` console
cargo run --bin server  -- --contract-address <YOUR_CONTRACT_ADDRESS>
```

An example to run the service with some filled in example settings would be:

``` console
cargo run --bin server  -- --contract-address "<8901,0>"
```

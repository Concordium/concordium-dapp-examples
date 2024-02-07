## Track and trace indexer

A tool for indexing event data from the track and trace contract into a postgres database. The database is configured with the tables from the file `../rescourcs/schema.sql`. The events `ItemStatusChangedEvent` and `ItemCreatedEvent` are indexed in their respective tables. A third table `settings` exists to store global configurations and checkpoints.

Each event can be uniquely identified by the triple (`block_height`, `transaction_hash`, and `event_inex`) and will be uniquely inserted into the table. Meaning even after restarting the indexer, an event will only be inserted into the database if it does not exist in the database yet. Whenever an event is inserted into the database, the checkpoint in the `settings` table is updated to reflect the latest block height, the latest transaction hash, and the latest event index processed by the indexer.

The indexer has some retry logic to re-connect to the database in case connection is lost.

## Prerequisites

- `PostgreSQL` installed: https://www.postgresql.org/download/
-  A database connection to `PostgreSQL`: If you use the default connection `host=localhost dbname=indexer user=postgres password=password port=5432`, make sure you have created the database `indexer` as follows:

Open a terminal-based front-end to PostgreSQL:
```
sudo -u postgres psql
```

Create the `indexer` database:
```
CREATE DATABASE indexer;
```

## Build and run the indexer

To build the tool make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce a single binary `indexer` in `target/release` directory.

## Start the indexer

```console
cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 2024-01-28T10:12:30Z --contract "<7835,0>"
```

## Configure the indexer

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--start` is the start time to index from. To not waste resources and index from the genesis block, set this value to the time when the track-and-trace smart contract was deployed/initialized. The format is ISO-8601, e.g. 2024-01-23T12:13:14Z.

- `--contract` is the contract index of the track-and-trace smart contract, e.g. <7835,0>.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.
## Track and trace indexer

cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 2024-01-28T10:12:54Z --contract "<7835,0>"

cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 2024-02-01T19:01:00Z --contract "<7835,0>"

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
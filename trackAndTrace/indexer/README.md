## Track and trace indexer

A tool for indexing event data from the track and trace contract into a postgres database. The database is configured with the tables from the file `../resources/schema.sql`. The monitored events `ItemStatusChangedEvent` and `ItemCreatedEvent` are indexed in their respective tables. A third table `settings` exists to store global configurations (e.g.: the contract address, and the genesis block hash). 

The global configurations are set when the indexer is started for the first time. Re-starting the indexer will check if its current settings are compatible will the stored indexer settings to prevent corrupting the database. In addition, the settings can be queried by the front end to check compatibility. 

All monitored events in a block are atomically added in one database transaction to postgres. This ensures a simple recovery process since we always process the complete block or roll back the database to the beginning of the block.

In case the indexer stops, after fixing the cause of the failure the indexer can be re-started by providing as `--start` option the `latest_processed_block_height + 1`. You can figure out the latest processed block height from the logs of the indexer. Alternatively, you can get the `latest_processed_block_height_with_monitored_event` by taking the rows with the largest id in the `item_status_changed_events` and the `item_created_events` tables. Alternatively, you can re-start the indexer by providing as `--start` option the `latest_processed_block_height_with_monitored_event + 1`. You should ensure to never re-start the indexer from a block where it processes a block with monitored events a second time, since you will end up with duplicated rows in the database.

Each event can be uniquely identified by the `transaction_hash` and `event_index`. The `event_index` is the index from the array of logged events in a transaction.

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

Alternatively, you can run the Postgres database in a docker container:
```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB="indexer" --rm postgres
```

## Build the indexer

To build the tool make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce a single binary `indexer` in `target/release` directory.

## Run the indexer

```console
cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 9970784 --contract "<7835,0>" --log-level debug
```

## Configure the indexer

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--start` is the block height to index from. To not waste resources and index from the genesis block, set this value to the time when the track-and-trace smart contract was deployed/initialized.

- `--contract` is the contract index of the track-and-trace smart contract, e.g. <7835,0>.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.
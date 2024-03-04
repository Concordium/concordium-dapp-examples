## Track and trace indexer and server

There are two binaries in this project. An `indexer` that indexes data into a database and a `server`.
The `server` serves the track and trace front end files and exposes:
- two endpoints to query data from the database.
- an endpoint for submitting sponsored transactions.

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

Alternatively, you can run the Postgres database in a docker container. The command below will create the database `indexer` automatically:
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
cargo run --bin indexer -- --node https://grpc.testnet.concordium.com:20000 --contract "<8144,0>" --log-level debug
```

## Configure the `indexer`

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--contract` is the contract index of the track-and-trace smart contract, e.g. `<8144,0>`.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

# The `server` binary

The `server` serves the track and trace front end files and exposes four endpoints:
 - `POST api/getItemCreatedEvent` (to serve data from the database)
 - `POST api/getItemStatusChangedEvents` (to serve data from the database)
 - `POST api/sponsoredTransaction` (to submit sponsored transactions)
 - `GET health` (to return the backend version)

The formats of requests and responses are JSON encoded.

<b>Additional information to sponsoredTransactions:</b>
The server is started with a list of trusted, whitelisted accounts.
The flow is as follows, a whitelisted account signs a sponsored transaction message in the browser wallet at the front end and sends the signature together with the payload to this backend server via the `sponsoredTransaction` endpoint. The backend checks if the signer of the request is one of the whitelisted accounts. If the check passes, the backend creates a sponsored transaction and submits it to the `permit` function in the smart contract. The backend returns the transaction hash to the frontend. This backend server has to have access to a blockchain node and an account (with its associated private key) that is funded with some CCD to submit the sponsored transaction to the chain. The backend wallet will pay for the transaction fees.

## Run the `server`

This server will serve the `track_and_trace` front end files. As a result, you have to build the front end files in the folder `../frontend` first before running the server command below:

```console
cargo run --bin server -- --account-key-file ./4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export --whitelisted-accounts 4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA --log-level debug 
```

To get your account file (the `4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export` file in the above example), export it from the [Concordium Browser wallet for web](http://developer.concordium.software/en/mainnet/net/guides/export-key.html).
This account should be only used for this service. No transactions should be sent from the account by any other means to ensure the account nonce is tracked 
correctly in the service (e.g. don't use the `4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX` account in the browser wallet to send transactions via the front end).

## Configure the `server`

There are a few options to configure the server:

- `--listen-address` is the listen address where the server will be listen on. If not specified, the default value `0.0.0.0:8080` is used.

- `--frontend` is the path to the directory where the frontend assets are located. If not specified, the default value `../frontend/dist` is used.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

- `--node` the URL of the node's GRPC V2 interface. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--account-key-file` the path to a file which contains the key credentials for the sponsorer account, e.g. `--account-key-file ./4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export`.

- `--whitelisted-accounts` A list of whitelisted account addresses. These accounts are allowed to submit transactions via the backend. You can use this flag several times e.g. `--whitelisted-accounts 32GKttZ8SB1DZvpK1czfWHLWht1oMDz1JqmV9Lo28Hqpf2RP2w --whitelisted-accounts 4EphLJK99TVEuMRscZHJziPWi1bVdb2YLxPoEVSw8FKidPfr5w`

- `--request-timeout` the request timeout (both of request to the node and server requests) in milliseconds. The node timeout is 500 ms less than the server request-timeout to make sure we can fail properly in the server in case of connection timeout due to node connectivity problems. If not specified, the default value `10000` is used.

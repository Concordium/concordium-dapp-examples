## Compliant-Reward-Distribution Indexer

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

## Build the `indexer`

To build the tools make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce the binaries (`indexer`) in the `target/release` directory.

# The `indexer` binary

It is a tool for indexing newly created accounts on Concordium into a postgres database. The database is configured with the tables from the file `../resources/schema.sql`. A table `settings` exists to store global configurations.

The global configurations are set when the indexer is started for the first time. Re-starting the indexer will check if its current settings are compatible will the stored indexer settings to prevent corrupting the database. In addition, the settings can be queried by the front end to check compatibility.

When the indexer is started for the first time, it will look up the current block height and start indexing from that block. When the indexer is re-started with the same database settings, it resumes indexing from the `latest_processed_block_height+1` as stored in the database.

All newly created accounts in a block are atomically added in one database transaction to postgres. This ensures a simple recovery process since we always process the complete block or roll back the database to the beginning of the block. In addition, the indexer has a re-try logic and will try to re-connect to the database pool and re-submit any failed database transaction.

## Run the `indexer`

```console
cargo run --bin indexer -- --node https://grpc.testnet.concordium.com:20000 --log-level debug
```

## Configure the `indexer`

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

You can open the help menu as follows:

```console
cargo run --bin indexer -- --help

## Configure the `server`

```console
cargo run --bin server -- --admin_accounts "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw" --admin_accounts "4KjE4rptF1o3QX6XuSaQzm6w9KLYYQTbKm2Zd4NooarH6YwfxS"
```

```
curl -POST "http://localhost:8080/api/canClaim" -H "Content-Type: application/json" --data '{"accountAddress": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"}' -v
```

```
curl -POST "http://localhost:8080/api/getAccountData" -H "Content-Type: application/json" --data '{"accountAddress":"3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1","signingData":{"signer":"47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","message":{"blockHash":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight":3},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069"}}' -v
```

```
curl -POST "http://localhost:8080/api/postZKProof" -H "Content-Type: application/json" --data '{"presentation":{"presentationContext":"7fb546cd185db58421070aac59d0c91922c49d173fb944695c920fb15f69f947","proof":{"created":"2024-07-23T11:22:01.562Z","proofValue":[],"type":"ConcordiumWeakLinkingProofV1"},"type":"VerifiablePresentation","verifiableCredential":[{"credentialSubject":{"id":"did:ccd:testnet:cred:8280babfd0a412ea2aeb2f707193e804a6104d150c5e095343c8b225ba496ad6c208a9e6bf54990a966f7d0b54cfed2e","proof":{"created":"2024-07-23T11:22:01.561Z","proofValue":[{"attribute":"John","proof":"df0ddf8d269fa2c97305ad28bafa163b0e26b3cb3d8e64fff91f5a3c97f43dd556bc8c8019845b5e670ddc9c833f38773dbbd30258aa3a6b3a7f2dbd5abaaf37","type":"RevealAttribute"}],"type":"ConcordiumZKProofV3"},"statement":[{"attributeTag":"firstName","type":"RevealAttribute"}]},"issuer":"did:ccd:testnet:idp:0","type":["VerifiableCredential","ConcordiumVerifiableCredential"]}]}}' -v
```

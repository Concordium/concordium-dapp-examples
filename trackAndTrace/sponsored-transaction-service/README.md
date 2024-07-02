# CIS-3 Sponsored transaction service

This service allows a sponsor account to pay for the smart contract updates of other accounts, following the [CIS-3](https://proposals.concordium.software/CIS/cis-3.html) standard.

## Configuration options

The following parameters are supported

- `node` the URL of the node's GRPC V2 interface. Defaults to `https://grpc.testnet.concordium.com:20000`.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_NODE`.
- `listen-address` the address on which the server will listen for incoming requests. Defaults to `0.0.0.0:8080`.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_LISTEN_ADDRESS`.
- `log-level` maximum log level (defaults to `debug` if not given).
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_LOG_LEVEL`.
- `request-timeout` the timeout for server and node requests in milliseconds. Defaults to `10000`.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_REQUEST_TIMEOUT`.
- `private-key-file` the path to a file which contains the key credentials for the sponsor account.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_PRIVATE_KEY_FILE`.
- `allowed-accounts` The accounts allowed to submit transactions. Either 'any', if you have a custom authentication scheme in front of the service OR a space-separated list of account addresses.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_ALLOWED_ACCOUNTS`.
- `allowed-contracts` The contracts allowed to be used by the service. Either 'any' OR a space-separated list of contract addresses in the format `<123,0>`.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_ALLOWED_CONTRACTS`.
- `rate-limit` The limit of requests per account per hour. Defaults to `30`.
  - Equivalent environment variable: `CCD_SPONSORED_TRANSACTION_SERVICE_RATE_LIMIT`.

An example to run the service with basic settings and testnet node would be:

```shell
cargo run --release -- \
  --node https://grpc.testnet.concordium.com:20000 \
  --private-key-file <YourAccountPathToYourKeys> \
  --allowed-accounts "ACC_0 ACC_1 ACC_2" \
  --allowed-contracts "any"

```

An example to run the service with some filled in example settings would be:

```shell
cargo run --release -- \
  --node https://grpc.testnet.concordium.com:20000 \
  --private-key-file 3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export \
  --allowed-accounts "3rsc7HNLVKnFz9vmKkAaEMVpNkFA4hZxJpZinCtUTJbBh58yYi 3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G" \
  --allowed-contracts "<8901,0> <111,0> <222,0>"
```

To get your account file (the `3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export` file in the above example), [export it from the Concordium Browser wallet for web](https://developer.concordium.software/en/mainnet/net/guides/export-key.html).
This account should be only used for this service. No transactions should be sent from the account by any other means to ensure the account nonce is tracked
correctly in the service (e.g. don't use the `3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW` account in the browser wallet to send transactions via the front end).

## Using the service

The service is a simple server that exposes one endpoint

 - `POST /api/submitTransaction`

The overall flow is that the user signs a sponsored message in the browser wallet (or mobile wallet via walletConnect) and sends the signature together with some input parameters to this service via the above endpoint.
The service creates a sponsored transaction and submits it to the `permit` function in the provided smart contract.
The service returns the transaction hash to the frontend.
This service has to have access to a blockchain node and an account (with its associated private key) that is funded with some CCD to submit the sponsored transaction to the chain.
The sponsor account wallet will pay for the transaction fees.

The endpoint expects a JSON body with the fields shown in the example below:

``` json
{
   "signer":"2xoKcfFdJA1jCa7DEJborFdhxN78x3SuPhwu4haxdzUXRk5riH",
   "nonce":8,
   "signature":"b7cc2c4619c19876254f0f2f616b72396ffddcd70f9ed390c30c0ba76767cde31200152c1215c0c377de03e78efe467e017f59b542fec131a8cc53f94e28c70d",
   "expiryTime":"2024-03-08T08:23:21.449Z",
   "contractAddress":{
      "index":6372,
      "subindex":0
   },
   "contractName":"cis3_nft",
   "entrypointName":"updateOperator",
   "parameter":"01000100721f8939a01c4307df5d9b97984c5e59bbf6d8ae7c4d8b62085117f46f15947e"
}
```

The `parameter` is the serialized parameter to the `entrypoint_name` in hex encoding. One way to create it is with the [Concordium JS SDK](https://developer.concordium.software/concordium-node-sdk-js/functions/schema.serializeTypeValue.html).

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Concordium/.github/blob/main/.github/CODE_OF_CONDUCT.md)

This repository's CI automatically checks formatting and common problems in rust.
Changes to any of the packages must be such that
- `cargo clippy --all` produces no warnings
- `rust fmt` makes no changes.

Everything in this repository should build with stable rust at the moment (at least version 1.74 and up), however the fmt tool must be from a nightly release since some of the configuration options are not stable. One way to run the `fmt` tool is

```shell
 cargo +nightly-2023-04-01 fmt
```

(the exact version used by the CI can be found in [.github/workflows/ci.yaml](https://github.com/Concordium/concordium-misc-tools/blob/main/.github/workflows/ci.yaml) file).
You will need to have a recent enough nightly version installed, which can be done via

```shell
rustup toolchain install nightly-2023-04-01
```

or similar, using the [rustup](https://rustup.rs/) tool. See the documentation of the tool for more details.

In order to contribute you should make a pull request and ask a person familiar with the codebase for a review.

## Building

The project is a pure Rust project, and can be built by running

```shell
cargo build --release --locked
```

This produces a single binary `target/release/sponsored-transaction-service`.


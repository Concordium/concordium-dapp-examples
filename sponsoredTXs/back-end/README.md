# The Sponsored Transactions Verifier

This page describes the sponsored transactions verifier backend for this dapp example.

# Supported configuration options

The following parameters are supported
- `node` the URL of the node's GRPC V2 interface, e.g., http://localhost:20000
- `port` the port on which the server will listen for incoming requests
- `log-level` maximum log level (defaults to `debug` if not given)
- `public-folder` the path to the folder, which should be served, defaults to the public folder in the current directory.
- `account` the path to the folder, which key credentials.

All of the above is available by using `--help` to get usage information.

An example to run the verifier with example settings and local node on would be:
```
cargo run -- --node http://node.testnet.concordium.com:20000 --port 8080 --account <YourAccountPathToYourKeys>
```

# Using the tool

The verifier is a simple server that exposes five endpoints
 - `GET /submitUpdateOperator`
 - `GET /submitTransfer`

The overall flow is that the user gets a challenge (with /challenge) and the statement  (with /statement).
Then `prove` endpoint can be called with a proof of the statement, and the challenge that was used.
The challenge is used to match the proof to the statement to be proved. The prove endpoints responds with a token string, which must be provided as a query parameter auth, when accessing the images.
The names endpoint can be used to get the names if the items that the gallery contains, and can be accessed with the image endpoint.

All of the server state is kept in memory and thus does not survive a restart.

See [src/main.rs](./src/main.rs) for the formats of requests and responses. Both
requests and responses are JSON encoded. The `/prove` endpoint responds with
status `200 OK` and the authToken if the proof is acceptable, and with invalid request otherwise.
The requests are handled by handlers in [src/handlers.rs](./src/handlers.rs).

The server needs access to the node so that it can get the requested credential
from the node during proof validation.

# Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Concordium/.github/blob/main/.github/CODE_OF_CONDUCT.md)

This repository's CI automatically checks formatting and common problems in rust.
Changes to any of the packages must be such that
- ```cargo clippy --all``` produces no warnings
- ```rust fmt``` makes no changes.

Everything in this repository should build with stable rust at the moment (at least version 1.62 and up), however the fmt tool must be from a nightly release since some of the configuration options are not stable. One way to run the `fmt` tool is

```shell
 cargo +nightly-2022-06-09 fmt
```
(the exact version used by the CI can be found in [.github/workflows/ci.yaml](https://github.com/Concordium/concordium-misc-tools/blob/main/.github/workflows/ci.yaml) file).
You will need to have a recent enough nightly version installed, which can be done via

```shell
rustup toolchain install nightly-2022-06-09
```
or similar, using the [rustup](https://rustup.rs/) tool. See the documentation of the tool for more details.

In order to contribute you should make a pull request and ask a person familiar with the codebase for a review.

## Building

The project is a pure Rust project, and can be build by running

```shell
cargo build --release
```

This produces a single binary `target/release/gallery-verifier`.


## TODO

- Do not use challenges directly as challenges
- Have authTokens/challenges expire

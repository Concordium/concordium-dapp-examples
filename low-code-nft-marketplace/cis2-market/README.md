# CIS2-Marketplace contract for [CIS2 Tokens](https://proposals.concordium.software/CIS/cis-2.html)

In order to build, deploy, mint, transfer, etc all functions using concordium-client you can check the [Developer Portal](https://docs.concordium.com/en/mainnet/tutorials/low-code-nft-marketplace/marketplace.html)

# Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Concordium/.github/blob/main/.github/CODE_OF_CONDUCT.md)

In order to contribute you should make a pull request and ask a person familiar with the codebase for a review.

## Yarn checks

Use `yarn fmt` and `yarn lint` before committing to ensure consistent formatting and adherence to common style.

## Rust checks

This repository's CI automatically checks formatting and common problems in Rust using version 1.85.

Changes to any of the Rust packages must be such that:

-   `cargo clippy --all` produces no warnings
-   `rust fmt` makes no changes.

Note that the fmt tool must be from a nightly release since some of the configuration options are not stable. You can specify the release to use when running the `fmt` tool:

```shell
 cargo +nightly-2023-04-01 fmt
```

(the exact version used by the CI can be found in the [.github/workflows/ci.yaml](.github/workflows/ci.yaml) file).

You will need to have a recent enough nightly version installed, which can be done via:

```shell
rustup toolchain install nightly-2023-04-01
```

or similar, using the [rustup](https://rustup.rs/) tool. See the documentation of the tool for more details.

## Build

Build the yarn components with: 

```bash
yarn build
```

Build the Rust project from the directory root by running 

```shell
cargo build --locked -p cis2-market --release
```

This produces a single binary `target/release/cis2-market`.

## Deploy

Uses [`concordium-client`](https://developer.concordium.software/en/mainnet/net/references/concordium-client.html) to deploy the contract to the chain.
Uses `node.testnet.concordium.com` node for deployment.

```bash
yarn deploy wallet-account
```

**Here `wallet-account` refers to the account which you have setup in [`concordium-client`](https://developer.concordium.software/en/mainnet/net/references/concordium-client.html)**


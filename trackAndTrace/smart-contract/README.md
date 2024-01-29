# Track and Trace smart contract

## Prerequisites

`cargo/rustup` and `cargo-concordium` needs to be [set up](https://developer.concordium.software/en/mainnet/smart-contracts/guides/quick-start.html).

## Build

Run the following command to compile the smart contract into the wasm module `module.wasm.v1` with embedded schema:

```bash
cargo concordium build --schema-embed --out concordium-out/module.wasm.v1
```

### Building for deployment

When building for deployment, the `--verifiable` option for `cargo concordium build` should be utilized:

```bash
cargo concordium build --schema-embed --out concordium-out/module.wasm.v1 --verifiable docker.io/concordium/verifiable-sc:1.70.0
```

Documentation on using verifiable builds is available [here](https://docs.rs/crate/cargo-concordium/latest).

## Test

Run the following command to run the unit and integration tests:

```bash
cargo concordium test --out concordium-out/module.wasm.v1
```

# Track and Trace smart contract

## Prerequisites

`cargo/rustup` and `cargo-concordium` needs to be [set up](https://developer.concordium.software/en/mainnet/smart-contracts/guides/quick-start.html).

## Building

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

## Testing

Run the following command to run the unit and integration tests:

```bash
cargo concordium test --out concordium-out/module.wasm.v1
```

## Deploying module to chain

You can use Step 1 of the [smart contract developer tools](https://sctools.mainnet.concordium.software/) to deploy your module.

Alternatively, you can use `concordium-client` with the command:

```
concordium-client module deploy module.wasm.v1 --sender <YourWalletAccount> --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure
```

Links: 
- [Link to install concordium-client](https://developer.concordium.software/en/mainnet/net/references/concordium-client.html?highlight=concordium%20client)
- [Link to import account keys to concordium-client](https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/setup-env.html#import-the-key)


## Initializing smart contract instance on chain

Use an input parameter similar to the [inputParameter.json](../test-scripts/inputParameter.json) file.

You can use Step 2 of the [smart contract developer tools](https://sctools.mainnet.concordium.software/) to initialize a new smart contract instance from the module reference 001be979e72f18b68ffa10634b78198e228833a42bd3d71a18c838972e67261e.

Alternatively, you can use `concordium-client`:


## `serde` feature

This project has a `serde` feature. The smart contract can not be built with this feature. The intended use of the feature is for other projects to derive it when these projects use the types defined in the smart contract. For example, the traits `serde::Deserialize` and `serde::Serialize` are needed on the types defined in the smart contract, if a project wants to insert the JSON representation of the type into a database or read it from a JSON file. 
For example, the `indexer` and the `test-scripts` derive the feature in the `../indexer/Cargo.toml` and the `../test-scripts/Cargo.toml` files with the command:

```
track-and-trace = { path = "../smart-contract", default-features=false, features = ["std", "serde"] } 
```

Note: The bump allocator (`bump_alloc`) does not free/release memory allocation. Using bump allocators as a memory allocation strategy is optimized for on-chain deployed smart contracts, since the contracts are short lived when they are loaded in the memory of the node during a transaction execution on-chain. 
In contrast, it is essential that the global allocator is not set to `bump/wee_alloc` when the contract is used as a dependency in long-running services such as an indexer because it will leak memory (memory is not freed), hence the `default-features` are disabled in above statement.
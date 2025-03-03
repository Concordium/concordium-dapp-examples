## Test script to facilitate deploying and filling the track and trace contract with data for the indexer.

This package contains a test script to facilitate filling the track and trace contract with data for the indexer.

There are a few options to configure the script:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--module` should point to a compiled track-and-trace smart contract module with e.g. the name `module.wasm.v1`. If not specified the default value `../smart-contract/concordium-out/module.wasm.v1` is used. The given module will be used to create a new instance of the track-and-trace smart contract and fill it with data.
 
    You can generate the `module.wasm.v1` file as follows:
    - Navigate into the folder `../smart-contract`.
    - Compile the track-and-trace contract: `cargo concordium build -e -o ./concordium-out/module.wasm.v1`.
    - You can find the file `module.wasm.v1` in `./concordium-out/module.wasm.v1`.

- `--admin-key-file` should point to a key file with one key in the
  browser wallet export format. This key is used for all transactions executed by the script.

- `--num-items` is the number of items to be created in the track-and-trace smart contract. The states of these items will be updated from 'Produced' -> 'InTransit' -> 'InStore' -> 'Sold' in the script. You can set the value to 0 if you only want to initialize a new contract instance without any items.

- `--input-parameter-file` should point to a JSON file containing the input parameter for initializing a new smart contract instance.

## Build

To build the tool make sure you have the repository submodules initialized as follows:

```console
git submodule update --init --recursive
```

The tool can be built by running the following command in this folder:

```console
cargo build --release
```

This will produce a single binary `track-and-trace-test` in `target/release` directory
which can be run.


## Run the script

To run the script use for example the following command in this folder:

```
cargo run --release -- --node https://grpc.testnet.concordium.com:20000 --admin-key-file ./4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA.export --module ../smart-contract/concordium-out/module.wasm.v1 --num-items 2 --input-parameter-file ./inputParameter.json
```

assuming the wallet export file `/4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA.export` is in this directory.

 
To get your account file (the `4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA.export` file in the above example), export it from the [Concordium Browser wallet for web](http://developer.concordium.software/en/mainnet/net/guides/export-key.html).


###

The script will run a series of transactions. The output will be similar to:

```
Starting script with admin account 3eQtum35Gkba7g6uePqr9Zc5iYKVaKKCeho7YcydTBJLvxdZgG.
Source module with reference a5a2660cd12561cc2fe11411e840655453ff1cbdfe6bcfb91b5949c6ef9e84c5 already exists.
The maximum amount of NRG allowed for the transaction is 2828.
Transaction c29ea78ba1f26101fe18e5a8d2b7f8ccd5ec7729db31a38a4965e0b24fdc576f submitted. Waiting for finalization.
Initialized a new smart contract instance at address <5090,0>.
Submitted create item with index 0 in transaction e9c60ef7256fb0afa9ca4148ebade5827d2c0573e196e807c83b4dc58f1db13f.
Submitted create item with index 1 in transaction d2365b4ce2f70fe79a668afc303c94912dc7a878e1ca5fae2611b64c3ac368aa.
Item state for item with index 0 before transaction: ItemState {
    status: Produced,
    metadata_url: None,
}
Submitted update item status with index 0 to `InTransit` in transaction 89a6cf6a4a074991599a9640974828db64af982710b9e6018f094be8c3091889.
Item state for item with index 0 after transaction: ItemState {
    status: InTransit,
    metadata_url: None,
}
Item state for item with index 1 before transaction: ItemState {
    status: Produced,
    metadata_url: None,
}
Submitted update item status with index 1 to `InTransit` in transaction d83e6e3a3b9d23e9afc46cee4f37618a57e39d092c32b7c1c4d00727e2242ba2.
Item state for item with index 1 after transaction: ItemState {
    status: InTransit,
    metadata_url: None,
}
Item state for item with index 0 before transaction: ItemState {
    status: InTransit,
    metadata_url: None,
}
Submitted update item status with index 0 to `InStore` in transaction hash 5bf0af1674ecdd6b604f5b2cbeab154b95dc6b6ce6dc90dc86a4b76feab7070d.
Item state for item with index 0 after transaction: ItemState {
    status: InStore,
    metadata_url: None,
}
Item state for item with index 1 before transaction: ItemState {
    status: InTransit,
    metadata_url: None,
}
Submitted update item status with index 1 to `InStore` in transaction hash d7950ac2876ebd21f3a789b01099c96ac633650be3895934b90287a909c9dfa6.
Item state for item with index 1 after transaction: ItemState {
    status: InStore,
    metadata_url: None,
}
Item state for item with index 0 before transaction: ItemState {
    status: InStore,
    metadata_url: None,
}
Submitted update item status with index 0 to `Sold` in transaction 86f150c41f171617ac58a41f0525fe85ceb3533b269dd36383a317f45a137720.
Item state for item with index 0 after transaction: ItemState {
    status: Sold,
    metadata_url: None,
}
Item state for item with index 1 before transaction: ItemState {
    status: InStore,
    metadata_url: None,
}
Submitted update item status with index 1 to `Sold` in transaction f0e687e09c13130ac8d372d1ba96da79ac48adeb964208a3e3e1e1d4f755f04d.
Item state for item with index 1 after transaction: ItemState {
    status: Sold,
    metadata_url: None,
}
Script completed successfully
```

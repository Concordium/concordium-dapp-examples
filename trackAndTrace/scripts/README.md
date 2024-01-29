## Test script to facilitate deploying and filling the track and trace contract with data for the indexer.

This package contains a test script to facilitate filling the track and trace contract with data for the indexer.

There are a few options to configure the script:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--module` should point to a compiled track-and-trace smart contract module with e.g. the name `module.wasm.v1`. If not specified the default value `../smart-contract/concordium-out/module.wasm.v1` is used. The given module will be used to create a new instance of the track-and-trace smart contract and fill it with data.
 
    You can generate the `module.wasm.v1` file as follows:
    - Navigate into the folder `../smart-contract`.
    - Compile the track-and-trace contract: `cargo concordium build -e -o ./concordium-out/module.wasm.v1`.
    - You can find the file `module.wasm.v1` in `./concordium-out/module.wasm.v1`.

- `--admin-key-file` **directory** with one key in the
  browser wallet export format. This key is used for all transactions executed by the script.

- `--num-items` is the number of items to be created in the track-and-trace smart contract. The states of these items will be updated from 'Produced' -> 'InTransit' -> 'InStore' -> 'Sold'.

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
cargo run --release -- --node https://grpc.testnet.concordium.com:20000 --admin-key-file ./4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export --module ../smart-contract/concordium-out/module.wasm.v1 --num-items 2
```

assuming the wallet export file `/4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export` is in this directory.

 
To get your account file (the `4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export` file in the above example), export it from the [Concordium Browser wallet for web](http://developer.concordium.software/en/mainnet/net/guides/export-key.html).


###

The script will run a series of transactions. The output will be similar to:

```
Starting script with admin account 4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.
Source module with reference 9c616596a6e6bc159611967fac812a2970721673c5235fafe2ad8b09e97a280a already exists.
Send initialization transaction with hash a6bf86369663ad29cdc0338da5989a8adf73e4dd517ab25649d6bfaa8a915c46.
Successfully initialized contract in block 2cda9c38f8d8a8fd4d2a9e909b27e23614aa0077d8bee6417d244821c3271d71, with address <7835,0>.
Submitted create item with index 0 in transaction hash 48fd1600bc826b5a6ab45d1649c38f7c04b767768ed32024d5754ff9d7baa99b
Submitted create item with index 1 in transaction hash e7fb14edae19bfb15667ee0c6bc242a79b6d9bf5f4b01abab1a9d6ba076ae8b6
Submitted update item status with index 0 to `InTransit` in transaction hash 008ee4f2cc3c587afe5fa0c207a9f198d12294eb3572fd476ce45853e3f8b140
Submitted update item status with index 1 to `InTransit` in transaction hash 24a9f7ea7e559fda090dc032fada6ca583016055526a521d5b0e83465273817c
Submitted update item status with index 0 to `InStore` in transaction hash ae3040e824fd6bba68db1d089373386fd2ffd2d080baf6cfe54566cb9b7340bc
Submitted update item status with index 1 to `InStore` in transaction hash 0e8cd2d71cf8bd263ab192578a555091ac6ce7902ec3ac41f60e66d3b29abe45
Submitted update item status with index 0 to `Sold` in transaction hash 893cf54466021cd6eb4201700e57d61aaf9736150d8b2335dde274dba57d158d
Submitted update item status with index 1 to `Sold` in transaction hash 1e1a71cd1292849974a837a50cb4d9917f1eea85248d582881763d12f553ac5b
Script completed successfully
```

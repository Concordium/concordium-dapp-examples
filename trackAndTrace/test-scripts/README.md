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
Starting script with admin account 4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA.
Source module with reference f94a1503030142b4dfdd6667875403783e6f457eafb020f0a957270cfe7499e9 already exists.
The maximum amount of NRG allowed for the transaction is 4075.
Transaction a2cc66c2e674af64e5a7b85ec1b97e87f9433a21f5ffdc795c038c0f7195a712 submitted. Waiting for finalization.
Initialized a new smart contract instance at address <8021,0>.
Submitted create item with index 0 in transaction 15f6cfe148a65cc621fba6164326466702d35df14b5dac07d35bd40b0354e9a1.
Submitted create item with index 1 in transaction db037444d4d619f5bfb195bdc7532d933120873a517dae5b87dad754da24a53d.
Submitted update item status with index 0 to `InTransit` in transaction fd2b2cbd9e9c0c1ed34306ed7fef2d698ce86465b4dbf13a1bb97538217a72b7.
Submitted update item status with index 1 to `InTransit` in transaction 73af8cedac05f3dddde14b9358481892a5c1923457dbd6e6c6e920fb5a35ccef.
Submitted update item status with index 0 to `InStore` in transaction hash 94cff0ec86bdfe059299798ee3aa7e62ed7b1e806ff55bdb397601d0044740c9.
Submitted update item status with index 1 to `InStore` in transaction hash 718eb74c88429c59032e2e2367f570f66b6f16b87f9e86661e2ddaf3758c5d37.
Submitted update item status with index 0 to `Sold` in transaction 88cc980eb9c58eccfa9d98605a7f463738ce17f8993cafbef2b17be17cdfe425.
Submitted update item status with index 1 to `Sold` in transaction 8b8f0729ca0d8f4ca36dcd226b042f4baa5b98fce71effff31db52d90337a466.
Script completed successfully
```

## Track and trace indexer

cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 2024-01-28T10:12:54Z --contract "<7835,0>"

cargo run -- --node https://grpc.testnet.concordium.com:20000 --start 2024-02-01T19:01:00Z --contract "<7835,0>"

## Build and run

To build the tool make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce a single binary `indexer` in `target/release` directory.

### Start the indexer

```console
indexer --node https://grpc.testnet.concordium.com:20000 --start 2024-01-28T10:11:00Z --contract "<7835,0>"
```

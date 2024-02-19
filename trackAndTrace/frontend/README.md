# Track and Trace Front end

## Setup

Make sure to have the following installed:

- [NodeJs](https://nodejs.org).
- Rust and cargo (Recommended to install using [rustup](https://rustup.rs)).
- Recent version of [cargo concordium](https://crates.io/crates/cargo-concordium) (Install using `cargo install --locked cargo-concordium`.

## Smart contracts

### Build

To build the smart contract, navigate to the `../smart-contracts` directory and run:

```bash
cargo concordium build --out ./concordium-out/module.wasm.v1 --schema-embed
```

_The `--out ./concordium-out/module.wasm.v1` is important, since the frontend assumes this is the location of the built smart contract._

## Frontend

To setup and install dependencies for the frontend navigate to the `frontend` directory and run:

```bash
yarn install
```

### Generate smart contract clients

This project is setup to generate TypeScript smart contract clients, directly from the smart contract module and the embedded schema. Make sure to build the smart contract modules as descriped above.

To generate the smart contract clients for the frontend navigate to the `frontend` directory and run:

```bash
yarn generate
```

### Development

To start a development environment make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn dev
```

This will launch a development server with hot module replacement enabled.

### Build

To start build the frontend make sure to first generate the smart contract clients, then run the following from the `frontend` directory:

```bash
yarn build
```

This will bundle the project into `frontend/dist` directory.
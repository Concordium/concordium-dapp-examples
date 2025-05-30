# Concordium dApp template

This project includes a general purpose Web3 ID verification server implemented in typescript.

## Getting started

Install dependencies:

```bash
yarn
```

Start server:

```bash
yarn start
```

## Configuration

The server is configurable at runtime with a set of arguments:

```
Usage: yarn start [options]

Options:
  -V, --version              output the version number
  --endpoint <URL>           gRPC V2 interface of the node. (default: "http://localhost:20001/", env: CONCORDIUM_WEB3ID_VERIFIER_NODE)
  --listen-address <URL>     Listen address for the server. (default: "http://0.0.0.0:8080/", env: CONCORDIUM_WEB3ID_VERIFIER_API_LISTEN_ADDRESS)
  --request-timeout <value>  Request timeout in milliseconds. (default: 5000, env: CONCORDIUM_WEB3ID_VERIFIER_REQUEST_TIMEOUT)
  --network <value>          Network to which the verifier is connected. (default: "Testnet", env: CONCORDIUM_WEB3ID_VERIFIER_NETWORK)
  -h, --help                 display help for command
```

**Run against public testnet node**

```
yarn start --endpoint "https://grpc.testnet.concordium.com:20000"
```

## Endpoints

The server exposes a single endpoint for verifying the proofs contained in a "verifiable presentation".

### `POST /v0/verify`

Expects a JSON body consisting of a "verifiable presentation" typically obtained by request from a compatible concordium wallet.\

-   If verification is successful, a `200 OK` response with the corresponding proof request is sent.
-   If verification fails, a `400 BAD REQUEST` response is sent.

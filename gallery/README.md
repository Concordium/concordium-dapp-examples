# Gallery application

The example project included in this repository, serves as a working example of using the concordium ids to create a webpage with authorization.
The webpage will only display the gallery items' images if the user has provided a proof for the statement that the backend demands.

The backend for this demo can be found in the [verifier](./verifier/) folder:

## Hosted front end

[Hosted front end link testnet](https://gallery.testnet.concordium.com/)
[Hosted front end link mainnet](https://gallery.mainnet.concordium.software/)

## Prerequisites

-   Browser wallet extension must be installed in google chrome and have an account, in order to connect and authorize.
-   Access to a concordium node exposing the v2 GRPC API. (The backend expects it on localhost:20000, but this can be changed using the `node` parameter)
-   Cargo/rustc installed (to build the rust backend).

## Installing

-   Run `yarn`.

## Running the example

-   Run `yarn build` in a terminal
-   Run `yarn build-verifier` (This builds the [backend](./verifier/) using cargo/rustc)

-   Run `yarn start --statement "$(<verifier/config/statement.json)" --names "$(<verifier/config/names.json)" --node https://grpc.testnet.concordium.com:20000` (This will run the backend, which also host the front-end, check its [README](./verifier/README.md) for more information)

-   Open URL logged in console (on default http://127.0.0.1:8100)

To have hot-reload on the front-end (useful for development), run `yarn watch` in a separate terminal instead of `yarn build` in the first step.

## Run as docker

The dockerfile must be run from the project's root folder, ex:

```
docker build -t gallery -f gallery/Dockerfile .
```

The image can then be run with:

```
docker run gallery -p 8100:8100
```

See the [docker file](./Dockerfile) to see which environment variables can used to overwrite parameters.

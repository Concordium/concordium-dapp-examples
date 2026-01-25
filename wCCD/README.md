# wCCD web application

The example project included in this repository serves as a working example of how to integrate with smart contracts on the Concordium blockchain. This web app interacts with the wCCD protocol on testnet. The connected account can invoke the wrap/unwrap functions to observe the wCCD balance change of its account.

## Prerequisites

- Browser wallet extension must be installed in google chrome and configured with testnet JSON-RPC, in order to view smart contract details or submit transactions.

## Installing

- Run `yarn` in package root.
- Build concordium helpers by running `yarn build:api-helpers`.

## Running the wCCD example

- Run `yarn build` in a terminal in this folder for testnet or `yarn build:prod` in a terminal in this folder for mainnet.
- Run `yarn start`.
- Open URL logged in console (typically http://127.0.0.1:4147).

## Build and run the Docker image

**NOTE**: If you're using an Apple Silicon (M1/M2) or any ARM-based system.
You need to include `--platform=linux/amd64`

To build the docker image run the following:

```
docker build --build-arg NETWORK=$NETWORK -t wccd_front_end:$PROJECT_VERSION .
```

e.g.

```
docker build --build-arg NETWORK=testnet -t wccd_front_end:3.0.0 .
```

Mac.

```
docker build --platform=linux/amd64 --build-arg NETWORK=testnet -t wccd_front_end:3.0.0 .
```

To run the docker image run the following:

```
docker run -it -d -p 8080:80 --name web wccd_front_end:$PROJECT_VERSION
```

e.g.

```
docker run -it -d -p 8080:80 --name web-wccd wccd_front_end:3.0.0
```

Open http://127.0.0.1:8080 in your browser.

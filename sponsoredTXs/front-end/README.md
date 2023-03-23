# Sponsored Transactions Web Application

The example project included in this repository serves as a working example of how to integrate sponsored transactions with smart contracts on the Concordium blockchain. This web app supports the following flows with the browser wallet (or wallet connect):

-   Register a public key (associated with the account from your wallet) in the smart contract.
-   Compute the message of a sponsored updateOperator transaction => Sign it with the wallet => Submit the signed sponsored transaction to the smart contract.
-   Mint an NFT to your wallet => Compute the message of a sponsored transfer transaction => Sign it with the wallet => Submit the signed sponsored transaction to the smart contract.

The front-end interacts with the smart contract {index: 3903, subindex: 0} that has a similar logic to [this contract](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis3-nft-sponsored-txs).

## Prerequisites

-   Browser wallet extension must be installed in Google Chrome and the Concordium testnet needs to be selected or a mobile wallet needs to be set up that supports wallet connect in order to view smart contract details or submit transactions.

## Running the sponsored txs example

-   Run `yarn install` in this folder.
-   Run `yarn build` in a terminal in this folder.
-   Run `yarn start`.
-   Open URL logged in console (typically http://127.0.0.1:8080).

To have hot-reload (useful for development), do the following instead:

-   Run `yarn watch` in a terminal.
-   Run `yarn start` in another terminal.
-   Open URL logged in console (typically http://127.0.0.1:8080).

## Using yarn (on unix/macOS systems)
Some of the node modules we use have Windows-type line endings (\r\n), instead of unix line endings (\n), which causes problems when using the yarn package manager.

If you see an error message similar to this when executing `yarn start`, then you've run into the problem:
```
env: node\r: No such file or directory
```

Use `npm install` instead of `yarn install` in the above command. `npm` will correct the line ending.

Additional information can be found [here](https://techtalkbook.com/env-noder-no-such-file-or-directory/).

## Build and run the Docker image

To build the docker image run the following command:

```
docker build -t sponsored_tx_front_end:$PROJECT_VERSION .
```

e.g.

```
docker build -t sponsored_tx_front_end:3.0.0 .
```

To run the docker image run the following command:

```
docker run -it -d -p 8080:80 --name web sponsored_tx_front_end:$PROJECT_VERSION
```

e.g.

```
docker run -it -d -p 8080:80 --name web sponsored_tx_front_end:3.0.0
```

Open http://127.0.0.1:8080 in your browser.

Note: You can get the PROJECT_VERSION from the `package.json` file or with one of the following commands:

```
npm pkg get version
```

or

```
jq -r .version package.json
```

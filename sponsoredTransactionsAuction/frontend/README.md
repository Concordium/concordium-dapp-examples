# Auction Sponsored Transactions Web Application

This front end interacts with the [sponsored-enabled-auction](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/sponsored-tx-enabled-auction) and the [cis2-multi](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi) smart contracts. Users can bid for the items in the auction contract by using a sponsored-transaction-enabled token as a payment method (no CCD required in the user's wallet). This web app supports the following flows with the browser wallet:

-   Mint payment tokens to your wallet.
-   Add an item to the auction contract.
-   View your item from the auction contract.
-   Bid for an item without sending a transaction from the browser wallet. In other words, without paying for the transaction fees from your browser wallet. This flow first computes the message hash for the bid transaction which you have to sign in your browser wallet. Then this signature is submit to the `/bid` backend endpoint.

The backend creates a sponsored transaction and submits it to the `permit` function in the smart contract {index: CIS2_TOKEN_CONTRACT_INDEX, subindex: 0}. You can look up the CIS2_TOKEN_CONTRACT_INDEX in the `package.json` file. The backend returns the transaction hash to the frontend.

Note: Use the same smart contract index for the frontend and backend. In other words, use the CIS2_TOKEN_CONTRACT_INDEX and AUCTION_CONTRACT_INDEX from the `package.json` file (frontend folder) when starting the backend server.

Note:
The smart contract code at {index: CIS2_TOKEN_CONTRACT_INDEX, subindex: 0} can be found [here](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi).
The smart contract code at {index: AUCTION_CONTRACT_INDEX, subindex: 0} can be found [here](https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/sponsored-tx-enabled-auction).

## Prerequisites

-   Browser wallet extension must be installed in Google Chrome and the Concordium testnet needs to be selected.

## Running the sponsored txs example (without backend -> submitting the sponsored transaction to chain will fail)

-   Run `yarn install` in a terminal in this folder.
-   Run `yarn build` in a terminal in this folder.
-   Run `yarn dev` in a terminal in this folder.
-   Open URL logged in console (typically http://127.0.0.1:8080).

Hot-reload (useful for development) is enabled.

## Running the sponsored txs example (with backend -> submitting the sponsored transaction to chain will work)

-   Run `yarn install` in a terminal in this folder.
-   Run `yarn build` in a terminal in this folder.

This creates a `dist` folder which can be served via the backend. Start the backend server by following the instructions in the [README.md file](../backend/README.md).

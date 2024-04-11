# Interaction with Concordium Smart Contracts

`mint-ui` is a React based frontend DAPP. It interacts with the deployed on-chain cis2-multi contracts. To allow a user to

-   Mint a Token
-   Initialize a new instance of CIS2-Multi Contract

## Setup

-   Install [Concordium chrome extension wallet](https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet).
-   Create a new Concordium Account and get initial balance.
-   [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
-   Install Dependencies
    ```bash
    yarn install
    ```
-   Set Configuration
    Various following [configuration params](./src/Constants.ts) are explained and initialized with default values. Which can be used with Concordium Testnet.
    -   `MULTI_CONTRACT_MODULE_REF`: Module reference of deployed module with CIS2-Multi contract
    -   `MULTI_CONTRACT_SCHEMA` : HEX string of `schema.bin` file got from compilation of rust code of cis2-multi
    -   `IPFS_GATEWAY_URL`: gateway url for the IPFS gateway

## [Deploy](https://developer.concordium.software/en/mainnet/smart-contracts/guides/deploy-module.html)

## Interact

-   Start the frontend
    ```bash
    yarn start
    ```
    This should start the server and you should be able to view the frontend at [http://localhost:3000](http://localhost:3000). If default port is used.
-   The UI provides following pages
    -   Mint : UI to interact with token contract and mint new tokens

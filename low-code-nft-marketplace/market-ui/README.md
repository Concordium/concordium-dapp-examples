# Interaction with Concordium Smart Contracts

`market-ui` is a React based frontend DAPP. It interacts with the deployed on-chain cis2-market & cis2-multi contracts. To allow a user to

-   Buy a Token
-   Sell a Token
-   Mint a Token
-   Initialize a new instance of Marketplace Contract
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
    -   `MARKET_CONTRACT_ADDRESS` : Default value for deployed and initialized market place contract address.
    -   `MARKET_CONTRACT_SCHEMA` : HEX string of `schema.bin` file got from compilation of rust code of cis2-market
    -   `MARKET_CONTRACT_MODULE_REF` : Module reference of deployed module with cis2-market.
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
    -   Buy : A list of all the tokens listed for sale on marketplace
    -   Sell : UI to add an owned token to the marketplace to be sold
    -   Mint : UI to interact with token contract and mint new tokens
    -   Create Marketplace : UI to initialize a new instance of Marketplace contract and use its address instead of the default one.

## Code Structure

There are two high level parts to the code base

-   React components that enable to user to use the rendered UI to interact with the clients to communicate with concordium chain.
-   Intermediatory layer that enables interaction between UI and concordium chain. This mainly comprises of
    -   Clients
    -   Deserializer(s)

### React Components

-   Pages

    -   [**Buy**](./src/pages/BuyPage.tsx) :
        Used to get a list of buyable tokens and buy any one of them. This page component contains the following reusable components to interact with on chain contracts.

        -   [MarketplaceTokensList](./src/components/MarketplaceTokensList.tsx) : Used to get a list of buyable tokens from the Marketplace Contract. It uses following components
        -   [MarketplaceTokensListItem](./src/components/MarketplaceTokensListItem.tsx) : Displays a token with its price and other metadata.
        -   [MarketplaceTransferDialog](./src/components/MarketplaceTransferDialog.tsx) : Allows a user to specify the quantity and pay to buy a listed token.

    -   [**Sell**](./src/pages/SellPage.tsx) :
        Used to add a new token to the list of buyable tokens

        -   [Cis2FindInstance](./src/components/Cis2FindInstance.tsx) : Find a contract on chain using Index and Subindex and ensures it `supports` CIS2 standard.
        -   [Cis2OperatorOf](./src/components/Cis2OperatorOf.tsx) : Checks if the Input Marketplace Contract Address is `operatorOf` input Account address in the Token Contract.
        -   [Cis2UpdateOperator](./src/components/Cis2UpdateOperator.tsx) : `updateOperator` if the above is not true.
        -   [Cis2BalanceOf](./src/components/Cis2BalanceOf.tsx) : Checks if the seller has some balance of the input token id. Using `balanceOf`
        -   [MarketplaceAdd](./src/components/MarketplaceAdd.tsx) : Adds the input token to the marketplace.

    -   [**Mint**](./src/pages/MintPage.tsx) :
        Used to interact with CIS2 standard Contract to Mint a new Token

        -   [Cis2FindInstanceOrInit](./src/components/Cis2FindInstanceOrInit.tsx) : Gives the user either the option to find a CIS2 compliant instance or initialize a new one using config value `MULTI_CONTRACT_MODULE_REF`to Find a CIS2 compliant instance Or Initialize a new one using config value `MULTI_CONTRACT_MODULE_REF`
        -   [ConnectPinata](./src/components/ConnectPinata.tsx) : Uses the input pinata JWT token to establish and verify connection with pinata to be able to later upload image files and metadata json to IPFS.
        -   [UploadFiles](./src/components/ui/UploadFiles.tsx) : Allows users to drop a group of files and upload them to pinata.
        -   [Cis2BatchMetadataPrepareOrAdd](./src/components/Cis2BatchMetadataPrepareOrAdd.tsx) : Either use the uploaded files to prepare metadata JSON or use a metadataUrl of already uploaded Metadata Json file. Uses following components
            -   [Cis2BatchMetadataPrepare](./src/components/Cis2BatchMetadataPrepare.tsx)
            -   [Cis2BatchMetadataAdd](./src/components/Cis2BatchMetadataAdd.tsx)
        -   [Cis2BatchMint](./src/components/Cis2BatchMint.tsx) : Calls the mint function of the contract to mint the tokens for which metadata has been provided.

    -   [**Add / Create Marketplace**](./src/pages/ContractFindInstanceOrInit.tsx) :
        Can be used to Initialize a new Instance of Marketplace Contract and use it in place of the default contract.

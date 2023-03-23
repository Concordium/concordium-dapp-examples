# Interaction with Concordium Smart Contracts

`market-ui` is a React based frontend DAPP. It interacts with the deployed on-chain cis2-market & cis2-multi contracts. To allow a user to

- Buy a Token
- Sell a Token
- Mint a Token
- Initialize a new instance of Marketplace Contract
- Initialize a new instance of CIS2-Multi Contract

## Setup

- Install [Concordium chrome extension wallet](https://github.com/Concordium/concordium-browser-wallet/tree/main/packages/browser-wallet).
- Create a new Concordium Account and get initial balance.
- [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- Install Dependencies
  ```bash
  yarn install
  ```
- Set Configuration
  Various following [configuration params](./src/Constants.ts) are explained and initialized with default values. Which can be used with Concordium Testnet.
  - `MARKET_CONTRACT_ADDRESS` : Default value for deployed and initialized market place contract address.
  - `MARKET_CONTRACT_SCHEMA` : HEX string of `schema.bin` file got from compilation of rust code of cis2-market
  - `MARKETPLACE_CONTRACT_INFO.moduleRef` : Module reference of deployed module with cis2-market.
  - `MULTI_CONTRACT_MODULE_REF`: Module reference of deployed module with CIS2-Multi contract
  - `MULTI_CONTRACT_SCHEMA` : HEX string of `schema.bin` file got from compilation of rust code of cis2-multi
  - `IPFS_GATEWAY_URL`: gateway url for the IPFS gateway

## Deploy

Currently the browser wallet does not allow to deploy modules to Concordium chain. However [node-cli](https://github.com/chainorders/concordium-contracts-node-cli) and [concordium client](https://github.com/chainorders/concordium-contracts/tree/main/concordium-client) can be used to deploy contracts

## Interact

- Start the frontend
  ```bash
  yarn start
  ```
  This should start the server and you should be able to view the frontend at [http://localhost:3000](http://localhost:3000). If default port is used.
- The UI provides following pages
  - Buy : A list of all the tokens listed for sale on marketplace
  - Sell : UI to add an owned token to the marketplace to be sold
  - Mint : UI to interact with token contract and mint new tokens
  - Create Marketplace : UI to initialize a new instance of Marketplace contract and use its address instead of the default one.

## Code Structure

There are two high level parts to the code base

- React components that enable to user to use the rendered UI to interact with the clients to communicate with concordium chain.
- Intermediatory layer that enables interaction between UI and concordium chain. This mainly comprises of
  - Clients
  - Deserializer(s)

### React Components

- Pages

  - [**Buy**](./src/pages/BuyPage.tsx) :
    Used to get a list of buyable tokens and buy any one of them. This page component contains the following reusable components to interact with on chain contracts.

    - [MarketplaceTokensList](./src/components/MarketplaceTokensList.tsx) : Used to get a list of buy able tokens from the Marketplace Contract, It uses following components
      - [MarketplaceTokensListItem](./src/components/MarketplaceTokensListItem.tsx) : Displays a token with its price and other metadata.
      - [MarketplaceTransferDialog](./src/components/MarketplaceTransferDialog.tsx) : Allows a user to specify the quantity and pay to buy a listed token.

  - [**Sell**](./src/pages/SellPage.tsx) :
    Used to add a new token to the list of buyable tokens

    - [Cis2FindInstance](./src/components/Cis2FindInstance.tsx) : Find a contract on chain using Index and Subindex and ensures it `supports` CIS2 standard.
    - [Cis2OperatorOf](./src/components/Cis2OperatorOf.tsx) : Checks if the Input Marketplace Contract Address is `operatorOf` input Account address in the Token Contract.
    - [Cis2UpdateOperator](./src/components/Cis2UpdateOperator.tsx) : `updateOperator` is the above is not true.
    - [Cis2BalanceOf](./src/components/Cis2BalanceOf.tsx) : Checks if the seller has some balance of the input token id. Using `balanceOf`
    - [MarketplaceAdd](./src/components/MarketplaceAdd.tsx) : Adds the input token to the marketplace.

  - [**Mint**](./src/pages/MintPage.tsx) :
    Used to interact with CIS2 standard Contract to Mint a new Token

    - [Cis2FindInstanceOrInit](./src/components/Cis2FindInstanceOrInit.tsx) : Gives the user either the option to Find a CIS2 compliant instance Or Initialize a new one using config value `MULTI_CONTRACT_MODULE_REF`
    - [ConnectPinata](./src/components/ConnectPinata.tsx) : Uses the input pinata JWT token to establish and verify connection with pinata to be able to later upload image files and metadata json to IPFS.
    - [UploadFiles](./src/components/ui/UploadFiles.tsx) : Allows users to drop a group of files and upload them to pinata.
    - [Cis2BatchMetadataPrepareOrAdd](./src/components/Cis2BatchMetadataPrepareOrAdd.tsx) : Either use the uploaded files to prepare metadata JSON or use a metadataUrl of already uploaded Metadata Json file. Uses following components
      - [Cis2BatchMetadataPrepare](./src/components/Cis2BatchMetadataPrepare.tsx)
      - [Cis2BatchMetadataAdd](./src/components/Cis2BatchMetadataAdd.tsx)
    - [Cis2BatchMint](./src/components/Cis2BatchMint.tsx) : Calls the mint function of the contract to mint the tokens for which metadata has been provided.

  - [**Add / Create Marketplace** ](./src/pages/ContractFindInstanceOrInit.tsx) :
    Can be used to Initialize a new Instance of Marketplace Contract and use it in place of the default contract.

### Chain Interaction

- Clients

  - [Cis2 Client](./src/models/Cis2Client.ts)
    Provides interface to interact with [CIS2-NFT onchain contract](https://proposals.concordium.software/CIS/cis-2.html).
    CIS2 client provides methods to call various functions exposed by cis2-multi contract and [cis2 standard](https://proposals.concordium.software/CIS/cis-2.html) in general.

    - `isOperator` : calls [`operatorOf`](https://proposals.concordium.software/CIS/cis-2.html#operatorof) and returns wether the input contract address can operate on the input token.
    - `ensureSupportsCis2`: calls [`supports`](https://proposals.concordium.software/CIS/cis-0.html#supports). and throws an error if the input contract does not support CIS2 standard.
    - `balanceOf`: calls [`balanceOf`](https://proposals.concordium.software/CIS/cis-2.html#balanceof) function to fetch the balance of token for input address.
    - `getTokenMetadata`: calls [`tokenMetadata`](https://proposals.concordium.software/CIS/cis-2.html#tokenmetadata) function to get the Metadata Url for a particular token. The contents of the token metadata is defined to be in [this](https://proposals.concordium.software/CIS/cis-2.html#example-token-metadata-fungible) format
    - `updateOperator` : calls [`updateOperator`](https://proposals.concordium.software/CIS/cis-2.html#updateoperator) function to update the operator of a token.
    - `mint` : calls the `mint` function of the cis2 token contract. To add a new token to the contract state.
    - `isValidTokenId` : its a utility function that checks if the input token is a valid token id according to the TokenId type used in the CIS2 token contract. CIS2 standard defines a variety of numeric types which can be used as a token Id. Read more about them [here](https://proposals.concordium.software/CIS/cis-2.html#tokenid)

  - [Marketplace Client](./src/models/Cis2Client.ts)
    Provides interface to interact with a on chain [Marketplace Contract](../cis2-market/)

    - `list` : calls `list` function of market place contract to fetch a list of buyable tokens.
    - `add` : calls `add` function and enables to add a new token to the marketplace contract. So that it can be fetched using `list` function.
    - `transfer` : calls `transfer` function of marketplace contract which allows anyone to buy a token at the listed price.

  - [Concordium Contract Client](./src/models/ConcordiumContractClient.ts)
    Provides methods to interact with any on chain contract. Ex Init Contract, Invoke Contract & Update Contract.

- Deserializer
  Deserializer(s) are needed to be able to convert byte array returned from the Contract back to JSON structure which the frontend can understand and display.

  - [Cis2 Deserializer](./src/models/Cis2Deserializer.ts)
    Used by Clients to be able to deserialize byte arrays to [CIS2 types](https://proposals.concordium.software/CIS/cis-2.html#general-types-and-serialization). Represented in code by [Cis2 Types](./src/models/Cis2Types.ts)

  - [Concordium Deserializer](./src/models/ConcordiumDeserializer.ts)
    Used by clients to be able to deserialize bytes arrays to general Concordium Types like Account Address & Contract Address.

  - [Buffer Stream](./src/models/BufferStream.ts)
    Used by higher level Deserializer to deserialize generic types like numbers and strings from byte arrays. Its a wrapper over Buffer and keeps a counter of the bytes already read from the buffer.

  - [Marketplace Deserializer](./src/models/MarketplaceDeserializer.ts)
    Used by clients to Deserialize Market Place contract return types. Represented by the file [MarketplaceTypes](./src/models/MarketplaceTypes.ts)

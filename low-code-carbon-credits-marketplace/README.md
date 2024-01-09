# Concordium Carbon Credits Sample Implementation

## Project structure

1. [Smart Contracts](./contracts/README.md)
   1. `project_token` : CIS2 Token contract implementation for Carbon Credits Projects.
   2. `carbon_credits` : CIS2 Token contract implementation for Carbon Credits.
   3. `carbon_credits_market` : Reference marketplace implementation for Carbon Projects & Carbon Credits.
2. [Events Listener / Indexer](./indexer/server/src/listener.ts) : a node js application which listens to events from the concordium node and stores them in a mongodb database.
3. [Web Backend](./indexer/server/src/web.ts) : a node js application which provides REST APIs to query the data stored in the mongodb database.
4. [Web Frontend](./market-ui/src/App.tsx) : a react application which provides a UI to interact with the smart contracts and utilizes the apis provided by the web backend.

## Process

### User Roles

#### Admin

 Represents the governance of the system. The role is responsible for setting up the system and adding verifiers to the system.

#### Project Owner

Represents the owner of the Carbon Credit Project. Can mint / retract a carbon credit project or can fractionalize a carbon credit project into carbon credit tokens.

#### Verifier

Responsible for verification of a carbon credit project. Only Verified & Mature projects can be retired.

#### Buyer

Any Account which wants to buy a Carbon Credit / Carbon Credit Token from the marketplace contract.

### Process Flow

1. *Admin* sets up the system by deploying the smart contracts and adding verifiers to the system.
2. **Project Tokens**
   1. *Project Owner* can use the web frontend to create a carbon credit project. Which basically mints a project token in the `project_token` contract and assigns it to the project owner.
      1. Project Owner needs to specify the maturity date of the project. The project is considered *mature* after the maturity date.
      2. As the project is created it is assigned a unique project id which is used to identify the project in the system. This id is shown on the ui right after minting the project.
      3. As the project is minted its open for verification by any verifiers which have been added by admin.
   2. *Verifier* can use the web frontend to verify a carbon credit project. Which basically marks the project token as verified in the `project_token` contract.
   3. Any unverified or immature project can be **retracted** by the project owner or the verifier.
   4. Any verified & mature project can be **retired** by the project owner.
   5. Project Owner can use the web frontend to send the token to marketplace contract to list it for sale.
   6. Project Owner can use the web frontend to fractionalize the project into carbon credits.

3. **Carbon Credits**
   If the project owner wants to fractionalize a carbon credit project into carbon credits he can do so by using the web frontend. Which basically sends the project token to the `carbon_credits` contract and mints carbon credit tokens in the `carbon_credits` contract. The project token is locked in the `carbon_credits` contract.

   1. Only verified projects can be fractionalized.
   2. Any immature carbon credit can be **retracted** by the project owner or the verifier.
   3. Any mature carbon credit can be **retired** by the project owner.
4. **Marketplace**
   Any token can be sent to the marketplace contract to list it for sale. The marketplace contract is responsible for managing the sale of the tokens. The marketplace contract has the following functionality.
   1. `list` : Can be used to list a carbon project / credit on the marketplace for a price.
   2. `transfer` : Can be called with a specified amount to transfer a carbon project / credit to the payer.

## Run

1. Prerequisites
   1. Install [Yarn](https://yarnpkg.com/)
   2. Install [Docker](https://docs.docker.com/get-docker/)
   3. Install [Docker Compose](https://docs.docker.com/compose/install/)
   4. Install [Node.js](https://nodejs.org/en/download/)
   5. Install [Concordium Client](https://developer.concordium.software/#/concordium-client)
   6. Install [cargo-concordium](https://developer.concordium.software/en/mainnet/smart-contracts/guides/setup-tools.html)

2. Build

   ```bash
   yarn && yarn build
   ```

3. Deploy Smart Contracts

   ```bash
   yarn deploy:contracts wallet-account
   ```

   **wallet-account** is the name of the account setup in the Concordium Client.

4. Setup
   1. Setting enviornment variables for
      1. [Events Listener](indexer/server/.env) & [Web Backend](indexer/server/.env)
         * `DB_CONN_STRING` : Connection string for the mongodb database. The default value already present in the file is for the [docker-compose](./indexer/docker-compose.yml) setup.
         * `NODE_ENDPOINT` : Endpoint of concordium node.
         * `NODE_PORT` : Port of concordium node.
         * `STARTING_BLOCK_HASH` : Hash of the block at which the the indexer would start listening.
         * `APP_PORT`: Port at which web backend would listen for requests.
         * `BASE_ACCOUNT_ADDRESS`: Address of the account which will be used to create aliases in case users want to use email address instead of concordium account.
         * `GOOGLE_CLIENT_ID`: Client ID of the google app which will be used for authentication. *not present by default*
         * `MODULE_REF`: Module reference of the deployed smart contract. This can be found in the output of the deploy command.
         * `MODULE_SCHEMA`: base64 encoded schema of the deployed smart contract. This can be found in the [file](./contracts/schema_base64.txt)  
      2. [Web Frontend](./market-ui/.env)
         * `REACT_APP_DEFAULT_PROJECT_TOKEN_ADDRESS_INDEX` : default index of the `project_token` contract
         * `REACT_APP_DEFAULT_CARBON_CREDIT_ADDRESS_INDEX` : default index of the `carbon_credit` contract.
         * `REACT_APP_DEFAULT_MARKET_ADDRESS_INDEX` : default index of the `carbon_credit_market` contract.
         * `REACT_APP_DEFAULT_MARKET_ADDRESS_SUBINDEX` : default subindex of the `carbon_credit_market` contract.
         * `REACT_APP_DEFAULT_CARBON_CREDIT_ADDRESS_SUBINDEX` : default subindex of the `carbon_credit` contract.
         * `REACT_APP_DEFAULT_PROJECT_TOKEN_ADDRESS_SUBINDEX` : default subindex of the `project_token` contract.
         * `REACT_APP_MARKET_CONTRACT_NAME`: name of the `carbon_credit_market` contract.
         * `REACT_APP_CARBON_CREDIT_CONTRACT_NAME` : name of the `carbon_credit` contract.
         * `REACT_APP_PROJECT_TOKEN_CONTRACT_NAME` : name of the `project_token` contract.
         * `REACT_APP_CONCORDIUM_NODE_ENDPOINT` : Endpoint of concordium node.
         * `REACT_APP_CONCORDIUM_NODE_PORT`: Port of concordium node.
         * `REACT_APP_EXPLORER_URL_TXN_HASH` : URL of the explorer to view transaction details.
         * `REACT_APP_WERT_PARTNER_ID` : ID of the wert partner. *not present by default*
         * `REACT_APP_WERT_NETWORK` : Network of the wert partner.
         * `REACT_APP_WERT_ORIGIN` : Origin of the wert partner.
         * `REACT_APP_WERT_PRIVATE_KEY` : private key of the wert partner. *not present by default*
         * `REACT_APP_GOOGLE_CLIENT_ID` : Client ID of the google app which will be used for authentication. *not present by default*
         * `REACT_APP_IPFS_GATEWAY_URL` : URL of the IPFS gateway.
         * `REACT_APP_INDEXER_API_URL` : URL of the indexer / listener API.
         * `REACT_APP_MODULE_REF` : Module reference of the deployed smart contract. This can be found in the output of the deploy command.
         * `REACT_APP_MODULE_SCHEMA` : base64 encoded schema of the deployed smart contract. This can be found in the [file](./contracts/schema_base64.txt)

5. Run
   1. Run [Events Listener Backend](./indexer/server/src/listener.ts)

        ```bash
        yarn start:mongo
        yarn debug:listener
        ```

      `yarn start:mongo` runs the mongo db instance at port `27017`, with an instance of [mongo-express](https://github.com/mongo-express/mongo-express) to view the database. Default values allows access to the mongo-express instance [here](http://localhost:8081/) and the database [`db`](http://localhost:8081/db/db/) is created after the first run. The default values can be changed in the [docker-compose](./indexer/docker-compose.yml) file.

   2. Run [Web Backend](./indexer/server/src/web.ts)

        ```bash
        yarn debug:web
        ```

   3. Run [Web Frontend](./market-ui/README.md)

        ```bash
        yarn start:ui
        ```

      * Wert integration is **disabled by default**. To enable it, set thefollowing  environment variables in the [.env](./market-ui/.env) file. Contract [Wert sales](https://wert.io/for-partners) to get these credentials
        * `REACT_APP_WERT_PARTNER_ID`
        * `REACT_APP_WERT_NETWORK`
        * `REACT_APP_WERT_ORIGIN`
        * `REACT_APP_WERT_PRIVATE_KEY`
      * Google authentication is **disabled by default**. To enable it, set the following environment variables in the [.env](./market-ui/.env) file
        * `REACT_APP_GOOGLE_CLIENT_ID`

         Wert allows users to do on chain transactions paying via their credit card. If Wert is not enabled then the user can only do on chain transactions using their concordium wallet. Kindly also note that this being a reference implementation uses `REACT_APP_WERT_PRIVATE_KEY` in the frontend this exposes the private key and this should **not** be done in production.

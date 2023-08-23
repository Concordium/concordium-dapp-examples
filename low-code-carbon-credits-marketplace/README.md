# Concordium Carbon Credits Sample Implementation

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
   

5. Run
   1. Run [Events Listener Backend](./indexer/server/src/listener.ts)

        ```bash
        yarn debug:listener
        ```

   2. Run [Web Backend](./indexer/server/src/web.ts)

        ```bash
        yarn debug:web
        ```

   3. Run [Web Frontend](./market-ui/README.md)

        ```bash
        yarn start:ui
        ```

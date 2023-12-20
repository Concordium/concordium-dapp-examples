# Sponsored Transactions Auction Web Application

This repository includes a dApp example of an auction. Users can bid for the items in the auction contract by using a sponsored-transaction-enabled token as a payment method (no CCD required in the user's wallet). The project has a front end and a back end.

Clone the root repo with the following command:

```shell
git clone --recurse-submodules git@github.com:Concordium/concordium-dapp-examples.git
```

or
```shell
git clone --recurse-submodules https://github.com/Concordium/concordium-dapp-examples.git
```

To set up the project locally, complete the steps in the `README.md` file in the `sponsoredTransactionsAuction/frontend` folder and then complete the steps in the `README.md` file in the `sponsoredTransactionsAuction/backend` folder.

Alternatively, follow the steps to deploy the docker container below. This docker container will set up the frontend as well as the backend.

## Run as docker

Run the dockerfile from the repository's root folder with the command:

```shell
docker build -t sponsored_transactions -f sponsoredTransactionsAuction/Dockerfile .
```

Add your `ACCOUNT_KEY_FILE` to the repository's root folder and run the image with the command:

```shell
docker run -p 8080:8080 --mount type=bind,source="$(pwd)"/<ACCOUNT_KEY_FILE>,target=/KEY,readonly -e ACCOUNT_KEY_FILE="/KEY" -e PORT=<PORT> -e NODE=<NODE> -e LOG_LEVEL=<LOG_LEVEL> -e CIS2_TOKEN_CONTRACT_INDEX=<CONTRACT_INDEX> -e AUCTION_CONTRACT_INDEX=<CONTRACT_INDEX> sponsored_transactions
```

e.g.

```shell
docker run -p 8080:8080 --mount type=bind,source="$(pwd)"/4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export,target=/KEY,readonly -e ACCOUNT_KEY_FILE=/KEY -e PORT=8080 -e NODE=http://node.testnet.concordium.com:20000 -e LOG_LEVEL=info -e CIS2_TOKEN_CONTRACT_INDEX=7370 -e AUCTION_CONTRACT_INDEX=7415 sponsored_transactions
```

Note: To get your `ACCOUNT_KEY_FILE` (the `4SizPU2ipqQQza9Xa6fUkQBCDjyd1vTNUNDGbBeiRGpaJQc6qX.export` file), export it from the Concordium Browser Wallet for Web.

<img src="./backend/pic/pic1.png"  width="200" />
<img src="./backend/pic/pic2.png"  width="200" />
<img src="./backend/pic/pic3.png"  width="200" />

Note: Use the same smart contract indices for the frontend and backend. In other words, use the smart contract indices from the `./frontend/package.json` file when running the image.



## Explore the tutorial

You can find an associated tutorial on the [developer documentation](./https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/index.html).



# Sponsored Transactions Web Application

The example project included in this repository serves as a working example of how to integrate sponsored transactions with smart contracts on the Concordium blockchain. The project has a front-end and a back-end.

Clone the root repo with the following command:

``git clone --recurse-submodules git@github.com:Concordium/concordium-dapp-examples.git``

or

``git clone --recurse-submodules https://github.com/Concordium/concordium-dapp-examples.git``

To set up the project locally, complete the steps in the `README.md` file in the `sponsoredTransactions/front-end` folder and then complete the steps in the `README.md` file in the `sponsoredTransactions/back-end` folder.

Alternatively, follow the steps to deploy the docker container below. This docker container will set up the front-end as well as the back-end.

## Run as docker

The dockerfile must be run from the repository's root folder with the command:
```
docker build -t sponsored_transactions -f sponsoredTransactions/Dockerfile .
```
The image can then be run with:
```
docker run -p 8080:8080 sponsored_transactions
```
See the [docker file](./Dockerfile) to see which environment variables can be used to overwrite parameters.

Note: Use the same smart contract index for the front-end and back-end. In other words, use the smart contract index from the `./front-end/src/constants.ts` file in the dockerfile.

Note: Add your key file to the root of this repository and adjust the dockerfile to use it instead of the `./3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export` value.

To get your key file (the `3PXwJYYPf6fyVb4GJquxSZU8puxrHfzc4XogdMVot8MUQK53tW.export` file), export it from the Concordium Browser Wallet for Web.

<img src="./back-end/pic/pic1.png"  width="200" />
<img src="./back-end/pic/pic2.png"  width="200" />
<img src="./back-end/pic/pic3.png"  width="200" />

## Explore the tutorial

You can find an associated tutorial on the [developer documentation](./https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/index.html).



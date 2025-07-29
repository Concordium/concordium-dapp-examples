# CIS2-Marketplace contract for [CIS2 Tokens](https://proposals.concordium.software/CIS/cis-2.html)

In order to build, deploy, mint, transfer, etc all functions using concordium-client you can check the [Developer Portal](https://docs.concordium.com/en/mainnet/tutorials/low-code-nft-marketplace/marketplace.html)

## Build

```bash
yarn build
```

## Deploy

Uses [`concordium-client`](https://developer.concordium.software/en/mainnet/net/references/concordium-client.html) to deploy the contract to the chain.
Uses `node.testnet.concordium.com` node for deployment.

```bash
yarn deploy wallet-account
```

**Here `wallet-account` refers to the account which you have setup in [`concordium-client`](https://developer.concordium.software/en/mainnet/net/references/concordium-client.html)**


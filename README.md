# Example dApps for the Concordium blockchain

This repository contains a number of examples of dApp frontends / websites built on top
of the Concordium blockchain. Each service is placed in its own subdirectory.

The service are not full production ready services. They are examples to
demonstrate some specific use-cases. These are provided in the hope that they
can be expanded or evolved into full-fledged services, or just to serve as a
guide in what needs to be done.

The following examples are available.

- [dapp-template](./dapp-template/) serves as a starting point for a dApp frontend with common styling and build setup.

- [signMessage](./signMessage/) demonstrates how to use the endpoint to sign an arbitrary message with the browser wallet or mobile wallet through wallet connect.

- [gallery](./gallery/) demonstrates a gallery which requires the user to authorize using ID proofs from the browser wallet.

- [sponsoredTransactions](./sponsoredTransactions/) demonstrates how a user (without holding CCD in the wallet) can sign a message with the browser wallet and submit the signature to a backend. The backend pays for the transaction fee and submits the sponsored transaction on behalf of the user to the chain.

- [sponsoredTransactionsAuction](./sponsoredTransactionsAuction/) demonstrates how to use a sponsored-transaction-enabled token as a payment method in an auction contract so that the user does not have to hold CCD in their wallet. The user signs a bidding message with the browser wallet and submits the signature to a backend. The backend pays for the transaction fee and submits the sponsored transaction on behalf of the user to the chain.

- [simple age verification](./simpleAgeVerification/) demonstrates in a simple use case of verifying the user's age with the browser wallet.

- [euroe-demo](./euroe-demo/) demonstrates an example frontend and wallet
  interactions of a store that sells restricted items, and supports payment in
  EUROe tokens (or generally any CIS2 token).

- [trackAndTrace](./trackAndTrace/) demonstrates an example frontend, backend, smart contract and event indexer to track items along the supply chain. It also has a [CIS-3](https://proposals.concordium.software/CIS/cis-3.html) sponsored transactions service that is compatible with any CIS-3 contract.

- [compliant-reward-distribution](./compliant-reward-distribution/) demonstrates an airdrop example with an indexer, a frontend, and a backend with signature and ZK proof verification at the backend. The ZK proof is used to ensure `Sybil-resistance/uniqueness` as each identity on the chain can interact with the service with only one of its accounts.

- [testnet-faucet](./testnet-faucet/) implements the Concordium testnet faucet which requires the user to post on X (former Twitter) and complete a CAPTCHA task to claim testnet CCDs. The faucet allows claiming once within a specified timeframe.

- [allowlist-dapp](./allowlist-dapp/) demonstrates a token allow list management system with EU nationality verification. Users prove their EU citizenship through Web3ID credentials, and upon successful verification, they are automatically added to a token's allow list and receive an airdrop. The example includes a React frontend, NestJS backend for blockchain operations, and integrates with the web3id-verifier-ts service running against devnet for credential proof verification.

## Setup

Some projects use submodules, to initialize or update those, run:
```shell
git submodule update --init --recursive
```

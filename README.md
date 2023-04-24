# Example dApps for the Concordium blockchain

This repository contains a number of examples of dApp frontends / websites built on top
of the Concordium blockchain. Each service is placed in its own subdirectory.

The service are not full production ready services. They are examples to
demonstrate some specific use-cases. These are provided in the hope that they
can be expanded or evolved into full-fledged services, or just to serve as a
guide in what needs to be done.

The following examples are available.

- [signMessage](./signMessage/) demonstrates how to use the endpoint to sign an arbitrary message with the browser wallet or mobile wallet through wallet connect.

- [gallery](./gallery/) demonstrates a gallery which requires the user to authorize using ID proofs from the browser wallet.

- [sponsoredTransactions](./sponsoredTransactions/) demonstrates how a user (without holding CCD in the wallet) can sign a message with the browser wallet or mobile wallet through wallet connect and submit the signature to a backend. The backend pays for the transaction fee and submits the sponsored transaction on behalf of the user to the chain.

## Setup

Some projects uses submodules, to initialize or update those, run:
```shell
git submodule update --init --recursive
```

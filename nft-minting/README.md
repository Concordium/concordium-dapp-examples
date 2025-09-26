# NFT minting web application

The example project included in this repository, serves as a working example of how to make a website that allows no-code minting with smart contracts on the Concordium blockchain.

(Note that this was developed in a day during a hackathon)

## Prerequisites

-   Browser wallet extension must be installed in google chrome, in order to view collection details or submit transactions.

## Installing

-   Run `yarn` in package root.

## Running the example

Running the file-server to host metadata:

-   Run `yarn start-file-server` in a terminal

Running the webpage:

-   Run `yarn build` in a terminal
-   Run `yarn start`
-   Open URL logged in console (typically http://127.0.0.1:8080)

To have hot-reload (useful for development), do the following instead:

-   Run `yarn watch` in a terminal
-   Run `yarn start` in another terminal
-   Open URL logged in console (typically http://127.0.0.1:8080)

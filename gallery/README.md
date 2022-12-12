# Gallery application

The example project included in this repository, serves as a working example of using the concordium ids to create a webpage with authorization.
The webpage will only display the gallery items' images if the user has provided a proof for the statement that the backend demands.

The backend for this demo can be found in the verifier folder:

## Prerequisites

-   Browser wallet extension must be installed in google chrome and have an account, in order to connect and authorize.

## Installing

-   Run `yarn` in package root.
-   Build concordium helpers by running `yarn build:all`.

## Running the example

-   Run the backend (Currently the webpage assumes the backend is on localhost:8100)

-   Run `yarn build` in a terminal
-   Run `yarn start`
-   Open URL logged in console (typically http://127.0.0.1:8080)

To have hot-reload (useful for development), do the following instead:

-   Run `yarn watch` in a terminal
-   Run `yarn start` in another terminal
-   Open URL logged in console (typically http://127.0.0.1:8080)

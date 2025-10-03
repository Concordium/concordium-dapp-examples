# Voting web application

The example project serves as a working example of how to integrate with smart contracts on the Concordium blockchain. You can create and customize your own voting smart contract via the front-end and deploy it to the Concordium chain. The front-end also provides pages to conduct the voting and display the voting results.

<video controls autoplay>
  <source src="./video/VotingApplication.webm" type="video/webm">
</video>

## Prerequisites

- The Concordium browser wallet extension must be installed in google chrome and connected to testnet, in order to view smart contract details or submit transactions.

## Installing

- Run `yarn` in package root.

## Running the voting example

- Run `yarn build` in a terminal in this folder.
- Run `yarn start`.
- Open URL logged in console (typically http://127.0.0.1:4147).

To have hot-reload (useful for development), do the following instead:

- Run `yarn watch` in a terminal.
- Run `yarn start` in another terminal.
- Open URL logged in console (typically http://127.0.0.1:5173).

## Build and run the Docker image

**NOTE**: If you're using an Apple Silicon (M1/M2) or any ARM-based system.
You need to include `--platform=linux/amd64`

To build the docker image run the following:

```
docker build -t voting_app_image .
```

Mac.

```
docker build --platform=linux/amd64 -t voting_app_image .
```

To run the docker image run the following:

```
docker run -it -d -p 8080:80 --name voting_app voting_app_image
```

Open http://127.0.0.1:8080 in your browser.

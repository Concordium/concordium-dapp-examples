# EUROe usage demo

This dapp exemplifies how to do age verification together with payment using
EUROe, or any other CIS2, token.

Note that only the **frontend** is here. This frontend does not verify age
proofs, it just accepts them. In a real production scenario the proofs would of
course be verified, linked to an account, and a session token generated to allow
usage of the store for that session.

To develop use

```
yarn dev
```

which will start a development server and print the address on which it is
listening. Use `yarn fmt` and `yarn lint` before committing to ensure consistent
formatting and adherence to common style.

To build for production run

```
yarn build
```

which will produce the artifacts in the `dist` folder.

## Docker image

To build a docker image run

```
docker build -f scripts/Dockerfile .
```

from this directory (i.e., directory the README file is located in).

## Hosted front end

[Hosted front end link](https://euroe-demo.testnet.concordium.com/)

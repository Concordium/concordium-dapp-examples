# Locks dApp frontend

React/Vite frontend for exercising Concordium protocol-level lock and token meta-update operations through Concordium Browser Wallet.

The app connects to the selected wallet account, reads chain data through the wallet gRPC transport, lets the user compose lock and token operations, queues the selected operations, and submits them together as a single `MetaUpdate` account transaction.

Mainnet is intentionally blocked in this example, so use a Concordium test/dev network wallet account.

## Features

- Connect to Concordium Browser Wallet.
- Create locks with recipients, controller grants, supported tokens, expiry, keep-alive, and optional memo.
- Queue lock operations: `LockCancel`, `LockFund`, `LockSend`, and `LockReturn`.
- Queue token operations: transfer, metadata update, mint, burn, allow/deny list changes, pause/unpause, and admin role changes.
- Preview and remove queued operations before submitting.
- Submit queued operations as one transaction and display the resulting transaction hash.

## Prerequisites

- Node.js 18 or newer.
- Yarn 3.6.3, normally enabled through Corepack.
- Concordium Browser Wallet installed and configured for a non-Mainnet chain.

If Yarn is not available, enable Corepack first:

```bash
corepack enable
```

## Scripts

Install dependencies:

```bash
yarn
```

Start the Vite development server:

```bash
yarn dev
```

Build the production bundle into `dist`:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

Run ESLint:

```bash
yarn lint
```

Run ESLint with automatic fixes:

```bash
yarn lint-fix
```

Format the project with Prettier:

```bash
yarn fmt
```

## Docker

Build the Nginx-served production image:

```bash
docker build -t locks-dapp .
```

Run it locally:

```bash
docker run --rm -p 8080:80 locks-dapp
```

The container serves the Vite build from `/usr/share/nginx/html`. The Nginx config enables gzip, serves static assets with long-lived cache headers, and includes `application/wasm` in compressed asset types.

## Development Notes

The app uses React, TypeScript, Vite, Bootstrap, `@concordium/browser-wallet-api-helpers`, and `@concordium/web-sdk`.

Shared app behavior lives under `src/components/App`. The wallet connection, chain blocklist handling, gRPC client setup, token decimal lookup, lock lookup, operation queueing, and final transaction submission are coordinated in `src/components/App/hooks/useLocksApp.ts`.

Bootstrap is themed through SCSS files in `src/scss`. When adding new Bootstrap components, import the related Bootstrap SCSS partial into the local layout styles and add any project-specific overrides there.

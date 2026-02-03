# Concordium Signature Proof dApp

Prove ownership of a Concordium account by signing a challenge message. Uses the Concordium **Testnet**.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Concordium Browser Wallet](https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg)

## Setup

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies  
cd ../client && npm install
```

## Run

```bash
# Terminal 1 - Start server
cd server && npm start

# Terminal 2 - Start client
cd client && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How it works

1. **Client** requests a challenge from the server
2. **Server** generates a unique challenge with nonce + timestamp
3. **User** signs the challenge with their wallet
4. **Server** fetches account credentials from chain via `getAccountInfo()`
5. **Server** verifies signature using `verifyMessageSignature()`

## API

**POST /api/challenge** - Get a challenge to sign
```json
{ "account": "3abc...xyz" }
→ { "id": "abc123", "challenge": "Prove ownership of..." }
```

**POST /api/verify** - Verify a signed challenge
```json
{ "id": "abc123", "account": "3abc...xyz", "signature": {...} }
→ { "verified": true, "account": "3abc...xyz" }
```

## SDK Functions

- `signMessage()` - Sign arbitrary message (via Browser Wallet API)
- `verifyMessageSignature(message, signature, accountInfo)` - Verify signature
- `getAccountInfo(address)` - Fetch account credentials from chain

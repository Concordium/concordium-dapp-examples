# Concordium Allow List dApp

Complete token distribution system with ID proof based allow list management on Concordium, featuring single-transaction atomic operations.

## 🎯 Overview

This dApp automatically distributes PLT tokens to users, who for allow-list enabled tokens are asked for a prove about their ID (e.g. residency, date of birth in a range) using zero-knowledge proofs. Using the latest Concordium SDK's `Token.sendOperations`, all operations execute in a single atomic transaction.

## 🔄 How It Works

1. **User connects** Concordium wallet
2. **User proves** Something from their Concordium ID (configurable zero-knowledge proof)
3. **Backend executes single atomic transaction**:
   ```
   Token.sendOperations([
     addToAllowList,
     mintTokens,
     transferTokens
   ])
   ```
4. **User receives** tokens instantly

## 🏗️ Architecture

```
Frontend (React)          Backend (NestJS)              Concordium Blockchain
     │                         │                              │
     ├─ Wallet Connection      ├─ Token Distribution Service ├─ Protocol Native Tokens
     ├─ Proof Generation       ├─ Process Tracking           ├─ Atomic Operations
     ├─ Real-time Updates      ├─ Governance Wallet          ├─ Single Transaction
     └─ Balance Display        └─ Combined Operations        └─ Instant Execution
```

### Key Features

- **Single Transaction**: All operations (allowlist + mint + transfer) in one atomic transaction
- **Instant Distribution**: ~4 seconds total execution time
- **Atomic Guarantee**: All operations succeed or all fail - no partial states

## 🚀 Quick Start

### Prerequisites
- Node.js v18.18.0+
- Concordium Browser Wallet (devnet version)
- Wallet export with PLT minting permissions for all tokens to be vended

### 1. Backend Setup
```bash
cd backend
npm install
mkdir wallet
# Place the wallet export in wallet/wallet.export
# Configure your settings, create .env file

Create .env file in backend root:

env# Example env file
#Address
CONCORDIUM_GRPC_HOST=`ADDRESS`
CONCORDIUM_GRPC_PORT=`PORT_NUMBER`
CONCORDIUM_USE_SSL=true

# Token Configuration
DEFAULT_TOKEN_ID=YOUR_TOKEN_ID
DEFAULT_MINT_AMOUNT=100
TOKEN_CONFIG_PATH=./config/token-config.json (optional, used to vend multiple PLTs)

# Minting Wallet
GOVERNANCE_WALLET_PATH=./wallet/wallet.export

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS (comma-separated list of allowed frontend origins)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
npm run start:dev     # Runs on :3001
```

### 2. Frontend Setup
Environment Variables
The frontend supports the following optional variables:

TOKEN_ID - The token identifier to use for distribution, only reflects the text in the frontend
BACKEND_URL - The backend API endpoint
VERIFIER_URL (default: 'https://web3id-verifier.testnet.concordium.com') - The zero-knowledge proof verification service endpoint. If not set, the default verifier URL is used which runs the following back-end code:
https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier

To configure these for local testing, you can modify the variables mentioned above in `AllowListDApp.tsx` or set them via `window.runtimeConfig`.

```bash
cd frontend
npm install
npm run build
npm run start         # Runs on :5173
```

### 3. Access Application
Open `http://localhost:5173` and connect your Concordium wallet.

## 🔧 API Endpoints

### New Endpoints (Recommended)
- `POST /token-distribution/distribute` - Start token distribution

### Optional JSON Token Config

If `TOKEN_CONFIG_PATH` is set, the backend loads token definitions from that JSON file.
If it is not set, the backend keeps the existing single-token behavior using `DEFAULT_TOKEN_ID`
and `DEFAULT_MINT_AMOUNT`.

For Docker, the backend container mounts `./backend/config` to `/app/config`, so a value like
`TOKEN_CONFIG_PATH=./config/token-config.json` resolves to `/app/config/token-config.json`.

Example file: `backend/config/token-config.example.json`

```json
{
  "$schema": "./tokens.schema.json",
  "tokens": [
    {
      "id": "TestLists",
      "amount": 100,
      "hasAllowList": true
    },
    {
      "id": "EUROe",
      "amount": 50,
      "hasAllowList": true
    },
    {
      "id": "GatedAccess",
      "amount": 0,
      "hasAllowList": true
    }
  ]
}
```

Setting `amount` to `0` enables **allow-list-only mode**: the user is verified and added to the token's allow list, but no PLTs are minted or transferred. This is useful for gating access without distributing tokens.
- `GET /token-distribution/status/:id` - Check process status
- `GET /token-distribution/allowlist/:user/:token?` - Check allowlist status
- `GET /token-distribution/balance/:token/:user` - Get token balance

## 📊 Technical Details

### Single Transaction Implementation

The core method used is `Token.sendOperations`:

```typescript
const combinedTx = await Token.sendOperations(
  token,
  sender,
  [
    { addAllowList: { target: targetHolder } },
    { mint: { amount: tokenAmount } },
    { transfer: {
      recipient: targetHolder,
      amount: tokenAmount,
      memo: CborMemo.fromString(`Faucet distribution`)
    }}
  ],
  signer
)
```

## 🔐 Security

- Wallet manages all token operations
- Zero-knowledge proofs protect user privacy
- Atomic transactions prevent partial states
- No intermediate failure points

## 🛠️ Development

### Project Structure
```
backend/
├── src/
│   ├── modules/
│   │   ├── concordium/        # Blockchain connection
│   │   └── token-distribution/ # All token operations
│   └── main.ts, app.module.ts, app.controller.ts

frontend/
├── src/
│   ├── components/
│   │   └── AllowListDApp.tsx  # Main UI component
│   └── services/
│       └── wallet-connection.ts
|       |__ credential-provider-services.tsx
```

## 🚨 Important Notes

- **Wallet required**: Must be able to mint, send (and add to allow-lists) for vended tokens
- **Wallet security**: Never commit wallet files
- **Environment files**: Create your own .env files
- **Token configuration**: Update TOKEN_ID and/or config file in backend

## 📝 License

Apache-2.0

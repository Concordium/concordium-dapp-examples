# Concordium Allow List dApp

Complete token distribution system with EU nationality verification on Concordium, featuring single-transaction atomic operations.

## 🎯 Overview

This dApp automatically distributes PLT tokens to users who prove EU nationality using zero-knowledge proofs. Using the latest Concordium SDK's `Token.sendOperations`, all operations execute in a single atomic transaction.

## 🔄 How It Works

1. **User connects** Concordium wallet
2. **User proves** EU nationality (zero-knowledge proof)
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
- Governance wallet export with PLT minting permissions

### 1. Verifier Service Setup
```bash
cd services/web3id-verifier-ts
yarn install

# Start the verifier service connected to devnet
yarn start --endpoint https://[devnet-address]:[devnet-port]
```

# Service runs on :8080
Note: The verifier service connects to the Concordium devnet via an https endpoint. This service is required for zero-knowledge proof verification.

### 2. Backend Setup
```bash
cd backend
npm install
mkdir wallet
# Place governance wallet export in wallet/
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

# Governance Wallet
GOVERNANCE_WALLET_PATH=./wallet/wallet.export

# Server Configuration
PORT=3001
NODE_ENV=development
npm run start:dev     # Runs on :3001
```

### 3. Frontend Setup
```bash
cd frontend
npm install

Create .env file in frontend root:
env# Frontend example env file
TOKEN_ID=YOUR_TOKEN_ID
BACKEND_URL=http://localhost:3001

npm run build
npm run start         # Runs on :5173
```

### 4. Access Application
Open `http://localhost:5173` and connect your Concordium wallet.

## 🔧 API Endpoints

### New Endpoints (Recommended)
- `POST /token-distribution/distribute` - Start token distribution
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

- Governance wallet manages all token operations
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

- **Governance wallet required**: Must be the token issuer
- **Wallet security**: Never commit wallet files
- **Environment files**: Create your own .env files
- **Token configuration**: Update TOKEN_ID in both frontend and backend

## 📝 License

Apache-2.0
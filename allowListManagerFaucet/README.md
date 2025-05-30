# Concordium Allow List dApp

Complete token distribution system with EU nationality verification on Concordium.

## 🎯 Overview

This dApp automatically distributes PLT tokens to users who prove EU nationality using zero-knowledge proofs. No manual intervention required - everything happens automatically on the blockchain.

## 🔄 How It Works

1. **User connects** Concordium wallet
2. **User proves** EU nationality (zero-knowledge proof)
3. **Backend automatically**:
   - Adds user to token allowlist
   - Mints new tokens
   - Transfers tokens to user
   - Single API call executes**: Add to allowlist → Mint tokens → Transfer to user
4. **User receives** tokens instantly

## 🏗️ Architecture

```
Frontend (React)          Backend (NestJS)           Concordium Blockchain
     │                         │                           │
     ├─ Wallet Connection      ├─ Process Orchestration    ├─ Protocol Native Tokens
     ├─ Proof Generation       ├─ Governance Wallet        ├─ Allowlist Management  
     ├─ Real-time Updates      ├─ Transaction Signing      ├─ Token Minting
     └─ Balance Display        └─ Status Tracking          └─ Token Transfers
```

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
DEFAULT_TOKEN_ID=`TOKEN_ID`
DEFAULT_MINT_AMOUNT=`NR_OF_TOKENS_TO_MINT`

# Governance Wallet Configuration
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

### 3. Access Application
Open `http://localhost:5173` and connect your Concordium wallet.

## 🔧 Configuration

### Frontend
- Update `TOKEN_ID` in `AllowListDApp.tsx`
- Ensure backend URL points to `:3001`

### Backend  
- Configure `.env` with your PLT token details
- Place governance wallet export in `wallet/` folder, placed in the root
- Set Concordium devnet connection details

## 🚨 Important Setup Notes

- **This is a proof-of-concept**: Some values are hardcoded in the frontend
- **Governance wallet required**: You must be the issuer of the PLT token
- **Wallet security**: Never commit wallet.export files to version control
- **Environment files**: Create your own .env files (they're gitignored for security)

## 📊 Features

- **Zero-Knowledge Proofs**: Privacy-preserving nationality verification
- **Automated Distribution**: No manual token distribution needed
- **Real-time Tracking**: Live transaction status updates
- **Blockchain Integration**: Direct integration with Concordium Blockchain
- **API Documentation**: Swagger docs at `/api`

## 🔐 Security

- Governance wallet manages all token operations
- Zero-knowledge proofs protect user privacy
- No user credentials stored on servers
- All transactions signed by governance wallet

## 🛠️ Development

Both frontend and backend include detailed setup instructions in their respective README files. The system is designed for easy local development and testing.

## 📝 License

Apache-2.0
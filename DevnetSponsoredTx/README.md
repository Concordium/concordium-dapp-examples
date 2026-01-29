# Concordium Sponsored Transactions Demo

Demo for sponsored transactions on Concordium. Users transfer PLT tokens without paying gas fees - a sponsor wallet covers the cost.

## Project Structure

```
DevnetSponsoredTx/
├── docker-compose.yml        # Orchestrates frontend and backend containers
├── frontend/
│   ├── Dockerfile            # Multi-stage build, serves with runtime config injection
│   ├── build-and-serve.sh    # Injects env vars into index.html at container startup
│   ├── src/
│   │   └── constants.ts      # Runtime config from window.runtimeConfig
│   └── index.html            # Contains placeholders for runtime injection
└── backend/
    ├── Dockerfile            # Node.js backend build
    └── wallet/               # Sponsor wallet export file (gitignored)
```

## Docker

Create a `.env` file in the project root or set default values or secrets in the docker-compose:
```env
CONCORDIUM_GRPC_HOST=your-grpc-host
CCDSCAN_URL=your-ccdscan-url
```

Add your sponsor wallet export file to `backend/wallet/sponsor.export`, then:

```bash
docker compose up --build
```

Open http://localhost:3000 and connect your Browser Wallet.

### Environment Variables

In `App.tsx` network is currently set to `STAGENET`. `TESTNET` can be imported from the same library.

Frontend (runtime injection via `build-and-serve.sh`):
- `BACKEND_URL` - Backend API URL (default: `http://localhost:3002`)
- `TOKEN_ID` - Token identifier (default: `EURtest`)
- `TOKEN_DECIMALS` - Token decimals (default: `6`)
- `CCDSCAN_URL` - CCDScan URL for transaction links (required)

Backend:
- `CONCORDIUM_GRPC_HOST` - Concordium node host (required)
- `CONCORDIUM_GRPC_PORT` - Concordium node port (default: `20000`)
- `CONCORDIUM_USE_SSL` - Use SSL for gRPC connection (default: `true`)
- `SPONSOR_WALLET_PATH` - Path to sponsor wallet export file
- `PORT` - Backend port (default: `3002`)

## Local Development

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
CONCORDIUM_GRPC_HOST=your-grpc-host
CONCORDIUM_GRPC_PORT=20000
CONCORDIUM_USE_SSL=true
SPONSOR_WALLET_PATH=./wallet/sponsor.export
PORT=3002
```

Add your sponsor wallet export file to `backend/wallet/sponsor.export`, then:

```bash
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run start
```

Open http://localhost:5173 and connect your Browser Wallet.

## How It Works

1. User connects Browser Wallet
2. User enters recipient and amount
3. Backend creates the transaction and signs it with the sponsor key
4. User signs to authorize the token transfer
5. Sponsor wallet pays the gas fees

## Notes

- Sponsor wallet needs CCD to cover gas fees
- Wallet export files in `backend/wallet/` are gitignored
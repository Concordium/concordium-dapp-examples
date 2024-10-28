# concordium-testnet-faucet

## Development

Create the .env.local file and fill up the variables.

```bash
cp .env.example .env.local
```

Example enviroment variable values

```bash
NEXT_PUBLIC_EXPLORER_URL=https://ccdexplorer.io/
NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS=1
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=3x00000000000000000000FF
CLOUDFLARE_TURNSTILE_SECRET=1x0000000000000000000000000000000AA
EXPLORER_API_URL=https://wallet-proxy.testnet.concordium.com/v1
SENDER_ADDRESS=4eDtVqZrkmcNEFziEMSs8S2anvkH5KnsYK4MhwedwGWK1pmjZe
NODE_URL=grpc.testnet.concordium.com
NODE_PORT=20000
CCD_DEFAULT_AMOUNT=1
SENDER_PRIVATE_KEY=12...34
```

Note: The values `3x00000000000000000000FF` for `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` and `1x0000000000000000000000000000000AA` for `CLOUDFLARE_TURNSTILE_SECRET` are provided by Cloudflare for testing purposes. They work correctly in a local environment. For setting up the Cloudflare Turnstile service in production, please refer to this [guide](docs/turnstile/SETUP.md).

# Changelog

## Unreleased

- Bumped version of @concordium/web-sdk (with new protocol7 update)
- Removed hardcoded energy for updates, now invokes contract to check the energy usage.

## 4.1.3

- Added new button `Add Token to wallet` that calls addCIS2Tokens from browser-wallet-api-helpers

## 4.1.2

- Bumped version of @concordium/web-sdk and @concordium/react-components (fixes wallet connect serialization issue)

## 4.1.1

- Bumped version of @concordium/web-sdk and @concordium/react-components

## 4.1.0

- Migrate dApp from using deprecated JSON-RPC client to new gRPC client.

## 4.0.0

### Added

- Initial wCCD frontend for mainnet and testnet

### Fixed

- CCDScan URL to work for mainnet and testnet

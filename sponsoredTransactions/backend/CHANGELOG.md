## Unreleased changes

- Change to use the `contract-client` from the Rust SDK.
- Add reject reason decoding of reverted transactions during the dry-run.

## 2.0.0

- Use `AccountSignatures` type for the input parameter to the `permit` function. The sponsored transaction smart contract uses the `check_account_signature` host function with the `AccountSignatures` type as input parameter to verify signatures in the smart contract now.

## 1.0.0

- Initial sponsored transaction back end.

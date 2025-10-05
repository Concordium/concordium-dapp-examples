## Unreleased changes

- Update `concordium-rust-sdk` dependency and adjust project to be forward-compatible. Unknown reject reasons when a sponsored transaction is simulated will produce an internal error. 
- Decode the reject reason of a failed transaction during the dry-run at the `sponsored_transaction_service` backend.
- Update submodule link.

## 1.0.0

- Create initial version of the service.

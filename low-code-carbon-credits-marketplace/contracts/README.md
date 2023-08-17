# Carbon Credits Market Reference Implementation

## User Roles

* Admin : Represents the governance of the system. The role responsible for setting up the system and adding verifiers to the system.
* Project Owner : Represents the owner of the Carbon Credit Project. Can mint / retract a carbon credit project Or Can fractioinalize a carbon credit project into carbon credit tokens.
* Verifier : Responsible for verification of a carbon credit project. Only Verified & Mature projects can be retired and only verified projects can be retired.
* Buyer : Any Account which wants to buy a Carbon Credit / Carbon Credit Token from the marketplace contract.

## Contracts

### [`project_token`](./src/project_token/mod.rs)

 CIS2 Token contract implementation for Carbon Credits Projects. In Addition to CIS2 spec functionality it has the following functionality

* [`is_verified`](./src/project_token/is_verified.rs) : Can be called to check if the token is verified or not.
* [`is_verifier`](./src/carbon_credits/is_verifier.rs) : Can be called to check if an account address if a verifier.
* [`verifier_operations`](./src/project_token/verifier_operations.rs)
  * `add_verifier` : Used by the contract owner to add a carbon credit verifier
  * `remove_verifier`: Used by contract owner to remove a verifier.
  * `verify`: Used by a verifier to mark a project token as verified.
* [`retire`](./src/project_token/retire.rs) : Can be used by the project owner to retire a carbon credit project
* [`retract`](./src/project_token/retract.rs) : Non Mature projects can be retracted by the verifier Or the project owner.

### [`carbon_credits`](./src/carbon_credits/mod.rs)

CIS2 Token contract implementation for Carbon Credits. In Addition to CIS2 specs functionality provides the following functionality.

Carbon Credit Projects can be sent to this contract fo fractionalization into carbon credits.

* [`is_verified`](./src/carbon_credits/is_verified.rs) : Can be used to check if the carbon credit is verified or not
* [`is_verifier`](./src/carbon_credits/is_verifier.rs) : Can be called to check if an account address if a verifier.
* [`retire`](./src/project_token/retire.rs) : Can be used by the project owner to retire a carbon credit
* [`retract`](./src/project_token/retract.rs) : Non Mature tokens can be retracted by the verifier Or the project owner.

### [`carbon_credits_market`](./src/carbon_credit_market/mod.rs)

Reference marketplace implementation for Carbon Projects & Carbon Credits.
Carbon Credit Project Or Carbon Credits can be sent to this contract to list them for a price which any one can pay and claim ownership of a carbon project / credit. Allows for

* [`list`](./src/carbon_credit_market/list.rs) : Can be used to list a carbon project / credit on the marketplace for a price.
* [`transfer`](./src/carbon_credit_market/transfer.rs) : Can be called with an specified amount to transfer a carbon project / credit to the payer.

pub use crate::db::DatabasePool;
use crate::db::{StoredItemCreatedEvent, StoredItemStatusChangedEvent};
use concordium_rust_sdk::{
    smart_contracts::{
        common as concordium_std,
        common::{
            AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName, Serial,
            Timestamp,
        },
    },
    types::{Nonce, RejectReason, WalletAccount},
    v2,
};
use std::sync::Arc;
use tokio::sync::Mutex;

/// Struct to store the revert reason.
#[derive(serde::Serialize, Debug)]
pub struct RevertReason {
    /// Smart contract revert reason.
    pub reason: RejectReason,
}

/// Struct returned by the `health` endpoint. It returns the version of the
/// backend.
#[derive(serde::Serialize)]
pub struct Health {
    /// The version of the backend.
    pub version: &'static str,
}

/// Struct returned by the `getItemCreatedEvent` endpoint. It returns the
/// itemCreatedEvent from the database if present.
#[derive(serde::Serialize)]
pub struct StoredItemCreatedEventReturnValue {
    /// An option with the stored event when the item was created.
    pub data: Option<StoredItemCreatedEvent>,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Serialize)]
pub struct StoredItemStatusChangedEventsReturnValue {
    // A vector containing several events when the item status was changed.
    pub data: Vec<StoredItemStatusChangedEvent>,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[derive(serde::Deserialize)]
pub struct GetItemstatusChangedEventsParam {
    /// The item id.
    pub item_id: u64,
    /// Limit value (pagination) to limit the amoun of events requested from the
    /// database.
    pub limit:   u32,
    /// Offset value (pagination) to limit the amoun of events requested from
    /// the database.
    pub offset:  u32,
}

/// Parameters passed from the front end to this back end when calling the API
/// endpoint `/sponsoredTransaction`.
#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct SponsoredTransactionParam {
    /// Wallet account that signed the `permit_message` at the front end.
    pub signer:           AccountAddress,
    /// Nonce (as stored in the state of the `smart-contract`) of the
    /// above account when it signed the `permit_message` at the front end.
    /// The nonce prevents replay attacks.
    pub nonce:            u64,
    /// Signature that the above account generated when it signed the
    /// `permit_message` at the front end.
    pub signature:        String,
    /// A timestamp to make signatures expire.
    pub expiry_timestamp: Timestamp,
    /// The name of the contract.
    pub contract_name:    String,
    /// The address index of the contract.
    pub contract_address: u64,
    /// The name of the endpoint that should be invoked through the sponsored
    /// transaction mechanism.
    pub endpoint:         String,
    /// The serialized payload that the permit endpoint forwards to the above
    /// `endpoint`.
    pub payload:          Vec<u8>,
}

/// The parameters for the permit function of the cis3 standard.
#[derive(Debug, Serial)]
pub struct PermitParam {
    /// Signature that the above account generated when it signed the
    /// `permit_message` at the front end.
    pub signature: AccountSignatures,
    /// Wallet account that signed the `permit_message` at the front end.
    pub signer:    AccountAddress,
    /// The `permit_message` that the signer signed at the front end.
    pub message:   PermitMessage,
}

/// Part of the parameters for the permit function of the cis3 standard.
#[derive(Debug, Serial, Clone)]
pub struct PermitMessage {
    /// The contract_address that the signature is intended for.
    pub contract_address: ContractAddress,
    /// Nonce (as stored in the state of the `cis2-token-smart-contract`) of the
    /// signer when it signed the `permit_message` at the front end.
    /// The nonce prevents replay attacks.
    pub nonce:            u64,
    /// A timestamp to make signatures expire.
    pub timestamp:        Timestamp,
    /// The entry_point that the signature is intended for.
    pub entry_point:      OwnedEntrypointName,
    /// The serialized payload that the permit endpoint forwards to the above
    /// `endpoint`.
    #[concordium(size_length = 2)]
    pub payload:          Vec<u8>,
}

/// Server struct to store the database pool, the node client,
/// the nonce and key of the sponsorer account, and the
/// whitelisted_accounts.
#[derive(Clone, Debug)]
pub struct Server {
    /// Database pool to connect to.
    pub db_pool:              DatabasePool,
    /// Client to interact with the node.
    pub node_client:          v2::Client,
    /// Key and address of the sponsorer account.
    pub key:                  Arc<WalletAccount>,
    /// Nonce of the sponsorer account.
    pub nonce:                Arc<Mutex<Nonce>>,
    /// A liste of accounts allowed to send sponsored transactions via this back
    /// end.
    pub whitelisted_accounts: Vec<AccountAddress>,
}

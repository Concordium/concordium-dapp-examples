use concordium_rust_sdk::{
    cis2::{TokenAmount, TokenId, Transfer},
    endpoints::{QueryError, RPCError},
    smart_contracts::{
        common as concordium_std,
        common::{
            AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName, Serial,
            Timestamp,
        },
    },
    types::{Nonce, RejectReason},
};
use std::{collections::HashMap, sync::Arc};
use tokio::sync::Mutex;

#[derive(Debug, thiserror::Error)]
pub enum LogError {
    #[error("Nonce query error.")]
    NonceQueryError,
    #[error("Submit sponsored transaction error.")]
    SubmitSponsoredTransactionError,
    #[error("Simulation invoke error.")]
    SimulationInvokeError,
    #[error("Transaction simulation error.")]
    TransactionSimulationError(RevertReason),
    #[error("Rate limit error.")]
    RateLimitError,
    #[error("Parameter error.")]
    ParameterError,
    #[error("Signature error.")]
    SignatureError,
    #[error("AdditionalData error.")]
    AdditionalDataError,
    #[error("Node access error: {0}")]
    NodeAccess(#[from] QueryError),
}

impl From<RPCError> for LogError {
    fn from(err: RPCError) -> Self { Self::NodeAccess(err.into()) }
}

#[derive(serde::Serialize, Debug)]
pub struct RevertReason {
    pub reason: RejectReason,
}

impl warp::reject::Reject for LogError {}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    /// Code of the error.
    pub code:    u16,
    /// Error message.
    pub message: String,
}

/// Paramters passed from the front end to this back end when calling the API
/// endpoint `/bid`.
#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct BidParams {
    /// Wallet account that signed the `permit_message` at the front end.
    pub signer:             AccountAddress,
    /// Nonce (as stored in the state of the `cis2-token-smart-contract`) of the
    /// above account when it signed the `permit_message` at the front end.
    /// The nonce prevents replay attacks.
    pub nonce:              u64,
    /// Signature that the above account generated when it signed the
    /// `permit_message` at the front end.
    pub signature:          String,
    /// A timestamp to make signatures expire.
    pub expiry_timestamp:   Timestamp,
    /// The token id of the payment token used when bidding for an item in the
    /// auction.
    pub token_id:           TokenId,
    /// The account address that the cis tokens (payment tokens) are deducted
    /// from when bidding for an item in the auction.
    pub from:               AccountAddress,
    /// The item index in the auction that the signer wants to bid for.
    pub item_index_auction: u16,
    /// The amount of tokens that the signer is willing to bid in exchange of
    /// the item index from the auction.
    pub token_amount:       TokenAmount,
}

/// The parameters for the transfer function of a cis2 token.
#[derive(Debug, Serial, Clone)]
pub struct TransferParams(#[concordium(size_length = 2)] pub Vec<Transfer>);

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
    /// The serialized payload that should be forwarded to the `transfer`
    /// function.
    #[concordium(size_length = 2)]
    pub payload:          Vec<u8>,
}

/// Server struct to keep track of the nonce of the sponsorer account and the
/// rate_limits of user accounts.
#[derive(Clone)]
pub struct Server {
    /// Nonce of the sponsorer account.
    pub nonce:       Arc<Mutex<Nonce>>,
    /// The rate limit value for each user account is incremented
    /// every time this user account signs a `permit_message` at the front end
    /// and the signature is submitted to the `bid` entry point of this back
    /// end. This server only allows up to `RATE_LIMIT_PER_ACCOUNT`
    /// transactions to be submitted with a signature generated from a given
    /// user account. The rate limit values stored here are transient and
    /// are reset on server restart.
    pub rate_limits: Arc<Mutex<HashMap<AccountAddress, u8>>>,
}

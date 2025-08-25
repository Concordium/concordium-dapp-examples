use axum::{extract::rejection::JsonRejection, Json};
use concordium_rust_sdk::{
    cis2::{TokenAmount, TokenId, Transfer},
    smart_contracts::{
        common as concordium_std,
        common::{
            AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName, Serial,
            Timestamp,
        },
    },
    types::{Nonce, RejectReason, WalletAccount},
    v2::{self, QueryError, RPCError},
};
use hex::FromHexError;
use http::StatusCode;
use std::{collections::HashMap, sync::Arc};
use tokio::sync::Mutex;

#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Unable to parse request: {0}.")]
    InvalidRequest(#[from] JsonRejection),
    #[error("Unable to parse signature into a hex string: {0}.")]
    SignatureError(#[from] FromHexError),
    #[error("Unable to parse signature because it wasn't 64 bytes long.")]
    SignatureLengthError,
    #[error("Unable to create parameter.")]
    ParameterError,
    #[error("Unable to invoke the node to simulate the transaction: {0}.")]
    SimulationInvokeError(#[from] QueryError),
    #[error("Simulation of transaction reverted in smart contract with reason: {0:?}.")]
    TransactionSimulationError(RevertReason),
    #[error("The signer account reached its rate limit.")]
    RateLimitError,
    #[error("Unable to submit transaction on chain successfully: {0}.")]
    SubmitSponsoredTransactionError(#[from] RPCError),
    #[error("Unable to derive alias account of signer.")]
    NoAliasAccount,
}

impl axum::response::IntoResponse for ServerError {
    fn into_response(self) -> axum::response::Response {
        let r = match self {
            ServerError::ParameterError => {
                tracing::error!("Internal error: Unable to create parameter.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Unable to create parameter.".to_string()),
                )
            }
            ServerError::SimulationInvokeError(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(format!("{}", error)),
                )
            }
            ServerError::SubmitSponsoredTransactionError(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(format!("{}", error)),
                )
            }
            error => {
                tracing::debug!("Bad request: {error}.");
                (StatusCode::BAD_REQUEST, Json(format!("{}", error)))
            }
        };
        r.into_response()
    }
}

/// Struct to store the revert reason.
#[derive(serde::Serialize, Debug)]
pub struct RevertReason {
    /// Smart contract revert reason.
    pub reason: RejectReason,
}

/// Parameters passed from the front end to this back end when calling the API
/// endpoint `/bid`.
#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct BidParams {
    /// Wallet account that signed the `permit_message` at the front end.
    pub signer: AccountAddress,
    /// Nonce (as stored in the state of the `cis2-token-smart-contract`) of the
    /// above account when it signed the `permit_message` at the front end.
    /// The nonce prevents replay attacks.
    pub nonce: u64,
    /// Signature that the above account generated when it signed the
    /// `permit_message` at the front end.
    pub signature: String,
    /// A timestamp to make signatures expire.
    pub expiry_timestamp: Timestamp,
    /// The token id of the payment token used when bidding for an item in the
    /// auction.
    pub token_id: TokenId,
    /// The account address that the cis tokens (payment tokens) are deducted
    /// from when bidding for an item in the auction.
    pub from: AccountAddress,
    /// The item index in the auction that the signer wants to bid for.
    pub item_index_auction: u16,
    /// The amount of tokens that the signer is willing to bid in exchange of
    /// the item index from the auction.
    pub token_amount: TokenAmount,
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
    pub signer: AccountAddress,
    /// The `permit_message` that the signer signed at the front end.
    pub message: PermitMessage,
}

/// Part of the parameters for the permit function of the cis3 standard.
#[derive(Debug, Serial, Clone)]
pub struct PermitMessage {
    /// The contract_address that the signature is intended for.
    pub contract_address: ContractAddress,
    /// Nonce (as stored in the state of the `cis2-token-smart-contract`) of the
    /// signer when it signed the `permit_message` at the front end.
    /// The nonce prevents replay attacks.
    pub nonce: u64,
    /// A timestamp to make signatures expire.
    pub timestamp: Timestamp,
    /// The entry_point that the signature is intended for.
    pub entry_point: OwnedEntrypointName,
    /// The serialized payload that should be forwarded to the `transfer`
    /// function.
    #[concordium(size_length = 2)]
    pub payload: Vec<u8>,
}

/// Server struct to store the contract addresses, the node client,
/// the nonce and key of the sponsorer account, and the
/// rate_limits of user accounts.
#[derive(Clone, Debug)]
pub struct Server {
    /// Client to interact with the node.
    pub node_client: v2::Client,
    /// Key and address of the sponsorer account.
    pub key: Arc<WalletAccount>,
    /// Contract address of the auction contract.
    pub auction_smart_contract: ContractAddress,
    /// Contract address of the token contract.
    pub cis2_token_smart_contract: ContractAddress,
    /// Nonce of the sponsorer account.
    pub nonce: Arc<Mutex<Nonce>>,
    /// The rate limit value for each user account is incremented
    /// every time this user account signs a `permit_message` at the front end
    /// and the signature is submitted to the `bid` entry point of this back
    /// end. This server only allows up to `RATE_LIMIT_PER_ACCOUNT`
    /// transactions to be submitted with a signature generated from a given
    /// user account. The rate limit values stored here are transient and
    /// are reset on server restart.
    pub rate_limits: Arc<Mutex<HashMap<AccountAddress, u8>>>,
}

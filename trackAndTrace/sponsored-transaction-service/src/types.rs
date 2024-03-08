use axum::{extract::rejection::JsonRejection, http::StatusCode, Json};
use concordium_rust_sdk::{
    endpoints::{QueryError, RPCError},
    smart_contracts::{
        common as concordium_std,
        common::{
            AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName,
            OwnedParameter, Serial, Timestamp,
        },
    },
    types::{Nonce, RejectReason, WalletAccount},
};
use hex::FromHexError;
use std::{
    collections::{BTreeSet, HashMap},
    fmt,
    str::FromStr,
    sync::Arc,
};
use tokio::sync::Mutex;

/// The rate limits per accounts.
pub(crate) const RATE_LIMIT_PER_ACCOUNT: u8 = 30;

#[derive(Debug, thiserror::Error)]
/// Errors that can occur in the server.
pub enum ServerError {
    /// The request could not be parsed.
    #[error("Unable to parse request: {0}.")]
    InvalidRequest(#[from] JsonRejection),
    /// The signature could not be parsed.
    #[error("Unable to parse signature into a hex string: {0}.")]
    SignatureError(#[from] FromHexError),
    /// The signature does not have the right length.
    #[error("Unable to parse signature because it wasn't 64 bytes long.")]
    SignatureLengthError,
    /// The parameter exceeds the length limit.
    #[error("The parameter exceeds the length limit of 65535 bytes.")]
    ParameterError,
    /// The transaction simulation failed because the node couldn't be reached.
    #[error("Unable to invoke the node to simulate the transaction: {0}.")]
    SimulationInvokeError(#[from] QueryError),
    /// The transaction simulation returned with a contract rejection.
    #[error("Simulation of transaction reverted in smart contract with reason: {:?}.", reason.reason)]
    TransactionSimulationError { reason: RevertReason },
    /// The signer account has reached its rate limit.
    #[error(
        "The signer account reached its hourly rate limit of {RATE_LIMIT_PER_ACCOUNT} requests."
    )]
    RateLimitError,
    /// Sending the transaction failed.
    #[error("Unable to submit transaction on chain successfully: {0}.")]
    SubmitSponsoredTransactionError(#[from] RPCError),
    /// Deriving the alias account failed.
    #[error("Unable to derive alias account of signer.")]
    NoAliasAccount,
    /// The provided contract name was invalid.
    #[error("Invalid contract name: {invalid_name}.")]
    ContractNameError { invalid_name: String },
    /// The signer account is not allowed to use the service.
    #[error("Signer account is not allowed to use the service: {account}.")]
    AccountNotAllowed { account: AccountAddress },
    /// The contract is not allowed to be used by the service.
    #[error("Contract address is not allowed to be used by the service: {contract}.")]
    ContractNotAllowed { contract: ContractAddress },
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

impl fmt::Display for RevertReason {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result { write!(f, "reason: {:?}", self.reason) }
}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    /// The error code.
    pub code:    u16,
    /// The error message.
    pub message: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
/// The input parameters for the `/api/submitTransaction` endpoint.
pub struct InputParams {
    /// The signer of the transaction.
    pub signer:           AccountAddress,
    /// The account nonce.
    pub nonce:            u64,
    /// The signature for the transaction.
    pub signature:        String,
    /// The expiry time.
    pub expiry_time:      Timestamp,
    /// The contract to call.
    pub contract_address: ContractAddress,
    /// The name of the contract to call.
    /// Should be without the "init_" prefix.
    pub contract_name:    String,
    /// The entrypoint to call.
    pub entrypoint_name:  String,
    /// The actual parameter forwarded to the entrypoint `entrypoint_name`.
    pub parameter:        OwnedParameter,
}

#[derive(Debug, Serial)]
/// The parameters to the `permit` entrypoint.
pub struct PermitParam {
    /// The signature.
    pub signature: AccountSignatures,
    /// The signer.
    pub signer:    AccountAddress,
    /// The message signed.
    pub message:   PermitMessage,
}

#[derive(serde::Deserialize, Debug, Serial, Clone)]
/// The permit message.
pub struct PermitMessage {
    /// The contract address.
    pub contract_address: ContractAddress,
    /// The nonce of the account.
    pub nonce:            u64,
    /// The expiration time for signature.
    pub timestamp:        Timestamp,
    /// The entrypoint to call.
    pub entry_point:      OwnedEntrypointName,
    /// The parameter to call the entrypoint with.
    pub parameter:        OwnedParameter,
}

#[derive(Clone)]
/// The state of the server.
pub struct Server {
    /// A connection to a node.
    pub node_client:       concordium_rust_sdk::v2::Client,
    /// The accounts keys for the account sponsoring the transactions.
    pub keys:              Arc<WalletAccount>,
    /// The next nonce of the sponsor account.
    pub nonce:             Arc<Mutex<Nonce>>,
    /// Rate limits for accounts. The rate limits are transient and are reset on
    /// server restarts.
    pub rate_limits:       Arc<Mutex<HashMap<AccountAddress, u8>>>,
    /// The allowed accounts.
    pub allowed_accounts:  AllowedAccounts,
    /// The allowed contracts.
    pub allowed_contracts: AllowedContracts,
}

/// The accounts allowed to use the service.
pub type AllowedAccounts = AllowedEntities<AccountAddress>;
/// The contracts allowed to be used by the service.
pub type AllowedContracts = AllowedEntities<ContractAddress>;

/// Allowed entities to be used in the service.
/// Either accounts or contracts.
///
/// The expected argument format is
/// "any", "Any", or "ANY" for `Self::Any`, and a white-space-separated set of
/// the entities for the `Self::LimitedTo` variant.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AllowedEntities<T> {
    /// Any entities allowed to use or be used by the service. This should only
    /// be used if other authorizations schemes are in place. Otherwise the
    /// sponsor account can easily be drained of funds.
    Any,
    /// The restricted set entities allowed to use or be used by the service.
    LimitedTo { entities: BTreeSet<T> },
}

impl<T> FromStr for AllowedEntities<T>
where
    T: FromStr + Ord,
{
    type Err = clap::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let s_trim = s.trim();
        if s_trim == "any" || s_trim == "Any" || s_trim == "ANY" {
            return Ok(Self::Any);
        }
        let entities = s
            .split_whitespace()
            .map(|e| T::from_str(e))
            .collect::<Result<BTreeSet<_>, _>>()
            .map_err(|_| clap::Error::new(clap::error::ErrorKind::InvalidValue))?;
        Ok(Self::LimitedTo { entities })
    }
}

impl<T: Ord> AllowedEntities<T> {
    /// Check whether the entity is allowed.
    pub fn allowed(&self, entity: &T) -> bool {
        match self {
            AllowedEntities::Any => true,
            AllowedEntities::LimitedTo { entities } => entities.contains(entity),
        }
    }
}

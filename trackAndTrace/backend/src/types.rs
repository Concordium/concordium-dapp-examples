use concordium_rust_sdk::{
    endpoints::{QueryError, RPCError},
    smart_contracts::{
        common as concordium_std,
        common::{
            AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName,
            OwnedParameter, Serial, Timestamp,
        },
    },
    types::{
        hashes::{HashBytes, TransactionMarker},
        Nonce, RejectReason,
    },
};
use std::{collections::HashMap, fmt, sync::Arc};
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
    #[error("Node access error: {0}")]
    NodeAccess(#[from] QueryError),
    #[error("Invalid contract name: {0}")]
    ContractNameError(String),
}

impl From<RPCError> for LogError {
    fn from(err: RPCError) -> Self { Self::NodeAccess(err.into()) }
}

#[derive(serde::Serialize, Debug)]
pub struct RevertReason {
    pub reason: RejectReason,
}

impl fmt::Display for RevertReason {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result { write!(f, "reason: {:?}", self.reason) }
}

impl warp::reject::Reject for LogError {}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    pub code:    u16,
    pub message: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct InputParams {
    pub signer:           AccountAddress,
    pub nonce:            u64,
    pub signature:        String,
    pub expiry_time:      Timestamp,
    pub contract_address: ContractAddress,
    /// The contract name without the "init_" prefix.
    pub contract_name:    String,
    pub parameter:        OwnedParameter,
}

#[derive(Debug, Serial)]
pub struct PermitParam {
    pub signature: AccountSignatures,
    pub signer:    AccountAddress,
    pub message:   PermitMessage,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct TxHash {
    pub tx_hash: HashBytes<TransactionMarker>,
}

#[derive(serde::Deserialize, Debug, Serial, Clone)]
pub struct PermitMessage {
    pub contract_address: ContractAddress,
    pub nonce:            u64,
    pub timestamp:        Timestamp,
    pub entry_point:      OwnedEntrypointName,
    pub parameter:        OwnedParameter,
}

#[derive(Clone)]
pub struct Server {
    pub nonce:       Arc<Mutex<Nonce>>,
    // The rate_limits are transient and are reset on server restart.
    pub rate_limits: Arc<Mutex<HashMap<AccountAddress, u8>>>,
}

/// Allowed accounts for the service.
///
/// The `clap::Parser` expects the format to be
/// "any", "Any", or "ANY" for `Self::Any`, and a comma-separated list of
/// account addresses for the `Self::LimitedTo` variant.
///
/// Additional whitespace is automatically trimmed.
#[derive(Debug, Clone, PartialEq, Eq, clap::Parser)]
pub enum AllowedAccounts {
    Any,
    LimitedTo { accounts: Vec<AccountAddress> },
}

impl std::str::FromStr for AllowedAccounts {
    type Err = clap::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let s_trim = s.trim();
        if s_trim == "any" || s_trim == "Any" || s_trim == "ANY" {
            return Ok(Self::Any);
        }
        let accounts = s
            .split(",")
            .map(|acc| AccountAddress::from_str(acc.trim()))
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| clap::Error::new(clap::error::ErrorKind::InvalidValue))?;
        Ok(Self::LimitedTo { accounts })
    }
}

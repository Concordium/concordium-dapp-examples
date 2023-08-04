use concordium_rust_sdk::cis2::{TokenId, Transfer, UpdateOperator};
use concordium_rust_sdk::smart_contracts::common as concordium_std;
use concordium_rust_sdk::types::RejectReason;
use concordium_rust_sdk::{
    endpoints::{QueryError, RPCError},
    smart_contracts::common::{
        AccountAddress, AccountSignatures, ContractAddress, OwnedEntrypointName, Serial, Timestamp,
    },
    types::{
        hashes::{HashBytes, TransactionMarker},
        Nonce,
    },
};
use std::collections::HashMap;
use std::fmt;
use std::sync::Arc;
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
    #[error("Owned received name error.")]
    OwnedReceiveNameError,
    #[error("TokenAmount error.")]
    TokenAmountError,
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
    fn from(err: RPCError) -> Self {
        Self::NodeAccess(err.into())
    }
}

#[derive(serde::Serialize, Debug)]
pub struct RevertReason {
    pub reason: RejectReason,
}

impl fmt::Display for RevertReason {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "reason: {:?}", self.reason)
    }
}

impl warp::reject::Reject for LogError {}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    pub code: u16,
    pub message: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct UpdateOperatorInputParams {
    pub signer: AccountAddress,
    pub nonce: u64,
    pub signature: String,
    pub operator: AccountAddress,
    pub add_operator: bool,
    pub timestamp: Timestamp,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct TransferInputParams {
    pub signer: AccountAddress,
    pub nonce: u64,
    pub signature: String,
    pub token_id: TokenId,
    pub from: AccountAddress,
    pub to: AccountAddress,
    pub timestamp: Timestamp,
}

#[derive(Debug, Serial, Clone)]
pub struct TransferParams(#[concordium(size_length = 2)] pub Vec<Transfer>);

#[derive(Debug, Serial, Clone)]
pub struct UpdateOperatorParams(#[concordium(size_length = 2)] pub Vec<UpdateOperator>);

#[derive(Debug, Serial)]
pub struct PermitParam {
    pub signature: AccountSignatures,
    pub signer: AccountAddress,
    pub message: PermitMessage,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct TxHash {
    pub tx_hash: HashBytes<TransactionMarker>,
}

#[derive(Debug, Serial, Clone)]
pub struct PermitMessage {
    pub contract_address: ContractAddress,
    pub nonce: u64,
    pub timestamp: Timestamp,
    pub entry_point: OwnedEntrypointName,
    #[concordium(size_length = 2)]
    pub payload: Vec<u8>,
}

#[derive(Clone)]
pub struct Server {
    pub nonce: Arc<Mutex<Nonce>>,
    // The rate_limits are transient and are reset on server restart.
    pub rate_limits: Arc<Mutex<HashMap<AccountAddress, u8>>>,
}

use concordium_rust_sdk::cis2::{TokenId, Transfer, UpdateOperator};
use concordium_rust_sdk::{
    endpoints::{QueryError, RPCError},
    smart_contracts::common::{
        AccountAddress, ContractAddress, OwnedEntrypointName, Serial, Serialize, Timestamp,
    },
    types::{
        hashes::{HashBytes, TransactionMarker},
        Nonce,
    },
};
use std::collections::BTreeMap;
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Debug, thiserror::Error)]
pub enum LogError {
    #[error("Nonce query error.")]
    NonceQueryError,
    #[error("Sumbit sponsored transaction error.")]
    SumbitSponsoredTransactionError,
    #[error("Simulation invoke error.")]
    SimulationInvokeError,
    #[error("Transaction simulation error.")]
    TransactionSimulationError,
    #[error("Owned received name error.")]
    OwnedReceiveNameError,
    #[error("TokenAmount error.")]
    TokenAmountError,
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

#[derive(Copy, Clone, Eq, PartialEq, Serialize, Ord, PartialOrd, Hash, Debug)]
#[repr(transparent)]
pub struct SignatureEd25519(pub [u8; 64]);

#[derive(Debug, Serial, Clone)]
pub struct TransferParams(#[concordium(size_length = 2)] pub Vec<Transfer>);

#[derive(Debug, Serial, Clone)]
pub enum PermitPayload {
    Transfer(TransferParams),
    UpdateOperator(UpdateOperatorParams),
}

#[derive(Debug, Serial, Clone)]
pub struct UpdateOperatorParams(#[concordium(size_length = 2)] pub Vec<UpdateOperator>);

#[derive(Debug, Serial, Clone)]
pub struct PermitParam {
    #[concordium(size_length = 1)]
    pub signature: BTreeMap<u8, BTreeMap<u8, SignatureEd25519>>,
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
    pub entry_point: OwnedEntrypointName,
    pub nonce: u64,
    pub timestamp: Timestamp,
    pub payload: PermitPayload,
}

#[derive(Clone)]
pub struct Server {
    pub nonce: Arc<Mutex<Nonce>>,
}

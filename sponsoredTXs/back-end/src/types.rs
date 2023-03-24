use concordium_rust_sdk::{
    endpoints::{QueryError, RPCError},
    smart_contracts::common::{
        AccountAddress, ContractAddress, OwnedEntrypointName, Serialize, Timestamp, Serial,
    },
};

use concordium_rust_sdk::cis2::UpdateOperator;
use concordium_rust_sdk::cis2::Transfer;

use std::collections::BTreeMap;

#[derive(Debug, thiserror::Error)]
pub enum InjectStatementError {
    #[error("Not allowed")]
    NotAllowed,
    #[error("Invalid proof")]
    InvalidProofs,
    #[error("Node access error: {0}")]
    NodeAccess(#[from] QueryError),
    #[error("Error acquiring internal lock.")]
    LockingError,
    #[error("Proof provided for an unknown session.")]
    UnknownSession,
    #[error("Issue with credential.")]
    Credential,
    #[error("Given token was expired.")]
    Expired,
}

impl From<RPCError> for InjectStatementError {
    fn from(err: RPCError) -> Self {
        Self::NodeAccess(err.into())
    }
}

impl warp::reject::Reject for InjectStatementError {}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    pub code: u16,
    pub message: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct UpdateOperatorInputParams {
    pub signer: String,
    pub nonce: String,
    pub signature: String,
    pub operator: String,
    pub add_operator: bool,
    pub timestamp: String,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct TransferInputParams {
    pub signer: String,
    pub nonce: String,
    pub signature: String,
    pub token_id: String,
    pub from: String,
    pub to: String,
    pub timestamp: String,
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

#[derive(Debug, Serial, Clone)]
pub struct PermitMessage {
    pub contract_address: ContractAddress,
    pub entry_point: OwnedEntrypointName,
    pub nonce: u64,
    pub timestamp: Timestamp,
    pub payload: PermitPayload,
}

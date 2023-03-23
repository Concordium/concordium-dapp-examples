use concordium_rust_sdk::{
    common::{
        self as crypto_common,
        derive::{SerdeBase16Serialize, Serial, Serialize},
        types::Timestamp,
        Buffer, Deserial, ParseResult, ReadBytesExt, SerdeDeserialize, SerdeSerialize, Serial,
        Versioned,
    },
    endpoints::{QueryError, RPCError},
    id::{
        constants::{ArCurve, AttributeKind},
        id_proof_types::Proof,
        types::{AccountAddress, GlobalContext},
    },
    smart_contracts::common::OwnedEntrypointName,
    types::{Address, ContractAddress, CredentialRegistrationID},
};
use std::{
    collections::{BTreeMap, HashMap},
    sync::{Arc, Mutex},
    time::SystemTime,
};

#[derive(
    Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Hash, Debug, SerdeBase16Serialize, Serialize,
)]
pub struct Challenge(pub [u8; 32]);

#[derive(serde::Deserialize, Debug, Clone)]
pub struct InfoQuery {
    pub auth: String,
}

#[derive(serde::Deserialize, Debug, Clone)]
pub struct WithAccountAddress {
    pub address: AccountAddress,
}

#[derive(Clone)]
pub struct ChallengeStatus {
    pub address: AccountAddress,
    pub created_at: SystemTime,
}

#[derive(Clone)]
pub struct TokenStatus {
    pub created_at: SystemTime,
}

#[derive(Clone)]
pub struct Server {
    pub challenges: Arc<Mutex<HashMap<String, ChallengeStatus>>>,
    pub tokens: Arc<Mutex<HashMap<String, TokenStatus>>>,
    pub global_context: Arc<GlobalContext<ArCurve>>,
}

#[derive(Debug)]
/// An internal error type used by this server to manage error handling.
#[derive(thiserror::Error)]
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

#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct ChallengeResponse {
    pub challenge: Challenge,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct ChallengedProof {
    pub challenge: Challenge,
    pub proof: ProofWithContext,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct ProofWithContext {
    pub credential: CredentialRegistrationID,
    pub proof: Versioned<Proof<ArCurve, AttributeKind>>,
}

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
pub struct OperatorOfParams {
    pub account: String,
    pub signer: String,
    pub nonce: String,
    pub signature: String,
    pub operator: String,
    pub add_operator: bool,
    pub timestamp: String,
}

// #[derive(
//     Copy, Clone, Debug, PartialEq, Serial, PartialOrd, Eq, Ord,
// )]
// #[repr(transparent)]
// pub struct SignatureEd25519(pub [u8; 64]);

//
//
// /// serde::Deserialize,serde::Serialize,
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct UpdateOperator {
//     pub update: OperatorUpdate,
//     pub operator: Address,
// }
//
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone, Copy)]
// pub enum OperatorUpdate {
//     Remove,
//     Add,
// }

// type ContractTokenId = u32;

// type ContractTokenAmount = u8;

// type TransferParameter = TransferParams;

// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct TransferParams(pub Vec<Transfer>);

// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct Transfer {
//     pub token_id: ContractTokenId,
//     pub amount: ContractTokenAmount,
//     pub from: Address,
//     pub to: Receiver,
//     pub data: AdditionalData,
// }

// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub enum Receiver {
//     Account(AccountAddress),
//     Contract(
//         ContractAddress,
//         OwnedEntrypointName,
//     ),
// }

// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct AdditionalData(Vec<u8>);

// /// serde::Deserialize, serde::Serialize,
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub(crate) enum PermitPayload {
//     Transfer(TransferParameter),
//     UpdateOperator(UpdateOperatorParams),
// }

// pub trait IsTokenId: serde::Serialize {}

// pub trait IsTokenAmount: serde::Serialize {}

// /// serde::Serialize
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct UpdateOperatorParams(pub Vec<UpdateOperator>);

// /// serde::Deserialize,Serial,
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct PermitParam {
//     pub signature: BTreeMap<u8, BTreeMap<u8, SignatureEd25519>>,
//     pub signer: AccountAddress,
//     pub message: PermitMessage,
// }

// /// serde::Deserialize, serde::Serialize,
// #[derive(Debug, serde::Deserialize, serde::Serialize, Clone)]
// pub struct PermitMessage {
//     pub contract_address: ContractAddress,
//     pub entry_point: OwnedEntrypointName,
//     pub nonce: u64,
//     pub timestamp: Timestamp,
//     pub payload: PermitPayload,
// }

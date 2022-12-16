use concordium_rust_sdk::{
    common::{
        self as crypto_common,
        derive::{SerdeBase16Serialize, Serialize},
        Buffer, Deserial, ParseResult, ReadBytesExt, SerdeDeserialize, SerdeSerialize, Serial,
        Versioned,
    },
    endpoints::{QueryError, RPCError},
    id::{
        constants::{ArCurve, AttributeKind},
        id_proof_types::Proof,
        types::{AccountAddress, GlobalContext},
    },
    types::CredentialRegistrationID,
};
use std::{
    collections::HashMap,
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

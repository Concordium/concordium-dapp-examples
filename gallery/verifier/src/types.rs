use concordium_rust_sdk::{
    base as concordium_base,
    common::{SerdeBase16Serialize, Serial, Serialize},
    endpoints::QueryError,
    id::{
        constants::ArCurve,
        id_proof_types::Statement,
        types::{AccountAddress, GlobalContext},
    },
    web3id::{
        did::Network, CredentialLookupError, Presentation, PresentationVerificationError,
        Web3IdAttribute,
    },
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
    pub network: Network,
    pub zk_statements: Statement<ArCurve, Web3IdAttribute>,
}

#[derive(Debug)]
/// An internal error type used by this server to manage error handling.
#[derive(thiserror::Error)]
pub enum InjectStatementError {
    #[error("Not allowed.")]
    NotAllowed,
    #[error("Node access error: {0}")]
    NodeAccess(#[from] QueryError),
    #[error("Error acquiring internal lock.")]
    LockingError,
    #[error("Proof provided for an unknown session.")]
    UnknownSession,
    #[error("Given token was expired.")]
    Expired,
    #[error("One statement is expected.")]
    ExpectOneStatement,
    #[error("Unable to look up the credentials: {0}")]
    CredentialLookup(#[from] CredentialLookupError),
    #[error("Invalid proof: {0}")]
    InvalidProof(#[from] PresentationVerificationError),
    #[error("Wrong ZK statement proven.")]
    WrongStatement,
    #[error("Expect account statement and not web3id statement.")]
    AccountStatement,
    #[error("ZK proof was created for the wrong network. Expect: {expected}. Got: {actual}.")]
    WrongNetwork { expected: Network, actual: Network },
    #[error("Wrong prover for the given challenge. The given challenge was requested for account {expected} but the proof in the wallet was generated for account {actual}.")]
    WrongProver {
        expected: AccountAddress,
        actual: AccountAddress,
    },
    #[error("No credential commitment on chain.")]
    NoCredentialCommitment,
    #[error(
        "Only regular accounts are supported by this backend. No support for multi-sig accounts."
    )]
    OnlyRegularAccounts,
}

impl warp::reject::Reject for InjectStatementError {}

#[derive(serde::Serialize)]
/// Response in case of an error. This is going to be encoded as a JSON body
/// with fields 'code' and 'message'.
pub struct ErrorResponse {
    pub code: u16,
    pub message: String,
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct ChallengeResponse {
    pub challenge: Challenge,
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
pub struct ChallengedProof {
    pub presentation: Presentation<ArCurve, Web3IdAttribute>,
}

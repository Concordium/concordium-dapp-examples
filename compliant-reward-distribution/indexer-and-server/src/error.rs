use crate::types::ClaimExpiryDurationDays;
use axum::{
    response::{IntoResponse, Response},
    Json,
};
use concordium_rust_sdk::{
    base::{contracts_common::AccountAddressParseError, hashes::IncorrectLength},
    common::types::AccountAddress,
    types::AbsoluteBlockHeight,
    v2::QueryError,
    web3id::{did::Network, CredentialLookupError, PresentationVerificationError},
};
use deadpool_postgres::PoolError;
use http::StatusCode;
use std::string::FromUtf8Error;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ConversionError {
    #[error("Incorrect length")]
    IncorrectLength(#[from] IncorrectLength),
    #[error("UTF-8 conversion error: {0}")]
    FromUtf8Error(#[from] FromUtf8Error),
    #[error("Account address parse error: {0}")]
    AccountAddressParse(#[from] AccountAddressParseError),
}

/// Represents possible errors returned from [`Database`] or [`DatabasePool`] functions
#[derive(Error, Debug)]
pub enum DatabaseError {
    /// An error happened while interacting with the postgres DB.
    #[error("{0}")]
    Postgres(#[from] tokio_postgres::Error),
    /// Failed to perform conversion from DB representation of type.
    #[error("Failed to convert type `{0}`: {1}")]
    TypeConversion(String, #[source] ConversionError),
    /// Failed to configure database.
    #[error("Could not configure database: {0}")]
    Configuration(anyhow::Error),
    /// Failed to get pool.
    #[error("Could not get pool: {0}")]
    PoolError(#[from] PoolError),
}

/// Errors that this server can produce.
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] DatabaseError),
    #[error("The requested rows returned by the database were above the limit {0}")]
    MaxRequestLimit(u32),
    #[error("The signer account address is not an admin")]
    SignerNotAdmin,
    #[error("The signature is not valid")]
    InvalidSignature,
    #[error("Unable to look up all credentials: {0}")]
    CredentialLookup(#[from] CredentialLookupError),
    #[error("One or more credentials are not active")]
    InactiveCredentials,
    #[error("Invalid proof: {0}")]
    InvalidProof(#[from] PresentationVerificationError),
    #[error("Wrong length of {actual_string}. Expect: {expected_length}. Got: {}", .actual_string.len())]
    WrongLength {
        actual_string: String,
        expected_length: usize,
    },
    #[error("Wrong ZK statement proven")]
    WrongStatement,
    #[error("Expect account statement and not web3id statement")]
    AccountStatement,
    #[error("ZK proof was created for the wrong network. Expect: {expected}. Got: {actual}.")]
    WrongNetwork { expected: Network, actual: Network },
    #[error("Expect reveal attribute statement at position {0}")]
    RevealAttribute(usize),
    #[error("Network error: {0}")]
    QueryError(#[from] QueryError),
    #[error("Underflow error")]
    UnderFlow,
    #[error(
        "The account was not captured by the indexer and is not in the database. Only accounts \
         earlier than block height {0} are captured."
    )]
    AccountNotExist(AbsoluteBlockHeight),
    #[error("Claim already expired. Your account creation has to be not older than {0}.")]
    ClaimExpired(ClaimExpiryDurationDays),
    #[error("Converting message to bytes caused an error: {0}")]
    MessageConversion(#[from] bincode::Error),
    #[error(
        "The block hash and/or the context string were not included in the challenge correctly."
    )]
    ChallengeInvalid,
    #[error(
        "Signature already expired. Your block hash signed has to be not older than the block \
         hash from block {0}."
    )]
    SignatureExpired(u64),
    #[error(
        "Proof already expired. Your block hash included as challenge in the proof has to be not \
         older than the block hash from block {0}."
    )]
    ProofExpired(u64),
    #[error("Failed to convert type `{0}`: {1}")]
    TypeConversion(String, IncorrectLength),
    #[error(
        "Only regular accounts are supported by this backend. No support for multi-sig accounts."
    )]
    OnlyRegularAccounts,
    #[error("No credential commitment on chain.")]
    NoCredentialCommitment,
    #[error(
            "You already submitted a ZK proof with your identity for the account {expected}. You can \
             claim rewards only once with your identity. Use the account {expected} for claiming the \
             reward instead of account {actual}."
        )]
    IdentityReUsed {
        expected: AccountAddress,
        actual: AccountAddress,
    },
    #[error("Account address parse error: {0}")]
    AccountAddressParse(#[from] AccountAddressParseError),
    #[error("Not a valid tweet URL (expected format: https://x.com/JohnDoe/status/1818198789817077916 or https://twitter.com/JohnDoe/status/1818198789817077916)")]
    NotValidTweetURL,
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        let r = match self {
            // Internal errors.
            ServerError::DatabaseError(_)
            | ServerError::QueryError(..)
            | ServerError::UnderFlow => {
                tracing::error!("Internal error: {self}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            // Unauthorized errors.
            ServerError::SignerNotAdmin => {
                let error_message = format!("Unauthorized: {self}");
                tracing::info!(error_message);
                (StatusCode::UNAUTHORIZED, error_message.into())
            }
            // Bad request errors.
            ServerError::MaxRequestLimit(_)
            | ServerError::InvalidSignature
            | ServerError::CredentialLookup(_)
            | ServerError::InactiveCredentials
            | ServerError::InvalidProof(_)
            | ServerError::WrongLength { .. }
            | ServerError::AccountStatement
            | ServerError::WrongStatement
            | ServerError::WrongNetwork { .. }
            | ServerError::RevealAttribute(_)
            | ServerError::ClaimExpired(_)
            | ServerError::MessageConversion(_)
            | ServerError::AccountNotExist(..)
            | ServerError::ChallengeInvalid
            | ServerError::SignatureExpired(_)
            | ServerError::ProofExpired(_)
            | ServerError::TypeConversion(..)
            | ServerError::OnlyRegularAccounts
            | ServerError::NoCredentialCommitment
            | ServerError::IdentityReUsed { .. }
            | ServerError::AccountAddressParse(_)
            | ServerError::NotValidTweetURL => {
                let error_message = format!("Bad request: {self}");
                tracing::info!(error_message);
                (StatusCode::BAD_REQUEST, error_message.into())
            }
        };
        r.into_response()
    }
}

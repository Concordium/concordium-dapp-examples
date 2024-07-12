use axum::{extract::rejection::JsonRejection, http::StatusCode, Json};
use chrono::{prelude::*, TimeDelta};
use concordium_rust_sdk::{
    contract_client::DecodedReason,
    endpoints::QueryError,
    smart_contracts::common::{
        self as concordium_std, AccountAddress, AccountSignatures, ContractAddress,
        NewContractNameError, NewReceiveNameError, OwnedEntrypointName, OwnedParameter, Serial,
        Timestamp,
    },
    types::{smart_contracts::ExceedsParameterSize, Nonce, RejectReason, WalletAccount},
};
use hex::FromHexError;
use std::{
    collections::{BTreeSet, HashMap},
    fmt,
    str::FromStr,
    sync::Arc,
};
use tokio::sync::Mutex;

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
    #[error("The parameter exceeds the length limit: {0}")]
    ParameterError(#[from] ExceedsParameterSize),
    /// The transaction simulation returned with a contract rejection.
    #[error("Simulation of transaction rejected in smart contract with reject reason: {0:?}.")]
    TransactionSimulationError(RejectReason),
    /// The transaction simulation returned with a contract rejection and a
    /// decoded reject reason.
    #[error(
        "Simulation of transaction rejected in smart contract with decoded reject reason: `{0}` \
         derived from: {1:?}."
    )]
    TransactionSimulationRejectedTransaction(DecodedReason, RejectReason),
    /// The contract client could not be created because of a network error.
    #[error("Failed to create contract client: {0:?}")]
    FailedToCreateContractClient(QueryError),
    /// Querring the node failed due to a network error.
    #[error("Failed querrying the node due to a network error: {0}")]
    NetworkError(#[from] QueryError),
    /// The signer account has reached its rate limit.
    #[error(
        "The signer account reached its hourly rate limit of {rate_limit_per_account_per_hour} \
         requests."
    )]
    RateLimitError {
        rate_limit_per_account_per_hour: u16,
    },
    /// Sending the transaction failed.
    #[error("Unable to submit transaction on chain successfully: {0}.")]
    SubmitSponsoredTransactionError(QueryError),
    /// Deriving the alias account failed.
    #[error("Unable to derive alias account of signer.")]
    NoAliasAccount,
    /// The provided contract name was invalid.
    #[error("Invalid contract name: {0}")]
    ContractNameError(#[from] NewContractNameError),
    /// The receive name constructed from a contract name and entrypoint is
    /// invalid.
    #[error("Invalid receive name: {0}")]
    ReceiveNameError(#[from] NewReceiveNameError),
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
            ServerError::ParameterError(error) => {
                tracing::error!("Internal error: {error}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(format!("Unable to create parameter because: {error}")),
                )
            }
            ServerError::NetworkError(error) => {
                tracing::error!("Internal error: {error}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("An internal error occurred while querying the node.".to_string()),
                )
            }
            ServerError::FailedToCreateContractClient(error) => {
                tracing::error!("Internal error: {error}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(
                        "An internal error occurred while creating the contract client."
                            .to_string(),
                    ),
                )
            }
            ServerError::SubmitSponsoredTransactionError(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(
                        "An internal error occurred while submitting the contract update."
                            .to_string(),
                    ),
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

// TODO: Use `#[from] RejectReason` instead when [`RejectReason`] implements
// `std::error::Error`.
impl From<RejectReason> for ServerError {
    fn from(value: RejectReason) -> Self { Self::TransactionSimulationError(value) }
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
#[serde(rename_all = "camelCase")]
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
    pub node_client: concordium_rust_sdk::v2::Client,
    /// The accounts keys for the account sponsoring the transactions.
    pub keys: Arc<WalletAccount>,
    /// The next nonce of the sponsor account.
    pub nonce: Arc<Mutex<Nonce>>,
    /// Rate limits for accounts per hour. The rate limits are reset once per
    /// hour.
    pub rate_limits: Arc<Mutex<HashMap<AccountAddress, u16>>>,
    /// The rate limit per account per hour.
    pub rate_limit_per_account_per_hour: u16,
    /// Timestamp for last reset of the rate limits.
    pub last_rate_limit_reset: Arc<Mutex<DateTime<Utc>>>,
    /// The allowed accounts.
    pub allowed_accounts: AllowedAccounts,
    /// The allowed contracts.
    pub allowed_contracts: AllowedContracts,
}

impl Server {
    /// Create a new [`Server`].
    pub(crate) fn new(
        node_client: concordium_rust_sdk::v2::Client,
        keys: WalletAccount,
        nonce: Nonce,
        rate_limit_per_account_per_hour: u16,
        allowed_accounts: AllowedAccounts,
        allowed_contracts: AllowedContracts,
    ) -> Self {
        Self {
            node_client,
            keys: Arc::new(keys),
            nonce: Arc::new(Mutex::new(nonce)),
            rate_limits: Arc::new(Mutex::new(HashMap::new())),
            rate_limit_per_account_per_hour,
            last_rate_limit_reset: Arc::new(Mutex::new(Utc::now())),
            allowed_accounts,
            allowed_contracts,
        }
    }

    /// Reset the rate limits map if at least one hour has passed since the last
    /// reset.
    ///
    /// The rate limits are primarily used to limit the costs in terms of CCD of
    /// the sponsor account. It is therefore not necessary to limit bursts of
    /// requests from a single account. The implementation here is thus very
    /// simple, where all limits are reset once per hour. This means that an
    /// account can actually use twice the rate limit within a few minutes
    /// if the transactions are timed just before and after the limit reset.
    pub(crate) async fn reset_rate_limits_if_expired(&self) {
        let now = Utc::now();
        let mut last_rate_limit_reset = self.last_rate_limit_reset.lock().await;
        if now.signed_duration_since(*last_rate_limit_reset) >= TimeDelta::try_hours(1).unwrap() {
            // Clear all saved limits.
            self.rate_limits.lock().await.clear();
            *last_rate_limit_reset = now;
        }
    }

    /// Check the rate limit for the account. It also updates the counter for
    /// the account.
    ///
    /// Since account addresses have aliases, we track the rate-limit by using
    /// the 0th alias for everyone account. For more info on aliases, see: https://developer.concordium.software/en/mainnet/net/references/transactions.html#account-aliases
    pub(crate) async fn check_rate_limit(
        &self,
        account: AccountAddress,
    ) -> Result<(), ServerError> {
        let mut rate_limits = self.rate_limits.lock().await;

        let alias_account_0 = account
            .get_alias(0)
            .ok_or_else(|| ServerError::NoAliasAccount)?;

        let rate_limit = rate_limits.entry(alias_account_0).or_insert_with(|| 0u16);

        if *rate_limit >= self.rate_limit_per_account_per_hour {
            return Err(ServerError::RateLimitError {
                rate_limit_per_account_per_hour: self.rate_limit_per_account_per_hour,
            });
        }
        *rate_limit += 1;
        Ok(())
    }
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
            .map(T::from_str)
            .collect::<Result<BTreeSet<_>, _>>()
            .map_err(|_| clap::Error::new(clap::error::ErrorKind::InvalidValue))?;
        Ok(Self::LimitedTo { entities })
    }
}

impl<T> fmt::Display for AllowedEntities<T>
where
    T: fmt::Display,
{
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AllowedEntities::Any => write!(f, "Any"),
            AllowedEntities::LimitedTo { entities } => write!(
                f,
                "[{}]",
                entities
                    .iter()
                    .map(ToString::to_string)
                    .collect::<Vec<_>>()
                    .join(", ")
            ),
        }
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

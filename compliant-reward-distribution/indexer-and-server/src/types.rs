use crate::{db::StoredAccountData, DatabasePool};
use chrono::Days;
use concordium_rust_sdk::{
    base::hashes::BlockHash,
    common::types::Signature,
    id::{
        constants::ArCurve,
        id_proof_types::Statement,
        types::{AccountAddress, GlobalContext},
    },
    types::AbsoluteBlockHeight,
    v2::Client,
    web3id::{did::Network, Presentation, Web3IdAttribute},
};
use std::{num::ParseIntError, str::FromStr};

/// Server struct to store values that are not persisted in the database.
/// When re-starting the server this struct will be re-initialized based on the options/flags provided.
#[derive(Clone, Debug)]
pub struct Server {
    /// The database pool used to connect to the database.
    pub db_pool: DatabasePool,
    /// The node client to the Concordium node.
    pub node_client: Client,
    /// The network used (testnet or mainnet).
    pub network: Network,
    /// The global cryptographic parameters that are stored publicly on chain.
    pub cryptographic_params: GlobalContext<ArCurve>,
    /// The admin accounts that have elevated permission to read/write from/to the database.
    pub admin_accounts: Vec<AccountAddress>,
    /// The ZK statements that are used to verify submitted ZK proofs.
    pub zk_statements: Statement<ArCurve, Web3IdAttribute>,
    /// The duration in days after a new account is created that the account is eligible to claim the reward.
    pub claim_expiry_duration_days: ClaimExpiryDurationDays,
}

/// Generalised parameter struct used by all endpoints that require a signature check. The generic type <T>
/// can be customized for each endpoint to specify additional data to be part of the message signed.
#[derive(serde::Deserialize, serde::Serialize)]
pub struct SigningData<T> {
    /// Signer account.
    pub signer: AccountAddress,
    /// Message signed.
    pub message: T,
    /// Signature.
    pub signature: Signature,
    /// Contains the block height and the corresponding block hash around the time when the message was signed.
    /// The block hash is signed as part of the message. The block height is not signed but checked that it
    /// corresponds to the block hash. The block height is used to ensure that the signature expires after some time.
    pub block: BlockMessage,
}

/// Trait definition of `HasSigningData`. This trait is implemented for all input parameter structs
/// used by endpoints that require a signature check.
pub trait HasSigningData {
    type Message;
    fn signing_data(&self) -> &SigningData<Self::Message>;
}

/// Struct included in all parameters used by endpoints that require a signature check.
/// It contains the block height and the corresponding block hash around the time when the message was signed.
/// The block hash is signed as part of the message. The block height is not signed but checked that it
/// corresponds to the block hash. The block height is used to ensure that the signature expires after some time.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BlockMessage {
    pub hash: BlockHash,
    pub height: AbsoluteBlockHeight,
}

/// Parameter struct for the `postZKProof` endpoint.
#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PostZKProofParam {
    /// The block height is used to ensure that the proof expires after some time.
    /// The corresponding block hash is used as `challenge` when generating the ZK proof.
    pub block_height: AbsoluteBlockHeight,
    /// The ZK proof.
    pub presentation: Presentation<ArCurve, Web3IdAttribute>,
}

/// Helper type returned by the `check_zk_proof` function.
pub struct ZKProofExtractedData {
    /// Revealed `national_id` attribute.
    pub national_id: String,
    /// Revealed `nationality` attribute.
    pub nationality: String,
    /// Prover that generated the ZK proof.
    pub prover: AccountAddress,
}

/// Message struct for the `postTweet` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TweetMessage {
    pub tweet: String,
}

/// Implement the `HasSigningData` trait for `PostTweetParam`.
impl HasSigningData for PostTweetParam {
    type Message = TweetMessage;
    fn signing_data(&self) -> &SigningData<TweetMessage> {
        &self.signing_data
    }
}

/// Parameter struct for the `postZKProof` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PostTweetParam {
    pub signing_data: SigningData<TweetMessage>,
}

/// Message struct for the `setClaimed` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SetClaimedMessage {
    /// Vector of accounts that should be marked as `claimed` in the database.
    pub account_addresses: Vec<AccountAddress>,
}

/// Implement the `HasSigningData` trait for `SetClaimedParam`.
impl HasSigningData for SetClaimedParam {
    type Message = SetClaimedMessage;
    fn signing_data(&self) -> &SigningData<SetClaimedMessage> {
        &self.signing_data
    }
}

/// Parameter struct for the `setClaimed` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SetClaimedParam {
    pub signing_data: SigningData<SetClaimedMessage>,
}

/// Partial struct returned by the `canClaim` endpoint.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct UserData {
    /// True, if the user has not claimed the reward yet.
    pub claimed: bool,
    /// True, if the user has submitted a valid tweet and the verification version is still valid.
    pub tweet_valid: bool,
    /// True, if the user has submitted a valid ZK proof and the verification version is still valid.
    pub zk_proof_valid: bool,
}

/// Struct returned by the `canClaim` endpoint.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct CanClaimReturn {
    pub data: UserData,
}

/// Implement the `HasSigningData` trait for `GetAccountDataParam`.
impl HasSigningData for GetAccountDataParam {
    type Message = GetAccountDataMessage;
    fn signing_data(&self) -> &SigningData<GetAccountDataMessage> {
        &self.signing_data
    }
}

/// Message struct for the `getAccountData` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetAccountDataMessage {
    /// Account address for which the data should be retrieved.
    pub account_address: AccountAddress,
}

/// Parameter struct for the `getAccountData` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetAccountDataParam {
    pub signing_data: SigningData<GetAccountDataMessage>,
}

/// Struct returned by the `getAccountData` endpoint.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct AccountDataReturn {
    pub data: Option<StoredAccountData>,
}

/// Message struct for the `getPendingApprovals` endpoint.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetPendingApprovalsMessage {
    /// Limit used in the query to the database.
    pub limit: u32,
    /// Offset used in the query to the database.
    pub offset: u32,
}

/// Implement the `HasSigningData` trait for `GetPendingApprovalsParam`.
impl HasSigningData for GetPendingApprovalsParam {
    type Message = GetPendingApprovalsMessage;
    fn signing_data(&self) -> &SigningData<GetPendingApprovalsMessage> {
        &self.signing_data
    }
}

/// Parameter struct for the `getPendingApprovals` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetPendingApprovalsParam {
    pub signing_data: SigningData<GetPendingApprovalsMessage>,
}

/// Struct returned by the `getPendingApprovals` endpoint.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct VecAccountDataReturn {
    /// Vector of account data that have their pending approval set to `true`.
    pub data: Vec<StoredAccountData>,
}

/// Parameter struct for the `canClaim` endpoint.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CanClaimParam {
    /// Account address for which the data should be retrieved.
    pub account_address: AccountAddress,
}

/// Struct returned by the `health` endpoint.
/// It returns the version of the backend.
#[derive(serde::Serialize)]
pub struct Health {
    pub version: &'static str,
}

/// Struct returned by the `getZKProofStatements` endpoint.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct ZKProofStatementsReturn {
    /// ZK statements that should be used by the front end to construct the ZK proofs.
    pub data: Statement<ArCurve, Web3IdAttribute>,
}

/// Wrapper around Days. This is used to parse the claim expiry duration from the command line.
#[derive(Debug, Clone, Copy)]
pub struct ClaimExpiryDurationDays(pub Days);

impl FromStr for ClaimExpiryDurationDays {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let days = s.parse::<u64>()?;
        Ok(ClaimExpiryDurationDays(Days::new(days)))
    }
}

impl std::fmt::Display for ClaimExpiryDurationDays {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self.0)
    }
}

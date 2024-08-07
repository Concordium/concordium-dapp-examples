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

/// Server struct to store the db_pool.
#[derive(Clone, Debug)]
pub struct Server {
    ///
    pub db_pool: DatabasePool,
    ///
    pub node_client: Client,
    pub network: Network,
    pub cryptographic_param: GlobalContext<ArCurve>,
    pub admin_accounts: Vec<AccountAddress>,
    pub zk_statements: Statement<ArCurve, Web3IdAttribute>,
    pub claim_expiry_duration_days: ClaimExpiryDurationDays,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Deserialize, serde::Serialize)]
pub struct SigningData<T> {
    pub signer: AccountAddress,
    pub message: T,
    pub signature: Signature,
    pub block: BlockMessage,
}

/// Trait definition of the `IsMessage`. This trait is implemented for the two
/// types `WithdrawMessage` and `TransferMessage`. The `isMessage` trait is used
/// as an input parameter to the `validate_signature_and_increase_nonce`
/// function so that the function works with both message types.
pub trait HasSigningData {
    type Message;
    fn signing_data(&self) -> &SigningData<Self::Message>;
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BlockMessage {
    pub hash: BlockHash,
    pub height: AbsoluteBlockHeight,
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PostZKProofParam {
    pub block_height: AbsoluteBlockHeight,
    pub presentation: Presentation<ArCurve, Web3IdAttribute>,
}

/// Helper type
pub struct ZKProofExtractedData {
    ///
    pub national_id: String,
    ///
    pub nationality: String,
    ///
    pub prover: AccountAddress,
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TwitterPostLinkMessage {
    pub twitter_post_link: String,
}

impl HasSigningData for PostTwitterPostLinkParam {
    type Message = TwitterPostLinkMessage;
    fn signing_data(&self) -> &SigningData<TwitterPostLinkMessage> {
        &self.signing_data
    }
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PostTwitterPostLinkParam {
    pub signing_data: SigningData<TwitterPostLinkMessage>,
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SetClaimedMessage {
    pub account_addresses: Vec<AccountAddress>,
}

impl HasSigningData for SetClaimedParam {
    type Message = SetClaimedMessage;
    fn signing_data(&self) -> &SigningData<SetClaimedMessage> {
        &self.signing_data
    }
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SetClaimedParam {
    pub signing_data: SigningData<SetClaimedMessage>,
}

#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct UserData {
    pub claimed: bool,
    pub twitter_post_link_valid: bool,
    pub zk_proof_valid: bool,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct CanClaimReturn {
    pub data: UserData,
}

impl HasSigningData for GetAccountDataParam {
    type Message = GetAccountDataMessage;
    fn signing_data(&self) -> &SigningData<GetAccountDataMessage> {
        &self.signing_data
    }
}

#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetAccountDataMessage {
    pub account_address: AccountAddress,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetAccountDataParam {
    pub signing_data: SigningData<GetAccountDataMessage>,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct AccountDataReturn {
    pub data: Option<StoredAccountData>,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct VecAccountDataReturn {
    pub data: Vec<StoredAccountData>,
}

impl HasSigningData for GetPendingApprovalsParam {
    type Message = GetPendingApprovalsMessage;
    fn signing_data(&self) -> &SigningData<GetPendingApprovalsMessage> {
        &self.signing_data
    }
}

#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetPendingApprovalsMessage {
    pub limit: u32,
    pub offset: u32,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GetPendingApprovalsParam {
    pub signing_data: SigningData<GetPendingApprovalsMessage>,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CanClaimParam {
    pub account_address: AccountAddress,
}

/// Struct returned by the `health` endpoint. It returns the version of the
/// backend.
#[derive(serde::Serialize)]
pub struct Health {
    pub version: &'static str,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[repr(transparent)]
#[derive(serde::Serialize)]
pub struct ZKProofStatementsReturn {
    pub data: Statement<ArCurve, Web3IdAttribute>,
}

#[derive(Debug, Clone)]
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

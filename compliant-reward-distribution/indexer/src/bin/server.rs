use ::indexer::{
    db::{DatabaseError, DatabasePool},
    types::Server,
};
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    http,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use clap::Parser;
use concordium_rust_sdk::{
    common::types::{CredentialIndex, KeyIndex},
    contract_client::CredentialStatus,
    id::{
        constants::ArCurve,
        id_proof_types::Statement,
        types::{AccountAddress, AccountCredentialWithoutProofs},
    },
    types::AbsoluteBlockHeight,
    v2::{AccountIdentifier, BlockIdentifier, Client, QueryError},
    web3id::{
        did::Network,
        get_public_data, CredentialLookupError, CredentialProof,
        CredentialStatement::{Account, Web3Id},
        PresentationVerificationError, Web3IdAttribute,
    },
};
use deadpool_postgres::PoolError;
use http::StatusCode;
use indexer::{
    db::{ConversionError, StoredAccountData},
    types::{
        AccountDataReturn, CanClaimParam, ClaimExpiryDurationDays, GetAccountDataParam,
        GetPendingApprovalsParam, HasSigningData, Health, PostTwitterPostLinkParam,
        PostZKProofParam, SetClaimedParam, SigningData, VecAccountDataReturn, ZKProofExtractedData,
        ZKProofStatementsReturn,
    },
};
use sha2::Digest;

/// The maximum number of rows allowed in a request to the database.
const MAX_REQUEST_LIMIT: u32 = 40;

/// The number of blocks after that a generated signature or ZK proof is considered expired.
const SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS: u64 = 200;

const TESTNET_GENESIS_BLOCK_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

/// Current version of the verification logic used for the ZK proof.
/// Update this version if you want to introduce a new ZK proof-verification logic.
const CURRENT_ZK_PROOF_VERIFICATION_VERSION: u16 = 1;
/// Current version of the verification logic used for the twitter post link.
/// Update this version if you want to introduce a new twitter post link verification logic.
const CURRENT_TWITTER_POST_LINK_VERIFICATION_VERSION: u16 = 1;
/// All versions that should be considered valid for the ZK proof verification.
const VALID_ZK_PROOF_VERIFICATION_VERSIONS: [u16; 1] = [1];
/// All versions that should be considered valid for the twiter post link verification.
const VALID_TWITTER_POST_LINK_VERIFICATION_VERSIONS: [u16; 1] = [1];

/// TODO: check versions during `can_claim` endpoint (potentially invalidate the query)
///
/// Errors that this server can produce.
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Database error from postgres: {0}")]
    DatabasePostgres(tokio_postgres::Error),
    #[error("Database error in type `{0}` conversion: {1}")]
    DatabaseTypeConversion(String, ConversionError),
    #[error("Could not configure database because of {0}: {1}")]
    DatabaseConfiguration(String, anyhow::Error),
    #[error("Could not get pool: {0}")]
    PoolError(#[from] PoolError),
    #[error("Failed to extract json object: {0}")]
    JsonRejection(#[from] JsonRejection),
    #[error("The requested events to the database were above the limit {0}")]
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
    #[error("Wrong length of {0}. Expect {1}. Got {2}")]
    WrongLength(String, usize, usize),
    #[error("Wrong ZK statement proven")]
    WrongStatement,
    #[error("Expect account statement and not web3id statement")]
    AccountStatement,
    #[error("Do not expect initial account credential")]
    NotInitialAccountCredential,
    #[error("ZK proof was created for the wrong network. Got network {0}, Expected network: {1}")]
    WrongNetwork(Network, Network),
    #[error("Expect reveal attribute statement at position {0}")]
    RevealAttribute(usize),
    #[error("Network error: {0}")]
    QueryError(#[from] QueryError),
    #[error("Underflow error")]
    UnderFlow,
    #[error(
        "The account was not captured by the indexer and is not in the database. \
        Only accounts earlier than block height {0} are captured."
    )]
    AccountExists(AbsoluteBlockHeight),
    #[error("Claim already expired. Your account creation has to be not older than {0}.")]
    ClaimExpired(ClaimExpiryDurationDays),
    #[error("Converting message to bytes caused an error: {0}.")]
    MessageConversion(bincode::ErrorKind),
    #[error(
        "You already submitted a ZK proof with your identity for the account {0}. \
        You can claim rewards only once with your identity. Use the account {0} for claiming the reward instead of account {1}."
    )]
    IdentityReUsed(AccountAddress, AccountAddress),
    #[error("The block hash and block height in the signing data are not from the same block.")]
    BlockSigningDataInvalid,
    #[error("The block hash used as challenge and block height passed as parameter are not from the same block.")]
    BlockProofDataInvalid,
    #[error("Signature already expired. Your block hash signed has to be not older than the block hash from block {0}.")]
    SignatureExpired(u64),
    #[error("Proof already expired. Your block hash included as challenge in the proof has to be not older than block {0}.")]
    ProofExpired(u64),
}

/// Mapping DatabaseError to ServerError
impl From<DatabaseError> for ServerError {
    fn from(e: DatabaseError) -> Self {
        match e {
            DatabaseError::Postgres(e) => ServerError::DatabasePostgres(e),
            DatabaseError::TypeConversion(type_name, e) => {
                ServerError::DatabaseTypeConversion(type_name, e)
            }
            DatabaseError::Configuration(type_error, e) => {
                ServerError::DatabaseConfiguration(type_error, e)
            }
            DatabaseError::PoolError(e) => ServerError::PoolError(e),
            DatabaseError::IdentityReUsed(old_address, new_address) => {
                ServerError::IdentityReUsed(old_address, new_address)
            }
        }
    }
}

impl From<Box<bincode::ErrorKind>> for ServerError {
    fn from(e: Box<bincode::ErrorKind>) -> Self {
        ServerError::MessageConversion(*e)
    }
}

pub fn update_pending_approval(
    old_pending_approval: bool,
    other_task_valid: Option<bool>,
    claimed: bool,
) -> bool {
    let mut new_pending_approval = old_pending_approval;

    // Check if we need to update `pending_approval` to true.
    if let Some(other_task_valid) = other_task_valid {
        if !claimed && other_task_valid {
            // If the account already submitted the other task and can still claim,
            // set the `pending_approval` to true.
            new_pending_approval = true
        }
    }
    new_pending_approval
}

/// Check that the account is eligible for claiming the reward by checking that:
/// - the account creation has not expired.
/// - the account exists in the database.
/// Returns the account data stored in the database.
pub async fn check_account_eligible(
    state: &Server,
    account: AccountAddress,
) -> Result<StoredAccountData, ServerError> {
    let db = state.db_pool.get().await?;
    let database_result = db.get_account_data(account).await?;

    match database_result {
        Some(database_result) => {
            // Check if the claim for the reward for this account has already expired.
            // After creating a new account, the account is eligible to claim the reward for a certain duration.
            let expiry_date_time = Utc::now()
                .checked_sub_days(state.claim_expiry_duration_days.0)
                .ok_or(ServerError::UnderFlow)?;
            if database_result.block_time < expiry_date_time {
                return Err(ServerError::ClaimExpired(
                    state.claim_expiry_duration_days.clone(),
                ));
            }
            Ok(database_result)
        }
        None => {
            // Return an error if the account does not exist in the database.
            // The account has to be created at a time when the indexer was running.
            let start_block_height = db.get_settings().await?.start_block_height;
            Err(ServerError::AccountExists(start_block_height))
        }
    }
}

/// Correct the `zk_proof_valid`, `twitter_post_link_valid` and `pending_approval` values,
/// if they have become invalid due to the verification process has changed. This can happen
/// if the verification logic during the submission by the user has been different than now.
/// Also sets the `pending_approval` flag to false if the account has already claimed.
pub fn check_for_changed_verification_logic(
    mut sad: StoredAccountData,
) -> Result<StoredAccountData, ServerError> {
    // Check if the ZK proof verification version is still valid.
    if sad.zk_proof_verification_version.map_or(true, |version| {
        !VALID_ZK_PROOF_VERIFICATION_VERSIONS.contains(&(version as u16))
    }) {
        sad.zk_proof_valid = Some(false);
        sad.pending_approval = false;
    }

    // Check if the twitter post link verification version is still valid.
    if sad
        .twitter_post_link_verification_version
        .map_or(true, |version| {
            !VALID_TWITTER_POST_LINK_VERIFICATION_VERSIONS.contains(&(version as u16))
        })
    {
        sad.twitter_post_link_valid = Some(false);
        sad.pending_approval = false;
    }

    // Check if already `claimed`.
    if sad.claimed {
        sad.pending_approval = false;
    }

    Ok(sad)
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        let r = match self {
            // Internal errors.
            ServerError::DatabasePostgres(_)
            | ServerError::DatabaseTypeConversion(..)
            | ServerError::QueryError(..)
            | ServerError::UnderFlow
            | ServerError::DatabaseConfiguration(..)
            | ServerError::PoolError(_) => {
                tracing::error!("Internal error: {self}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            // Bad request errors.
            ServerError::JsonRejection(_)
            | ServerError::MaxRequestLimit(_)
            | ServerError::SignerNotAdmin
            | ServerError::InvalidSignature
            | ServerError::CredentialLookup(_)
            | ServerError::InactiveCredentials
            | ServerError::InvalidProof(_)
            | ServerError::WrongLength(..)
            | ServerError::AccountStatement
            | ServerError::WrongStatement
            | ServerError::NotInitialAccountCredential
            | ServerError::WrongNetwork(..)
            | ServerError::RevealAttribute(_)
            | ServerError::ClaimExpired(_)
            | ServerError::MessageConversion(_)
            | ServerError::AccountExists(..)
            | ServerError::IdentityReUsed(..)
            | ServerError::BlockSigningDataInvalid
            | ServerError::BlockProofDataInvalid
            | ServerError::SignatureExpired(_)
            | ServerError::ProofExpired(_) => {
                let error_message = format!("Bad request: {self}");
                tracing::warn!(error_message);
                (StatusCode::BAD_REQUEST, error_message.into())
            }
        };
        r.into_response()
    }
}

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
#[command(author, version, about)]
struct Args {
    /// Address where the server will listen on.
    #[clap(
        long = "listen-address",
        short = 'a',
        default_value = "0.0.0.0:8080",
        env = "CCD_SERVER_LISTEN_ADDRESS"
    )]
    listen_address: std::net::SocketAddr,
    /// A connection string detailing the connection to the database used by the \
    /// application.
    #[arg(
        long = "db-connection",
        short = 'd',
        default_value = "host=localhost dbname=indexer user=postgres password=password port=5432",
        env = "CCD_SERVER_DB_CONNECTION"
    )]
    db_connection: tokio_postgres::config::Config,
    /// The maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and \
    /// `error`.
    #[clap(
        long = "log-level",
        short = 'l',
        default_value = "info",
        env = "CCD_SERVER_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
    /// The endpoint is expected to point to concordium node grpc v2 API's. The endpoint \
    ///  is built into the frontend served, which means the node must enable grpc-web to \
    /// be used successfully.
    #[arg(
        long = "node",
        short = 'n',
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "CCD_SERVER_NODE"
    )]
    node_endpoint: concordium_rust_sdk::v2::Endpoint,
    /// The admin accounts that are allowed to read the database and set the `claimed`
    /// flag in the database after having manually transferred the funds to an account.
    #[clap(
        long = "admin_accounts",
        short = 'c',
        env = "CCD_SERVER_ADMIN_ACCOUNTS"
    )]
    admin_accounts: Vec<AccountAddress>,
    /// The duration after creating a new account during which the account is eligible to claim the reward.
    #[clap(
        long = "claim_expiry_duration_days",
        short = 'e',
        env = "CCD_SERVER_CLAIM_EXPIRY_DURATION_DAYS",
        default_value = "60"
    )]
    claim_expiry_duration_days: ClaimExpiryDurationDays,
    /// The ZK statements that the server accepts proofs for.
    #[clap(long = "zk_statements", short = 'z', env = "CCD_SERVER_ZK_STATEMENTS")]
    zk_statements: String,
}

/// The main function.
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = Args::parse();

    {
        use tracing_subscriber::prelude::*;
        let log_filter = tracing_subscriber::filter::Targets::new()
            .with_target(module_path!(), app.log_level)
            .with_target("tower_http", app.log_level);

        tracing_subscriber::registry()
            .with(tracing_subscriber::fmt::layer())
            .with(log_filter)
            .init();
    }

    // Establish connection to the postgres database.
    let db_pool = DatabasePool::create(app.db_connection.clone(), 1, true)
        .await
        .context("Could not create database pool")?;

    // Set up endpoint to the node.
    let endpoint = if app
        .node_endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &concordium_rust_sdk::v2::Scheme::HTTPS)
    {
        app.node_endpoint
            .tls_config(tonic::transport::channel::ClientTlsConfig::new())
            .context("Unable to construct TLS configuration for the Concordium API.")?
    } else {
        app.node_endpoint
    }
    .connect_timeout(std::time::Duration::from_secs(5))
    .timeout(std::time::Duration::from_secs(10));

    // Establish connection to the blockchain node.
    let mut node_client = Client::new(endpoint.clone()).await?;
    let consensus_info = node_client.get_consensus_info().await?;
    let genesis_hash = consensus_info.genesis_block.bytes;

    let network = if genesis_hash == TESTNET_GENESIS_BLOCK_HASH {
        Network::Testnet
    } else {
        Network::Mainnet
    };

    let cryptographic_param = node_client
        .get_cryptographic_parameters(BlockIdentifier::LastFinal)
        .await
        .context("Unable to get cryptographic parameters.")?
        .response;

    let zk_statements: Statement<ArCurve, Web3IdAttribute> =
        serde_json::from_str(&app.zk_statements)?;

    let state = Server {
        db_pool,
        node_client,
        network,
        cryptographic_param,
        admin_accounts: app.admin_accounts,
        zk_statements,
        claim_expiry_duration_days: app.claim_expiry_duration_days,
    };

    tracing::info!("Starting server...");

    let router = Router::new()
        .route("/api/postTwitterPostLink", post(post_twitter_post_link))
        .route("/api/postZKProof", post(post_zk_proof))
        .route("/api/setClaimed", post(set_claimed))
        .route("/api/getAccountData", post(get_account_data))
        .route("/api/getPendingApprovals", post(get_pending_approvals))
        .route("/api/canClaim", post(can_claim))
        .route("/api/getZKProofStatements", get(get_zk_proof_statements))
        .route("/health", get(health))
        .with_state(state)
        .layer(
            tower_http::trace::TraceLayer::new_for_http()
                .make_span_with(tower_http::trace::DefaultMakeSpan::new())
                .on_response(tower_http::trace::DefaultOnResponse::new()),
        )
        .layer(tower_http::limit::RequestBodyLimitLayer::new(1_000_000)) // at most 1000kB of data.
        .layer(tower_http::compression::CompressionLayer::new());

    tracing::info!("Listening at {}", app.listen_address);

    let shutdown_signal = set_shutdown()?;

    // Create the server.
    axum::Server::bind(&app.listen_address)
        .serve(router.into_make_service())
        .with_graceful_shutdown(shutdown_signal)
        .await?;

    Ok(())
}

async fn post_twitter_post_link(
    State(mut state): State<Server>,
    request: Result<Json<PostTwitterPostLinkParam>, JsonRejection>,
) -> Result<(), ServerError> {
    let Json(param) = request?;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    let signer = check_signature(&mut state, &param).await?;

    // Check that:
    // - the account creation has not expired.
    // - the account exists in the database.
    let StoredAccountData {
        pending_approval,
        zk_proof_valid,
        claimed,
        ..
    } = check_account_eligible(&state, signer).await?;

    let new_pending_approval = update_pending_approval(pending_approval, zk_proof_valid, claimed);

    let db = state.db_pool.get().await?;

    db.set_twitter_post_link(
        param.signing_data.message.twitter_post_link,
        signer,
        new_pending_approval,
        CURRENT_TWITTER_POST_LINK_VERIFICATION_VERSION,
    )
    .await?;

    Ok(())
}

/// Check that the zk proof is valid by checking that:
/// - the credential statuses are active.
/// - the cryptographic proofs are valid.
/// - exactly one credential statement is present in the proof.
/// - the expected zk statements have been proven.
/// - the proof has been generated for the correct network.
async fn check_zk_proof(
    state: &mut Server,
    param: PostZKProofParam,
) -> Result<ZKProofExtractedData, ServerError> {
    let presentation = param.presentation;
    let challenge_block_height = param.block_height;

    let public_data = get_public_data(
        &mut state.node_client,
        state.network,
        &presentation,
        BlockIdentifier::LastFinal,
    )
    .await?;

    // TODO check if this check is needed since we don't use `web3id` verifiable credentials.
    // Check that all credentials are active at the time of the query.
    if !public_data
        .iter()
        .all(|credential| matches!(credential.status, CredentialStatus::Active))
    {
        return Err(ServerError::InactiveCredentials);
    }

    // Verify the cryptographic proofs.
    let request = presentation.verify(
        &state.cryptographic_param,
        public_data.iter().map(|credential| &credential.inputs),
    )?;

    let num_credential_statements = request.credential_statements.len();

    // We support regular accounts with exactly one credential at index 0.
    if num_credential_statements != 1 {
        return Err(ServerError::WrongLength(
            "credential_statements".to_string(),
            1,
            num_credential_statements,
        ));
    }

    // We support regular accounts with exactly one credential at index 0.
    let account_statement = request.credential_statements[0].clone();

    // Check the ZK proof has been generated as expected.
    match account_statement {
        Account {
            network,
            cred_id: _,
            statement,
        } => {
            // Check that the expected ZK statement has been proven.
            if statement != state.zk_statements.statements {
                return Err(ServerError::WrongStatement);
            }

            // Check that the proof has been generated for the correct network.
            if network != state.network {
                return Err(ServerError::WrongNetwork(network, state.network));
            }
        }
        Web3Id { .. } => return Err(ServerError::AccountStatement),
    }

    // We support regular accounts with exactly one credential at index 0.
    let credential_proof = &presentation.verifiable_credential[0];

    // Get the revealed `national_id`, `nationality` and `account_address` from the credential proof.
    let (national_id, nationality, prover) = match credential_proof {
        CredentialProof::Account {
            proofs,
            network: _,
            cred_id,
            ..
        } => {
            // Get revealed `national_id` from proof.
            let index_0 = 0;
            let national_id = match &proofs[index_0].1 {
                concordium_rust_sdk::id::id_proof_types::AtomicProof::RevealAttribute {
                    attribute,
                    ..
                } => attribute.to_string(),
                _ => return Err(ServerError::RevealAttribute(index_0)),
            };

            // Get revealed `nationality` from proof.
            let index_1 = 1;
            let nationality = match &proofs[index_1].1 {
                concordium_rust_sdk::id::id_proof_types::AtomicProof::RevealAttribute {
                    attribute,
                    ..
                } => attribute.to_string(),
                _ => return Err(ServerError::RevealAttribute(index_1)),
            };

            // Get the `prover` which is the `account_address` that created the proof.
            let account_info = state
                .node_client
                .get_account_info(
                    &AccountIdentifier::CredId(*cred_id),
                    BlockIdentifier::LastFinal,
                )
                .await
                .map_err(ServerError::QueryError)?
                .response;
            let prover = account_info.account_address;

            (national_id, nationality, prover)
        }
        _ => return Err(ServerError::AccountStatement),
    };

    // Check if the proof is not expired by checking if a recent block hash was used as challenge.
    let block_info = state
        .node_client
        .get_block_info(challenge_block_height)
        .await
        .map_err(ServerError::QueryError)?;

    if *block_info.block_hash != *presentation.presentation_context {
        return Err(ServerError::BlockProofDataInvalid);
    }

    let current_block_height = state
        .node_client
        .get_consensus_info()
        .await?
        .best_block_height;

    let lower_bound = current_block_height.height - SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS;

    if challenge_block_height.height < lower_bound {
        return Err(ServerError::ProofExpired(lower_bound));
    }

    Ok(ZKProofExtractedData {
        national_id,
        nationality,
        prover,
    })
}

async fn post_zk_proof(
    State(mut state): State<Server>,
    request: Result<Json<PostZKProofParam>, JsonRejection>,
) -> Result<(), ServerError> {
    let Json(param) = request?;

    // Check that:
    // - the credential statuses are active.
    // - the cryptographic proofs are valid.
    // - exactly one credential statement is present in the proof.
    // - the expected zk statements have been proven.
    // - the proof has been generated for the correct network.
    // Return the extracted `national_id`, `nationality` and
    // `account_address` associated to the proof.
    let ZKProofExtractedData {
        national_id,
        nationality,
        prover,
    } = check_zk_proof(&mut state, param).await?;

    // Check that:
    // - the account creation has not expired.
    // - the account exists in the database.
    let StoredAccountData {
        pending_approval,
        twitter_post_link_valid,
        claimed,
        ..
    } = check_account_eligible(&state, prover).await?;

    let new_pending_approval =
        update_pending_approval(pending_approval, twitter_post_link_valid, claimed);

    let db = state.db_pool.get().await?;
    db.set_zk_proof(
        national_id,
        nationality,
        prover,
        new_pending_approval,
        CURRENT_ZK_PROOF_VERIFICATION_VERSION,
    )
    .await?;

    Ok(())
}

async fn set_claimed(
    State(mut state): State<Server>,
    request: Result<Json<SetClaimedParam>, JsonRejection>,
) -> Result<(), ServerError> {
    let Json(param) = request?;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    let signer = check_signature(&mut state, &param).await?;

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(&signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    let db = state.db_pool.get().await?;
    db.set_claimed(param.signing_data.message.account_addresses)
        .await?;

    Ok(())
}

/// Check that the signer account has signed the message by checking that:
/// - the signature is valid.
/// - the signature is not expired.
async fn check_signature<T>(state: &mut Server, param: &T) -> Result<AccountAddress, ServerError>
where
    T: HasSigningData + serde::Serialize,
    <T as HasSigningData>::Message: serde::Serialize,
{
    let SigningData {
        signer,
        message,
        signature,
        block,
    } = param.signing_data();

    let signer_account_info = state
        .node_client
        .get_account_info(
            &AccountIdentifier::Address(*signer),
            BlockIdentifier::LastFinal,
        )
        .await
        .map_err(ServerError::QueryError)?;

    // This backend checks that the signer account has signed the "block_hash" and "block_number"
    // of a block that is not older than 10 blocks from the most recent block.
    // Signing the "block_hash" ensures that the signature expires after 10 blocks.
    // The "block_number" is signed to enable the backend to look up the "block_hash" easily.

    // This verification relies on the front-end (via the wallet) and back-end being connected to reliably nodes
    // that are caught up to the top of the chain. In particular, the backend server should only be run in conjunction with
    // a reliable node connection, otherwise the verification of expired signatures/proofs are not correct.

    // Front-end to back-end flow:
    // The front-end should look up the most recent block and sign
    // a previous block (such as the 5th previous block). This
    // gives the backend a window of 5 blocks to be delayed vs. the node connection at the front-end until
    // the signature has expired.

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    let mut msg_prepend = [0; 117];
    //Prepend the `account` address of the signer.
    msg_prepend[0..32].copy_from_slice(signer.as_ref());
    // Prepend 8 zero bytes.
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    // Prepend the `block_hash` of the block when the message was signed.
    msg_prepend[40..72].copy_from_slice(&block.hash);
    // Prepend the message with a context string.
    // The string "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP" in bytes is:
    // [67, 79, 78, 67, 79, 82, 68, 73, 85, 77, 95, 67, 79, 77, 80, 76, 73, 65, 78, 84, 95, 82, 69, 87, 65, 82, 68, 95, 68, 73, 83, 84, 82, 73, 66, 85, 84, 73, 79, 78, 95, 68, 65, 80, 80]
    msg_prepend[72..117]
        .copy_from_slice("CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP".as_bytes());

    // Calculate the message hash.

    let message_bytes = bincode::serialize(&message)?;
    let message_hash = sha2::Sha256::digest([&msg_prepend[0..117], &message_bytes].concat());

    // We use/support regular accounts.
    // Regular accounts have only one public-private key pair at index 0 in the credential map.
    let signer_account_credential =
        &signer_account_info.response.account_credentials[&CredentialIndex::from(0)].value;

    // We use/support regular accounts.
    // Regular accounts have only one public-private key pair at index 0 in the key map.
    let signer_public_key = match signer_account_credential {
        // TODO: usually not allowed
        AccountCredentialWithoutProofs::Initial { .. } => {
            return Err(ServerError::NotInitialAccountCredential)
        }
        AccountCredentialWithoutProofs::Normal { cdv, .. } => &cdv.cred_key_info.keys[&KeyIndex(0)],
    };

    let is_valid = signer_public_key.verify(message_hash, signature);

    // Check validity of the signature.
    if !is_valid {
        return Err(ServerError::InvalidSignature);
    }

    // Check if the signature is not expired by checking if a recent block hash was signed.
    let block_info = state
        .node_client
        .get_block_info(block.height)
        .await
        .map_err(ServerError::QueryError)?;

    if block_info.block_hash != block.hash {
        return Err(ServerError::BlockSigningDataInvalid);
    }

    let current_block_height = state
        .node_client
        .get_consensus_info()
        .await?
        .best_block_height;

    let lower_bound = current_block_height.height - SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS;

    if block.height.height < lower_bound {
        return Err(ServerError::SignatureExpired(lower_bound));
    }

    Ok(*signer)
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn get_account_data(
    State(mut state): State<Server>,
    request: Result<Json<GetAccountDataParam>, JsonRejection>,
) -> Result<Json<AccountDataReturn>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let lookup_account_address = param.signing_data.message.account_address;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    let signer = check_signature(&mut state, &param).await?;

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(&signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    let mut database_result = db.get_account_data(lookup_account_address).await?;

    if let Some(data) = database_result {
        database_result = Some(check_for_changed_verification_logic(data)?);
    }

    Ok(Json(AccountDataReturn {
        data: database_result,
    }))
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
///
///
/// Currently, it is expected that only a few "approvals" have to be retrieved
/// by an admin such that one signature check should be sufficient.
/// If several requests are needed, some session handling (e.g. JWT) should be implemented to avoid
/// having to sign each request.
async fn get_pending_approvals(
    State(mut state): State<Server>,
    request: Result<Json<GetPendingApprovalsParam>, JsonRejection>,
) -> Result<Json<VecAccountDataReturn>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let limit = param.signing_data.message.limit;
    let offset = param.signing_data.message.offset;

    if limit > MAX_REQUEST_LIMIT {
        return Err(ServerError::MaxRequestLimit(MAX_REQUEST_LIMIT));
    }

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    let signer = check_signature(&mut state, &param).await?;

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(&signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    let mut database_result = db.get_pending_approvals(limit, offset).await?;

    database_result = database_result
        .iter()
        .map(|sad| check_for_changed_verification_logic(sad.clone()))
        .collect::<Result<Vec<_>, _>>()?;

    Ok(Json(VecAccountDataReturn {
        data: database_result,
    }))
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn can_claim(
    State(state): State<Server>,
    request: Result<Json<CanClaimParam>, JsonRejection>,
) -> Result<Json<bool>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let can_claim = db.can_claim(param.account_address).await?;

    Ok(Json(can_claim))
}

/// Handles the `health` endpoint, returning the version of the backend.
async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
    })
}

/// Handles the `health` endpoint, returning the version of the backend.
async fn get_zk_proof_statements(State(state): State<Server>) -> Json<ZKProofStatementsReturn> {
    Json(ZKProofStatementsReturn {
        data: state.zk_statements,
    })
}

/// Construct a future for shutdown signals (for unix: SIGINT and SIGTERM) (for
/// windows: ctrl c and ctrl break). The signal handler is set when the future
/// is polled and until then the default signal handler.
fn set_shutdown() -> anyhow::Result<impl futures::Future<Output = ()>> {
    use futures::FutureExt;

    #[cfg(unix)]
    {
        use tokio::signal::unix as unix_signal;

        let mut terminate_stream = unix_signal::signal(unix_signal::SignalKind::terminate())?;
        let mut interrupt_stream = unix_signal::signal(unix_signal::SignalKind::interrupt())?;

        Ok(async move {
            futures::future::select(
                Box::pin(terminate_stream.recv()),
                Box::pin(interrupt_stream.recv()),
            )
            .map(|_| ())
            .await
        })
    }

    #[cfg(windows)]
    {
        use tokio::signal::windows as windows_signal;

        let mut ctrl_break_stream = windows_signal::ctrl_break()?;
        let mut ctrl_c_stream = windows_signal::ctrl_c()?;

        Ok(async move {
            futures::future::select(
                Box::pin(ctrl_break_stream.recv()),
                Box::pin(ctrl_c_stream.recv()),
            )
            .map(|_| ())
            .await
        })
    }
}

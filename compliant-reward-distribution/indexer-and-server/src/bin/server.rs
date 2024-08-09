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
    base::hashes::IncorrectLength,
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
        get_public_data, Challenge, CredentialLookupError, CredentialProof,
        CredentialStatement::{Account, Web3Id},
        PresentationVerificationError, Web3IdAttribute,
    },
};
use http::StatusCode;
use indexer::{
    db::StoredAccountData,
    types::{
        AccountDataReturn, CanClaimParam, CanClaimReturn, ClaimExpiryDurationDays,
        GetAccountDataParam, GetPendingApprovalsParam, HasSigningData, Health, PostTweetParam,
        PostZKProofParam, SetClaimedParam, SigningData, UserData, VecAccountDataReturn,
        ZKProofExtractedData, ZKProofStatementsReturn,
    },
};
use sha2::Digest;

/// The maximum number of rows allowed in a request to the database.
const MAX_REQUEST_LIMIT: u32 = 40;

/// The testnet genesis block hash.
const TESTNET_GENESIS_BLOCK_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

/// The string "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP" in bytes is used as context for
/// signing messages and generating ZK proofs. The same account can be used in different Concordium services
/// without the risk of re-playing signatures/zk-proofs across the different services due to this context string.
const CONTEXT_STRING: [u8; 45] = [
    67, 79, 78, 67, 79, 82, 68, 73, 85, 77, 95, 67, 79, 77, 80, 76, 73, 65, 78, 84, 95, 82, 69, 87,
    65, 82, 68, 95, 68, 73, 83, 84, 82, 73, 66, 85, 84, 73, 79, 78, 95, 68, 65, 80, 80,
];

/// The number of blocks after that a generated signature or ZK proof is considered expired.
const SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS: u64 = 200;

/// Current version of the verification logic used when submitting a ZK proof.
/// Update this version if you want to introduce a new ZK proof-verification logic.
const CURRENT_ZK_PROOF_VERIFICATION_VERSION: u16 = 1;
/// Current version of the verification logic used when submitting a tweet.
/// Update this version if you want to introduce a new tweet verification logic.
const CURRENT_TWEET_VERIFICATION_VERSION: u16 = 1;
/// All versions that should be considered valid for the ZK proof verification when querrying data from the database.
const VALID_ZK_PROOF_VERIFICATION_VERSIONS: [u16; 1] = [1];
/// All versions that should be considered valid for the tweet verification when querrying data from the database.
const VALID_TWEET_VERIFICATION_VERSIONS: [u16; 1] = [1];

/// 1. Proof: Reveal attribute proof ("nationalIdNo" attribute).
/// 2. Proof: Reveal attribute proof ("nationality" attribute).
/// 3. Proof: Range proof ("dob=dateOfBirth" attribute). User is older than 18 years.
/// 4. Proof: Not set membership proof ("countryOfResidence" attribute). User is not from the USA or North Korea.
/// Countries are represented by 2 letters (ISO 3166-1 alpha-2).
const ZK_STATEMENTS: &str = r#"[
    {
        "type": "RevealAttribute",
        "attributeTag": "nationalIdNo"
    },
    {
        "type": "RevealAttribute",
        "attributeTag": "nationality"
    },
    {
        "type": "AttributeInRange",
        "attributeTag": "dob",
        "lower": "18000101",
        "upper": "20060802"
    },
    {
        "type": "AttributeNotInSet",
        "attributeTag": "countryOfResidence",
        "set": [
            "US", "KP"
        ]
    }
]"#;

/// Errors that this server can produce.
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] DatabaseError),
    #[error("Failed to extract json object: {0}")]
    JsonRejection(#[from] JsonRejection),
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
        "The account was not captured by the indexer and is not in the database. \
        Only accounts earlier than block height {0} are captured."
    )]
    AccountNotExist(AbsoluteBlockHeight),
    #[error("Claim already expired. Your account creation has to be not older than {0}.")]
    ClaimExpired(ClaimExpiryDurationDays),
    #[error("Converting message to bytes caused an error: {0}")]
    MessageConversion(#[from] bincode::Error),
    #[error("The block hash and block height in the signing data are not from the same block.")]
    BlockSigningDataInvalid,
    #[error("The block hash used as challenge and block height passed as parameter are not from the same block.")]
    BlockProofDataInvalid,
    #[error("Signature already expired. Your block hash signed has to be not older than the block hash from block {0}.")]
    SignatureExpired(u64),
    #[error("Proof already expired. Your block hash included as challenge in the proof has to be not older than the block hash from block {0}.")]
    ProofExpired(u64),
    #[error("Failed to convert type `{0}`: {1}")]
    TypeConversion(String, IncorrectLength),
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
            ServerError::JsonRejection(_)
            | ServerError::MaxRequestLimit(_)
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
            | ServerError::BlockSigningDataInvalid
            | ServerError::BlockProofDataInvalid
            | ServerError::SignatureExpired(_)
            | ServerError::ProofExpired(_)
            | ServerError::TypeConversion(..) => {
                let error_message = format!("Bad request: {self}");
                tracing::info!(error_message);
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
    #[arg(
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
    #[arg(
        long = "log-level",
        short = 'l',
        default_value = "info",
        env = "CCD_SERVER_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
    /// The endpoint is expected to point to concordium node grpc v2 API's.
    #[arg(
        long = "node",
        short = 'n',
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "CCD_SERVER_NODE"
    )]
    node_endpoint: concordium_rust_sdk::v2::Endpoint,
    /// The admin accounts that are allowed to read the database and set the `claimed`
    /// flag in the database after having manually transferred the funds to an account.
    #[arg(
        long = "admin_accounts",
        short = 'c',
        env = "CCD_SERVER_ADMIN_ACCOUNTS"
    )]
    admin_accounts: Vec<AccountAddress>,
    /// The duration after creating a new account during which the account is eligible to claim the reward.
    #[arg(
        long = "claim_expiry_duration_days",
        short = 'e',
        env = "CCD_SERVER_CLAIM_EXPIRY_DURATION_DAYS",
        default_value = "60"
    )]
    claim_expiry_duration_days: ClaimExpiryDurationDays,
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
    let db_pool = DatabasePool::create(app.db_connection, 1, true)
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
    let mut node_client = Client::new(endpoint).await?;
    let consensus_info = node_client.get_consensus_info().await?;
    let genesis_hash = consensus_info.genesis_block.bytes;

    let network = if genesis_hash == TESTNET_GENESIS_BLOCK_HASH {
        Network::Testnet
    } else {
        Network::Mainnet
    };

    let cryptographic_params = node_client
        .get_cryptographic_parameters(BlockIdentifier::LastFinal)
        .await
        .context("Unable to get cryptographic parameters.")?
        .response;

    let zk_statements: Statement<ArCurve, Web3IdAttribute> = serde_json::from_str(ZK_STATEMENTS)?;

    let state = Server {
        db_pool,
        node_client,
        network,
        cryptographic_params,
        admin_accounts: app.admin_accounts,
        zk_statements,
        claim_expiry_duration_days: app.claim_expiry_duration_days,
    };

    tracing::info!("Starting server...");

    let router = Router::new()
        .route("/api/postTweet", post(post_tweet))
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

/// When querrying data from the database, correct the `zk_proof_valid`, `tweet_valid`
/// and `pending_approval` values, if they have become invalid due to the verification process has changed.
/// This can happen if the verification logic during the submission by the user has been different than now.
/// Also sets the `pending_approval` flag to false if the account has already been claimed.
pub fn check_for_changed_verification_logic(
    mut sad: StoredAccountData,
) -> Result<StoredAccountData, ServerError> {
    // Check if the ZK proof verification version is still valid.
    let is_still_valid = sad
        .zk_proof_verification_version
        .map(|version| VALID_ZK_PROOF_VERIFICATION_VERSIONS.contains(&(version as u16)));
    if !(is_still_valid.unwrap_or(false)) {
        // If not valid, correct the flags.
        sad.zk_proof_valid = Some(false);
        sad.pending_approval = false;
    }

    // Check if the tweet verification version is still valid.
    let is_still_valid = sad
        .tweet_verification_version
        .map(|version| VALID_TWEET_VERIFICATION_VERSIONS.contains(&(version as u16)));
    if !(is_still_valid.unwrap_or(false)) {
        // If not valid, correct the flags.
        sad.tweet_valid = Some(false);
        sad.pending_approval = false;
    }

    // Check if already `claimed`.
    if sad.claimed {
        sad.pending_approval = false;
    }

    Ok(sad)
}

/// Check that the account is eligible for claiming the reward by checking that:
/// - the account exists in the database.
/// - the account creation has not expired.
/// Returns the account data stored in the database.
pub async fn check_account_eligible(
    state: &Server,
    account: AccountAddress,
) -> Result<StoredAccountData, ServerError> {
    let db = state.db_pool.get().await?;

    let Some(database_result) = db.get_account_data(account).await? else {
        // Return an error if the account does not exist in the database.
        // The account has to be created at a time when the indexer was running.
        let start_block_height = db.get_settings().await?.start_block_height;
        return Err(ServerError::AccountNotExist(start_block_height));
    };

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

/// Check that the zk proof is valid by checking that:
/// - the credential statuses are active.
/// - the cryptographic proofs are valid.
/// - exactly one credential statement is present in the proof.
/// - the expected zk statements have been proven.
/// - the proof has been generated for the correct network.
/// - the proof is not expired.
/// The function returns the revealed `national_id`, `nationality` and `prover` associated with the proof.
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
        &state.cryptographic_params,
        public_data.iter().map(|credential| &credential.inputs),
    )?;

    // We support regular accounts with exactly one credential at index 0.
    if request.credential_statements.len() != 1 {
        return Err(ServerError::WrongLength {
            actual_string: "credential_statements".to_string(),
            expected_length: 1,
        });
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
                return Err(ServerError::WrongNetwork {
                    expected: state.network,
                    actual: network,
                });
            }
        }
        Web3Id { .. } => return Err(ServerError::AccountStatement),
    }

    // Check if the proof is not expired by checking if a recent block hash was used as the challenge (presentation_context).
    let block_info = state
        .node_client
        .get_block_info(challenge_block_height)
        .await
        .map_err(ServerError::QueryError)?;

    let challenge_hash = sha2::Sha256::digest(
        [
            block_info.block_hash.as_ref(),
            &CONTEXT_STRING,
            &[state.network as u8],
        ]
        .concat(),
    );
    let challenge = Challenge::try_from(challenge_hash.as_slice())
        .map_err(|e| ServerError::TypeConversion("challenge".to_string(), e))?;

    if presentation.presentation_context != challenge {
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

    Ok(ZKProofExtractedData {
        national_id,
        nationality,
        prover,
    })
}

/// Check that the signer account has signed the message by checking that:
/// - the signature is valid.
/// - the signature is not expired.
/// The function returns the `signer`.
async fn check_signature<T>(state: &mut Server, param: &T) -> Result<AccountAddress, ServerError>
where
    T: HasSigningData,
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

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    // In addition, we prepend the recent `block_hash` (this ensures that the signature is generated on the spot
    // and the signature expires after SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS),
    // a context string (this ensures that an account can be re-used for signing in different contexts),
    // and the network (this ensures that the signature is only valid for the network it was generated for).
    let mut msg_prepend = [0; 40];
    //Prepend the `account` address of the signer.
    msg_prepend[0..32].copy_from_slice(signer.as_ref());
    // Prepend 8 zero bytes.
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    // Add the prepend to the message and calculate the message hash.
    let message_bytes = bincode::serialize(&message)?;
    let message_hash = sha2::Sha256::digest(
        [
            &msg_prepend[0..40],
            &block.hash,
            &CONTEXT_STRING,
            &[state.network as u8],
            &message_bytes,
        ]
        .concat(),
    );

    // Get the public key of the signer.

    // The intention is to only use/support regular accounts (no multi-sig accounts).
    // While it works for some (but not all) multi-sig accounts, to reduce complexity we will
    // communicate that multi-sig accounts are not supported.
    // Regular accounts have only one public-private key pair at index 0 in the credential map.
    let signer_account_credential =
        &signer_account_info.response.account_credentials[&CredentialIndex::from(0)].value;

    // We use/support regular accounts. Regular accounts have only one public-private key pair at index 0 in the key map.
    let signer_public_key = match signer_account_credential {
        AccountCredentialWithoutProofs::Initial { icdv } => &icdv.cred_account.keys[&KeyIndex(0)],
        AccountCredentialWithoutProofs::Normal { cdv, .. } => &cdv.cred_key_info.keys[&KeyIndex(0)],
    };

    // Verify the signature.
    let is_valid = signer_public_key.verify(message_hash, signature);
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

// All the endpoints:

async fn post_tweet(
    State(mut state): State<Server>,
    request: Result<Json<PostTweetParam>, JsonRejection>,
) -> Result<(), ServerError> {
    let Json(param) = request?;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    let signer = check_signature(&mut state, &param).await?;

    // Check that:
    // - the account exists in the database.
    // - the account creation has not expired.
    let StoredAccountData {
        zk_proof_valid,
        claimed,
        ..
    } = check_account_eligible(&state, signer).await?;

    // Calculate the `new_pending_approval` flag`.
    let new_pending_approval = zk_proof_valid.unwrap_or_default() && !claimed;

    // Update the database.
    let db = state.db_pool.get().await?;
    db.set_tweet(
        param.signing_data.message.tweet,
        signer,
        new_pending_approval,
        CURRENT_TWEET_VERIFICATION_VERSION,
    )
    .await?;

    Ok(())
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
    // - the proof is not expired.
    // Return the extracted `national_id`, `nationality` and `prover` associated with the proof.
    let ZKProofExtractedData {
        national_id,
        nationality,
        prover,
    } = check_zk_proof(&mut state, param).await?;

    // Check that:
    // - the account exists in the database.
    // - the account creation has not expired.
    let StoredAccountData {
        tweet_valid,
        claimed,
        ..
    } = check_account_eligible(&state, prover).await?;

    // Calculate the `new_pending_approval` flag`.
    let new_pending_approval = tweet_valid.unwrap_or_default() && !claimed;

    // Update the database.
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

    // Update the database.
    let db = state.db_pool.get().await?;
    db.set_claimed(param.signing_data.message.account_addresses)
        .await?;

    Ok(())
}

async fn get_account_data(
    State(mut state): State<Server>,
    request: Result<Json<GetAccountDataParam>, JsonRejection>,
) -> Result<Json<AccountDataReturn>, ServerError> {
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

    let db = state.db_pool.get().await?;
    let mut database_result = db.get_account_data(lookup_account_address).await?;

    // Check that the verification versions are still valid.
    if let Some(data) = database_result {
        database_result = check_for_changed_verification_logic(data).map(Some)?;
    }

    Ok(Json(AccountDataReturn {
        data: database_result,
    }))
}

/// Currently, it is expected that only a few "approvals" have to be retrieved
/// by an admin such that one signature check should be sufficient.
/// If several requests are needed, some session handling (e.g. JWT) should be implemented to avoid
/// having to sign each request.
async fn get_pending_approvals(
    State(mut state): State<Server>,
    request: Result<Json<GetPendingApprovalsParam>, JsonRejection>,
) -> Result<Json<VecAccountDataReturn>, ServerError> {
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

    let db = state.db_pool.get().await?;
    let mut database_result = db.get_pending_approvals(limit, offset).await?;

    // Check that the verification versions are still valid.
    database_result = database_result
        .into_iter()
        .map(check_for_changed_verification_logic)
        .collect::<Result<Vec<_>, _>>()?;

    Ok(Json(VecAccountDataReturn {
        data: database_result,
    }))
}

async fn can_claim(
    State(state): State<Server>,
    request: Result<Json<CanClaimParam>, JsonRejection>,
) -> Result<Json<Option<CanClaimReturn>>, ServerError> {
    let Json(param) = request?;

    let db = state.db_pool.get().await?;
    let database_result = db.get_account_data(param.account_address).await?;

    Ok(Json(
        database_result
            // Check that the verification versions are still valid.
            .map(check_for_changed_verification_logic)
            .transpose()?
            .map(|user_data| {
                let claimed = user_data.claimed;
                let tweet_valid = user_data.tweet_valid.unwrap_or(false);
                let zk_proof_valid = user_data.zk_proof_valid.unwrap_or(false);

                CanClaimReturn {
                    data: UserData {
                        claimed,
                        tweet_valid,
                        zk_proof_valid,
                    },
                }
            }),
    ))
}

/// Handle the `health` endpoint, returning the version of the backend.
async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
    })
}

/// Handle the `getZKProofStatements` endpoint, returning the ZK statements that should be used at the front end to construct the proof.
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

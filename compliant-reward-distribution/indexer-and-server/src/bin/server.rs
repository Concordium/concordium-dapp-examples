use ::indexer::{db::DatabasePool, types::Server};
use anyhow::Context;
use axum::{
    extract::State,
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use clap::Parser;
use concordium_rust_sdk::smart_contracts::common::to_bytes;
use concordium_rust_sdk::{
    id::{
        constants::ArCurve,
        id_proof_types::Statement,
        types::{AccountAddress, AccountCredentialWithoutProofs},
    },
    v2::{AccountIdentifier, BlockIdentifier, Client},
    web3id::{
        did::Network,
        get_public_data, Challenge, CredentialProof,
        CredentialStatement::{Account, Web3Id},
        Web3IdAttribute,
    },
};
use indexer::{
    constants::{
        CONTEXT_STRING, CONTEXT_STRING_2, CURRENT_TWEET_VERIFICATION_VERSION,
        CURRENT_ZK_PROOF_VERIFICATION_VERSION, MAX_REQUEST_LIMIT,
        SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS, TESTNET_GENESIS_BLOCK_HASH, ZK_STATEMENTS,
    },
    db::{AccountData, Database, StoredAccountData},
    error::ServerError,
    types::{
        CanClaimParam, CanClaimReturn, ClaimExpiryDurationDays, GetAccountDataParam,
        GetPendingApprovalsParam, HasSigningData, Health, MessageSigned, PostTweetParam,
        PostZKProofParam, SetClaimedParam, SigningData, UserData, VecAccountDataReturn,
        ZKProofExtractedData, ZKProofStatementsReturn,
    },
};
use sha2::Digest;

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
    // Note: In production, you should use the environment variable and not pass
    // the database connection containing a password via a command-line argument
    // since the value could be read by other processes.
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
            .context("Unable to construct TLS configuration for the Concordium API")?
    } else {
        app.node_endpoint
    }
    .connect_timeout(std::time::Duration::from_secs(5))
    .timeout(std::time::Duration::from_secs(10));

    // Establish connection to the blockchain node.
    let mut node_client = Client::new(endpoint)
        .await
        .context("Unable to construct the node client")?;
    let consensus_info = node_client
        .get_consensus_info()
        .await
        .context("Unable to query the consesnsus info from the chain")?;
    let genesis_hash = consensus_info.genesis_block.bytes;

    let network = if genesis_hash == TESTNET_GENESIS_BLOCK_HASH {
        Network::Testnet
    } else {
        Network::Mainnet
    };

    let cryptographic_params = node_client
        .get_cryptographic_parameters(BlockIdentifier::LastFinal)
        .await
        .context("Unable to get cryptographic parameters")?
        .response;

    let zk_statements: Statement<ArCurve, Web3IdAttribute> =
        serde_json::from_str(ZK_STATEMENTS).context("Unable to construct the ZK statements")?;

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

    let shutdown_signal = set_shutdown().context("Unable to construct shutdown signal")?;

    // Create the server.
    axum::Server::bind(&app.listen_address)
        .serve(router.into_make_service())
        .with_graceful_shutdown(shutdown_signal)
        .await
        .context("Unable to create server")?;

    Ok(())
}

/// Check that the account is eligible for claiming the reward by checking that:
/// - the account exists in the database.
/// - the account creation has not expired.
/// Returns the account data stored in the database.
pub async fn check_account_eligible(
    db: &Database,
    state: &Server,
    account: AccountAddress,
) -> Result<AccountData, ServerError> {
    let Some(database_result) = db.get_account_data(account).await? else {
        // Return an error if the account does not exist in the database.
        // The account has to be created at a time when the indexer was running.
        let start_block_height = db.get_settings().await?.start_block_height;
        return Err(ServerError::AccountNotExist(start_block_height));
    };

    // Check if the claim for the reward for this account has already expired.
    // After creating a new account, the account is eligible to claim the reward for
    // a certain duration.
    let expiry_date_time = Utc::now()
        .checked_sub_days(state.claim_expiry_duration_days.0)
        .ok_or(ServerError::UnderFlow)?;
    if database_result.block_time < expiry_date_time {
        return Err(ServerError::ClaimExpired(state.claim_expiry_duration_days));
    }

    Ok(database_result)
}

/// Check that the zk proof is valid by checking that:
/// - the cryptographic proofs are valid.
/// - exactly one credential statement is present in the proof (no multi-sig support).
/// - the expected zk statements have been proven.
/// - the proof has been generated for the correct network.
/// - the proof is not expired.
/// - the proof was intended for this service.
/// - the proof is not from an `Initial` account (these accounts have no Pedersen commitment on chain).
/// The function returns the revealed `national_id`, `nationality` and `prover`
/// associated with the proof.
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

    // Verify the cryptographic proofs.
    let request = presentation.verify(
        &state.cryptographic_params,
        public_data.iter().map(|credential| &credential.inputs),
    )?;

    // We support regular accounts with exactly one credential at index 0.
    if request.credential_statements.len() != 1 {
        return Err(ServerError::OnlyRegularAccounts);
    }

    // We support regular accounts with exactly one credential at index 0.
    let account_statement = &request.credential_statements[0];

    // Check the ZK proof has been generated as expected.
    match account_statement {
        Account {
            network, statement, ..
        } => {
            // Check that the expected ZK statement has been proven.
            if *statement != state.zk_statements.statements {
                return Err(ServerError::WrongStatement);
            }

            // Check that the proof has been generated for the correct network.
            if *network != state.network {
                return Err(ServerError::WrongNetwork {
                    expected: state.network,
                    actual: *network,
                });
            }
        }
        Web3Id { .. } => return Err(ServerError::AccountStatement),
    }

    // Check if the proof is not expired by checking if a recent block hash was
    // included in the challenge (also called presentation_context).
    let block_hash = state
        .node_client
        .get_block_info(challenge_block_height)
        .await
        .map_err(ServerError::QueryError)?
        .block_hash;

    // The presentation context (also called challenge) includes the `block_hash`
    // and a `CONTEXT_STRING`. The `block_hash` ensures that the proof is
    // generated on the spot and the proof expires after
    // SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS. The `CONTEXT_STRING` ensures
    // that the proof is generated for this specific service. These checks are
    // done similarly in the `signature` verification flow in this service.
    let challenge_hash = sha2::Sha256::digest([block_hash.as_ref(), &CONTEXT_STRING].concat());
    let challenge = Challenge::try_from(challenge_hash.as_slice())
        .map_err(|e| ServerError::TypeConversion("challenge".to_string(), e))?;

    if presentation.presentation_context != challenge {
        return Err(ServerError::ChallengeInvalid);
    }

    let current_block_height = state
        .node_client
        .get_consensus_info()
        .await?
        .best_block_height;

    let lower_bound = current_block_height.height - SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS;

    // Check that the ZK proof is not expired.
    if challenge_block_height.height < lower_bound {
        return Err(ServerError::ProofExpired(lower_bound));
    }

    // We support regular accounts with exactly one credential at index 0.
    // Accessing the index at position `0` is safe because the
    // `request.credential_statements.len()` has length 1 which was checked
    // above which means that one `verifiable_credential` exists.
    let credential_proof = &presentation.verifiable_credential[0];

    // Get the revealed `national_id`, the revealed `nationality` and the `cred_id` from the
    // credential proof.
    let (national_id, nationality, cred_id) = match credential_proof {
        CredentialProof::Account {
            proofs, cred_id, ..
        } => {
            // Get the revealed `national_id` from the proof.
            // Accessing the index at position `0` is safe because we checked that
            // `state.zk_statements.statements` were proven, which means we know
            // that the first proof is a revealed `national_id` attribute proof.
            let index_0 = 0;
            let national_id = match &proofs[index_0].1 {
                concordium_rust_sdk::id::id_proof_types::AtomicProof::RevealAttribute {
                    attribute,
                    ..
                } => attribute.to_string(),
                _ => return Err(ServerError::RevealAttribute(index_0)),
            };

            // Get the revealed `nationality` from the proof.
            // Accessing the index at position `1` is safe because we checked that
            // `state.zk_statements.statements` were proven, which means we know
            // that the second proof is a revealed `nationality` attribute proof.
            let index_1 = 1;
            let nationality = match &proofs[index_1].1 {
                concordium_rust_sdk::id::id_proof_types::AtomicProof::RevealAttribute {
                    attribute,
                    ..
                } => attribute.to_string(),
                _ => return Err(ServerError::RevealAttribute(index_1)),
            };

            (national_id, nationality, cred_id)
        }
        _ => return Err(ServerError::AccountStatement),
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

    // Exclude `Initial` accounts from the proof verification.

    // This backend only supports regular accounts with exactly one credential (no multi-sig account support).
    if account_info.account_credentials.len() != 1 {
        return Err(ServerError::OnlyRegularAccounts);
    }
    let credential = account_info
        .account_credentials
        .get(&0.into())
        .ok_or(ServerError::OnlyRegularAccounts)?;
    // `Initial` accounts were created by identity providers in the past
    // without a Pedersen commitment deployed on chain. As such we should not verify proofs on them.
    if let AccountCredentialWithoutProofs::Initial { .. } = &credential.value {
        return Err(ServerError::NoCredentialCommitment);
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
/// - the signature was intended for this service.
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
        block_height,
    } = param.signing_data();

    let signer_account_info = state
        .node_client
        .get_account_info(
            &AccountIdentifier::Address(*signer),
            BlockIdentifier::LastFinal,
        )
        .await
        .map_err(ServerError::QueryError)?;

    let block_hash = state
        .node_client
        .get_block_info(block_height)
        .await
        .map_err(ServerError::QueryError)?
        .block_hash;

    // Calculate the `message` that was signed.
    // The `message` consists of the`block_hash` (this
    // ensures that the signature is generated on the spot and the signature
    // expires after SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS), a context
    // string (this ensures that an account can be re-used for signing in different
    // Concordium services), and the message.
    let message_signed_in_wallet = MessageSigned {
        block_hash: hex::encode(block_hash),
        context_string: CONTEXT_STRING_2.to_string(),
        message,
    };

    // The message signed in the Concordium wallet is prepended with the
    // `account` address (signer) and 8 zero bytes. Accounts in the Concordium
    // wallet can either sign a regular transaction (in that case the
    // prepend is `account` address and the nonce of the account which is by
    // design >= 1) or sign a message (in that case the prepend is `account`
    // address and 8 zero bytes). Hence, the 8 zero bytes ensure that the user
    // does not accidentally sign a transaction. The account nonce is of type
    // u64 (8 bytes).
    // Add the prepend to the message and calculate the final message hash.
    let final_message_hash = sha2::Sha256::digest(
        [
            &signer.as_ref() as &[u8],
            &[0u8; 8],
            to_bytes(&message_signed_in_wallet).as_slice(),
        ]
        .concat(),
    );

    // Get the public key of the signer.

    // The intention is to only use/support regular accounts (no multi-sig
    // accounts). While it works for some (but not all) multi-sig accounts, to
    // reduce complexity we will communicate that multi-sig accounts are not
    // supported. Regular accounts have only one public-private key pair at
    // index 0 in the credential map.
    if signer_account_info.response.account_credentials.len() != 1 {
        return Err(ServerError::OnlyRegularAccounts);
    }
    let signer_account_credential = signer_account_info
        .response
        .account_credentials
        .get(&0.into())
        .ok_or(ServerError::OnlyRegularAccounts)?;

    let signer_public_key = match &signer_account_credential.value {
        // `Initial` accounts were created by identity providers in the past
        // without a Pedersen commitment deployed on chain. As such we should not verify ZK proofs
        // on them so that we exclude them from this service.
        AccountCredentialWithoutProofs::Initial { .. } => {
            return Err(ServerError::NoCredentialCommitment)
        }
        // We use/support regular accounts. Regular accounts have only one
        // public-private key pair at index 0 in the key map.
        AccountCredentialWithoutProofs::Normal { cdv, .. } => {
            if cdv.cred_key_info.keys.len() != 1 {
                return Err(ServerError::OnlyRegularAccounts);
            }

            cdv.cred_key_info
                .keys
                .get(&0.into())
                .ok_or(ServerError::OnlyRegularAccounts)?
        }
    };

    // Verify the signature.
    let is_valid = signer_public_key.verify(final_message_hash, signature);
    if !is_valid {
        return Err(ServerError::InvalidSignature);
    }

    let current_block_height = state
        .node_client
        .get_consensus_info()
        .await?
        .best_block_height;

    let lower_bound = current_block_height.height - SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS;

    // Check that the signature is not expired.
    if block_height.height < lower_bound {
        return Err(ServerError::SignatureExpired(lower_bound));
    }

    Ok(*signer)
}

// All the endpoints:

async fn post_tweet(
    State(mut state): State<Server>,
    request: Json<PostTweetParam>,
) -> Result<(), ServerError> {
    let Json(param) = request;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    // - the signature was intended for this service.
    let signer = check_signature(&mut state, &param).await?;

    let db = state.db_pool.get().await?;

    // Check that:
    // - the account exists in the database.
    // - the account creation has not expired.
    let AccountData { claimed, .. } = check_account_eligible(&db, &state, signer).await?;

    // Calculate the `new_pending_approval` flag`.
    let zk_proof_valid = db
        .get_zk_proof_data(signer)
        .await?
        .map(|x| x.zk_proof_valid);
    let new_pending_approval = zk_proof_valid.unwrap_or_default() && !claimed;

    // Update the database.
    db.upsert_tweet(
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
    request: Json<PostZKProofParam>,
) -> Result<(), ServerError> {
    let Json(param) = request;

    // Check that:
    // - the cryptographic proofs are valid.
    // - exactly one credential statement is present in the proof (no multi-sig support).
    // - the expected zk statements have been proven.
    // - the proof has been generated for the correct network.
    // - the proof is not expired.
    // - the proof was intended for this service.
    // - the proof is not from an `Initial` account (these accounts have no Pedersen commitment on chain).
    // Return the extracted `national_id`, `nationality` and `prover` associated
    // with the proof.
    let ZKProofExtractedData {
        national_id,
        nationality,
        prover,
    } = check_zk_proof(&mut state, param).await?;

    let db = state.db_pool.get().await?;

    // Check that:
    // - the account exists in the database.
    // - the account creation has not expired.
    let AccountData { claimed, .. } = check_account_eligible(&db, &state, prover).await?;

    // Calculate the `new_pending_approval` flag`.
    let tweet_valid = db.get_tweet_data(prover).await?.map(|x| x.tweet_valid);
    let new_pending_approval = tweet_valid.unwrap_or_default() && !claimed;

    // Update the database.
    db.upsert_zk_proof(
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
    request: Json<SetClaimedParam>,
) -> Result<(), ServerError> {
    let Json(param) = request;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    // - the signature was intended for this service.
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
    request: Json<GetAccountDataParam>,
) -> Result<Json<StoredAccountData>, ServerError> {
    let Json(param) = request;

    let lookup_account_address = param.signing_data.message.account_address;

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    // - the signature was intended for this service.
    let signer = check_signature(&mut state, &param).await?;

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(&signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    let db = state.db_pool.get().await?;
    let account_data = db.get_account_data(lookup_account_address).await?;
    let zk_proof_data = db.get_zk_proof_data(lookup_account_address).await?;
    let tweet_data = db.get_tweet_data(lookup_account_address).await?;

    Ok(Json(StoredAccountData {
        account_data,
        tweet_data,
        zk_proof_data,
    }))
}

/// Currently, it is expected that only a few "approvals" have to be retrieved
/// by an admin such that one signature check should be sufficient.
/// If several requests are needed, some session handling (e.g. JWT) should be
/// implemented to avoid having to sign each request.
async fn get_pending_approvals(
    State(mut state): State<Server>,
    request: Json<GetPendingApprovalsParam>,
) -> Result<Json<VecAccountDataReturn>, ServerError> {
    let Json(param) = request;

    let limit = param.signing_data.message.limit;
    let offset = param.signing_data.message.offset;

    if limit > MAX_REQUEST_LIMIT {
        return Err(ServerError::MaxRequestLimit(MAX_REQUEST_LIMIT));
    }

    // Check that:
    // - the signature is valid.
    // - the signature is not expired.
    // - the signature was intended for this service.
    let signer = check_signature(&mut state, &param).await?;

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(&signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    let db = state.db_pool.get().await?;
    let database_result = db.get_pending_approvals(limit, offset).await?;

    Ok(Json(VecAccountDataReturn {
        data: database_result,
    }))
}

async fn can_claim(
    State(state): State<Server>,
    request: Json<CanClaimParam>,
) -> Result<Json<CanClaimReturn>, ServerError> {
    let Json(param) = request;

    let db = state.db_pool.get().await?;
    let account_data = db.get_account_data(param.account_address).await?;
    let zk_proof_data = db.get_zk_proof_data(param.account_address).await?;
    let tweet_data = db.get_tweet_data(param.account_address).await?;

    let user_data = UserData {
        claimed: account_data.map(|x| x.claimed).unwrap_or_default(),
        pending_approval: account_data.map(|x| x.pending_approval).unwrap_or_default(),
        zk_proof_valid: zk_proof_data.map(|x| x.zk_proof_valid).unwrap_or_default(),
        tweet_valid: tweet_data.map(|x| x.tweet_valid).unwrap_or_default(),
    };

    Ok(Json(CanClaimReturn { data: user_data }))
}

/// Handle the `health` endpoint, returning the version of the backend.
async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
    })
}

/// Handle the `getZKProofStatements` endpoint, returning the ZK statements that
/// should be used at the front end to construct the proof.
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

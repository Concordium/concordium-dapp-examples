use ::indexer::db::{DatabaseError, DatabasePool, StoredAccountData};
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    http,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use clap::Parser;
use concordium_rust_sdk::{
    common::types::{CredentialIndex, KeyIndex, Signature},
    contract_client::CredentialStatus,
    id::{
        constants::ArCurve,
        id_proof_types::Statement,
        types::{AccountAddress, AccountCredentialWithoutProofs, GlobalContext},
    },
    types::{AbsoluteBlockHeight, AccountInfo},
    v2::{AccountIdentifier, BlockIdentifier, Client, QueryError, QueryResponse},
    web3id::{
        did::Network,
        get_public_data, CredentialLookupError, CredentialProof,
        CredentialStatement::{Account, Web3Id},
        Presentation, PresentationVerificationError, Web3IdAttribute,
    },
};
use http::StatusCode;
use indexer::db::{ConversionError, Sha256};
use sha2::Digest;

/// The maximum number of rows allowed in a request to the database.
const MAX_REQUEST_LIMIT: u32 = 40;

const TESTNET_GENESIS_BLOCK_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

/// TODO: think if we want to save the statements in the database.

/// Server struct to store the db_pool.
#[derive(Clone, Debug)]
pub struct Server {
    ///
    db_pool: DatabasePool,
    ///
    node_client: Client,
    network: Network,
    cryptographic_param: GlobalContext<ArCurve>,
    admin_accounts: Vec<AccountAddress>,
    zk_statements: Statement<ArCurve, Web3IdAttribute>,
}

/// Errors that this server can produce.
#[derive(Debug, thiserror::Error)]
pub enum ServerError<'a> {
    #[error("Database error from postgres: {0}")]
    DatabaseErrorPostgres(tokio_postgres::Error),
    #[error("Database error in type `{0}` conversion: {1}")]
    DatabaseErrorTypeConversion(String, ConversionError),
    #[error("Database error in configuration: {0}")]
    DatabaseErrorConfiguration(anyhow::Error),
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
    WrongLength(&'a str, usize, usize),
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
}

/// Mapping DatabaseError to ServerError
impl<'a> From<DatabaseError> for ServerError<'a> {
    fn from(e: DatabaseError) -> Self {
        match e {
            DatabaseError::Postgres(e) => ServerError::DatabaseErrorPostgres(e),
            DatabaseError::TypeConversion(type_name, e) => {
                ServerError::DatabaseErrorTypeConversion(type_name, e)
            }
            DatabaseError::Configuration(e) => ServerError::DatabaseErrorConfiguration(e),
        }
    }
}

impl<'a> IntoResponse for ServerError<'a> {
    fn into_response(self) -> Response {
        let r = match self {
            // Internal errors.
            ServerError::DatabaseErrorPostgres(_)
            | ServerError::DatabaseErrorTypeConversion(..)
            | ServerError::QueryError(..)
            | ServerError::DatabaseErrorConfiguration(..) => {
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
            | ServerError::RevealAttribute(_) => {
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
    /// The admin accounts allowed to read the database and set the `claimed`
    /// flag in the database after having manually transferred the funds to an account.
    #[clap(
        long = "admin_accounts",
        short = 'c',
        env = "CCD_SERVER_ADMIN_ACCOUNTS"
    )]
    admin_accounts: Vec<AccountAddress>,
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

    // TODO: handle unwrap
    let zk_statements: Statement<ArCurve, Web3IdAttribute> =
        serde_json::from_str(&app.zk_statements).unwrap();

    let state = Server {
        db_pool,
        node_client,
        network,
        cryptographic_param,
        admin_accounts: app.admin_accounts,
        zk_statements,
    };

    tracing::info!("Starting server...");

    let router = Router::new()
        .route("/api/canClaim", post(can_claim))
        .route("/api/getAccountData", post(get_account_data))
        .route("/api/getPendingApprovals", post(get_pending_approvals))
        .route("/api/postZKProof", post(post_zk_proof))
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

#[repr(transparent)]
#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct PostZKProofParam {
    presentation: Presentation<ArCurve, Web3IdAttribute>,
}

async fn post_zk_proof<'a>(
    State(mut state): State<Server>,
    request: Result<Json<PostZKProofParam>, JsonRejection>,
) -> Result<Json<bool>, ServerError<'a>> {
    let Json(param) = request?;

    let presentation = param.presentation;

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

    // We use regular accounts with exactly one credential at index 0.
    if num_credential_statements != 1 {
        return Err(ServerError::WrongLength(
            "credential_statements",
            1,
            num_credential_statements,
        ));
    }

    // We use regular accounts with exactly one credential at index 0.
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

    // We use regular accounts with exactly one credential at index 0.
    let credential_proof = &presentation.verifiable_credential[0];

    // Get the revealed `national_id`, `nationality` and `account_address` from the credential proof.
    let (_national_id, _nationality, _account_address) = match credential_proof {
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

            // Get `account_address` linked to the proof.
            let account_info = state
                .node_client
                .get_account_info(
                    &AccountIdentifier::CredId(*cred_id),
                    BlockIdentifier::LastFinal,
                )
                .await
                .map_err(ServerError::QueryError)?
                .response;
            let account_address = account_info.account_address;

            (national_id, nationality, account_address)
        }
        _ => return Err(ServerError::AccountStatement),
    };

    // TODO check that proof is not expired -> TODO: check the challenge

    Ok(Json(true))
}

/// Struct returned by the `health` endpoint. It returns the version of the
/// backend.
#[derive(serde::Serialize)]
struct Health {
    version: &'static str,
}

/// Handles the `health` endpoint, returning the version of the backend.
async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
    })
}

/// Trait definition of the `IsMessage`. This trait is implemented for the two
/// types `WithdrawMessage` and `TransferMessage`. The `isMessage` trait is used
/// as an input parameter to the `validate_signature_and_increase_nonce`
/// function so that the function works with both message types.
trait HasSigningData {
    fn signing_data(&self) -> &SigningData;
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct SigningMessage {
    block_hash: Sha256,
    block_height: AbsoluteBlockHeight,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Deserialize, serde::Serialize)]
struct SigningData {
    signer: AccountAddress,
    message: SigningMessage,
    signature: Signature,
}

impl HasSigningData for GetAccountDataParam {
    fn signing_data(&self) -> &SigningData {
        &self.signing_data
    }
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct GetAccountDataParam {
    account_address: AccountAddress,
    signing_data: SigningData,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Serialize)]
struct ReturnStoredAccountData {
    data: Option<StoredAccountData>,
}

/// Check that an admin account is sending the request by checking that:
/// - the signer is an admin account.
/// - the signature is valid.
/// - the signature is not expired.
fn check_admin_and_signature<'a>(
    state: Server,
    param: &dyn HasSigningData,
    signer_account_info: QueryResponse<AccountInfo>,
) -> Result<(), ServerError<'a>> {
    let SigningData {
        signer,
        message,
        signature,
    } = param.signing_data();

    // Check that the signer is an admin account.
    if !state.admin_accounts.contains(signer) {
        return Err(ServerError::SignerNotAdmin);
    }

    // This backend checks that the admin has signed the "block_hash" and "block_number"
    // of a block that is not older than 10 blocks from the most recent block.
    // Signing the "block_hash" ensures that the signature expires after 10 blocks.
    // The "block_number" is signed to enable the backend to look up the "block_hash" easily.

    // This verification relies on the front-end (via the wallet) and back-end being connected to reliably nodes
    // that are caught up to the top of the chain. In particular, the backend should only be run in conjunction with
    // a reliable node connection.

    // Front-end to back-end flow:
    // The front-end should look up the most recent block and sign
    // a previous block (such as the 5th previous block). This
    // gives the backend a window of 5 blocks to be delayed vs. the node connection at the front-end until
    // the signature has expired.

    // Currently, it is expected that only a few "approvals" have to be retrieved
    // by an admin such that one signature check should be sufficient.
    // If several requests are needed, some session handling (e.g. JWT) should be implemented to avoid
    // having to sign each request.

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    let mut msg_prepend = [0; 32 + 8];
    //Prepend the `account` address of the signer.
    msg_prepend[0..32].copy_from_slice(signer.as_ref());
    // Prepend 8 zero bytes.
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    // Calculate the message hash.

    // TODO: better handling of unwrap.
    let message_bytes = bincode::serialize(&message).unwrap();
    let message_hash = sha2::Sha256::digest([&msg_prepend[0..40], &message_bytes].concat());

    // We use regular accounts as admin accounts.
    // Regular accounts have only one public-private key pair at index 0 in the credential map.
    let signer_account_credential =
        &signer_account_info.response.account_credentials[&CredentialIndex::from(0)].value;

    // We use regular accounts as admin accounts.
    // Regular accounts have only one public-private key pair at index 0 in the key map.
    let signer_public_key = match signer_account_credential {
        // TODO: usually not allowed
        AccountCredentialWithoutProofs::Initial { .. } => {
            return Err(ServerError::NotInitialAccountCredential)
        }
        AccountCredentialWithoutProofs::Normal { cdv, .. } => &cdv.cred_key_info.keys[&KeyIndex(0)],
    };

    let valid_signature = signer_public_key.verify(message_hash, signature);

    tracing::error!("valid signature: {:?}", valid_signature);

    // Check validity of the signature.
    if !valid_signature {
        return Err(ServerError::InvalidSignature);
    }

    // TODO check that the blockhash is from the last 10 blocks.

    Ok(())
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn get_account_data<'a>(
    State(mut state): State<Server>,
    request: Result<Json<GetAccountDataParam>, JsonRejection>,
) -> Result<Json<ReturnStoredAccountData>, ServerError<'a>> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let signer_account_info = state
        .node_client
        .get_account_info(
            &AccountIdentifier::Address(param.signing_data.signer),
            BlockIdentifier::LastFinal,
        )
        .await
        .map_err(ServerError::QueryError)?;

    // Check that:
    // - the signer is an admin account.
    // - the signature is valid.
    // - the signature is not expired.
    check_admin_and_signature(state, &param, signer_account_info)?;

    let database_result = db.get_account_data(param.account_address).await?;

    Ok(Json(ReturnStoredAccountData {
        data: database_result,
    }))
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct GetPendingApprovalsParam {
    limit: u32,
    offset: u32,
    signing_data: SigningData,
}

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Serialize)]
struct StoredAccountDataReturnValue {
    data: Vec<StoredAccountData>,
}

impl HasSigningData for GetPendingApprovalsParam {
    fn signing_data(&self) -> &SigningData {
        &self.signing_data
    }
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn get_pending_approvals<'a>(
    State(mut state): State<Server>,
    request: Result<Json<GetPendingApprovalsParam>, JsonRejection>,
) -> Result<Json<StoredAccountDataReturnValue>, ServerError<'a>> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    if param.limit > MAX_REQUEST_LIMIT {
        return Err(ServerError::MaxRequestLimit(MAX_REQUEST_LIMIT));
    }

    let signer_account_info = state
        .node_client
        .get_account_info(
            &AccountIdentifier::Address(param.signing_data.signer),
            BlockIdentifier::LastFinal,
        )
        .await
        .map_err(ServerError::QueryError)?;

    // Check that:
    // - the signer is an admin account.
    // - the signature is valid.
    // - the signature is not expired.
    check_admin_and_signature(state, &param, signer_account_info)?;

    let database_result = db.get_pending_approvals(param.limit, param.offset).await?;

    Ok(Json(StoredAccountDataReturnValue {
        data: database_result,
    }))
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[repr(transparent)]
#[derive(serde::Deserialize, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct CanClaimParam {
    account_address: AccountAddress,
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn can_claim<'a>(
    State(state): State<Server>,
    request: Result<Json<CanClaimParam>, JsonRejection>,
) -> Result<Json<bool>, ServerError<'a>> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let can_claim = db.can_claim(param.account_address).await?;

    Ok(Json(can_claim))
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

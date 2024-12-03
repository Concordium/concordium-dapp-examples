use ::indexer::db::{DatabaseError, DatabasePool, StoredItemStatusChangedEvent};
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    http,
    response::Html,
    routing::{get, post},
    Json, Router,
};
use clap::Parser;
use concordium_rust_sdk::types::ContractAddress;
use handlebars::{no_escape, Handlebars};
use http::StatusCode;
use indexer::db::StoredItemCreatedEvent;
use std::fs;
use tower_http::services::ServeDir;

/// The maximum number of events allowed in a request to the database.
const MAX_REQUEST_LIMIT: u32 = 30;

/// Server struct to store the db_pool.
#[derive(Clone, Debug)]
pub struct Server {
    db_pool: DatabasePool,
}

/// Errors that this server can produce.
#[derive(Debug, thiserror::Error)]
pub enum ServerError {
    #[error("Database error from postgres: {0}")]
    DatabaseErrorPostgres(tokio_postgres::Error),
    #[error("Database error in type conversion: {0}")]
    DatabaseErrorTypeConversion(String),
    #[error("Database error in configuration: {0}")]
    DatabaseErrorConfiguration(anyhow::Error),
    #[error("Failed to extract json object: {0}")]
    JsonRejection(#[from] JsonRejection),
    #[error("The requested events to the database were above the limit {0}")]
    MaxRequestLimit(u32),
}

/// Mapping DatabaseError to ServerError
impl From<DatabaseError> for ServerError {
    fn from(e: DatabaseError) -> Self {
        match e {
            DatabaseError::Postgres(e) => ServerError::DatabaseErrorPostgres(e),
            DatabaseError::TypeConversion(e) => ServerError::DatabaseErrorTypeConversion(e),
            DatabaseError::Configuration(e) => ServerError::DatabaseErrorConfiguration(e),
        }
    }
}

impl axum::response::IntoResponse for ServerError {
    fn into_response(self) -> axum::response::Response {
        let r = match self {
            ServerError::DatabaseErrorPostgres(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::DatabaseErrorTypeConversion(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::DatabaseErrorConfiguration(error) => {
                tracing::error!("Internal error: {error}.");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::JsonRejection(error) => {
                tracing::debug!("Bad request: {error}.");
                (StatusCode::BAD_REQUEST, Json(format!("{}", error)))
            }
            ServerError::MaxRequestLimit(error) => {
                tracing::debug!("Bad request: {error}.");
                (StatusCode::BAD_REQUEST, Json(format!("{}", error)))
            }
        };
        r.into_response()
    }
}

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
#[command(author, version, about)]
struct Args {
    /// The address to listen on.
    #[clap(
        long = "listen-address",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "CCD_SERVER_LISTEN_ADDRESS"
    )]
    listen_address: std::net::SocketAddr,
    #[clap(
        long = "frontend",
        default_value = "../frontend/dist",
        help = "Path to the directory where frontend assets are located.",
        env = "CCD_SERVER_FRONTEND"
    )]
    frontend_assets: std::path::PathBuf,
    /// Database connection string.
    #[arg(
        long = "db-connection",
        default_value = "host=localhost dbname=indexer user=postgres password=password port=5432",
        help = "A connection string detailing the connection to the database used by the \
                application.",
        env = "CCD_SERVER_DB_CONNECTION"
    )]
    db_connection: tokio_postgres::config::Config,
    /// Maximum log level.
    #[clap(
        long = "log-level",
        default_value = "info",
        help = "The maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and \
                `error`.",
        env = "CCD_SERVER_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
    /// The node used for querying (passed to frontend).
    #[arg(
        long = "node",
        default_value = "https://grpc.testnet.concordium.com:20000",
        help = "The endpoint is expected to point to concordium node grpc v2 API's. The endpoint \
                is built into the frontend served, which means the node must enable grpc-web to \
                be used successfully.",
        env = "CCD_SERVER_NODE"
    )]
    node_endpoint: concordium_rust_sdk::v2::Endpoint,
    /// The network to connect users to (passed to frontend).
    #[clap(
        long = "network",
        default_value_t = concordium_rust_sdk::web3id::did::Network::Testnet,
        help = "The network to connect users to (passed to frontend). Possible values: testnet, mainnet",
        env = "CCD_SERVER_NETWORK",
    )]
    network: concordium_rust_sdk::web3id::did::Network,
    /// The contract address of the track and trace contract (passed to
    /// frontend).
    #[clap(
        long = "contract-address",
        help = "The contract address of the track and trace contract. Expected format '<123,0>'.",
        env = "CCD_SERVER_CONTRACT_ADDRESS"
    )]
    contract_address: ContractAddress,
    /// The JSON Web Token (JWT) for Pinata uploads to IPFS.
    #[clap(
        long = "pinata-jwt",
        help = "The JSON Web Token (JWT) used for authentication with Pinata for uploading to IPFS.",
        env = "CCD_SERVER_PINATA_JWT"
    )]
    pinata_jwt: String,
    /// The Pinata Gateway URL for accessing files uploaded to IPFS.
    #[clap(
        long = "pinata-gateway",
        help = "The base URL of the Pinata Gateway used for accessing files uploaded to IPFS.",
        env = "CCD_SERVER_PINATA_GATEWAY"
    )]
    pinata_gateway: String,
    /// The sponsored transaction backend (passed to frontend).
    #[arg(
        long = "sponsored-transaction-backend",
        default_value = "http://localhost:8000",
        help = "The endpoint is expected to point to a sponsored transaction backend.",
        env = "CCD_SERVER_SPONSORED_TRANSACTION_BACKEND"
    )]
    sponsored_transaction_backend: concordium_rust_sdk::v2::Endpoint,
}

impl Args {
    /// Creates the JSON object required by the frontend.
    fn as_frontend_config(&self) -> serde_json::Value {
        let config = serde_json::json!({
            "node": self.node_endpoint.uri().to_string(),
            "network": self.network,
            "contractAddress": self.contract_address,
            "pinataJWT": self.pinata_jwt,
            "pinataGateway": self.pinata_gateway,
            "sponsoredTransactionBackend": self.sponsored_transaction_backend.uri().to_string(),
        });
        let config_string =
            serde_json::to_string(&config).expect("JSON serialization always succeeds");
        serde_json::json!({ "config": config_string })
    }
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

    let state = Server { db_pool };

    tracing::info!("Starting server...");

    // Insert the frontend config into `index.html` using the handlebars
    // placeholder. Then render the `index.html` and assets. Render `index.html`
    // file and `assets` folder.
    let index_template = fs::read_to_string(app.frontend_assets.join("index.html"))
        .context("Frontend was not built or wrong path to the frontend files.")?;
    let mut reg = Handlebars::new();
    // Prevent handlebars from escaping inserted objects.
    reg.register_escape_fn(no_escape);

    let index_html = reg.render_template(&index_template, &app.as_frontend_config())?;

    let serve_dir_service = ServeDir::new(app.frontend_assets.join("assets"));

    let router = Router::new()
        .route("/api/getItemStatusChangedEvents", post(get_item_status_changed_events))
        .route("/api/getItemCreatedEvent", post(get_item_created_event))
        .route("/health", get(health))
        .nest_service("/assets", serve_dir_service)
        .fallback(get(|| async { Html(index_html) }))
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

/// Struct returned by the `getItemStatusChangedEvents` endpoint. It returns a
/// vector of ItemStatusChangedEvents from the database if present.
#[derive(serde::Serialize)]
struct StoredItemStatusChangedEventsReturnValue {
    data: Vec<StoredItemStatusChangedEvent>,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[derive(serde::Deserialize)]
struct GetItemstatusChangedEventsParam {
    item_id: u64,
    limit:   u32,
    offset:  u32,
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn get_item_status_changed_events(
    State(state): State<Server>,
    request: Result<Json<GetItemstatusChangedEventsParam>, JsonRejection>,
) -> Result<Json<StoredItemStatusChangedEventsReturnValue>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    if param.limit > MAX_REQUEST_LIMIT {
        return Err(ServerError::MaxRequestLimit(MAX_REQUEST_LIMIT));
    }

    let database_result = db
        .get_item_status_changed_events_submissions(param.item_id, param.limit, param.offset)
        .await?;

    Ok(Json(StoredItemStatusChangedEventsReturnValue {
        data: database_result,
    }))
}

/// Struct returned by the `getItemCreatedEvent` endpoint. It returns the
/// itemCreatedEvent from the database if present.
#[derive(serde::Serialize)]
struct StoredItemCreatedEventReturnValue {
    data: Option<StoredItemCreatedEvent>,
}

/// Handles the `getItemCreatedEvent` endpoint, returning the itemCreatedEvent
/// from the database if present.
async fn get_item_created_event(
    State(state): State<Server>,
    request: Result<Json<u64>, JsonRejection>,
) -> Result<Json<StoredItemCreatedEventReturnValue>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(item_id) = request?;

    let database_result = db.get_item_created_event_submission(item_id).await?;

    Ok(Json(StoredItemCreatedEventReturnValue {
        data: database_result,
    }))
}

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
use concordium_rust_sdk::id::types::AccountAddress;
use http::StatusCode;
use indexer::db::ConversionError;

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
    #[error("Database error in type `{0}` conversion: {1}")]
    DatabaseErrorTypeConversion(String, ConversionError),
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
            DatabaseError::TypeConversion(type_name, e) => {
                ServerError::DatabaseErrorTypeConversion(type_name, e)
            }
            DatabaseError::Configuration(e) => ServerError::DatabaseErrorConfiguration(e),
        }
    }
}

impl IntoResponse for ServerError {
    fn into_response(self) -> Response {
        let r = match self {
            ServerError::DatabaseErrorPostgres(error) => {
                tracing::error!("Internal error: Database error from postgres: {error}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::DatabaseErrorTypeConversion(type_name, error) => {
                tracing::error!(
                    "Internal error: Database error in type `{type_name}` conversion: {error}"
                );
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::DatabaseErrorConfiguration(error) => {
                tracing::error!("Internal error: Database error in configuration: {error}");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json("Internal error".to_string()),
                )
            }
            ServerError::JsonRejection(error) => {
                tracing::debug!("Bad request: Failed to extract json object: {error}");
                (StatusCode::BAD_REQUEST, Json(format!("{}", error)))
            }
            ServerError::MaxRequestLimit(error) => {
                tracing::debug!("Bad request: The requested events to the database were above the limit {error}");
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

    let router = Router::new()
        .route("/api/getAccountData", post(get_account_data))
        .route("/api/canClaim", post(can_claim))
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
struct ReturnStoredAccountData {
    data: Option<StoredAccountData>,
}

/// Parameter struct for the `getItemStatusChangedEvents` endpoint send in the
/// request body.
#[derive(serde::Deserialize)]
struct GetAccountDataParam {
    account_address: AccountAddress,
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn get_account_data(
    State(state): State<Server>,
    request: Result<Json<GetAccountDataParam>, JsonRejection>,
) -> Result<Json<ReturnStoredAccountData>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    // Add authorization e.g. via signature check or ZK proof.

    let database_result = db.get_account_data(param.account_address).await?;

    Ok(Json(ReturnStoredAccountData {
        data: database_result,
    }))
}

/// Handles the `getItemStatusChangedEvents` endpoint, returning a vector of
/// ItemStatusChangedEvents from the database if present.
async fn can_claim(
    State(state): State<Server>,
    request: Result<Json<GetAccountDataParam>, JsonRejection>,
) -> Result<Json<bool>, ServerError> {
    let db = state.db_pool.get().await?;

    let Json(param) = request?;

    let can_claim = db.can_claim(param.account_address).await?;

    Ok(Json(can_claim))
}

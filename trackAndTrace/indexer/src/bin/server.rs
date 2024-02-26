//! A tool for indexing event data from the track and trace contract into a
//! postgres database. The database is configured with the tables from the file
//! `../resources/schema.sql`. The events `ItemStatusChangedEvent` and
//! `ItemCreatedEvent` are indexed in their respective tables. A third table
//! `settings` exists to store global configurations. Each event can be uniquely
//! identified by the `transaction_hash` and `event_index`.
use ::indexer::db::DatabasePool;
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    http,
    response::Html,
    routing::{get, post},
    Json, Router,
};
use clap::Parser;
use concordium_rust_sdk::{
    cis2::{AdditionalData, Receiver, Transfer},
    common::types::TransactionTime,
    smart_contracts::common::{
        AccountSignatures, Address, Amount, CredentialSignatures, OwnedEntrypointName, Signature,
        SignatureEd25519,
    },
    types::{
        hashes::TransactionHash,
        smart_contracts,
        smart_contracts::{ContractContext, InvokeContractResult},
        transactions, Energy, WalletAccount,
    },
    v2::{self, BlockIdentifier},
};
use concordium_rust_sdk::{
    indexer::{self, AffectedContractIndexer, ContractUpdateInfo, ProcessorConfig},
    smart_contracts::common::to_bytes,
    types::{
        queries::BlockInfo, smart_contracts::OwnedReceiveName, AbsoluteBlockHeight, ContractAddress,
    },
    v2::{self as sdk, Client},
};
use std::collections::{BTreeMap, BTreeSet};
use std::{collections::HashMap, fs, sync::Arc};
use tokio::sync::Mutex;
use tokio_postgres::types::ToSql;
use tonic::transport::ClientTlsConfig;
use tower_http::services::ServeDir;
use track_and_trace as contract;

#[derive(Clone, Debug)]
pub struct Server {}

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
#[command(author, version, about)]
struct Args {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "CCD_INDEXER_NODE"
    )]
    endpoint: v2::Endpoint,
    #[clap(
        long = "request-timeout",
        help = "Request timeout (both of request to the node and server requests) in milliseconds.",
        default_value = "10000",
        env = "CCD_INDEXER_REQUEST_TIMEOUT"
    )]
    request_timeout: u64,
    #[clap(
        long = "port",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "CCD_INDEXER_LISTEN_ADDRESS"
    )]
    listen_address: std::net::SocketAddr,
    #[clap(
        long = "frontend",
        default_value = "../frontend/dist",
        help = "Path to the directory where frontend assets are located.",
        env = "CCD_INDEXER_FRONTEND"
    )]
    frontend_assets: std::path::PathBuf,
    /// Database connection string.
    #[arg(
        long = "db-connection",
        default_value = "host=localhost dbname=indexer user=postgres password=password port=5432",
        help = "A connection string detailing the connection to the database used by the \
                application.",
        env = "CCD_INDEXER_DB_CONNECTION"
    )]
    db_connection: tokio_postgres::config::Config,
    /// Maximum log level
    #[clap(
        long = "log-level",
        default_value = "info",
        help = "The maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and \
                `error`.",
        env = "CCD_INDEXER_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
}

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

    anyhow::ensure!(
        app.request_timeout >= 1000,
        "Request timeout should be at least 1s."
    );

    let endpoint = if app
        .endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &http::uri::Scheme::HTTPS)
    {
        app.endpoint
        .tls_config(ClientTlsConfig::new())
        .context("Unable to construct TLS configuration for Concordium API.")?
    } else {
        app.endpoint
    };

    // Make it 500ms less than request timeout to make sure we can fail properly
    // with a connection timeout in case of node connectivity problems.
    let node_timeout = std::time::Duration::from_millis(app.request_timeout - 500);

    let endpoint = endpoint
        .connect_timeout(node_timeout)
        .timeout(node_timeout)
        .http2_keep_alive_interval(std::time::Duration::from_secs(300))
        .keep_alive_timeout(std::time::Duration::from_secs(10))
        .keep_alive_while_idle(true);

    // TODO: do we need it?
    let _node_client = v2::Client::new(endpoint)
        .await
        .context("Unable to establish connection to the node.")?;

    let state = Server {};

    // Render index.html
    let index_template = fs::read_to_string(app.frontend_assets.join("index.html"))
        .context("Frontend was not built or wrong path to the frontend files.")?;
    tracing::info!("Starting server...");
    let serve_dir_service = ServeDir::new(app.frontend_assets.join("assets"));
    let router = Router::new()
        .route("/", get(|| async { Html(index_template) }))
        .nest_service("/assets", serve_dir_service)
        //.route("/api/bid", post(handle_signature_bid))
        .route("/health", get(health))
        .with_state(state)
        .layer(
            tower_http::trace::TraceLayer::new_for_http()
                .make_span_with(tower_http::trace::DefaultMakeSpan::new())
                .on_response(tower_http::trace::DefaultOnResponse::new()),
        )
        .layer(tower_http::timeout::TimeoutLayer::new(
            std::time::Duration::from_millis(app.request_timeout),
        ))
        .layer(tower_http::limit::RequestBodyLimitLayer::new(1_000_000)) // at most 1000kB of data.
        .layer(tower_http::compression::CompressionLayer::new());

    tracing::info!("Listening at {}", app.listen_address);

    let socket = app.listen_address;
    let shutdown_signal = set_shutdown()?;
    axum::Server::bind(&socket)
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

#[derive(serde::Serialize)]
struct Health {
    version: &'static str,
}

#[tracing::instrument(level = "info")]
async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
    })
}

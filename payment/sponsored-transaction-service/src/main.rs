mod types;
use crate::types::*;
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    response::Html,
    routing::{get, post},
    Json, Router,
};
use concordium_cis2::{TokenAmountU256, TokenIdVec};
use std::str;

use clap::Parser;
use concordium_rust_sdk::{
    base::contracts_common::PublicKeyEd25519,
    contract_client::ContractClient,
    smart_contracts::common::{Amount, OwnedEntrypointName, SignatureEd25519},
    types::{hashes::TransactionHash, smart_contracts::OwnedContractName, WalletAccount},
};
use handlebars::{no_escape, Handlebars};
use smart_contract_wallet::{
    InternalTransfer, InternalTransferBatch, InternalTransferMessage, InternalTransferParameter,
    TokenAmount,
};
use std::{fs, path::PathBuf, str::FromStr};
use tonic::transport::ClientTlsConfig;
use tower_http::services::ServeDir;

/// Structure used to receive the correct command line arguments.
#[derive(clap::Parser, Debug)]
#[clap(arg_required_else_help(true))]
#[clap(version, author)]
struct ServiceConfig {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_NODE"
    )]
    endpoint: tonic::transport::Endpoint,
    #[clap(
        long = "listen-address",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_LISTEN_ADDRESS"
    )]
    listen_address: std::net::SocketAddr,
    #[clap(
        long = "log-level",
        default_value = "debug",
        help = "Maximum log level.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
    #[clap(
        long = "request-timeout",
        help = "Request timeout (both of request to the node and server requests) in milliseconds.",
        default_value = "10000",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_REQUEST_TIMEOUT"
    )]
    request_timeout: u64,
    #[clap(
        long = "private-key-file",
        help = "Path to the account key file.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_PRIVATE_KEY_FILE"
    )]
    keys_path: PathBuf,
    #[clap(
        long = "allowed-accounts",
        help = "The accounts allowed to submit transactions. Either 'any', if you have a custom \
                authentication scheme in front of the service OR a space-separated list of \
                account addresses.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_ALLOWED_ACCOUNTS"
    )]
    allowed_accounts: AllowedAccounts,
    #[clap(
        long = "allowed-contracts",
        help = "The contracts allowed to be used by the service. Either 'any' OR a \
                space-separated list of contract addresses in the format `<123,0>`.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_ALLOWED_CONTRACTS"
    )]
    allowed_contracts: AllowedContracts,
    #[clap(
        long = "rate-limit",
        default_value = "30",
        help = "The limit of requests per account per hour. Defaults to `30`.",
        env = "CCD_SPONSORED_TRANSACTION_SERVICE_RATE_LIMIT"
    )]
    rate_limit_per_account_per_hour: u16,
    #[clap(
        long = "frontend",
        default_value = "../frontend/dist",
        help = "Path to the directory where frontend assets are located.",
        env = "CCD_SERVER_FRONTEND"
    )]
    frontend_assets: std::path::PathBuf,
}

impl ServiceConfig {
    /// Creates the JSON object required by the frontend.
    fn as_frontend_config(&self) -> serde_json::Value {
        let config = serde_json::json!({
            // NOT NEEDED PROBABLY
            // "node": self.endpoint.uri().to_string(),
            // "network":"testnet",
            // "contractAddress": self.allowed_contracts,
        });
        let config_string =
            serde_json::to_string(&config).expect("JSON serialization always succeeds");
        serde_json::json!({ "config": config_string })
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = ServiceConfig::parse();

    anyhow::ensure!(
        app.rate_limit_per_account_per_hour >= 1,
        "Rate limit per account per hour must be at least 1."
    );

    anyhow::ensure!(
        app.request_timeout >= 1000,
        "Request timeout should be at least 1000 ms."
    );

    // Setup logging.
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

    let endpoint = if app
        .endpoint
        .uri()
        .scheme()
        .map_or(false, |x| *x == concordium_rust_sdk::v2::Scheme::HTTPS)
    {
        app.endpoint
            .clone()
            .tls_config(ClientTlsConfig::new())
            .context("Unable to construct a TLS connection for the Concordium API.")?
    } else {
        app.endpoint.clone()
    };

    // Make it 500ms less than the request timeout to make sure we can fail properly
    // with a connection timeout in case of node connectivity problems.
    let node_timeout = std::time::Duration::from_millis(app.request_timeout - 500);

    let endpoint_uri = endpoint.uri().clone();

    let endpoint = endpoint
        .connect_timeout(node_timeout)
        .timeout(node_timeout)
        .http2_keep_alive_interval(std::time::Duration::from_secs(300))
        .keep_alive_timeout(std::time::Duration::from_secs(10))
        .keep_alive_while_idle(true);

    let mut node_client = concordium_rust_sdk::v2::Client::new(endpoint)
        .await
        .context("Unable to establish connection to the node.")?;

    // Load account keys and sender address from a file
    let keys: WalletAccount = WalletAccount::from_json_file(app.keys_path.clone())
        .context("Could not get the account keys from a file.")?;

    let nonce = node_client
        .get_next_account_sequence_number(&keys.address)
        .await
        .context("Could not query the account nonce.")?
        .nonce;

    tracing::info!("Starting server...");
    tracing::debug!(
        r#"
With the following configuration:
    Node endpoint: {}
    Listen address: {}
    Log level: {}
    Request timeout: {}
    Rate limit per account per hour: {}
    Path to sponsor keys: {:#?}
    Sponsor account: {} 
        With initial nonce: {}
    Allowed accounts: {}
    Allowed contracts: {}
"#,
        endpoint_uri,
        app.listen_address,
        app.log_level,
        app.request_timeout,
        app.rate_limit_per_account_per_hour,
        app.keys_path,
        keys.address,
        nonce,
        app.allowed_accounts,
        app.allowed_contracts,
    );

    let state = Server::new(
        node_client,
        keys,
        nonce,
        app.rate_limit_per_account_per_hour,
        app.allowed_accounts.clone(),
        app.allowed_contracts.clone(),
    );

    let index_template = fs::read_to_string(app.frontend_assets.clone().join("index.html"))
        .context("Frontend was not built or wrong path to the frontend files.")?;
    let mut reg = Handlebars::new();
    // Prevent handlebars from escaping inserted objects.
    reg.register_escape_fn(no_escape);

    let index_html = reg.render_template(&index_template, &app.as_frontend_config())?;

    let serve_dir_service = ServeDir::new(app.frontend_assets.join("assets"));

    let router = Router::new()
        .nest_service("/assets", serve_dir_service)
        .route("/api/submitTransaction", post(handle_transaction))
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

    let listener = tokio::net::TcpListener::bind(app.listen_address)
        .await
        .context("Listening on provided address")?;

    axum::serve(listener, router)
        .with_graceful_shutdown(set_shutdown()?)
        .await?;

    Ok(())
}

/// Handle a request for a sponsored transaction.
pub async fn handle_transaction(
    State(state): State<Server>,
    request: Result<Json<InputParams>, JsonRejection>,
) -> Result<Json<TransactionHash>, ServerError> {
    let Json(request) = request?;

    if !state.allowed_accounts.allowed(&request.signer) {
        return Err(ServerError::AccountNotAllowed {
            account: request.signer,
        });
    }
    if !state.allowed_contracts.allowed(&request.contract_address) {
        return Err(ServerError::ContractNotAllowed {
            contract: request.contract_address,
        });
    }

    let mut signature = [0; 64];
    hex::decode_to_slice(request.signature.clone(), &mut signature)?;

    let param = InternalTransferParameter::<TokenAmount> {
        transfers: vec![InternalTransferBatch {
            signer:    PublicKeyEd25519::from_str(
                str::from_utf8(&request.from_public_key).unwrap(),
            )
            .unwrap(),
            signature: SignatureEd25519(signature),
            message:   InternalTransferMessage {
                entry_point:           OwnedEntrypointName::new_unchecked(
                    "internalTransferCis2Tokens".to_string(),
                ),
                expiry_time:           request.expiry_time,
                nonce:                 request.nonce,
                service_fee_recipient: PublicKeyEd25519([0u8; 32]),
                service_fee_amount:    TokenAmount {
                    token_amount:                TokenAmountU256(0.into()),
                    token_id:                    TokenIdVec(request.token_id.clone()),
                    cis2_token_contract_address: request.contract_address,
                },
                simple_transfers:      vec![InternalTransfer {
                    to:              PublicKeyEd25519::from_str(
                        str::from_utf8(&request.to_public_key).unwrap(),
                    )
                    .unwrap(),
                    transfer_amount: TokenAmount {
                        token_amount: TokenAmountU256(request.token_amount),

                        token_id:                    TokenIdVec(request.token_id),
                        cis2_token_contract_address: request.contract_address,
                    },
                }],
            },
        }],
    };

    let mut contract_client = ContractClient::<()>::new(
        state.node_client.clone(),
        request.contract_address,
        OwnedContractName::new(format!("init_{}", request.contract_name))?,
    );

    let dry_run = contract_client
        .dry_run_update::<_, ServerError>(
            "internalTransferCis2Tokens",
            Amount::zero(),
            state.keys.address,
            &param,
        )
        .await?;

    // Get the current nonce for the backend wallet and lock it. This is necessary
    // since it is possible that API requests come in parallel. The nonce is
    // increased by 1 and its lock is released after the transaction is submitted to
    // the blockchain.
    let mut nonce = state.nonce.lock().await;

    // Reset the rate limits if an hour has passed since the last reset.
    state.reset_rate_limits_if_expired().await;

    // Check the rate limits for the account.
    //
    // By checking and updating the rate limit *after* the dry run, we ensure that
    // it indeed is the specified signer account that sent the request (since the
    // signature is checked).
    //
    // By contrast, if we had checked and updated the rate limit *before* the dry
    // run, then it would be easy for attackers to block other accounts from using
    // the service by spamming requests with the victim account specified as the
    // signer.
    //
    // We could also add a general rate limit based on IP addresses or similar to
    // hinder DDOS attacks.
    state.check_rate_limit(request.signer).await?;

    let tx_hash = dry_run
        .nonce(*nonce)
        .send(&state.keys)
        .await
        .map_err(ServerError::SubmitSponsoredTransactionError)?
        .hash();

    tracing::debug!("Submitted transaction {} ...", tx_hash);

    *nonce = nonce.next();
    Ok(tx_hash.into())
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

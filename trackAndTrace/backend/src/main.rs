mod types;
use crate::types::*;
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    response::Html,
    routing::{get, post},
    Json, Router,
};
use clap::Parser;
use concordium_rust_sdk::{
    common::types::TransactionTime,
    id::types::AccountAddress,
    smart_contracts::common::{
        AccountSignatures, Amount, ContractAddress, CredentialSignatures, OwnedEntrypointName,
        Signature, SignatureEd25519,
    },
    types::{
        hashes::TransactionHash,
        smart_contracts::{self, ContractContext, InvokeContractResult},
        transactions, Energy, WalletAccount,
    },
    v2::{self, BlockIdentifier},
};
use std::{collections::BTreeMap, fs, sync::Arc};
use tokio::sync::Mutex;
use tonic::transport::ClientTlsConfig;
use tower_http::services::ServeDir;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
const EPSILON_ENERGY: u64 = 1000;
const ENERGY: u64 = 60000;

#[derive(clap::Parser, Debug)]
#[clap(version, author)]
struct App {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "NODE"
    )]
    endpoint:             concordium_rust_sdk::v2::Endpoint,
    #[clap(
        long = "log-level",
        default_value = "info",
        help = "Maximum log level.",
        env = "LOG_LEVEL"
    )]
    log_level:            tracing_subscriber::filter::LevelFilter,
    #[clap(
        long = "request-timeout",
        help = "Request timeout (both of request to the node and server requests) in milliseconds.",
        default_value = "10000",
        env = "REQUEST_TIMEOUT"
    )]
    request_timeout:      u64,
    #[clap(
        long = "listen-address",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "LISTEN_ADDRESS"
    )]
    listen_address:       std::net::SocketAddr,
    #[clap(
        long = "frontend",
        default_value = "../frontend/dist",
        help = "Path to the directory where frontend assets are located.",
        env = "FRONTEND"
    )]
    frontend_assets:      std::path::PathBuf,
    #[structopt(
        long = "account-key-file",
        env = "ACCOUNT_KEY_FILE",
        help = "Path to the account key file."
    )]
    keys_path:            std::path::PathBuf,
    #[clap(
        long = "whitelisted-accounts",
        env = "WHITELISTED_ACCOUNTS",
        help = "A list of whitelisted account addresses. These accounts are allowed to submit \
                transactions via the backend. You can use this flag several times e.g. \
                `--whitelisted-account 32GKttZ8SB1DZvpK1czfWHLWht1oMDz1JqmV9Lo28Hqpf2RP2w \
                --whitelisted-account 4EphLJK99TVEuMRscZHJziPWi1bVdb2YLxPoEVSw8FKidPfr5w`"
    )]
    whitelisted_accounts: Vec<AccountAddress>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = App::parse();

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

    let mut node_client = v2::Client::new(endpoint)
        .await
        .context("Unable to establish connection to the node.")?;

    // Load account keys and sender address from a file
    let keys: WalletAccount =
        WalletAccount::from_json_file(app.keys_path).context("Could not read the keys file.")?;

    let sponsorer_key = Arc::new(keys);

    let nonce_response = node_client
        .get_next_account_sequence_number(&sponsorer_key.address)
        .await
        .context("NonceQueryError.")?;

    tracing::debug!(
        "Starting server with sponsorer {}. Current sponsorer nonce: {}.",
        sponsorer_key.address,
        nonce_response.nonce
    );

    let state = Server {
        node_client,
        nonce: Arc::new(Mutex::new(nonce_response.nonce)),
        whitelisted_accounts: app.whitelisted_accounts,
        key: sponsorer_key,
    };

    // Render index.html
    let index_template = fs::read_to_string(app.frontend_assets.join("index.html"))
        .context("Frontend was not built or wrong path to the frontend files.")?;
    tracing::info!("Starting server...");
    let serve_dir_service = ServeDir::new(app.frontend_assets.join("assets"));
    let router = Router::new()
        .route("/", get(|| async { Html(index_template) }))
        .nest_service("/assets", serve_dir_service)
        .route("/api/sponsoredTransaction", post(handle_sponsored_transaction))
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

async fn handle_sponsored_transaction(
    State(mut state): State<Server>,
    request: Result<Json<SponsoredTransactionParam>, JsonRejection>,
) -> Result<Json<TransactionHash>, ServerError> {
    let Json(request) = request?;

    // We restrict submission of sponsored transactions via the backend
    // to trusted/whitelisted accounts only. To enable untrusted accounts
    // for sponsored transaction submissions, implement rate-limiting and/or
    // other authorization mechanisms. This prevents untrusted accounts
    // from sending an unlimited number of transactions,
    // which could deplete the CCD balance in your sponsorer account.
    tracing::debug!("Check if account {} is whitelisted  ...", request.signer);

    if !state.whitelisted_accounts.contains(&request.signer) {
        tracing::warn!("Signer account {} is not whitelisted.", request.signer);
        return Err(ServerError::SignerNotWhitelisted);
    }

    tracing::debug!("Created payload: {:?}", request.payload);

    let message: PermitMessage = PermitMessage {
        contract_address: ContractAddress::new(request.contract_address, 0u64),
        nonce:            request.nonce,
        timestamp:        request.expiry_timestamp,
        entry_point:      OwnedEntrypointName::new_unchecked(request.endpoint),
        payload:          request.payload,
    };

    tracing::debug!("Created {:?}", message);

    let mut signature = [0; 64];

    if request.signature.len() != 128 {
        return Err(ServerError::SignatureLengthError);
    }

    hex::decode_to_slice(request.signature, &mut signature).map_err(ServerError::SignatureError)?;

    let mut inner_signature_map = BTreeMap::new();
    inner_signature_map.insert(0, Signature::Ed25519(SignatureEd25519(signature)));

    let mut signature_map = BTreeMap::new();
    signature_map.insert(0, CredentialSignatures {
        sigs: inner_signature_map,
    });

    tracing::debug!("Created signature_map {:?}", signature_map);

    let param: PermitParam = PermitParam {
        message,
        signature: AccountSignatures {
            sigs: signature_map,
        },
        signer: request.signer,
    };

    let parameter = smart_contracts::OwnedParameter::from_serial(&param)
        .map_err(|_| ServerError::ParameterError)?;

    tracing::debug!("Created {:?}", parameter);

    let payload = transactions::UpdateContractPayload {
        amount:       Amount::from_micro_ccd(0),
        address:      ContractAddress::new(request.contract_address, 0u64),
        receive_name: smart_contracts::OwnedReceiveName::new_unchecked(format!(
            "{}.permit",
            request.contract_name
        )),
        message:      parameter,
    };

    let context = ContractContext::new_from_payload(
        state.key.address,
        Energy { energy: ENERGY },
        payload.clone(),
    );

    let info = state
        .node_client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    let info = match info {
        Ok(info) => info,
        Err(e) => {
            tracing::warn!("SimulationInvokeError {e}.");
            return Err(ServerError::SimulationInvokeError(e));
        }
    };

    let used_energy = match info.response {
        InvokeContractResult::Success {
            return_value: _,
            events: _,
            used_energy,
        } => {
            tracing::debug!(
                "TransactionSimulationSuccess with used energy: {:#?}.",
                used_energy
            );
            used_energy
        }
        InvokeContractResult::Failure {
            return_value: _,
            reason,
            used_energy: _,
        } => {
            tracing::warn!("TransactionSimulationError with reason: {:#?}.", reason);
            return Err(ServerError::TransactionSimulationError(RevertReason {
                reason,
            }));
        }
    };

    // Transaction should expiry after one hour.
    let transaction_expiry = TransactionTime::hours_after(1);

    // Get the current nonce for the backend wallet and lock it. This is necessary
    // since it is possible that API requests come in parallel. The nonce is
    // increased by 1 and its lock is released after the transaction is submitted to
    // the blockchain.
    let mut nonce = state.nonce.lock().await;

    let tx = transactions::send::make_and_sign_transaction(
        &state.key.keys,
        state.key.address,
        *nonce,
        transaction_expiry,
        // We add a small amount of energy `EPSILON_ENERGY` to the previously simulated
        // `used_energy` to cover variations (e.g. smart contract state changes) caused by
        // transactions that have been executed meanwhile.
        concordium_rust_sdk::types::transactions::send::GivenEnergy::Add(
            used_energy + Energy::from(EPSILON_ENERGY),
        ),
        concordium_rust_sdk::types::transactions::Payload::Update { payload },
    );

    let bi = transactions::BlockItem::AccountTransaction(tx);

    match state.node_client.send_block_item(&bi).await {
        Ok(hash) => {
            tracing::debug!("Submit transaction {} ...", hash);

            *nonce = nonce.next();

            Ok(hash.into())
        }
        Err(e) => {
            tracing::warn!("SubmitSponsoredTransactionError {e}.");
            Err(ServerError::SubmitSponsoredTransactionError(e))
        }
    }
}

#[derive(serde::Serialize)]
struct Health {
    version: &'static str,
}

async fn health() -> Json<Health> {
    Json(Health {
        version: env!("CARGO_PKG_VERSION"),
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

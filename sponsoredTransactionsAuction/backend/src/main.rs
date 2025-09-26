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
    cis2::{AdditionalData, Receiver, Transfer},
    common::types::TransactionTime,
    smart_contracts::common::{
        to_bytes, AccountSignatures, Address, Amount, ContractAddress, CredentialSignatures,
        OwnedEntrypointName, Signature, SignatureEd25519,
    },
    types::{
        hashes::TransactionHash,
        smart_contracts,
        smart_contracts::{ContractContext, InvokeContractResult, OwnedReceiveName},
        transactions, Energy, WalletAccount,
    },
    v2::{self, BlockIdentifier, Endpoint},
};
use std::{
    collections::{BTreeMap, HashMap},
    fs,
    sync::Arc,
};
use tokio::sync::Mutex;
use tonic::transport::ClientTlsConfig;
use tower_http::services::ServeDir;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
const EPSILON_ENERGY: u64 = 1000;
const CONTRACT_NAME: &str = "cis2_multi";
const ENERGY: u64 = 60000;
const RATE_LIMIT_PER_ACCOUNT: u8 = 30;

#[derive(clap::Parser, Debug)]
#[clap(version, author)]
struct App {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "http://localhost:20000",
        env = "NODE"
    )]
    endpoint: Endpoint,
    #[clap(
        long = "log-level",
        default_value = "info",
        help = "Maximum log level.",
        env = "LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
    #[clap(
        long = "request-timeout",
        help = "Request timeout (both of request to the node and server requests) in milliseconds.",
        default_value = "10000",
        env = "REQUEST_TIMEOUT"
    )]
    request_timeout: u64,
    #[clap(
        long = "listen-address",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "LISTEN_ADDRESS"
    )]
    listen_address: std::net::SocketAddr,
    #[clap(
        long = "frontend",
        default_value = "../frontend/dist",
        help = "Path to the directory where frontend assets are located.",
        env = "FRONTEND"
    )]
    frontend_assets: std::path::PathBuf,
    #[clap(
        long = "cis2-token-smart-contract-index",
        default_value = "7723",
        env = "CIS2_TOKEN_CONTRACT_INDEX",
        help = "The cis2 token smart contract index which the sponsored transaction is submitted \
                to."
    )]
    cis2_token_smart_contract_index: u64,
    #[clap(
        long = "auction-smart-contract-index",
        default_value = "7724",
        env = "AUCTION_CONTRACT_INDEX",
        help = "The auction smart contract index which the sponsored transaction is submitted to."
    )]
    auction_smart_contract_index: u64,
    #[structopt(
        long = "account-key-file",
        env = "ACCOUNT_KEY_FILE",
        help = "Path to the account key file."
    )]
    keys_path: std::path::PathBuf,
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

    let endpoint = if app.endpoint.uri().scheme() == Some(&concordium_rust_sdk::v2::Scheme::HTTPS) {
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
        rate_limits: Arc::new(Mutex::new(HashMap::new())),
        auction_smart_contract: ContractAddress::new(app.auction_smart_contract_index, 0),
        cis2_token_smart_contract: ContractAddress::new(app.cis2_token_smart_contract_index, 0),
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
        .route("/api/bid", post(handle_signature_bid))
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

    // Create the server.
    axum::Server::bind(&socket)
        .serve(router.into_make_service())
        .with_graceful_shutdown(shutdown_signal)
        .await?;

    Ok(())
}

#[tracing::instrument(level = "info", skip_all)]
async fn handle_signature_bid(
    State(mut state): State<Server>,
    request: Result<Json<BidParams>, JsonRejection>,
) -> Result<Json<TransactionHash>, ServerError> {
    let Json(request) = request?;

    let transfer = Transfer {
        from: Address::Account(request.from),
        to: Receiver::Contract(
            state.auction_smart_contract,
            OwnedReceiveName::new_unchecked("bid".to_owned()),
        ),
        token_id: request.token_id,
        amount: request.token_amount,
        data: AdditionalData::new_unchecked(to_bytes(&request.item_index_auction)),
    };

    let payload = TransferParams(vec![transfer]);

    tracing::debug!("Created payload: {:?}", payload);

    let message: PermitMessage = PermitMessage {
        contract_address: state.cis2_token_smart_contract,
        nonce: request.nonce,
        timestamp: request.expiry_timestamp,
        entry_point: OwnedEntrypointName::new_unchecked("transfer".into()),
        payload: concordium_rust_sdk::smart_contracts::common::to_bytes(&payload),
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
    signature_map.insert(
        0,
        CredentialSignatures {
            sigs: inner_signature_map,
        },
    );

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
        amount: Amount::zero(),
        address: state.cis2_token_smart_contract,
        receive_name: smart_contracts::OwnedReceiveName::new_unchecked(format!(
            "{}.permit",
            CONTRACT_NAME
        )),
        message: parameter,
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
            let reason =
                reason.known_or_else(|| ServerError::Unknown("RejectReason".to_string()))?;

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

    // There should be rate limiting in place to prevent the sponsor wallet from
    // being drained. We only allow up to RATE_LIMIT_PER_ACCOUNT API calls to
    // this backend. The rate_limits are transient and are reset on server
    // restart.

    // We only check the rate_limits after acquiring the nonce lock. If we do it
    // before we don't have guarantees due to possible parallel API requests.

    // On mainnet, a user can only create around 25 accounts per identity.
    // In production, a user registration/authentication at the frontend can be
    // added or a database that permanently keeps track of the rate_limits so
    // that the server can be restarted and reload the rate_limit values from the
    // database.

    tracing::debug!("Check rate limit of account {} ...", request.signer);

    let mut rate_limits = state.rate_limits.lock().await;

    // Account addresses on Concordium have account aliases. We track the
    // rate-limits by using the alias 0 for every account. https://developer.concordium.software/en/mainnet/net/references/transactions.html#account-aliases
    let alias_account_0 = request
        .signer
        .get_alias(0)
        .ok_or_else(|| ServerError::NoAliasAccount)?;

    let limit = rate_limits.entry(alias_account_0).or_insert(0u8);

    if *limit >= RATE_LIMIT_PER_ACCOUNT {
        tracing::warn!("Rate limit for account {} reached.", request.signer);
        return Err(ServerError::RateLimitError);
    }

    *limit += 1;

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

#[tracing::instrument(level = "info")]
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

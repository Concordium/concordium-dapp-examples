mod types;
use crate::types::*;
use anyhow::Context;
use axum::{
    extract::{rejection::JsonRejection, State},
    routing::post,
    Json, Router,
};
use clap::Parser;
use concordium_rust_sdk::{
    common::types::TransactionTime,
    smart_contracts::common::{
        AccountSignatures, Amount, CredentialSignatures, OwnedEntrypointName, Signature,
        SignatureEd25519,
    },
    types::{
        hashes::TransactionHash,
        smart_contracts,
        smart_contracts::{ContractContext, InvokeContractResult},
        transactions, Energy, WalletAccount,
    },
    v2::BlockIdentifier,
};
use std::{collections::BTreeMap, path::PathBuf};
use tonic::transport::ClientTlsConfig;
use tower_http::cors::{AllowOrigin, CorsLayer};

/// Structure used to receive the correct command line arguments.
#[derive(clap::Parser, Debug)]
#[clap(arg_required_else_help(true))]
#[clap(version, author)]
struct ServiceConfig {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "http://localhost:20000",
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
        long = "account",
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
        // We compare on strings as they use different versions of the `http` crate, so the types cannot be compared.
        .map_or(false, |x| x.as_str() == http::uri::Scheme::HTTPS.as_str())
    {
        app.endpoint
            .tls_config(ClientTlsConfig::new())
            .context("Unable to construct a TLS connection for the Concordium API.")?
    } else {
        app.endpoint
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
        app.allowed_accounts,
        app.allowed_contracts,
    );

    let router = Router::new()
        .route("/api/submitTransaction", post(handle_transaction))
        .with_state(state)
        .layer(CorsLayer::new()
               .allow_origin(AllowOrigin::mirror_request())
               .allow_methods([http::Method::POST]))
        .layer(
            tower_http::trace::TraceLayer::new_for_http()
                .make_span_with(tower_http::trace::DefaultMakeSpan::new())
                .on_response(tower_http::trace::DefaultOnResponse::new()),
        )
        .layer(tower_http::timeout::TimeoutLayer::new(
            std::time::Duration::from_millis(app.request_timeout),
        ))
        .layer(tower_http::limit::RequestBodyLimitLayer::new(70_000)) // Allow at most 70kB of data. Enough for max parameter u16::MAX and the signatures etc.
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

/// Before submitting a transaction we simulate/dry-run the transaction to get
/// an estimate of the energy needed for executing the transaction. In addition,
/// we allow an additional small amount of energy `EPSILON_ENERGY` to be
/// consumed by the transaction to cover small variations (e.g. changes to the
/// smart contract state) caused by transactions that have been executed
/// meanwhile.
const EPSILON_ENERGY: u64 = 1000;

/// Handle a request for a sponsored transaction.
pub async fn handle_transaction(
    State(mut state): State<Server>,
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

    let message: PermitMessage = PermitMessage {
        contract_address: request.contract_address,
        nonce:            request.nonce,
        timestamp:        request.expiry_time,
        entry_point:      OwnedEntrypointName::new_unchecked(request.entrypoint_name),
        parameter:        request.parameter,
    };

    // Create signature map.
    let mut signature = [0; 64];
    hex::decode_to_slice(request.signature.clone(), &mut signature)?;
    let mut inner_signature_map = BTreeMap::new();
    inner_signature_map.insert(0, Signature::Ed25519(SignatureEd25519(signature)));
    let mut signature_map = BTreeMap::new();
    signature_map.insert(0, CredentialSignatures {
        sigs: inner_signature_map,
    });

    let param: PermitParam = PermitParam {
        message,
        signature: AccountSignatures {
            sigs: signature_map,
        },
        signer: request.signer,
    };

    let parameter = smart_contracts::OwnedParameter::from_serial(&param)
        .map_err(|_| ServerError::ParameterError)?;

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", request.contract_name))
            .map_err(|_| ServerError::ContractNameError {
                invalid_name: request.contract_name.clone(),
            })?;

    let context = ContractContext {
        invoker:   Some(concordium_rust_sdk::types::Address::Account(
            state.keys.address,
        )),
        contract:  request.contract_address,
        amount:    Amount::zero(),
        method:    receive_name.clone(),
        parameter: parameter.clone(),
        energy:    None,
    };

    let info = state
        .node_client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    let info = match info {
        Ok(info) => info,
        Err(e) => {
            return Err(ServerError::SimulationInvokeError(e));
        }
    };

    let used_energy = match info.response {
        InvokeContractResult::Success {
            return_value: _,
            events: _,
            used_energy,
        } => used_energy,
        InvokeContractResult::Failure {
            return_value: _,
            reason,
            used_energy: _,
        } => {
            return Err(ServerError::TransactionSimulationError {
                reason: RevertReason { reason },
            });
        }
    };

    let payload = transactions::UpdateContractPayload {
        amount: Amount::from_micro_ccd(0),
        address: request.contract_address,
        receive_name,
        message: parameter,
    };

    // Transaction should expire after one hour.
    let transaction_expiry = TransactionTime::hours_after(1);

    // Get the current nonce for the backend wallet and lock it. This is necessary
    // since it is possible that API requests come in parallel. The nonce is
    // increased by 1 and its lock is released after the transaction is submitted to
    // the blockchain.
    let mut nonce = state.nonce.lock().await;

    // Reset the rate limits if an hour has passed since the last reset.
    state.reset_rate_limits_if_expired().await;

    // Check the rate limits for the account.
    state.check_rate_limit(request.signer).await?;

    let tx = transactions::send::make_and_sign_transaction(
        &state.keys.keys,
        state.keys.address,
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
        Err(e) => Err(ServerError::SubmitSponsoredTransactionError(e)),
    }
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

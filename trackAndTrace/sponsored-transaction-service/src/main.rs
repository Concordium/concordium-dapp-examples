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
use std::{
    collections::{BTreeMap, HashMap},
    path::PathBuf,
    sync::Arc,
};
use tokio::sync::Mutex;
use tonic::transport::ClientTlsConfig;
use tower_http::cors::CorsLayer;

/// Structure used to receive the correct command line arguments.
#[derive(clap::Parser, Debug)]
#[clap(arg_required_else_help(true))]
#[clap(version, author)]
struct ServiceConfig {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "http://localhost:20000",
        env = "CCD_SPONSORED_TRX_SERVICE_NODE"
    )]
    endpoint:          tonic::transport::Endpoint,
    #[clap(
        long = "listen-address",
        default_value = "0.0.0.0:8080",
        help = "Address where the server will listen on.",
        env = "CCD_SPONSORED_TRX_SERVICE_LISTEN_ADDRESS"
    )]
    listen_address:    std::net::SocketAddr,
    #[clap(
        long = "log-level",
        default_value = "debug",
        help = "Maximum log level.",
        env = "CCD_SPONSORED_TRX_SERVICE_LOG_LEVEL"
    )]
    log_level:         tracing_subscriber::filter::LevelFilter,
    #[clap(
        long = "request-timeout",
        help = "Request timeout (both of request to the node and server requests) in milliseconds.",
        default_value = "10000",
        env = "CCD_SPONSORED_TRX_SERVICE_REQUEST_TIMEOUT"
    )]
    request_timeout:   u64,
    #[clap(
        long = "account",
        help = "Path to the account key file.",
        env = "CCD_SPONSORED_TRX_SERVICE_PRIVATE_KEY_FILE"
    )]
    keys_path:         PathBuf,
    #[clap(
        long = "allowed-accounts",
        help = "The accounts allowed to submit transactions. Either 'any', if you have a custom \
                authentication scheme in front of the service OR a space-separated list of \
                account addresses.",
        env = "CCD_SPONSORED_TRX_SERVICE_ALLOWED_ACCOUNTS"
    )]
    allowed_accounts:  AllowedAccounts,
    #[clap(
        long = "allowed-contracts",
        help = "The contracts allowed to be used by the service. Either 'any' OR a \
                space-separated list of contract addresses in the format `<123,0>`.",
        env = "CCD_SPONSORED_TRX_SERVICE_ALLOWED_CONTRACTS"
    )]
    allowed_contracts: AllowedContracts,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = ServiceConfig::parse();

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

    anyhow::ensure!(
        app.request_timeout >= 1000,
        "Request timeout should be at least 1000 ms."
    );

    // Make it 500ms less than the request timeout to make sure we can fail properly
    // with a connection timeout in case of node connectivity problems.
    let node_timeout = std::time::Duration::from_millis(app.request_timeout - 500);

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
    let keys: WalletAccount = WalletAccount::from_json_file(app.keys_path)
        .context("Could not get the account keys from a file.")?;

    let nonce = node_client
        .get_next_account_sequence_number(&keys.address)
        .await
        .context("Could not query the account nonce.")?
        .nonce;

    tracing::debug!(
        "Starting server with sponsorer {}. Current sponsorer nonce: {}.",
        keys.address,
        nonce,
    );

    let state = Server {
        node_client,
        keys: Arc::new(keys),
        nonce: Arc::new(Mutex::new(nonce)),
        rate_limits: Arc::new(Mutex::new(HashMap::new())),
        allowed_accounts: app.allowed_accounts,
        allowed_contracts: app.allowed_contracts,
    };

    tracing::info!("Starting server...");

    let router = Router::new()
        .route("/api/submitTransaction", post(handle_transaction))
        .with_state(state)
        .layer(CorsLayer::permissive()) // TODO: Do we want to restrict CORS?
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

/// The default energy to use for simulating the contract call.
const ENERGY: u64 = 10000;

/// Handle a request for a sponsored transaction.
pub async fn handle_transaction(
    State(mut state): State<Server>,
    request: Result<Json<InputParams>, JsonRejection>,
) -> Result<Json<TransactionHash>, ServerError> {
    let Json(request) = request?;

    if !state.allowed_accounts.allowed(&request.signer) {
        tracing::debug!("Account not allowed: {}", request.signer);
        return Err(ServerError::AccountNotAllowed {
            account: request.signer,
        });
    }
    if !state.allowed_contracts.allowed(&request.contract_address) {
        tracing::debug!("Contract not allowed: {}", request.contract_address);
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

    tracing::debug!("Create signature map.");

    let mut signature = [0; 64];
    hex::decode_to_slice(request.signature.clone(), &mut signature)?;

    let mut inner_signature_map = BTreeMap::new();
    inner_signature_map.insert(0, Signature::Ed25519(SignatureEd25519(signature)));

    let mut signature_map = BTreeMap::new();
    signature_map.insert(0, CredentialSignatures {
        sigs: inner_signature_map,
    });

    tracing::debug!("Create Parameter.");

    let param: PermitParam = PermitParam {
        message,
        signature: AccountSignatures {
            sigs: signature_map,
        },
        signer: request.signer,
    };

    let parameter = smart_contracts::OwnedParameter::from_serial(&param)
        .map_err(|_| ServerError::ParameterError)?;

    tracing::debug!("Simulate transaction to check its validity.");

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
        energy:    Some(ENERGY.into()),
    };

    let info = state
        .node_client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    let info = match info {
        Ok(info) => info,
        Err(e) => {
            tracing::warn!("SimulationInvokeError: {e}.");
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

    tracing::debug!("Create transaction.");

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
    // rate-limits by using the alias 0 for every account.
    // For more info on aliases, see: https://developer.concordium.software/en/mainnet/net/references/transactions.html#account-aliases
    let alias_account_0 = request
        .signer
        .get_alias(0)
        .ok_or_else(|| ServerError::NoAliasAccount)?;

    let rate_limit = rate_limits.entry(alias_account_0).or_insert_with(|| 0u8);

    if *rate_limit >= RATE_LIMIT_PER_ACCOUNT {
        tracing::warn!("Rate limit for account {:#?} reached.", request.signer);

        return Err(ServerError::RateLimitError);
    }

    *rate_limit += 1;

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
        Err(e) => {
            tracing::warn!("SubmitSponsoredTransactionError {e}.");
            Err(ServerError::SubmitSponsoredTransactionError(e))
        }
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

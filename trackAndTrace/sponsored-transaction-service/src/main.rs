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
    base::contracts_common::Cursor,
    contract_client::ContractClient,
    smart_contracts::common::{
        AccountSignatures, Amount, CredentialSignatures, OwnedEntrypointName, Signature,
        SignatureEd25519,
    },
    types::{
        hashes::TransactionHash, smart_contracts::OwnedContractName, ContractAddress, RejectReason,
        WalletAccount,
    },
    v2::{BlockIdentifier, Client},
};
use concordium_smart_contract_engine::utils::{self, WasmVersion};
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
}

/// Decodes the reject_reason into a human-readable error based on the error
/// code definition in the `concordium-std` crate.
fn decode_concordium_std_error(reject_reason: i32) -> Option<String> {
    match reject_reason {
        -2147483647 => Some("[Error ()]".to_string()),
        -2147483646 => Some("[ParseError]".to_string()),
        -2147483645 => Some("[LogError::Full]".to_string()),
        -2147483644 => Some("[LogError::Malformed]".to_string()),
        -2147483643 => Some("[NewContractNameError::MissingInitPrefix]".to_string()),
        -2147483642 => Some("[NewContractNameError::TooLong]".to_string()),
        -2147483641 => Some("[NewReceiveNameError::MissingDotSeparator]".to_string()),
        -2147483640 => Some("[NewReceiveNameError::TooLong]".to_string()),
        -2147483639 => Some("[NewContractNameError::ContainsDot]".to_string()),
        -2147483638 => Some("[NewContractNameError::InvalidCharacters]".to_string()),
        -2147483637 => Some("[NewReceiveNameError::InvalidCharacters]".to_string()),
        -2147483636 => Some("[NotPayableError]".to_string()),
        -2147483635 => Some("[TransferError::AmountTooLarge]".to_string()),
        -2147483634 => Some("[TransferError::MissingAccount]".to_string()),
        -2147483633 => Some("[CallContractError::AmountTooLarge]".to_string()),
        -2147483632 => Some("[CallContractError::MissingAccount]".to_string()),
        -2147483631 => Some("[CallContractError::MissingContract]".to_string()),
        -2147483630 => Some("[CallContractError::MissingEntrypoint]".to_string()),
        -2147483629 => Some("[CallContractError::MessageFailed]".to_string()),
        -2147483628 => Some("[CallContractError::LogicReject]".to_string()),
        -2147483627 => Some("[CallContractError::Trap]".to_string()),
        -2147483626 => Some("[UpgradeError::MissingModule]".to_string()),
        -2147483625 => Some("[UpgradeError::MissingContract]".to_string()),
        -2147483624 => Some("[UpgradeError::UnsupportedModuleVersion]".to_string()),
        -2147483623 => Some("[QueryAccountBalanceError]".to_string()),
        -2147483622 => Some("[QueryContractBalanceError]".to_string()),
        _ => None,
    }
}

/// Decodes the reason for the transaction failure and returns a human-readable
/// error string.
///
/// If the error is NOT caused by a smart contract logical revert, the
/// `reject_reason` is already a human-readable error. No further decoding of
/// the error is needed and as such this function returns `None`.
/// An example of such a failure (rejected transaction) is the case when the
/// transaction runs out of energy which is represented by the human-readable
/// error variant "OutOfEnergy".
///
/// If the error is caused by a smart contract logical revert coming from the
/// `concordium-std` crate, this function decodes the error based on the error
/// code definition in the `concordium-std` crate.
///
/// If the error is caused by a smart contract logical revert coming from the
/// smart contract itself, this function uses the embedded `error_schema` to
/// decode the `reject_reason` into a human-readable error string.
async fn decode_reject_reason(
    reject_reason: RejectReason,
    mut node_client: Client,
    contract_address: ContractAddress,
) -> anyhow::Result<Option<String>> {
    match reject_reason {
        RejectReason::RejectedReceive {
            reject_reason: reject_reason_code,
            contract_address: _,
            receive_name: _,
            parameter: _,
        } => {
            // Step 1: Try to decode the `reject_reason` using the `concordium-std` error
            // codes. Step 2: Try to decode the `reject_reason` using the
            // `error_schema` embedded into the smart contract.
            match decode_concordium_std_error(reject_reason_code) {
                Some(decoded_error) => Ok(Some(decoded_error)),
                // If the error does not originate from the `concordium-std` crate,
                // try to decode the error using the `error_schema`.
                None => {
                    // We need to get the `permit_error_schema` from the smart contract instance
                    // first.
                    let contract_instance_info = node_client
                        .get_instance_info(contract_address, BlockIdentifier::LastFinal)
                        .await
                        .map_err(ServerError::GetContractInstanceInfo)?;

                    let contract_name = contract_instance_info.response.name();
                    let module_reference = contract_instance_info.response.source_module();

                    let wasm_module = node_client
                        .get_module_source(&module_reference, BlockIdentifier::LastFinal)
                        .await?
                        .response;

                    let schema = match wasm_module.version {
                        WasmVersion::V0 => {
                            utils::get_embedded_schema_v0(wasm_module.source.as_ref())
                                .map_err(ServerError::GetEmbeddedSchema)?
                        }
                        WasmVersion::V1 => {
                            utils::get_embedded_schema_v1(wasm_module.source.as_ref())
                                .map_err(ServerError::GetEmbeddedSchema)?
                        }
                    };

                    // We remove the 'init_' prefix from the contract name.
                    let contract_name = &contract_name.to_string()[5..];

                    let permit_error_schema = schema
                        .get_receive_error_schema(contract_name, "permit")
                        .map_err(|e| ServerError::GetPermitErrorSchema(e.into()))?;

                    // TODO: Adjust the `contract_client` to expose the `return_value`. Use it
                    // to cover the most general case without `Reject` trait.

                    // This conversion from `reject_reason_code` to `error_enum_tag` won't work in
                    // the most general case, but it works for smart contracts that derive the
                    // `Reject` trait on the error enum.
                    let error_enum_tag = [(reject_reason_code.abs() - 1) as u8];

                    let mut cursor = Cursor::new(error_enum_tag);

                    match permit_error_schema.to_json(&mut cursor) {
                        Ok(human_readable_error) => {
                            if let serde_json::Value::Object(obj) = human_readable_error {
                                Ok(Some(
                                    obj.keys()
                                        .next()
                                        // This error can not happen if a valid error_schema is embedded into the smart contract.
                                        .context(
                                            "No matching error variant in the error schema found for the \
                                         given reject reason.",
                                        )?
                                        .to_string(),
                                ))
                            } else {
                                // This error can not happen if a valid error_schema is embedded
                                // into the smart contract.
                                Err(ServerError::NoMatchingErrorVariant.into())
                            }
                        }

                        // This error can not happen if a valid error_schema is embedded into the
                        // smart contract.
                        Err(e) => Err(e.into()),
                    }
                }
            }
        }
        // If the error is NOT caused by a smart contract logical revert, the `reject_reason` is
        // already a human-readable error. No further decoding of the error is needed.
        // An example of such a transaction is the error variant "OutOfEnergy".
        _ => Ok(None),
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
        app.allowed_accounts,
        app.allowed_contracts,
    );

    let router = Router::new()
        .route("/api/submitTransaction", post(handle_transaction))
        .with_state(state)
        .layer(CorsLayer::new()
               .allow_origin(AllowOrigin::mirror_request())
               .allow_headers([http::header::CONTENT_TYPE])
               .allow_methods([http::Method::POST]))
        .layer(
            tower_http::trace::TraceLayer::new_for_http()
                .make_span_with(tower_http::trace::DefaultMakeSpan::new())
                .on_response(tower_http::trace::DefaultOnResponse::new()),
        )
        .layer(tower_http::timeout::TimeoutLayer::new(
            std::time::Duration::from_millis(app.request_timeout),
        ))
        // Allow at most 70kB of data. Enough for max parameter u16::MAX and the signatures etc.
        .layer(tower_http::limit::RequestBodyLimitLayer::new(70_000))
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

    let mut contract_client = ContractClient::<()>::new(
        state.node_client.clone(),
        request.contract_address,
        OwnedContractName::new(format!("init_{}", request.contract_name))?,
    );

    let dry_run = match contract_client
        .dry_run_update("permit", Amount::zero(), state.keys.address, &param)
        .await
    {
        Ok(dry_run) => dry_run,
        Err(e) => match e {
            ServerError::TransactionSimulationError(reject_reason) => {
                let node_client = state.node_client.clone();

                match decode_reject_reason(
                    reject_reason.clone(),
                    node_client,
                    request.contract_address,
                )
                .await
                {
                    Ok(decoded_error) => {
                        tracing::debug!(
                            "Decoded reject reason during dry run of transaction: {:?}",
                            decoded_error
                        );

                        match decoded_error {
                            Some(decoded_error) => {
                                return Err(ServerError::TransactionSimulationErrorDecoded(
                                    decoded_error,
                                    reject_reason,
                                ));
                            }
                            None => {
                                return Err(ServerError::TransactionSimulationError(reject_reason));
                            }
                        }
                    }
                    // This arm should not happen since we covered all possible `reject_reasons`
                    // in the above `decode_reject_reason` function that could occure
                    // when invoking the `permit` entrypoint of the `track_and_trace` contract.
                    Err(e) => {
                        return Err(ServerError::TransactionSimulationErrorNotDecoded(
                            reject_reason,
                            e,
                        ));
                    }
                }
            }
            _ => {
                return Err(e);
            }
        },
    };

    //    pub enum InvokeContractResult {
    //     #[serde(rename = "success", rename_all = "camelCase")]
    //     Success {
    //         return_value: Option<ReturnValue>,
    //         #[serde(deserialize_with = "contract_trace_via_events::deserialize")]
    //         events:       Vec<ContractTraceElement>,
    //         used_energy:  Energy,
    //     },
    //     #[serde(rename = "failure", rename_all = "camelCase")]
    //     Failure {
    //         return_value: Option<ReturnValue>,
    //         reason:       RejectReason,
    //         used_energy:  Energy,
    //     },
    // }

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

mod types;
use crate::{crypto_common::types::TransactionTime, types::*};
use anyhow::Context;
use clap::Parser;
use concordium_contracts_common::OwnedEntrypointName;
use concordium_rust_sdk::{
    common::{self as crypto_common},
    smart_contracts::common::{
        AccountSignatures, Amount, CredentialSignatures, Signature, SignatureEd25519,
    },
    types::{
        smart_contracts,
        smart_contracts::{ContractContext, InvokeContractResult},
        transactions, Energy, WalletAccount,
    },
    v2::BlockIdentifier,
};
use std::{
    collections::{BTreeMap, HashMap},
    convert::Infallible,
    path::PathBuf,
    sync::Arc,
};
use tokio::sync::Mutex;
use tonic::transport::ClientTlsConfig;
use warp::{http, http::StatusCode, Filter, Rejection};

/// Structure used to receive the correct command line arguments.
#[derive(clap::Parser, Debug)]
#[clap(arg_required_else_help(true))]
#[clap(version, author)]
struct IdVerifierConfig {
    #[clap(
        long = "node",
        help = "GRPC V2 interface of the node.",
        default_value = "http://localhost:20000"
    )]
    endpoint:         concordium_rust_sdk::v2::Endpoint,
    #[clap(
        long = "port",
        default_value = "8100",
        help = "Port on which the server will listen on."
    )]
    port:             u16,
    #[clap(
        long = "log-level",
        default_value = "debug",
        help = "Maximum log level."
    )]
    log_level:        log::LevelFilter,
    #[clap(long = "account", help = "Path to the account key file.")]
    keys_path:        PathBuf,
    #[clap(
        long = "allowed-accounts",
        help = "A list of accounts allowed to submit transactions. Use 'any' if you have a custom \
                authentication scheme in place."
    )]
    allowed_accounts: AllowedAccounts,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = IdVerifierConfig::parse();
    let mut log_builder = env_logger::Builder::new();
    // only log the current module (main).
    log_builder.filter_level(app.log_level); // filter filter_module(module_path!(), app.log_level);
    log_builder.init();

    let endpoint = if app
        .endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &http::uri::Scheme::HTTPS)
    {
        app.endpoint.tls_config(ClientTlsConfig::new())?
    } else {
        app.endpoint
    };

    let mut client = concordium_rust_sdk::v2::Client::new(endpoint).await?;
    log::debug!("Got a client");

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("Content-Type")
        .allow_methods(vec!["POST", "GET"]);

    log::debug!("Acquire keys.");

    // load account keys and sender address from a file
    let keys: Arc<WalletAccount> = Arc::new(
        serde_json::from_str(
            &std::fs::read_to_string(app.keys_path).context("Could not read the keys file.")?,
        )
        .context("Could not parse the keys file.")?,
    );

    log::debug!("Acquire nonce of wallet account.");

    let nonce_response = client
        .get_next_account_sequence_number(&keys.address)
        .await
        .map_err(|e| {
            log::warn!("NonceQueryError {:#?}.", e);
            LogError::NonceQueryError
        })?;

    let state = Server {
        nonce:       Arc::new(Mutex::new(nonce_response.nonce)),
        rate_limits: Arc::new(Mutex::new(HashMap::new())),
    };

    let provide_submit_transaction = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("api" / "submitTransaction"))
        .and(warp::body::json())
        .and_then(move |request: InputParams| {
            log::debug!("Process transaction.");

            handle_transaction(client.clone(), keys.clone(), state.clone(), request)
        });

    log::debug!("Serve response back to frontend.");

    let server = provide_submit_transaction
        .recover(handle_rejection)
        .with(cors)
        .with(warp::trace::request());
    warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
    Ok(())
}

const ENERGY: u64 = 6000;
const RATE_LIMIT_PER_ACCOUNT: u8 = 30;

pub async fn handle_transaction(
    mut client: concordium_rust_sdk::v2::Client,
    key: Arc<WalletAccount>,
    state: Server,
    request: InputParams,
) -> Result<impl warp::Reply, Rejection> {
    let message: PermitMessage = PermitMessage {
        contract_address: request.contract_address,
        nonce:            request.nonce,
        timestamp:        request.expiry_time,
        entry_point:      OwnedEntrypointName::new_unchecked("permit".into()),
        parameter:        request.parameter,
    };

    let signer = request.signer;
    let request_signature = request.signature;
    let contract_address = request.contract_address;

    log::debug!("Create signature map.");

    let mut signature = [0; 64];
    hex::decode_to_slice(request_signature, &mut signature)
        .map_err(|_| LogError::SignatureError)?;

    let mut inner_signature_map = BTreeMap::new();
    inner_signature_map.insert(0, Signature::Ed25519(SignatureEd25519(signature)));

    let mut signature_map = BTreeMap::new();
    signature_map.insert(0, CredentialSignatures {
        sigs: inner_signature_map,
    });

    log::debug!("Create Parameter.");

    let param: PermitParam = PermitParam {
        message,
        signature: AccountSignatures {
            sigs: signature_map,
        },
        signer,
    };

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    let parameter =
        smart_contracts::OwnedParameter::try_from(bytes).map_err(|_| LogError::ParameterError)?;

    log::debug!("Simulate transaction to check its validity.");

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", request.contract_name))
            .map_err(|_| LogError::ContractNameError(request.contract_name.clone()))?;

    let context = ContractContext {
        invoker:   Some(concordium_rust_sdk::types::Address::Account(key.address)),
        contract:  contract_address,
        amount:    Amount::zero(),
        method:    receive_name.clone(),
        parameter: parameter.clone(),
        energy:    Energy { energy: ENERGY },
    };

    let info = client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    if info.is_err() {
        log::error!("SimulationInvokeError {:#?}.", info);

        return Err(warp::reject::custom(LogError::SimulationInvokeError));
    }

    match &info.as_ref().unwrap().response {
        InvokeContractResult::Success {
            return_value: _,
            events: _,
            used_energy: _,
        } => log::debug!("TransactionSimulationSuccess"),
        InvokeContractResult::Failure {
            return_value: _,
            reason,
            used_energy: _,
        } => {
            log::error!("TransactionSimulationError {:#?}.", info);

            return Err(warp::reject::custom(LogError::TransactionSimulationError(
                RevertReason {
                    reason: reason.clone(),
                },
            )));
        }
    }

    log::debug!("Create transaction.");

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: contract_address,
            receive_name,
            message: parameter,
        },
    };

    // Transaction should expiry after one hour.
    let transaction_expiry_seconds = chrono::Utc::now().timestamp() as u64 + 3600;

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
    log::debug!("Check rate limit.");

    let mut rate_limits = state.rate_limits.lock().await;

    let limit = rate_limits.entry(signer).or_insert_with(|| 0u8);

    if *limit >= RATE_LIMIT_PER_ACCOUNT {
        log::error!("Rate limit for account {:#?} reached.", signer);

        return Err(warp::reject::custom(LogError::RateLimitError));
    }

    *limit += 1;

    let tx = transactions::send::make_and_sign_transaction(
        &key.keys,
        key.address,
        *nonce,
        TransactionTime {
            seconds: transaction_expiry_seconds,
        },
        concordium_rust_sdk::types::transactions::send::GivenEnergy::Absolute(Energy {
            energy: ENERGY,
        }),
        payload,
    );

    let bi = transactions::BlockItem::AccountTransaction(tx);

    log::debug!("Submit transaction.");

    match client.send_block_item(&bi).await {
        Ok(hash) => {
            *nonce = nonce.next();

            Ok(warp::reply::json(&TxHash { tx_hash: hash }))
        }
        Err(e) => {
            log::error!("SubmitSponsoredTransactionError {:#?}.", e);

            Err(warp::reject::custom(
                LogError::SubmitSponsoredTransactionError,
            ))
        }
    }
}

pub async fn handle_rejection(err: Rejection) -> Result<impl warp::Reply, Infallible> {
    if err.is_not_found() {
        let code = StatusCode::NOT_FOUND;
        let message = "Not found.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::NodeAccess(e)) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = format!("Cannot access the node: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(LogError::SimulationInvokeError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Simulation invoke error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::TransactionSimulationError(e)) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = format!(
            "Transaction simulation error. Your transaction would revert with the given input \
             parameters: {}",
            e
        );
        Ok(mk_reply(message, code))
    } else if let Some(LogError::SubmitSponsoredTransactionError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Submit sponsored transaction error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::SignatureError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Signature error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::RateLimitError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Rate limit reached for the account. Use a different account.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::ParameterError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Parameter error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::NonceQueryError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Account info query error.";
        Ok(mk_reply(message.into(), code))
    } else if err
        .find::<warp::filters::body::BodyDeserializeError>()
        .is_some()
    {
        let code = StatusCode::BAD_REQUEST;
        let message = "Malformed body.";
        Ok(mk_reply(message.into(), code))
    } else {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Internal error.";
        Ok(mk_reply(message.into(), code))
    }
}

/// Helper function to make the reply.
fn mk_reply(message: String, code: StatusCode) -> impl warp::Reply {
    let msg = ErrorResponse {
        message,
        code: code.as_u16(),
    };
    warp::reply::with_status(warp::reply::json(&msg), code)
}

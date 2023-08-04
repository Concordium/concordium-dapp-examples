use crate::crypto_common::types::TransactionTime;
use crate::types::*;
use concordium_rust_sdk::cis2::{
    AdditionalData, OperatorUpdate, Receiver, TokenAmount, Transfer, UpdateOperator,
};
use concordium_rust_sdk::smart_contracts::common::{
    AccountAddress, AccountSignatures, Address, Amount, ContractAddress, CredentialSignatures,
    OwnedEntrypointName, Signature, SignatureEd25519,
};
use concordium_rust_sdk::types::smart_contracts::{ContractContext, InvokeContractResult};
use concordium_rust_sdk::types::{smart_contracts, transactions, Energy, WalletAccount};
use concordium_rust_sdk::v2::BlockIdentifier;
use std::collections::BTreeMap;
use std::convert::Infallible;
use std::str::FromStr;
use std::sync::Arc;
use warp::{http::StatusCode, Rejection};

const CONTRACT_NAME: &str = "cis3_nft";
const ENERGY: u64 = 6000;
const RATE_LIMIT_PER_ACCOUNT: u8 = 30;

pub async fn handle_signature_update_operator(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: UpdateOperatorInputParams,
    smart_contract_index: u64,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create payload.");

    let operator_update = match request.add_operator {
        true => OperatorUpdate::Add,
        false => OperatorUpdate::Remove,
    };

    let update_operator = UpdateOperator {
        update: operator_update,
        operator: Address::Account(request.operator),
    };
    let payload = UpdateOperatorParams(vec![update_operator]);

    log::debug!("Create PermitMessage.");

    let message: PermitMessage = PermitMessage {
        contract_address: ContractAddress {
            index: smart_contract_index,
            subindex: 0,
        },
        nonce: request.nonce,
        timestamp: request.timestamp,
        entry_point: OwnedEntrypointName::new_unchecked("updateOperator".into()),
        payload: concordium_rust_sdk::smart_contracts::common::to_bytes(&payload),
    };

    submit_transaction(
        client,
        key_update_operator,
        state,
        message,
        request.signature,
        request.signer,
        smart_contract_index,
    )
    .await
}

pub async fn handle_signature_transfer(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: TransferInputParams,
    smart_contract_index: u64,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create payload.");

    let transfer = Transfer {
        from: Address::Account(request.from),
        to: Receiver::Account(request.to),
        token_id: request.token_id,
        amount: TokenAmount::from_str("1").map_err(|_| LogError::TokenAmountError)?,
        data: AdditionalData::new(vec![]).map_err(|_| LogError::AdditionalDataError)?,
    };

    let payload = TransferParams(vec![transfer]);

    log::debug!("Create PermitMessage.");

    let message: PermitMessage = PermitMessage {
        contract_address: ContractAddress {
            index: smart_contract_index,
            subindex: 0,
        },
        nonce: request.nonce,
        timestamp: request.timestamp,
        entry_point: OwnedEntrypointName::new_unchecked("transfer".into()),
        payload: concordium_rust_sdk::smart_contracts::common::to_bytes(&payload),
    };

    submit_transaction(
        client,
        key_update_operator,
        state,
        message,
        request.signature,
        request.signer,
        smart_contract_index,
    )
    .await
}

pub async fn submit_transaction(
    mut client: concordium_rust_sdk::v2::Client,
    key: Arc<WalletAccount>,
    state: Server,
    message: PermitMessage,
    request_signature: String,
    signer: AccountAddress,
    smart_contract_index: u64,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create signature map.");

    let mut signature = [0; 64];
    hex::decode_to_slice(request_signature, &mut signature)
        .map_err(|_| LogError::SignatureError)?;

    let mut inner_signature_map = BTreeMap::new();
    inner_signature_map.insert(0, Signature::Ed25519(SignatureEd25519(signature)));

    let mut signature_map = BTreeMap::new();
    signature_map.insert(
        0,
        CredentialSignatures {
            sigs: inner_signature_map,
        },
    );

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

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", CONTRACT_NAME))
            .map_err(|_| LogError::OwnedReceiveNameError)?;

    log::debug!("Simulate transaction to check its validity.");

    let context = ContractContext {
        invoker: Some(concordium_rust_sdk::types::Address::Account(key.address)),
        contract: ContractAddress {
            index: smart_contract_index,
            subindex: 0,
        },
        amount: Amount::zero(),
        method: receive_name.clone(),
        parameter: parameter.clone(),
        energy: Energy { energy: ENERGY },
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
            address: ContractAddress {
                index: smart_contract_index,
                subindex: 0,
            },
            receive_name,
            message: parameter,
        },
    };

    // Transaction should expiry after one hour.
    let transaction_expiry_seconds = chrono::Utc::now().timestamp() as u64 + 3600;

    // Get the current nonce for the backend wallet and lock it. This is necessary since it is possible that API requests come in parallel.
    // The nonce is increased by 1 and its lock is released after the transaction is submitted to the blockchain.
    let mut nonce = state.nonce.lock().await;

    // There should be rate limiting in place to prevent the sponsor wallet from being drained.
    // We only allow up to RATE_LIMIT_PER_ACCOUNT API calls to this backend.
    // The rate_limits are transient and are reset on server restart.

    // We only check the rate_limits after acquiring the nonce lock. If we do it before we don't
    // have guarantees due to possible parallel API requests.

    // On mainnet, a user can only create around 25 accounts per identity.
    // In production, a user registration/authentication at the frontend can be added or a database that permanently
    // keeps track of the rate_limits so that the server can be restarted and reload the rate_limit values from the database.
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
        let message = format!("Transaction simulation error. Your transaction would revert with the given input parameters: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(LogError::SubmitSponsoredTransactionError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Submit sponsored transaction error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::OwnedReceiveNameError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Owned received name error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::TokenAmountError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "TokenAmount error.";
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
    } else if let Some(LogError::AdditionalDataError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "AdditionalData error.";
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

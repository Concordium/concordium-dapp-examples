use crate::crypto_common::types::TransactionTime;
use crate::types;
use crate::types::*;
use concordium_rust_sdk::cis2::{
    AdditionalData, OperatorUpdate, Receiver, TokenAmount, TokenId, Transfer, UpdateOperator,
};
use concordium_rust_sdk::smart_contracts::common::{
    AccountAddress, Address, Amount, ContractAddress, OwnedEntrypointName, Timestamp,
};
use concordium_rust_sdk::types::smart_contracts::{
    ContractContext, InvokeContractResult, OwnedReceiveName,
};
use concordium_rust_sdk::types::{smart_contracts, transactions, Energy, WalletAccount};
use concordium_rust_sdk::v2::BlockIdentifier;
use std::collections::BTreeMap;
use std::convert::Infallible;
use std::str::FromStr;
use std::sync::Arc;
use warp::{http::StatusCode, Rejection};

const SMART_CONTRACT_INDEX: u64 = 4184;
const CONTRACT_NAME: &str = "cis3_nft";
const ENERGY: u64 = 6000;

pub async fn handle_signature_update_operator(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: UpdateOperatorInputParams,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create payload.");

    let operator_update = match request.add_operator {
        true => OperatorUpdate::Add,
        false => OperatorUpdate::Remove,
    };

    let update_operator = UpdateOperator {
        update: operator_update,
        operator: Address::Account(
            AccountAddress::from_str(&request.operator)
                .map_err(|_| LogError::AccountFromStringError)?,
        ),
    };
    let payload = UpdateOperatorParams(vec![update_operator]);

    let nonce = request
        .nonce
        .parse::<u64>()
        .map_err(|_| LogError::NonceError)?;

    let timestamp = request
        .timestamp
        .parse::<u64>()
        .map_err(|_| LogError::TimestampError)?;

    log::debug!("Create PermitMessage.");

    let message: PermitMessage = PermitMessage {
        timestamp: Timestamp::from_timestamp_millis(timestamp),
        contract_address: ContractAddress {
            index: SMART_CONTRACT_INDEX,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("updateOperator".into()),
        nonce,
        payload: types::PermitPayload::UpdateOperator(payload),
    };

    submit_transaction(
        client,
        key_update_operator,
        state,
        message,
        request.signature,
        request.signer,
    )
    .await
}

pub async fn handle_signature_transfer(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: TransferInputParams,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create payload.");

    let transfer = Transfer {
        from: Address::Account(
            AccountAddress::from_str(&request.from)
                .map_err(|_| LogError::AccountFromStringError)?,
        ),
        to: Receiver::Account(
            AccountAddress::from_str(&request.to).map_err(|_| LogError::AccountFromStringError)?,
        ),
        token_id: TokenId::new_unchecked(
            hex::decode(request.token_id).map_err(|_| LogError::TokenIdError)?,
        ),
        amount: TokenAmount::from_str("1").map_err(|_| LogError::TokenAmountError)?,
        data: AdditionalData::new(vec![]).map_err(|_| LogError::AdditionalDataError)?,
    };

    let payload = TransferParams(vec![transfer]);

    let nonce = request
        .nonce
        .parse::<u64>()
        .map_err(|_| LogError::NonceError)?;

    let timestamp = request
        .timestamp
        .parse::<u64>()
        .map_err(|_| LogError::TimestampError)?;

    log::debug!("Create PermitMessage.");

    let message: PermitMessage = PermitMessage {
        timestamp: Timestamp::from_timestamp_millis(timestamp),
        contract_address: ContractAddress {
            index: SMART_CONTRACT_INDEX,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("transfer".into()),
        nonce,
        payload: types::PermitPayload::Transfer(payload),
    };

    submit_transaction(
        client,
        key_update_operator,
        state,
        message,
        request.signature,
        request.signer,
    )
    .await
}

pub async fn submit_transaction(
    mut client: concordium_rust_sdk::v2::Client,
    key: Arc<WalletAccount>,
    state: Server,
    message: PermitMessage,
    request_signature: String,
    signer: String,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create signature map.");

    let mut signature = [0; 64];
    hex::decode_to_slice(request_signature, &mut signature)
        .map_err(|_| LogError::SignatureError)?;

    let mut inner_signature_map: BTreeMap<u8, types::SignatureEd25519> = BTreeMap::new();
    inner_signature_map.insert(0, types::SignatureEd25519(signature));

    let mut signature_map: BTreeMap<u8, BTreeMap<u8, types::SignatureEd25519>> = BTreeMap::new();
    signature_map.insert(0, inner_signature_map);

    log::debug!("Create PermitParam.");

    let param: PermitParam = PermitParam {
        message,
        signature: signature_map,
        signer: AccountAddress::from_str(&signer).map_err(|_| LogError::AccountFromStringError)?,
    };

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    log::debug!("Simulate transaction to check its validity.");

    let context = ContractContext {
        invoker: Some(concordium_rust_sdk::types::Address::Account(key.address)),
        contract: ContractAddress {
            index: SMART_CONTRACT_INDEX,
            subindex: 0,
        },
        amount: Amount::zero(),
        method: OwnedReceiveName::try_from(format!("{}.permit", CONTRACT_NAME))
            .map_err(|_| LogError::OwnedReceiveNameError)?,
        parameter: smart_contracts::OwnedParameter::try_from(bytes.clone())
            .map_err(|_| LogError::ParameterError)?,
        energy: Energy { energy: ENERGY },
    };

    let info = client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    //   log::debug!("{:?}", info.is_ok());

    match &info.as_ref().unwrap().response {
        InvokeContractResult::Success {
            return_value: _,
            events: _,
            used_energy: _,
        } => log::debug!("SimulationInvokeSuccess"),
        InvokeContractResult::Failure {
            return_value: _,
            reason: _,
            used_energy: _,
        } => {
            log::error!("SimulationInvokeError {:#?}.", info);

            return Err(warp::reject::custom(LogError::SimulationInvokeError));
        }
    }

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", CONTRACT_NAME))
            .map_err(|_| LogError::OwnedReceiveNameError)?;

    log::debug!("Create transaction.");

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: ContractAddress {
                index: SMART_CONTRACT_INDEX,
                subindex: 0,
            },
            receive_name,
            message: smart_contracts::OwnedParameter::try_from(bytes.clone())
                .map_err(|_| LogError::ParameterError)?,
        },
    };

    let mut nonce = state.nonce.lock().await;

    // Transaction should expiry after one hour.
    let transaction_expiry_seconds = chrono::Utc::now().timestamp() as u64 + 3600;

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
            log::warn!("SumbitSponsoredTransactionError {:#?}.", e);

            Err(warp::reject::custom(
                LogError::SumbitSponsoredTransactionError,
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
    } else if let Some(LogError::AccountFromStringError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Account from_str error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::SimulationInvokeError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Simulation invoke error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::SumbitSponsoredTransactionError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Sumbit sponsored transaction error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::OwnedReceiveNameError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Owned received name error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::TokenIdError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "TokenId error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::TokenAmountError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "TokenAmount error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::SignatureError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Signature error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::NonceError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Nonce error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(LogError::TimestampError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Timestamp error.";
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

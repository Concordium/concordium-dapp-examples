use crate::types;
use crate::types::*;
use std::collections::BTreeMap;
use std::convert::Infallible;
use std::str::FromStr;
use std::sync::Arc;
use warp::{http::StatusCode, Rejection};

use concordium_rust_sdk::cis2::TokenAmount;
use concordium_rust_sdk::cis2::TokenId;

use concordium_rust_sdk::cis2::OperatorUpdate;
use concordium_rust_sdk::cis2::Transfer;
use concordium_rust_sdk::cis2::UpdateOperator;
use concordium_rust_sdk::cis2::{AdditionalData, Receiver};
use concordium_rust_sdk::smart_contracts::common::{
    AccountAddress, Address, Amount, ContractAddress, OwnedEntrypointName, Timestamp,
};
use concordium_rust_sdk::types::Energy;

use concordium_rust_sdk::v2;

use crate::crypto_common::types::TransactionTime;
use concordium_rust_sdk::types::smart_contracts;
use concordium_rust_sdk::types::transactions;
use concordium_rust_sdk::types::WalletAccount;

// const SMART_CONTRACT_INDEX = 

pub async fn handle_signature_update_operator(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: UpdateOperatorInputParams,
) -> Result<impl warp::Reply, Rejection> {
    let mut client = client.clone();

    let ai = client
        .get_account_info(
            &key_update_operator.address.into(),
            &v2::BlockIdentifier::Best,
        )
        .await
        .map_err(|_| InjectStatementError::AccountInfoQueryError)?;

    let nonce = ai.response.account_nonce;

    let operator_update = match request.add_operator {
        true => OperatorUpdate::Add,
        false => OperatorUpdate::Remove,
    };

    let update_operator = UpdateOperator {
        update: operator_update,
        operator: Address::Account(
            AccountAddress::from_str(&request.operator)
                .map_err(|_| InjectStatementError::AccountFromStringError)?,
        ),
    };
    let payload = UpdateOperatorParams(vec![update_operator]);

    let nonce_payload = match request.nonce.parse::<u64>() {
        Ok(nonce_payload) => nonce_payload,
        Err(_e) => 0,
    };

    let timestamp = match request.timestamp.parse::<u64>() {
        Ok(timestamp) => timestamp,
        Err(_e) => 0,
    };

    let message: PermitMessage = PermitMessage {
        timestamp: Timestamp::from_timestamp_millis(timestamp),
        contract_address: ContractAddress {
            index: 4129,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("updateOperator".into()),
        nonce: nonce_payload,
        payload: types::PermitPayload::UpdateOperator(payload),
    };

    let mut signature = [0; 64];
    hex::decode_to_slice(request.signature, &mut signature)
        .map_err(|_| InjectStatementError::SignatureError)?;

    let mut inner_signature_map: BTreeMap<u8, types::SignatureEd25519> = BTreeMap::new();
    inner_signature_map.insert(0, types::SignatureEd25519(signature));

    let mut signature_map: BTreeMap<u8, BTreeMap<u8, types::SignatureEd25519>> = BTreeMap::new();
    signature_map.insert(0, inner_signature_map);

    let param: PermitParam = PermitParam {
        message,
        signature: signature_map,
        signer: AccountAddress::from_str(&request.signer)
            .map_err(|_| InjectStatementError::AccountFromStringError)?,
    };

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    let contract_name = "cis3_nft";

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", contract_name))
            .map_err(|_| InjectStatementError::OwnedReceiveNameError)?;

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: ContractAddress {
                index: 4129,
                subindex: 0,
            },
            receive_name,
            message: smart_contracts::Parameter::try_from(bytes)
                .map_err(|_| InjectStatementError::ParameterError)?,
        },
    };

    let tx = transactions::send::make_and_sign_transaction(
        &key_update_operator.keys,
        key_update_operator.address,
        nonce,
        TransactionTime {
            seconds: 888888888888888,
        },
        concordium_rust_sdk::types::transactions::send::GivenEnergy::Absolute(Energy {
            energy: 234235,
        }),
        payload,
    );

    let bi = transactions::BlockItem::AccountTransaction(tx);

    let hash = client
        .send_block_item(&bi)
        .await
        .map_err(|_| InjectStatementError::SumbitSponsoredTransactionError)?;

    Ok(warp::reply::json(&TxHash { tx_hash: hash }))
}

pub async fn handle_signature_transfer(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: TransferInputParams,
) -> Result<impl warp::Reply, Rejection> {
    let mut client = client.clone();

    let ai = client
        .get_account_info(
            &key_update_operator.address.into(),
            &v2::BlockIdentifier::Best,
        )
        .await
        .map_err(|_| InjectStatementError::AccountInfoQueryError)?;

    let nonce = ai.response.account_nonce;

    let transfer = Transfer {
        from: Address::Account(
            AccountAddress::from_str(&request.from)
                .map_err(|_| InjectStatementError::AccountFromStringError)?,
        ),
        to: Receiver::Account(
            AccountAddress::from_str(&request.to)
                .map_err(|_| InjectStatementError::AccountFromStringError)?,
        ),
        token_id: TokenId::new_unchecked(
            hex::decode(request.token_id).map_err(|_| InjectStatementError::TokenIdError)?,
        ),
        amount: TokenAmount::from_str("1").map_err(|_| InjectStatementError::TokenAmountError)?,
        data: AdditionalData { data: vec![] },
    };

    let payload = TransferParams(vec![transfer]);

    let nonce_payload = match request.nonce.parse::<u64>() {
        Ok(nonce_payload) => nonce_payload,
        Err(_e) => 0,
    };

    let timestamp = match request.timestamp.parse::<u64>() {
        Ok(timestamp) => timestamp,
        Err(_e) => 0,
    };

    let message: PermitMessage = PermitMessage {
        timestamp: Timestamp::from_timestamp_millis(timestamp),
        contract_address: ContractAddress {
            index: 4129,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("transfer".into()),
        nonce: nonce_payload,
        payload: types::PermitPayload::Transfer(payload),
    };

    let mut signature = [0; 64];
    hex::decode_to_slice(request.signature, &mut signature)
        .map_err(|_| InjectStatementError::SignatureError)?;

    let mut inner_signature_map: BTreeMap<u8, types::SignatureEd25519> = BTreeMap::new();
    inner_signature_map.insert(0, types::SignatureEd25519(signature));

    let mut signature_map: BTreeMap<u8, BTreeMap<u8, types::SignatureEd25519>> = BTreeMap::new();
    signature_map.insert(0, inner_signature_map);

    let param: PermitParam = PermitParam {
        message,
        signature: signature_map,
        signer: AccountAddress::from_str(&request.signer)
            .map_err(|_| InjectStatementError::AccountFromStringError)?,
    };

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    let contract_name = "cis3_nft";

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", contract_name))
            .map_err(|_| InjectStatementError::OwnedReceiveNameError)?;

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: ContractAddress {
                index: 4129,
                subindex: 0,
            },
            receive_name,
            message: smart_contracts::Parameter::try_from(bytes)
                .map_err(|_| InjectStatementError::ParameterError)?,
        },
    };

    let tx = transactions::send::make_and_sign_transaction(
        &key_update_operator.keys,
        key_update_operator.address,
        nonce,
        TransactionTime {
            seconds: 888888888888888,
        },
        concordium_rust_sdk::types::transactions::send::GivenEnergy::Absolute(Energy {
            energy: 234235,
        }),
        payload,
    );

    let bi = transactions::BlockItem::AccountTransaction(tx);

    let hash = client
        .send_block_item(&bi)
        .await
        .map_err(|_| InjectStatementError::SumbitSponsoredTransactionError)?;

    Ok(warp::reply::json(&TxHash { tx_hash: hash }))
}

pub async fn handle_rejection(err: Rejection) -> Result<impl warp::Reply, Infallible> {
    if err.is_not_found() {
        let code = StatusCode::NOT_FOUND;
        let message = "Not found.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::NodeAccess(e)) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = format!("Cannot access the node: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::AccountFromStringError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Account from_str error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::SumbitSponsoredTransactionError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Sumbit sponsored transaction error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::OwnedReceiveNameError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Owned received name error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::TokenIdError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "TokenId error.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::TokenAmountError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "TokenAmount error.";
        Ok(mk_reply(message.into(), code))
    }  else if let Some(InjectStatementError::SignatureError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Signature error.";
        Ok(mk_reply(message.into(), code))
    }else if let Some(InjectStatementError::ParameterError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Parameter error.";
        Ok(mk_reply(message.into(), code))
    }     else if let Some(InjectStatementError::AccountInfoQueryError) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Account info query error.";
        Ok(mk_reply(message.into(), code))
    }else if err
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

use crate::types;
use crate::types::*;
use std::collections::BTreeMap;
use std::convert::Infallible;
use std::str::FromStr;
use hex;
use std::sync::Arc;
use warp::{http::StatusCode, Rejection};

use concordium_rust_sdk::cis2::TokenId;
use concordium_rust_sdk::cis2::TokenAmount;

use concordium_rust_sdk::smart_contracts::common::{
    AccountAddress, Address, Amount, ContractAddress, OwnedEntrypointName, Timestamp,
};
use concordium_rust_sdk::types::Energy;
use concordium_rust_sdk::cis2::UpdateOperator;
use concordium_rust_sdk::cis2::OperatorUpdate;
use concordium_rust_sdk::cis2::Transfer;
use concordium_rust_sdk::cis2::{Receiver, AdditionalData};

use concordium_rust_sdk::v2;

use crate::crypto_common::types::TransactionTime;
use concordium_rust_sdk::types::smart_contracts;
use concordium_rust_sdk::types::transactions;
use concordium_rust_sdk::types::WalletAccount;

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
        .unwrap();

    let nonce = ai.response.account_nonce;

    log::debug!("nonce");
    log::debug!("{:?}", nonce);

    let operator_update = match request.add_operator {
        true => OperatorUpdate::Add,
        false => OperatorUpdate::Remove,
    };

    let update_operator = UpdateOperator {
        update: operator_update,
        operator: Address::Account(AccountAddress::from_str(&request.operator).unwrap()),
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
            index: 3903,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("updateOperator".into()),
        nonce: nonce_payload,
        payload: types::PermitPayload::UpdateOperator(payload),
    };

    log::debug!("message");
    log::debug!("{:?}", message);

    log::debug!("{:?}", "signature");
    log::debug!("{:?}", request.signature);

    let mut signature = [0; 64];
    hex::decode_to_slice( request.signature, &mut signature);

    let mut inner_signature_map: BTreeMap<u8, SignatureEd25519> = BTreeMap::new();
    inner_signature_map.insert(0, types::SignatureEd25519(signature));

    let mut signature_map: BTreeMap<u8, BTreeMap<u8, SignatureEd25519>> = BTreeMap::new();
    signature_map.insert(0, inner_signature_map);

    let param: PermitParam = PermitParam {
        message,
        signature: signature_map,
        signer: AccountAddress::from_str(&request.signer).unwrap(),
    };

    log::debug!("param");
    log::debug!("{:?}", param);

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    let contract_name = "cis3_nft";

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", contract_name)).unwrap();

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: ContractAddress {
                index: 3903,
                subindex: 0,
            },
            receive_name,
            message: smart_contracts::Parameter::try_from(bytes).unwrap(),
        },
    };
    log::debug!("{:?}", payload);

    log::debug!("keys");
    log::debug!("{:?}", key_update_operator);

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

    log::debug!("transaction: {:?}", tx);
    let bi = transactions::BlockItem::AccountTransaction(tx);

    let hash = client.send_block_item(&bi).await.unwrap();

    Ok(warp::reply::json(&hash))
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
        .unwrap();

    let nonce = ai.response.account_nonce;

    log::debug!("nonce");
    log::debug!("{:?}", nonce);

    let token_id:u32 = match request.token_id.parse::<u32>() {
        Ok(token_id) => token_id,
        Err(_e) => 0,
    };

    let transfer = Transfer {
        from: Address::Account(AccountAddress::from_str(&request.from).unwrap()),
        to: Receiver::Account(AccountAddress::from_str(&request.to).unwrap()),
        token_id:TokenId::new_unchecked(token_id.to_le_bytes().to_vec()),
        amount: TokenAmount::from_str("1").unwrap(),
        data: AdditionalData{data:vec![]},
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
            index: 3903,
            subindex: 0,
        },
        entry_point: OwnedEntrypointName::new_unchecked("transfer".into()),
        nonce: nonce_payload,
        payload: types::PermitPayload::Transfer(payload),
    };

    log::debug!("message");
    log::debug!("{:?}", message);

    log::debug!("{:?}", "signature");
    log::debug!("{:?}", request.signature);

    let mut signature = [0; 64];
    hex::decode_to_slice( request.signature, &mut signature);

    let mut inner_signature_map: BTreeMap<u8, SignatureEd25519> = BTreeMap::new();
    inner_signature_map.insert(0, types::SignatureEd25519(signature));

    let mut signature_map: BTreeMap<u8, BTreeMap<u8, SignatureEd25519>> = BTreeMap::new();
    signature_map.insert(0, inner_signature_map);

    let param: PermitParam = PermitParam {
        message,
        signature: signature_map,
        signer: AccountAddress::from_str(&request.signer).unwrap(),
    };

    log::debug!("param");
    log::debug!("{:?}", param);

    let bytes = concordium_rust_sdk::smart_contracts::common::to_bytes(&param);

    //  let bytes: Vec<u8> = vec![];

    let contract_name = "cis3_nft";

    let receive_name =
        smart_contracts::OwnedReceiveName::try_from(format!("{}.permit", contract_name)).unwrap();

    let payload = transactions::Payload::Update {
        payload: transactions::UpdateContractPayload {
            amount: Amount::from_micro_ccd(0),
            address: ContractAddress {
                index: 3903,
                subindex: 0,
            },
            receive_name,
            message: smart_contracts::Parameter::try_from(bytes).unwrap(),
        },
    };
    log::debug!("{:?}", payload);

    log::debug!("keys");
    log::debug!("{:?}", key_update_operator);

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

    log::debug!("transaction: {:?}", tx);
    let bi = transactions::BlockItem::AccountTransaction(tx);

    let hash = client.send_block_item(&bi).await.unwrap();

    Ok(warp::reply::json(&hash))
}

pub async fn handle_rejection(err: Rejection) -> Result<impl warp::Reply, Infallible> {
    if err.is_not_found() {
        let code = StatusCode::NOT_FOUND;
        let message = "Not found.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::NotAllowed) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Needs proof.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::InvalidProofs) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Invalid proofs.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::NodeAccess(e)) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = format!("Cannot access the node: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::LockingError) = err.find() {
        let code = StatusCode::INTERNAL_SERVER_ERROR;
        let message = "Could not acquire lock.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::UnknownSession) = err.find() {
        let code = StatusCode::NOT_FOUND;
        let message = "Session not found.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::Expired) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Given token was expired.";
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

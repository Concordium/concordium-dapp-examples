use crate::{crypto_common::types::TransactionTime, types::*};
use concordium_rust_sdk::{
    cis2::{AdditionalData, Receiver, Transfer},
    smart_contracts::common::{
        to_bytes, AccountAddress, AccountSignatures, Address, Amount, ContractAddress,
        CredentialSignatures, OwnedEntrypointName, Signature, SignatureEd25519,
    },
    types::{
        smart_contracts,
        smart_contracts::{ContractContext, InvokeContractResult, OwnedReceiveName},
        transactions, Energy, WalletAccount,
    },
    v2::BlockIdentifier,
};
use std::{collections::BTreeMap, convert::Infallible, sync::Arc};
use warp::{http::StatusCode, Rejection};

const CONTRACT_NAME: &str = "cis2_multi";
const ENERGY: u64 = 60000;
const RATE_LIMIT_PER_ACCOUNT: u8 = 30;

// Before submitting a transaction we simulate/dry-run the transaction to get an
// estimate of the energy needed for executing the transaction. In addition, we
// allow an additional small amount of energy `EPSILON_ENERGY` to be consumed by
// the transaction to cover small variations (e.g. changes to the smart contract
// state) caused by transactions that have been executed meanwhile.
const EPSILON_ENERGY: u64 = 1000;

pub async fn handle_signature_bid(
    client: concordium_rust_sdk::v2::Client,
    key_update_operator: Arc<WalletAccount>,
    request: BidParams,
    cis2_token_smart_contract_index: u64,
    auction_smart_contract_index: u64,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    log::debug!("Create payload.");

    let transfer = Transfer {
        from:     Address::Account(request.from),
        to:       Receiver::Contract(
            ContractAddress {
                index:    auction_smart_contract_index,
                subindex: 0,
            },
            OwnedReceiveName::new_unchecked("bid".to_owned()),
        ),
        token_id: request.token_id,
        amount:   request.token_amount,
        data:     AdditionalData::new(to_bytes(&request.item_index_auction))
            .map_err(|_| LogError::AdditionalDataError)?,
    };

    let payload = TransferParams(vec![transfer]);

    log::debug!("Create PermitMessage.");

    let message: PermitMessage = PermitMessage {
        contract_address: ContractAddress {
            index:    cis2_token_smart_contract_index,
            subindex: 0,
        },
        nonce:            request.nonce,
        timestamp:        request.expiry_timestamp,
        entry_point:      OwnedEntrypointName::new_unchecked("transfer".into()),
        payload:          concordium_rust_sdk::smart_contracts::common::to_bytes(&payload),
    };

    submit_transaction(
        client,
        key_update_operator,
        state,
        message,
        request.signature,
        request.signer,
        cis2_token_smart_contract_index,
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
    cis2_token_smart_contract_index: u64,
) -> Result<impl warp::Reply, Rejection> {
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

    let parameter = smart_contracts::OwnedParameter::from_serial(&param)
        .map_err(|_| LogError::ParameterError)?;

    let receive_name =
        smart_contracts::OwnedReceiveName::new_unchecked(format!("{}.permit", CONTRACT_NAME));

    log::debug!("Simulate transaction to check its validity.");

    let payload = transactions::UpdateContractPayload {
        amount: Amount::from_micro_ccd(0),
        address: ContractAddress {
            index:    cis2_token_smart_contract_index,
            subindex: 0,
        },
        receive_name,
        message: parameter,
    };

    let context =
        ContractContext::new_from_payload(key.address, Energy { energy: ENERGY }, payload.clone());

    let info = client
        .invoke_instance(&BlockIdentifier::Best, &context)
        .await;

    let info = match info {
        Ok(info) => info,
        Err(e) => {
            log::warn!("SimulationInvokeError {e}.");
            return Err(warp::reject::custom(LogError::SimulationInvokeError));
        }
    };

    let used_energy = match info.response {
        InvokeContractResult::Success {
            return_value: _,
            events: _,
            used_energy,
        } => {
            log::debug!("TransactionSimulationSuccess");
            used_energy
        }
        InvokeContractResult::Failure {
            return_value: _,
            reason,
            used_energy: _,
        } => {
            log::warn!("TransactionSimulationError {:#?}.", reason);

            return Err(warp::reject::custom(LogError::TransactionSimulationError(
                RevertReason { reason },
            )));
        }
    };

    log::debug!("Create transaction.");

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
    log::debug!("Check rate limit.");

    let mut rate_limits = state.rate_limits.lock().await;

    let limit = rate_limits.entry(signer).or_insert(0u8);

    if *limit >= RATE_LIMIT_PER_ACCOUNT {
        log::error!("Rate limit for account {} reached.", signer);

        return Err(warp::reject::custom(LogError::RateLimitError));
    }

    *limit += 1;

    let tx = transactions::send::make_and_sign_transaction(
        &key.keys,
        key.address,
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

    log::debug!("Submit transaction.");

    match client.send_block_item(&bi).await {
        Ok(hash) => {
            *nonce = nonce.next();

            Ok(warp::reply::json(&hash))
        }
        Err(e) => {
            log::error!("SubmitSponsoredTransactionError {e}.");

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
        let code = StatusCode::BAD_REQUEST;
        let message = format!(
            "Transaction simulation error. Your transaction would revert with the given reject \
             reason: {:?}",
            e.reason
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

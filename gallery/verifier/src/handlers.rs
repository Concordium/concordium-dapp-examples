use crate::crypto_common::base16_encode_string;
use crate::types::*;
use concordium_rust_sdk::{
    id::{
        constants::{ArCurve, AttributeKind},
        id_proof_types::Statement,
        types::AccountCredentialWithoutProofs,
    },
    v2::BlockIdentifier,
};
use log::warn;
use rand::Rng;
use std::convert::Infallible;
use warp::{http::StatusCode, Rejection};

pub async fn handle_get_challenge(state: Server) -> Result<impl warp::Reply, Rejection> {
    let state = state.clone();
    log::debug!("Parsed statement. Generating challenge");
    match get_challenge_worker(state).await {
        Ok(r) => Ok(warp::reply::json(&r)),
        Err(e) => {
            warn!("Request is invalid {:#?}.", e);
            Err(warp::reject::custom(e))
        }
    }
}

pub async fn handle_provide_proof(
    client: concordium_rust_sdk::v2::Client,
    state: Server,
    statement: Statement<ArCurve, AttributeKind>,
    request: ChallengedProof,
) -> Result<impl warp::Reply, Rejection> {
    let client = client.clone();
    let state = state.clone();
    let statement = statement.clone();
    let challenge = request.challenge;
    match check_proof_worker(client, state, request, statement).await {
        // TODO don't use challenge as auth token?
        Ok(_) => Ok(warp::reply::json(&challenge)),
        Err(e) => {
            warn!("Request is invalid {:#?}.", e);
            Err(warp::reject::custom(e))
        }
    }
}

pub fn handle_image_access(
    params: InfoQuery,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    match get_info_worker(state, params.auth) {
        Ok(_) => Ok(warp::reply()),
        Err(e) => {
            warn!("Request is invalid {:#?}.", e);
            Err(warp::reject::custom(e))
        }
    }
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

/// A common function that checks a challenge has been proven.
fn get_info_worker(state: Server, challenge: Challenge) -> Result<(), InjectStatementError> {
    let sm = state
        .challenges
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;
    let status = sm
        .get(&base16_encode_string(&challenge.0))
        .ok_or(InjectStatementError::UnknownSession)?;
    if status.is_proven {
        Ok(())
    } else {
        Err(InjectStatementError::NotAllowed)
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

/// A common function that produces a challenge and adds it to the state.
async fn get_challenge_worker(state: Server) -> Result<ChallengeResponse, InjectStatementError> {
    let mut challenge = [0u8; 32];
    rand::thread_rng().fill(&mut challenge[..]);
    let mut sm = state
        .challenges
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;
    log::debug!("Generated challenge: {:?}", challenge);
    let challenge = Challenge(challenge);
    sm.insert(
        base16_encode_string(&challenge.0),
        ChallengeStatus { is_proven: false },
    );
    Ok(ChallengeResponse { challenge })
}

/// A common function that validates the cryptographic proofs in the request.
async fn check_proof_worker(
    mut client: concordium_rust_sdk::v2::Client,
    state: Server,
    request: ChallengedProof,
    statement: Statement<ArCurve, AttributeKind>,
) -> Result<bool, InjectStatementError> {
    let cred_id = request.proof.credential;
    let acc_info = client
        .get_account_info(&cred_id.into(), BlockIdentifier::LastFinal)
        .await?;
    let credential = acc_info
        .response
        .account_credentials
        .get(&0.into())
        .ok_or(InjectStatementError::Credential)?;
    let commitments = match &credential.value {
        AccountCredentialWithoutProofs::Initial { icdv: _, .. } => {
            return Err(InjectStatementError::NotAllowed);
        }
        AccountCredentialWithoutProofs::Normal { commitments, .. } => commitments,
    };
    let mut sm = state
        .challenges
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;

    if statement.verify(
        &request.challenge.0,
        &state.global_context,
        cred_id.as_ref(),
        commitments,
        &request.proof.proof.value, // TODO: Check version.
    ) {
        sm.insert(
            base16_encode_string(&request.challenge.0),
            ChallengeStatus { is_proven: true },
        );
        Ok(true)
    } else {
        Err(InjectStatementError::InvalidProofs)
    }
}

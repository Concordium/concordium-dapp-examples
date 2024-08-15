use crate::crypto_common::base16_encode_string;
use crate::types::*;
use concordium_rust_sdk::{
    id::types::{AccountAddress, AccountCredentialWithoutProofs},
    v2::{AccountIdentifier, BlockIdentifier},
    web3id::{
        get_public_data, CredentialProof,
        CredentialStatement::{Account, Web3Id},
    },
};
use log::warn;
use rand::Rng;
use std::convert::Infallible;
use std::time::SystemTime;
use uuid::Uuid;
use warp::{http::StatusCode, Rejection};

static CHALLENGE_EXPIRY_SECONDS: u64 = 600;
static TOKEN_EXPIRY_SECONDS: u64 = 1200;
static CLEAN_INTERVAL_SECONDS: u64 = 600;

pub async fn handle_get_challenge(
    state: Server,
    address: AccountAddress,
) -> Result<impl warp::Reply, Rejection> {
    let state = state.clone();
    log::debug!("Parsed statement. Generating challenge");
    match get_challenge_worker(state, address).await {
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
    request: ChallengedProof,
) -> Result<impl warp::Reply, Rejection> {
    let client = client.clone();
    let state = state.clone();
    match check_proof_worker(client, state, request).await {
        Ok(r) => Ok(warp::reply::json(&r)),
        Err(e) => {
            warn!("Request is invalid {:#?}.", e);
            Err(warp::reject::custom(e))
        }
    }
}

pub async fn handle_image_access(
    params: InfoQuery,
    state: Server,
) -> Result<impl warp::Reply, Rejection> {
    match get_info_worker(state, params.auth) {
        Ok(_) => Ok(warp::redirect(warp::http::Uri::from_static(
            // Currently the user is just redirected to a random image
            "https://picsum.photos/150/200",
        ))),
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
    } else if let Some(InjectStatementError::AccountStatement) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Expect account statement and not web3id statement.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::WrongNetwork { expected, actual }) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = format!(
            "ZK proof was created for the wrong network. Expect: {expected}. Got: {actual}."
        );
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::WrongProver { expected, actual }) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = format!(
            "Wrong prover for the given challenge. The given challenge was requested for account {expected} but the proof in the wallet was generated for account {actual}."
        );
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::ExpectOneStatement) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "One statement is expected.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::CredentialLookup(e)) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = format!("Unable to look up the credentials: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::InvalidProof(e)) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = format!("Invalid proof: {}", e);
        Ok(mk_reply(message, code))
    } else if let Some(InjectStatementError::WrongStatement) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "Wrong ZK statement proven.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::NoCredentialCommitment) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message = "No credential commitment on chain.";
        Ok(mk_reply(message.into(), code))
    } else if let Some(InjectStatementError::OnlyRegularAccounts) = err.find() {
        let code = StatusCode::BAD_REQUEST;
        let message =
            "Only regular accounts are supported by this backend. No support for multi-sig accounts.";
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
        log::error!("Internal error. Original error: {:#?}", err);
        Ok(mk_reply(message.into(), code))
    }
}

/// A common function that checks a challenge has been proven.
fn get_info_worker(state: Server, token: String) -> Result<(), InjectStatementError> {
    let sm = state
        .tokens
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;
    let status = sm.get(&token).ok_or(InjectStatementError::NotAllowed)?;
    if status
        .created_at
        .elapsed()
        .map_err(|_| InjectStatementError::Expired)?
        .as_secs()
        < TOKEN_EXPIRY_SECONDS
    {
        Ok(())
    } else {
        Err(InjectStatementError::Expired)
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
async fn get_challenge_worker(
    state: Server,
    address: AccountAddress,
) -> Result<ChallengeResponse, InjectStatementError> {
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
        ChallengeStatus {
            address,
            created_at: SystemTime::now(),
        },
    );
    Ok(ChallengeResponse { challenge })
}

/// A common function that validates the cryptographic proofs in the request.
async fn check_proof_worker(
    mut client: concordium_rust_sdk::v2::Client,
    state: Server,
    request: ChallengedProof,
) -> Result<Uuid, InjectStatementError> {
    let presentation = request.presentation;

    let status = {
        let challenges = state
            .challenges
            .lock()
            .map_err(|_| InjectStatementError::LockingError)?;

        challenges
            .get(&base16_encode_string(&presentation.presentation_context))
            .ok_or(InjectStatementError::UnknownSession)?
            .clone()
    };

    let public_data = get_public_data(
        &mut client,
        state.network,
        &presentation,
        BlockIdentifier::LastFinal,
    )
    .await?;

    // Verify the cryptographic proofs.
    let request = presentation.verify(
        &state.global_context,
        public_data.iter().map(|credential| &credential.inputs),
    )?;

    // Check that one statement is provided.
    if request.credential_statements.len() != 1 {
        return Err(InjectStatementError::ExpectOneStatement);
    }

    // Accessing the index at 0 is safe, because we checked that one statement is provided.
    let account_statement = &request.credential_statements[0];

    // Check the ZK proof has been generated as expected.
    match account_statement {
        Account {
            network, statement, ..
        } => {
            // Check that the expected ZK statement has been proven.
            if *statement != state.zk_statements.statements {
                return Err(InjectStatementError::WrongStatement);
            }

            // Check that the proof has been generated for the correct network.
            if *network != state.network {
                return Err(InjectStatementError::WrongNetwork {
                    expected: state.network,
                    actual: *network,
                });
            }
        }
        Web3Id { .. } => return Err(InjectStatementError::AccountStatement),
    }

    // Accessing the index at position `0` is safe because the
    // `request.credential_statements.len()` has length 1 which was checked
    // above. This means that one `verifiable_credential` exists.
    let credential_proof = &presentation.verifiable_credential[0];

    // Check account credential corresponding to the credential_proof.
    match credential_proof {
        CredentialProof::Account { cred_id, .. } => {
            let account_info = client
                .get_account_info(
                    &AccountIdentifier::CredId(*cred_id),
                    BlockIdentifier::LastFinal,
                )
                .await
                .map_err(InjectStatementError::NodeAccess)?
                .response;

            // This backend only supports regular accounts with exactly one credential (no mulit-sig account support).
            if account_info.account_credentials.len() != 1 {
                return Err(InjectStatementError::OnlyRegularAccounts);
            }

            let credential = account_info
                .account_credentials
                .get(&0.into())
                .ok_or(InjectStatementError::OnlyRegularAccounts)?;

            // `Initial` accounts were created by identity providers in the past
            // without a Pedersen commitment deployed on chain. As such we cannot verify proofs on them.
            if let AccountCredentialWithoutProofs::Initial { .. } = &credential.value {
                return Err(InjectStatementError::NoCredentialCommitment);
            }

            // Check that the `prover` is the same as the address that requested the challenge.
            if account_info.account_address != status.address {
                return Err(InjectStatementError::WrongProver {
                    expected: status.address,
                    actual: account_info.account_address,
                });
            }
        }
        _ => return Err(InjectStatementError::AccountStatement),
    };

    let mut tokens = state
        .tokens
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;

    let mut challenges = state
        .challenges
        .lock()
        .map_err(|_| InjectStatementError::LockingError)?;

    challenges.remove(&base16_encode_string(&presentation.presentation_context));
    let token = Uuid::new_v4();
    tokens.insert(
        token.to_string(),
        TokenStatus {
            created_at: SystemTime::now(),
        },
    );
    Ok(token)
}

pub async fn handle_clean_state(state: Server) -> anyhow::Result<()> {
    let mut interval =
        tokio::time::interval(tokio::time::Duration::from_secs(CLEAN_INTERVAL_SECONDS));

    loop {
        interval.tick().await;

        {
            let mut tokens = state.tokens.lock().unwrap();

            tokens.retain(|_, v| {
                v.created_at
                    .elapsed()
                    .map(|e| e.as_secs() < TOKEN_EXPIRY_SECONDS)
                    .unwrap_or(false)
            });
        }
        {
            let mut challenges = state.challenges.lock().unwrap();

            challenges.retain(|_, v| {
                v.created_at
                    .elapsed()
                    .map(|e| e.as_secs() < CHALLENGE_EXPIRY_SECONDS)
                    .unwrap_or(false)
            });
        }
    }
}

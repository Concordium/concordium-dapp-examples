mod handlers;
mod types;
use crate::handlers::*;
use crate::types::*;


use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::common::to_bytes;
use concordium_rust_sdk::id::types::AccountKeys;
use concordium_rust_sdk::smart_contracts::common::{AccountAddress,Address};
use concordium_rust_sdk::smart_contracts::common::Amount;
use concordium_rust_sdk::smart_contracts::common::OwnedEntrypointName;
use concordium_rust_sdk::types::Energy;

use concordium_rust_sdk::common::{SerdeDeserialize, SerdeSerialize};

use crate::crypto_common::types::TransactionTime;
use concordium_rust_sdk::types::smart_contracts;
use concordium_rust_sdk::types::transactions;
use concordium_rust_sdk::types::ContractAddress;
use concordium_rust_sdk::types::Nonce;
use concordium_rust_sdk::types::WalletAccount;

use concordium_rust_sdk::{
    common::{self as crypto_common},
    id::{
        constants::{ArCurve, AttributeKind},
        id_proof_types::Statement,
    },
    v2::BlockIdentifier,
};
use log::info;
use std::collections::BTreeMap;
use std::path::PathBuf;
use std::str::FromStr;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};
use warp::Filter;

#[derive(SerdeSerialize, SerdeDeserialize)]
#[serde(rename_all = "camelCase")]
/// Account address and keys that will be supplied in a JSON file.
/// The transaction will be signed with the given keys.
struct AccountData {
    account_keys: AccountKeys,
    address: AccountAddress,
}


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
    endpoint: concordium_rust_sdk::v2::Endpoint,
    #[clap(
        long = "port",
        default_value = "8100",
        help = "Port on which the server will listen on."
    )]
    port: u16,
    #[structopt(
        long = "log-level",
        default_value = "debug",
        help = "Maximum log level."
    )]
    log_level: log::LevelFilter,
    #[clap(
        long = "statement",
        help = "The statement that the server accepts proofs for."
    )]
    statement: String,
    #[clap(
        long = "names",
        help = "Names of the pieces in the gallery. Should be a JSON list of strings"
    )]
    names: String,
    #[structopt(
        long = "public-folder",
        default_value = "public",
        help = "location of the folder to serve"
    )]
    public_folder: String,
    #[structopt(long = "account", help = "Path to the account key file.")]
    keys_path: PathBuf,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = IdVerifierConfig::parse();
    let mut log_builder = env_logger::Builder::new();
    // only log the current module (main).
    log_builder.filter_level(app.log_level); // filter filter_module(module_path!(), app.log_level);
    log_builder.init();
    let statement: Statement<ArCurve, AttributeKind> = serde_json::from_str(&app.statement)?;

    let mut client = concordium_rust_sdk::v2::Client::new(app.endpoint).await?;
    let global_context = client
        .get_cryptographic_parameters(BlockIdentifier::LastFinal)
        .await?
        .response;

    log::debug!("Acquired data from the node.");

    let state = Server {
        challenges: Arc::new(Mutex::new(HashMap::new())),
        tokens: Arc::new(Mutex::new(HashMap::new())),
        global_context: Arc::new(global_context),
    };
    let prove_state = state.clone();
    let info_state = state.clone();
    let challenge_state = state.clone();

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("Content-Type")
        .allow_method("POST");

    // 1a. get challenge
    let get_challenge = warp::get()
        .and(warp::path!("api" / "challenge"))
        .and(warp::query::<WithAccountAddress>())
        .and_then(move |query: WithAccountAddress| {
            handle_get_challenge(challenge_state.clone(), query.address)
        });

    // 1b. get statement
    let get_statement = warp::get()
        .and(warp::path!("api" / "statement"))
        .map(move || warp::reply::json(&app.statement));

    // 1c. get names of gallery items
    let get_names = warp::get()
        .and(warp::path!("api" / "names"))
        .map(move || warp::reply::json(&app.names));

    // load account keys and sender address from a file
    let keys: WalletAccount =
        serde_json::from_str(&std::fs::read_to_string(app.keys_path).context(
            "Could not read the keys
    file.",
        )?)
        .context("Could not parse the keys file.")?;

    let keys2 = Arc::new(keys);

    //     // load account keys and sender address from a file
    //     let keys3: AccountData = serde_json::from_str(
    //         &std::fs::read_to_string(app.keys_path).context("Could not read the keys file.")?,
    //     )
    //     .context("Could not parse the keys file.")?;

    //     let consensus_info = client.get_consensus_info().await?;

    //     let acc_info = client
    //     .get_account_info(keys3, &consensus_info.last_finalized_block)
    //     .await.unwrap();

    // let nonce = acc_info.response.account_nonce;
    // log::debug!("nonce");

    // 2. Provide submit
    let provide_submit = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("api" / "submitUpdateOperator"))
        .and(warp::body::json())
        .and_then(move |request: OperatorOfParams| {
            log::debug!("request");
            log::debug!("{:?}", request);

            // let operator_update = match request.add_operator {
            //     true => types::OperatorUpdate::Add,
            //     false => types::OperatorUpdate::Remove,
            // };

            // let update_operator = types::UpdateOperator {
            //     update: operator_update,
            //     operator: Address::Account(AccountAddress::from_str(&request.operator).unwrap()),
            // };
            // let payload = types::UpdateOperatorParams(vec![update_operator]);

            // let nonce = match request.nonce.parse::<u64>() {
            //     Ok(nonce) => nonce,
            //     Err(_e) => 0,
            //   };

            // let message: PermitMessage = PermitMessage {
            //     timestamp: request.timestamp,
            //     contract_address: ContractAddress {
            //         index: 3936,
            //         subindex: 0,
            //     },
            //     entry_point: OwnedEntrypointName::new_unchecked("updateOperator".into()),
            //     nonce,
            //     payload: types::PermitPayload::UpdateOperator(payload),
            // };

            // let signature = request.signature.as_bytes();
            // let signature2 = signature[0..64].try_into().unwrap();

            // let mut inner_signature_map:BTreeMap<u8, SignatureEd25519> = BTreeMap::new();
            // inner_signature_map.insert(0, types::SignatureEd25519(signature2));

            // let mut signature_map:BTreeMap<u8, BTreeMap<u8, SignatureEd25519>> = BTreeMap::new();
            // signature_map.insert(0, inner_signature_map);

            // let param: PermitParam = PermitParam {
            //     message,
            //     signature: signature_map,
            //     signer: AccountAddress::from_str(&request.signer).unwrap(),
            // };

            // let bytes = to_bytes(&param);

           let bytes: Vec<u8> = vec![];

            let contract_name = "cis3_nft";

            let receive_name =
                smart_contracts::OwnedReceiveName::try_from(format!("{}.test", contract_name))
                    .unwrap();

            let payload = transactions::Payload::Update {
                payload: transactions::UpdateContractPayload {
                    amount: Amount::from_micro_ccd(0),
                    address: ContractAddress {
                        index: 3936,
                        subindex: 0,
                    },
                    receive_name,
                    message: smart_contracts::Parameter::try_from(bytes).unwrap(),
                },
            };
            log::debug!("{:?}", payload);

            log::debug!("keys");
            log::debug!("{:?}", keys2);

            let tx = transactions::send::make_and_sign_transaction(
                &keys2.keys,
                keys2.address.clone(),
                Nonce { nonce: 15u64 },
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

            handle_signature(
                client.clone(),
                prove_state.clone(),
                statement.clone(),
                bi,
                request,
            )
        });

    // 3. Get Image (Ignores the name of the item, checks that the auth token is valid and then redirects to an image)
    let get_image = warp::path!("api" / "image" / String)
        .map(|_| ())
        .untuple_one()
        .and(warp::query::<InfoQuery>())
        .and_then(move |query: InfoQuery| handle_image_access(query, info_state.clone()));

    info!(
        "Starting up HTTP serve
r. Listening on port {}.",
        app.port
    );

    let serve_public_files = warp::get().and(warp::fs::dir(app.public_folder));

    tokio::spawn(handle_clean_state(state.clone()));

    let server = get_challenge
        .or(get_statement)
        .or(get_names)
        .or(provide_submit)
        .or(get_image)
        .or(serve_public_files)
        .recover(handle_rejection)
        .with(cors)
        .with(warp::trace::request());
    warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
    Ok(())
}

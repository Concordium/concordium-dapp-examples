mod handlers;
mod types;
use crate::handlers::*;
use crate::types::*;

use clap::Parser;
use concordium_rust_sdk::{
    common::{self as crypto_common},
    id::{
        constants::{ArCurve, AttributeKind},
        id_proof_types::Statement,
    },
    v2::BlockIdentifier,
};
use log::info;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};
use warp::Filter;

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
        global_context: Arc::new(global_context),
    };
    let prove_state = state.clone();
    let info_state = state.clone();

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("Content-Type")
        .allow_method("POST");

    // 1a. get challenge
    let get_challenge = warp::get()
        .and(warp::path!("challenge"))
        .and_then(move || handle_get_challenge(state.clone()));

    // 1b. get statement
    let get_statement = warp::get()
        .and(warp::path!("statement"))
        .map(move || warp::reply::json(&app.statement));

    // 1c. get names of gallery items
    let get_names = warp::get()
        .and(warp::path!("names"))
        .map(move || warp::reply::json(&app.names));

    // 2. Provide proof
    let provide_proof = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("prove"))
        .and(warp::body::json())
        .and_then(move |request: ChallengedProof| {
            handle_provide_proof(
                client.clone(),
                prove_state.clone(),
                statement.clone(),
                request,
            )
        });

    // 3. Get Image
    let get_image = warp::path!("image" / String)
        .map(|_| ())
        .untuple_one()
        .and(warp::query::<InfoQuery>())
        .map(move |query: InfoQuery| handle_image_access(query, info_state.clone()))
        .map(|_| {
            warp::redirect(warp::http::Uri::from_static(
                "https://picsum.photos/150/200",
            ))
        });

    info!(
        "Starting up HTTP serve
r. Listening on port {}.",
        app.port
    );

    let server = get_challenge
        .or(get_statement)
        .or(get_names)
        .or(provide_proof)
        .or(get_image)
        .recover(handle_rejection)
        .with(cors)
        .with(warp::trace::request());
    warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
    Ok(())
}

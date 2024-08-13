mod handlers;
mod types;
use crate::handlers::*;
use crate::types::*;

use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::{
    common::{self as crypto_common},
    id::{constants::ArCurve, id_proof_types::Statement},
    v2::BlockIdentifier,
    v2::Scheme,
    web3id::{did::Network, Web3IdAttribute},
};
use log::info;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};
use warp::Filter;

/// The testnet genesis block hash.
pub const TESTNET_GENESIS_BLOCK_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

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
    node_endpoint: concordium_rust_sdk::v2::Endpoint,
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
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app = IdVerifierConfig::parse();
    let mut log_builder = env_logger::Builder::new();
    // only log the current module (main).
    log_builder.filter_level(app.log_level); // filter filter_module(module_path!(), app.log_level);
    log_builder.init();

    // Set up endpoint to the node.
    let endpoint = if app
        .node_endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &Scheme::HTTPS)
    {
        app.node_endpoint
            .tls_config(tonic::transport::channel::ClientTlsConfig::new())
            .context("Unable to construct TLS configuration for the Concordium API.")?
    } else {
        app.node_endpoint
    }
    .connect_timeout(std::time::Duration::from_secs(5))
    .timeout(std::time::Duration::from_secs(10));

    // Establish connection to the blockchain node.
    let mut client = concordium_rust_sdk::v2::Client::new(endpoint).await?;
    let global_context = client
        .get_cryptographic_parameters(BlockIdentifier::LastFinal)
        .await?
        .response;
    let consensus_info = client
        .get_consensus_info()
        .await
        .context("Unable to query the consesnsus info from the chain")?;
    let genesis_hash = consensus_info.genesis_block.bytes;
    let network = if genesis_hash == TESTNET_GENESIS_BLOCK_HASH {
        Network::Testnet
    } else {
        Network::Mainnet
    };

    let zk_statements: Statement<ArCurve, Web3IdAttribute> =
        serde_json::from_str(&app.statement).context("Unable to construct the ZK statements")?;

    log::debug!("Acquired data from the node.");

    let state = Server {
        network,
        zk_statements,
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

    // 2. Provide proof
    let provide_proof = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("api" / "prove"))
        .and(warp::body::json())
        .and_then(move |request: ChallengedProof| {
            handle_provide_proof(client.clone(), prove_state.clone(), request)
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
        .or(provide_proof)
        .or(get_image)
        .or(serve_public_files)
        .recover(handle_rejection)
        .with(cors)
        .with(warp::trace::request());
    warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
    Ok(())
}

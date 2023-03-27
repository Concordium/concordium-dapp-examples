mod handlers;
mod types;
use crate::handlers::*;
use crate::types::*;

use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::types::WalletAccount;

use concordium_rust_sdk::common::{self as crypto_common};
use std::path::PathBuf;
use std::sync::Arc;
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

    let client = concordium_rust_sdk::v2::Client::new(app.endpoint).await?;

    let client2 = client.clone();

    log::debug!("Acquired data from the node.");

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("Content-Type")
        .allow_method("POST");

    // load account keys and sender address from a file
    let keys: WalletAccount =
        serde_json::from_str(&std::fs::read_to_string(app.keys_path).context(
            "Could not read the keys
    file.",
        )?)
        .context("Could not parse the keys file.")?;

    let key_update_operator = Arc::new(keys);

    let key_transfer = key_update_operator.clone();

    // 1. Provide submit update operator
    let provide_submit_update_operator = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("api" / "submitUpdateOperator"))
        .and(warp::body::json())
        .and_then(move |request: UpdateOperatorInputParams| {
            log::debug!("request");
            log::debug!("{:?}", request);

            handle_signature_update_operator(client.clone(), key_update_operator.clone(), request)
        });

    // 2. Provide submit transfer
    let provide_submit_transfer = warp::post()
        .and(warp::filters::body::content_length_limit(50 * 1024))
        .and(warp::path!("api" / "submitTransfer"))
        .and(warp::body::json())
        .and_then(move |request: TransferInputParams| {
            log::debug!("request");
            log::debug!("{:?}", request);

            handle_signature_transfer(client2.clone(), key_transfer.clone(), request)
        });

    let serve_public_files = warp::get().and(warp::fs::dir(app.public_folder));

    let server = provide_submit_update_operator
        .or(provide_submit_transfer)
        .or(serve_public_files)
        .recover(handle_rejection)
        .with(cors)
        .with(warp::trace::request());
    warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
    Ok(())
}

//! A tool for indexing event data from the track and trace contract.
use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::{
    indexer,
    smart_contracts::common::OwnedEntrypointName,
    types::{queries::BlockInfo, ContractAddress},
    v2::{self as sdk},
};
use indicatif::{ProgressBar, ProgressStyle};
use track_and_trace as contract;

mod db;
use crate::db::*;

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
#[command(author, version, about)]
struct Args {
    #[arg(
        long = "node",
        short = 'n',
        help = "The node endpoint.",
        default_value = "https://grpc.testnet.concordium.com:20000",
        global = true,
        env = "CCD_INDEXER_NODE"
    )]
    node_endpoint:    concordium_rust_sdk::v2::Endpoint,
    #[arg(
        long = "start",
        short = 's',
        help = "The start time when the track and trace contract was initialized. The format is \
                ISO-8601, e.g. 2024-01-23T12:13:14Z.",
        env = "CCD_INDEXER_START"
    )]
    start:            chrono::DateTime<chrono::Utc>,
    #[arg(
        long = "contract",
        short = 'c',
        help = "The track and trace contract address.",
        env = "CCD_INDEXER_CONTRACT"
    )]
    contract_address: ContractAddress,
    /// Database connection string.
    #[arg(
        long = "db-connection",
        default_value = "host=localhost dbname=indexer user=postgres password=password port=5432",
        help = "A connection string detailing the connection to the database used by the \
                application.",
        env = "CCD_INDEXER_DB_CONNECTION"
    )]
    db_connection:    tokio_postgres::config::Config,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app: Args = Args::parse();
    let endpoint = if app
        .node_endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &sdk::Scheme::HTTPS)
    {
        app.node_endpoint
            .tls_config(tonic::transport::channel::ClientTlsConfig::new())
            .context("Unable to construct TLS configuration for the Concordium API.")?
    } else {
        app.node_endpoint
    }
    .connect_timeout(std::time::Duration::from_secs(5))
    .timeout(std::time::Duration::from_secs(10));

    let db_pool = DatabasePool::create(app.db_connection.clone(), 2, true)
        .await
        .context("Could not create database pool")?;
    let db = db_pool
        .get()
        .await
        .context("Could not get database connection from pool")?;
    db.init_settings(&app.contract_address)
        .await
        .context("Could not init settings for database")?;
    let settings = db
        .get_settings()
        .await
        .context("Could not get settings from database")?;

    anyhow::ensure!(
        settings.contract_address == app.contract_address,
        "Contract address does not match the contract address found in the database"
    );
    eprintln!("Settings: {:?}", settings);

    // height_sender
    //     .send(settings.latest_height)
    //     .map_err(|_| anyhow!("Best block height could not be sent to node
    // process"))?;

    handle_indexing(db, endpoint, app.start, app.contract_address).await
}

/// Figure out which block to use as start block given the start time.
/// The return block is the first block no earlier than the start time.
async fn get_first_block(
    client: &mut sdk::Client,
    start: chrono::DateTime<chrono::Utc>,
) -> anyhow::Result<BlockInfo> {
    let first_block = client
        .find_first_finalized_block_no_earlier_than(.., start)
        .await?;

    eprintln!(
        "Indexing from block {} at {}.",
        first_block.block_hash, first_block.block_slot_time,
    );
    Ok(first_block)
}

// enum TrackAndTraceContract {}

/// Handle indexing events.
async fn handle_indexing(
    mut db: Database,
    endpoint: sdk::Endpoint,
    start: chrono::DateTime<chrono::Utc>,
    contract_address: ContractAddress,
) -> anyhow::Result<()> {
    let mut client = sdk::Client::new(endpoint.clone())
        .await
        .context("Unable to connect.")?;
    let first_block = get_first_block(&mut client, start).await?;

    // TODO: FIX PROGRESS BAR
    let bar = ProgressBar::new(100000000 - first_block.block_height.height).with_style(
        ProgressStyle::with_template("{spinner} {msg} {wide_bar} {pos}/{len}")?,
    );

    let traverse_config = indexer::TraverseConfig::new_single(endpoint, first_block.block_height);
    let (sender, mut receiver) = tokio::sync::mpsc::channel(20);
    let cancel_handle = tokio::spawn(traverse_config.traverse(
        indexer::ContractUpdateIndexer {
            target_address: contract_address,
            entrypoint:     OwnedEntrypointName::new_unchecked(
                "changeItemStatusByAdmin".to_string(),
            ),
        },
        sender,
    ));

    while let Some((block, contract_update_infos)) = receiver.recv().await {
        bar.set_message(block.block_slot_time.to_string());
        bar.inc(1);

        for tx in contract_update_infos {
            for (contract_invoked, _entry_point_name, events) in tx.execution_tree.events() {
                anyhow::ensure!(
                    contract_invoked == contract_address,
                    "The contract entry point `changeItemStatus` can only be invoke by an account \
                     and the entry point does not invoke other contracts. 
                    As a result, the event picked up by the indexer should be from contract `{}` \
                     but following contract address was found while indexing `{}`.",
                    contract_address,
                    contract_invoked
                );

                // anyhow::ensure!(
                //     entry_point_name == "changeItemStatus",
                //     "The contract entry point `changeItemStatus` can only be invoke by an \
                //      account and the entry point does not invoke other contracts.
                //     As a result, the event picked up by the indexer should be from entrypoint
                // \      `changeItemStatus` but following entrypoint was found
                // while indexing \      `{}`.",
                //     entry_point_name
                // );

                anyhow::ensure!(
                    events.len() == 1,
                    "The contract entry point `changeItemStatus` can only be invoke by an \
                     account. As a result, only one event at max can be logged by the contract."
                );

                // We know exactly one event is logged.
                let event = events[0].clone();

                let parsed_event: contract::Event = event.parse()?;

                if let contract::Event::ItemStatusChanged(event) = parsed_event {
                    // let start = chrono::Utc::now();
                    let transaction = db
                        .client
                        .transaction()
                        .await
                        .context("Failed to build DB transaction")?;

                    let transaction = Transaction::from(transaction);

                    transaction
                        .insert_event(
                            tx.transaction_hash,
                            event.item_id,
                            event.new_status,
                            event.additional_data,
                        )
                        .await?;

                    // let now = tokio::time::Instant::now();
                    transaction
                        .inner
                        .commit()
                        .await
                        .context("Failed to commit DB transaction.")?;
                } else {
                    anyhow::bail!("Wrong event")
                }

                // tracing::debug!("Commit completed in {}ms.",
                // now.elapsed().as_millis());

                // let end = chrono::Utc::now().signed_duration_since(start);
            }
        }
    }

    // Indexer will not stop after finishing syncing but instead continue to
    // listening for new blocks.
    cancel_handle.abort();
    bar.finish_and_clear();

    Ok(())
}

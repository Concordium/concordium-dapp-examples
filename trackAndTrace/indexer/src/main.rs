//! A tool for indexing event data from the track and trace contract into a
//! postgres database. The database is configured with the tables from the file
//! `../rescourcs/schema.sql`. The events `ItemStatusChangedEvent` and
//! `ItemCreatedEvent` are indexed in their respective tables. A third table
//! `settings` exists to store global configurations. Each event can be uniquely
//! identified by the triple (`block_height`, `transaction_hash`, and
//! `event_inex`).
use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::{
    indexer,
    smart_contracts::common::to_bytes,
    types::{AbsoluteBlockHeight, ContractAddress},
    v2 as sdk,
};
use std::{
    collections::BTreeSet,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
};
use tokio_postgres::types::ToSql;
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
        help = "The start block height when the track and trace contract was initialized.",
        env = "CCD_INDEXER_START"
    )]
    start:            AbsoluteBlockHeight,
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
        default_value = "host=localhost dbname=indexer3 user=postgres password=password port=5432",
        help = "A connection string detailing the connection to the database used by the \
                application.",
        env = "CCD_INDEXER_DB_CONNECTION"
    )]
    db_connection:    tokio_postgres::config::Config,
    /// Maximum log level
    #[clap(
        long = "log-level",
        default_value = "info",
        help = "The maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and \
                `error`.",
        env = "CCD_INDEXER_LOG_LEVEL"
    )]
    log_level:        tracing_subscriber::filter::LevelFilter,
}

/// Construct a future for shutdown signals (for unix: SIGINT and SIGTERM) (for
/// windows: ctrl c and ctrl break). The signal handler is set when the future
/// is polled and until then the default signal handler.
async fn set_shutdown(flag: Arc<AtomicBool>) -> anyhow::Result<()> {
    #[cfg(unix)]
    {
        use tokio::signal::unix as unix_signal;
        let mut terminate_stream = unix_signal::signal(unix_signal::SignalKind::terminate())?;
        let mut interrupt_stream = unix_signal::signal(unix_signal::SignalKind::interrupt())?;
        let terminate = Box::pin(terminate_stream.recv());
        let interrupt = Box::pin(interrupt_stream.recv());
        futures::future::select(terminate, interrupt).await;
        flag.store(true, Ordering::Release);
    }
    #[cfg(windows)]
    {
        use tokio::signal::windows as windows_signal;
        let mut ctrl_break_stream = windows_signal::ctrl_break()?;
        let mut ctrl_c_stream = windows_signal::ctrl_c()?;
        let ctrl_break = Box::pin(ctrl_break_stream.recv());
        let ctrl_c = Box::pin(ctrl_c_stream.recv());
        futures::future::select(ctrl_break, ctrl_c).await;
        flag.store(true, Ordering::Release);
    }
    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app: Args = Args::parse();

    // Tracing configuration.
    {
        use tracing_subscriber::prelude::*;
        let log_filter = tracing_subscriber::filter::Targets::new()
            .with_target(module_path!(), app.log_level)
            .with_target("indexer", app.log_level)
            .with_target("ccd_indexer", app.log_level);

        tracing_subscriber::registry()
            .with(tracing_subscriber::fmt::layer())
            .with(log_filter)
            .init();
    }

    // Set up endpoint to the node.
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

    // Establish connection to the postgres database.
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

    tracing::info!("Indexing contract: {:?}.", settings.contract_address);

    handle_indexing(db, endpoint, app.start, app.contract_address).await
}

/// Handle indexing events.
async fn handle_indexing(
    mut db: Database,
    endpoint: sdk::Endpoint,
    start: AbsoluteBlockHeight,
    contract_address: ContractAddress,
) -> anyhow::Result<()> {
    // Database process runs until the stop flag is triggered.
    let stop_flag = Arc::new(AtomicBool::new(false));
    let shutdown_handle = tokio::spawn(set_shutdown(stop_flag.clone()));

    tracing::info!("Indexing from block height {}.", start);

    let contract_set = BTreeSet::from([contract_address]);

    // Start indexer.
    let traverse_config = indexer::TraverseConfig::new_single(endpoint, start);
    let (sender, mut receiver) = tokio::sync::mpsc::channel(20);
    let indexer_handle = tokio::spawn(traverse_config.traverse(
        indexer::AffectedContractIndexer {
            addresses: contract_set,
            all:       true,
        },
        sender,
    ));

    // The indexer starts processing historical events and then listens for new
    // events that are coming in as the blockchain progresses.
    while let Some((block, contract_update_infos)) = receiver.recv().await {
        let now = tokio::time::Instant::now();

        // Stop indexer when triggered.
        if stop_flag.load(Ordering::Acquire) {
            break;
        }

        if !contract_update_infos.is_empty() {
            // Begin the transaction
            let db_transaction = db
                .client
                .transaction()
                .await
                .context("Failed to build DB transaction")?;

            for tx in contract_update_infos {
                for (contract_invoked, _entry_point_name, events) in tx.0.execution_tree.events() {
                    anyhow::ensure!(
                        contract_invoked == contract_address,
                        "The event picked up by the indexer should be from contract `{}` but \
                         following contract address was found while indexing `{}`.",
                        contract_address,
                        contract_invoked
                    );

                    for (event_index, event) in events.iter().enumerate() {
                        let parsed_event: contract::Event = event.parse()?;

                        if let contract::Event::ItemStatusChanged(item_status_change_event) =
                            parsed_event
                        {
                            let params: [&(dyn ToSql + Sync); 6] = [
                                &(block.block_height.height as i64),
                                &tx.0.transaction_hash.as_ref(),
                                &(event_index as i64),
                                &(item_status_change_event.item_id as i64),
                                &(item_status_change_event.new_status as i64),
                                &item_status_change_event.additional_data.bytes,
                            ];

                            let statement = db_transaction
                                .prepare_cached(
                                    "INSERT INTO item_status_changed_events (id, block_height, \
                                     transaction_hash, event_index, item_id, new_status, \
                                     additional_data) SELECT COALESCE(MAX(id) + 1, 0), $1, $2, \
                                     $3, $4, $5, $6 FROM item_status_changed_events;",
                                )
                                .await
                                .context(
                                    "Failed to prepare item_status_change_event transaction",
                                )?;

                            db_transaction.execute(&statement, &params).await.context(
                                "Failed to execute item_status_change_event transaction",
                            )?;

                            tracing::debug!(
                                "Preparing item_status_change_event from block {}, transaction \
                                 hash {}, and event index {}.",
                                block.block_height,
                                tx.0.transaction_hash,
                                event_index
                            );
                        } else if let contract::Event::ItemCreated(item_created_event) =
                            parsed_event
                        {
                            let params: [&(dyn ToSql + Sync); 5] = [
                                &(block.block_height.height as i64),
                                &tx.0.transaction_hash.as_ref(),
                                &(event_index as i64),
                                &(item_created_event.item_id as i64),
                                &to_bytes(&item_created_event.metadata_url),
                            ];

                            let statement = db_transaction
                                .prepare_cached(
                                    "INSERT INTO item_created_events (id, block_height, \
                                     transaction_hash, event_index, item_id, metadata_url) SELECT \
                                     COALESCE(MAX(id) + 1, 0), $1, $2, $3, $4, $5 FROM \
                                     item_created_events;",
                                )
                                .await
                                .context("Failed to prepare item_created_event transaction")?;

                            db_transaction
                                .execute(&statement, &params)
                                .await
                                .context("Failed to execute item_created_event transaction")?;

                            tracing::debug!(
                                "Preparing event from block {}, transaction hash {}, and event \
                                 index {}.",
                                block.block_height,
                                tx.0.transaction_hash,
                                event_index
                            );
                        }
                    }
                }
            }

            // Commit the transaction
            db_transaction
                .commit()
                .await
                .context("Failed to commit block transaction")?;
        }

        tracing::debug!(
            "Processed block {} in {}ms.",
            block.block_height,
            now.elapsed().as_millis()
        );
    }

    indexer_handle.abort();
    shutdown_handle.abort();

    Ok(())
}

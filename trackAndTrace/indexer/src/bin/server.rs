//! A tool for indexing event data from the track and trace contract into a
//! postgres database. The database is configured with the tables from the file
//! `../resources/schema.sql`. The events `ItemStatusChangedEvent` and
//! `ItemCreatedEvent` are indexed in their respective tables. A third table
//! `settings` exists to store global configurations. Each event can be uniquely
//! identified by the `transaction_hash` and `event_index`.
use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::{
    indexer::{self, AffectedContractIndexer, ContractUpdateInfo, ProcessorConfig},
    smart_contracts::common::to_bytes,
    types::{
        queries::BlockInfo, smart_contracts::OwnedReceiveName, AbsoluteBlockHeight, ContractAddress,
    },
    v2::{self as sdk, Client},
};
use std::collections::{BTreeMap, BTreeSet};
use tokio_postgres::types::{Json, ToSql};
use track_and_trace as contract;
use ::indexer::db::DatabasePool;

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

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let app: Args = Args::parse();

    // Tracing configuration.
    {
        use tracing_subscriber::prelude::*;
        let log_filter = tracing_subscriber::filter::Targets::new()
            .with_target(module_path!(), app.log_level)
            .with_target("ccd_indexer", app.log_level)
            .with_target("ccd_event_processor", app.log_level)
            .with_target("tokio_postgres", app.log_level);

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

    // Establish connection to the blockchain node.
    let mut client = Client::new(endpoint.clone()).await?;
    let consensus_info = client.get_consensus_info().await?;

    // Establish connection to the postgres database.
    let db_pool = DatabasePool::create(app.db_connection.clone(), 2, true)
        .await
        .context("Could not create database pool")?;
    let db = db_pool
        .get()
        .await
        .context("Could not get database connection from pool")?;
    db.init_settings(&app.contract_address, &consensus_info.genesis_block)
        .await
        .context("Could not init settings for database")?;
    let settings = db
        .get_settings()
        .await
        .context("Could not get settings from database")?;

    // This check ensures when re-starting the indexer, that the current
    // `contract_address` settings of the indexer are compatible with the stored
    // indexer settings to prevent corrupting the database.
    anyhow::ensure!(
        settings.contract_address == app.contract_address,
        "Contract address {} does not match the contract address {} found in the database",
        app.contract_address,
        settings.contract_address
    );

    // This check ensures when re-starting the indexer, that the current
    // `genesis_hash/node` settings of the indexer are compatible with the
    // stored indexer settings to prevent corrupting the database.
    anyhow::ensure!(
        settings.genesis_block_hash == consensus_info.genesis_block,
        "Genesis hash from the connected node {} does not match the genesis hash {} found in the \
         database",
        consensus_info.genesis_block,
        settings.genesis_block_hash
    );

    tracing::info!(
        "Indexing contract {:?} on network with genesis hash {}.",
        settings.contract_address.index,
        settings.genesis_block_hash
    );

    let start_block = match settings.latest_processed_block_height {
        // If the indexer is re-started with the same database settings,
        // it should resume indexing from the `latest_processed_block_height+1` as stored in the
        // database.
        Some(processed_block) => processed_block.next(),
        // If the indexer is started for the first time, lookup when the instance was created and
        // use that block as the starting block.
        None => {
            let instance_created = client
                .find_instance_creation(.., app.contract_address)
                .await?;

            instance_created.0
        }
    };

    println!("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    Ok(())

  //  handle_indexing(endpoint, start_block, app.contract_address, db_pool).await
}

// /// Handle indexing events.
// async fn handle_indexing(
//     endpoint: sdk::Endpoint,
//     start: AbsoluteBlockHeight,
//     contract_address: ContractAddress,
//     db_pool: DatabasePool,
// ) -> anyhow::Result<()> {
//     tracing::info!("Indexing from block height {}.", start);

//     let contract_set = BTreeSet::from([contract_address]);

//     let traverse_config = indexer::TraverseConfig::new_single(endpoint, start);

//     let events = StoreEvents { db_pool };

//     // The program terminates only
//     // when the processor terminates, which in this example can only happen if
//     // there are sufficiently many errors when attempting to write to the
//     // database.
//     indexer::traverse_and_process(
//         traverse_config,
//         AffectedContractIndexer {
//             addresses: contract_set,
//             all:       true,
//         },
//         ProcessorConfig::new(),
//         events,
//     )
//     .await?;

//     Ok(())
// }

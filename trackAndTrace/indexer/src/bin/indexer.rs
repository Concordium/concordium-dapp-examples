//! A tool for indexing event data from the track and trace contract into a
//! postgres database. The database is configured with the tables from the file
//! `../resources/schema.sql`. The events `ItemStatusChangedEvent` and
//! `ItemCreatedEvent` are indexed in their respective tables. A third table
//! `settings` exists to store global configurations. Each event can be uniquely
//! identified by the `transaction_hash` and `event_index`.
use ::indexer::db::DatabasePool;
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
use track_and_trace::AdditionalData;

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

/// A handler for storing monitored events in the database. This implements
/// the `indexer::ProcessEvent` trait to store events in the database.
struct StoreEvents {
    /// A database pool used for reconnects.
    db_pool: DatabasePool,
}

#[indexer::async_trait]
impl indexer::ProcessEvent for StoreEvents {
    type Data = (
        BlockInfo,
        Vec<(
            ContractUpdateInfo,
            BTreeMap<ContractAddress, BTreeSet<OwnedReceiveName>>,
        )>,
    );
    type Description = String;
    type Error = anyhow::Error;

    async fn process(
        &mut self,
        (block_info, contract_update_info): &Self::Data,
    ) -> Result<Self::Description, Self::Error> {
        let mut conn = self.db_pool.get().await?;

        // It is typically easiest to reason about a database if blocks are inserted
        // in a single database transaction. So we do that here.
        let db_transaction = conn
            .client
            .transaction()
            .await
            .context("Failed to build database transaction")?;

        let params: [&(dyn ToSql + Sync); 1] = [&(block_info.block_height.height as i64)];

        // Update latest_processed_block_height
        let statement = db_transaction
            .prepare_cached(
                "UPDATE settings SET latest_processed_block_height = $1 WHERE id = true",
            )
            .await
            .context("Failed to prepare latest_processed_block_height transaction")?;

        db_transaction
            .execute(&statement, &params)
            .await
            .context("Failed to execute latest_processed_block_height transaction")?;

        for single_contract_update_info in contract_update_info {
            for (_contract_invoked, _entry_point_name, events) in
                single_contract_update_info.0.execution_tree.events()
            {
                for (event_index, event) in events.iter().enumerate() {
                    let parsed_event: contract::Event<AdditionalData> = event.parse()?;

                    if let contract::Event::<AdditionalData>::ItemStatusChanged(
                        item_status_change_event,
                    ) = parsed_event
                    {
                        let params: [&(dyn ToSql + Sync); 7] = [
                            &(block_info.block_slot_time),
                            &single_contract_update_info.0.transaction_hash.as_ref(),
                            &(event_index as i64),
                            &(item_status_change_event.item_id.0 as i64),
                            &to_bytes(&item_status_change_event.metadata_url),
                            &Json(&item_status_change_event.new_status),
                            &item_status_change_event.additional_data.bytes,
                        ];

                        let statement = db_transaction
                            .prepare_cached(
                                "INSERT INTO item_status_changed_events (id, block_time, \
                                 transaction_hash, event_index, item_id, metadata_url, new_status, \
                                 additional_data) SELECT COALESCE(MAX(id) + 1, 0), $1, $2, $3, \
                                 $4, $5, $6, $7 FROM item_status_changed_events;",
                            )
                            .await
                            .context("Failed to prepare item_status_change_event transaction")?;

                        db_transaction
                            .execute(&statement, &params)
                            .await
                            .context("Failed to execute item_status_change_event transaction")?;

                        tracing::debug!(
                            "Preparing item_status_change_event from block {}, transaction hash \
                             {}, and event index {}.",
                            block_info.block_height,
                            single_contract_update_info.0.transaction_hash,
                            event_index
                        );
                    } else if let contract::Event::<AdditionalData>::ItemCreated(
                        item_created_event,
                    ) = parsed_event
                    {
                        let params: [&(dyn ToSql + Sync); 7] = [
                            &(block_info.block_slot_time),
                            &single_contract_update_info.0.transaction_hash.as_ref(),
                            &(event_index as i64),
                            &(item_created_event.item_id.0 as i64),
                            &to_bytes(&item_created_event.metadata_url),
                            &Json(&item_created_event.initial_status),
                            &item_created_event.additional_data.bytes,
                        ];

                        let statement = db_transaction
                            .prepare_cached(
                                "INSERT INTO item_created_events (id, block_time, \
                                 transaction_hash, event_index, item_id, metadata_url, \
                                 initial_status, additional_data) SELECT COALESCE(MAX(id) + 1, 0), $1, $2, $3, $4, \
                                 $5, $6, $7 FROM item_created_events;",
                            )
                            .await
                            .context("Failed to prepare item_created_event transaction")?;

                        db_transaction
                            .execute(&statement, &params)
                            .await
                            .context("Failed to execute item_created_event transaction")?;

                        tracing::debug!(
                            "Preparing event from block {}, transaction hash {}, and event index \
                             {}.",
                            block_info.block_height,
                            single_contract_update_info.0.transaction_hash,
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

        // We return an informative message that will be logged by the `process_events`
        // method of the indexer.
        Ok(format!(
            "Processed block {} at height {} with timestamp {}.",
            block_info.block_hash, block_info.block_height, block_info.block_slot_time
        ))
    }

    async fn on_failure(
        &mut self,
        error: Self::Error,
        _failed_attempts: u32,
    ) -> Result<bool, Self::Error> {
        tracing::error!("Encountered error {error}");

        Ok(true)
    }
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

    handle_indexing(endpoint, start_block, app.contract_address, db_pool).await
}

/// Handle indexing events.
async fn handle_indexing(
    endpoint: sdk::Endpoint,
    start: AbsoluteBlockHeight,
    contract_address: ContractAddress,
    db_pool: DatabasePool,
) -> anyhow::Result<()> {
    tracing::info!("Indexing from block height {}.", start);

    let contract_set = BTreeSet::from([contract_address]);

    let traverse_config = indexer::TraverseConfig::new_single(endpoint, start);

    let events = StoreEvents { db_pool };

    // The program terminates only
    // when the processor terminates, which in this example can only happen if
    // there are sufficiently many errors when attempting to write to the
    // database.
    indexer::traverse_and_process(
        traverse_config,
        AffectedContractIndexer {
            addresses: contract_set,
            all:       true,
        },
        ProcessorConfig::new(),
        events,
    )
    .await?;

    Ok(())
}

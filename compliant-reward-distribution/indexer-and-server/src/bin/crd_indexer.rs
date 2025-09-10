//! A tool for indexing newly created accounts on Concordium into a
//! postgres database. The database is configured with the tables from the file
//! `../resources/schema.sql`. A table
//! `settings` exists to store global configurations.
use anyhow::Context;
use clap::Parser;
use concordium_rust_sdk::{
    indexer::{self, ProcessorConfig, TransactionIndexer},
    types::{
        queries::BlockInfo, AbsoluteBlockHeight, BlockItemSummary,
        BlockItemSummaryDetails::AccountCreation,
    },
    v2::{self as sdk, Client, QueryError},
};
use crd_indexer::db::DatabasePool;
use tokio_postgres::types::ToSql;

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
#[command(author, version, about)]
struct Args {
    /// The node endpoint.
    #[arg(
        long = "node",
        short = 'n',
        default_value = "https://grpc.testnet.concordium.com:20000",
        env = "CCD_INDEXER_NODE"
    )]
    node_endpoint: concordium_rust_sdk::v2::Endpoint,
    /// A connection string detailing the connection to the database used by the
    /// application.
    // Note: In production, you should use the environment variable and not pass
    // the database connection containing a password via a command-line argument
    // since the value could be read by other processes.
    #[arg(
        long = "db-connection",
        short = 'c',
        default_value = "host=localhost dbname=indexer user=postgres password=password port=5432",
        env = "CCD_INDEXER_DB_CONNECTION"
    )]
    db_connection: tokio_postgres::config::Config,
    /// The maximum log level. Possible values are: `trace`, `debug`, `info`,
    /// `warn`, and `error`.
    #[arg(
        long = "log-level",
        short = 'l',
        default_value = "info",
        env = "CCD_INDEXER_LOG_LEVEL"
    )]
    log_level: tracing_subscriber::filter::LevelFilter,
}

/// A handler for storing monitored events in the database. This implements
/// the `indexer::ProcessEvent` trait to store events in the database.
struct StoreEvents {
    /// A database pool used for reconnects.
    db_pool: DatabasePool,
}

#[indexer::async_trait]
impl indexer::ProcessEvent for StoreEvents {
    type Data = (BlockInfo, Vec<BlockItemSummary>);
    type Description = String;
    type Error = anyhow::Error;

    async fn process(
        &mut self,
        (block_info, block_items): &Self::Data,
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

        for tx in block_items {
            match &tx.details {
                AccountCreation(account_creation_details) => {
                    let params: [&(dyn ToSql + Sync); 5] = [
                        &account_creation_details.address.0.as_ref(),
                        &block_info.block_slot_time,
                        &tx.hash.as_ref(),
                        &false,
                        &false,
                    ];
                    let statement = db_transaction
                        .prepare_cached(
                            "INSERT INTO accounts (account_address, block_time, transaction_hash, \
                             claimed, pending_approval) VALUES ($1, $2, $3, $4, $5);",
                        )
                        .await
                        .context(
                            "Failed to prepare transaction to add a new account to the database",
                        )?;

                    db_transaction.execute(&statement, &params).await.context(
                        "Failed to execute transaction to add a new account to the database",
                    )?;

                    tracing::debug!(
                        "Preparing database transaction for account {:} from transaction hash {} \
                         in block {}.",
                        account_creation_details.address,
                        tx.hash,
                        block_info.block_height,
                    );
                }
                _ => continue,
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
    let endpoint = if app.node_endpoint.uri().scheme() == Some(&sdk::Scheme::HTTPS) {
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
    let db_pool = DatabasePool::create(app.db_connection, 2, true)
        .await
        .context("Could not create database pool")?;
    let db = db_pool
        .get()
        .await
        .context("Could not get database connection from pool")?;

    // If the indexer is started for the first time, lookup the last block finalized
    // and initialize the database.
    let current_block = consensus_info.last_finalized_block_height;

    // This function only sets the settings in the database if they haven't been set
    // before. Meaning only if the indexer is run for the first time.
    db.init_settings(&consensus_info.genesis_block, current_block)
        .await
        .context("Could not init settings for database")?;

    let settings = db
        .get_settings()
        .await
        .context("Could not get settings from database")?;

    // This check prevents that the indexer is re-started with a node connection
    // to mainnet while the database has indexed data from testnet or vice versa.
    anyhow::ensure!(
        settings.genesis_block_hash == consensus_info.genesis_block,
        "Genesis hash from the connected node {} does not match the genesis hash {} found in the \
         database",
        consensus_info.genesis_block,
        settings.genesis_block_hash
    );

    // Get the block to start indexing from.
    let start_block = match settings.latest_processed_block_height {
        // If the indexer is re-started with the same database settings,
        // it should resume indexing from the `latest_processed_block_height+1` as stored in the
        // database.
        Some(processed_block) => processed_block.next(),
        // If the indexer is started for the first time, use the current block height.
        None => current_block,
    };

    tracing::info!(
        "Indexing on network with genesis hash {}.",
        consensus_info.genesis_block
    );

    handle_indexing(endpoint, start_block, db_pool)
        .await
        .map_err(anyhow::Error::new)
}

/// Handle indexing events.
async fn handle_indexing(
    endpoint: sdk::Endpoint,
    start_block: AbsoluteBlockHeight,
    db_pool: DatabasePool,
) -> Result<(), QueryError> {
    tracing::info!("Indexing from block height {}.", start_block);

    let traverse_config = indexer::TraverseConfig::new_single(endpoint, start_block);

    let events = StoreEvents { db_pool };

    indexer::traverse_and_process(
        traverse_config,
        TransactionIndexer {},
        ProcessorConfig::new(),
        events,
    )
    .await?;

    Ok(())
}

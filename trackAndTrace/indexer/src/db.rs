use anyhow::Context;
use chrono::{DateTime, Utc};
use concordium_rust_sdk::{
    smart_contracts::common::from_bytes,
    types::{hashes::TransactionHash, ContractAddress},
};
use deadpool_postgres::{GenericClient, Object};
use serde::Serialize;
use tokio_postgres::{types::ToSql, NoTls};
use track_and_trace::{MetadataUrl, *};

/// Represents possible errors returned from [`Database`] or [`DatabasePool`]
/// functions
#[derive(thiserror::Error, Debug)]
pub enum DatabaseError {
    /// An error happened while interacting with the postgres DB.
    #[error("{0}")]
    Postgres(#[from] tokio_postgres::Error),
    /// Failed to perform conversion from DB representation of type.
    #[error("Failed to convert type")]
    TypeConversion,
    /// Failed to configure database
    #[error("Could not configure database: {0}")]
    Configuration(#[from] anyhow::Error),
}

/// Alias for returning results with [`DatabaseError`]s as the `Err` variant.
type DatabaseResult<T> = Result<T, DatabaseError>;

/// The database configuration stored in the database.
#[derive(Debug, Serialize)]
pub struct StoredConfiguration {
    /// The contract address of the track and trace contract monitored.
    pub contract_address: ContractAddress,
}

impl TryFrom<tokio_postgres::Row> for StoredConfiguration {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_contract_index: i64 = value.try_get(0)?;
        let raw_contract_subindex: i64 = value.try_get(1)?;
        let contract_address =
            ContractAddress::new(raw_contract_index as u64, raw_contract_subindex as u64);

        let settings = Self { contract_address };
        Ok(settings)
    }
}

/// A `StoredItemStatusChanged` event stored in the database.
#[derive(Debug)]
pub struct StoredItemStatusChangedEvent {
    /// The timestamp of the block the event was included in.
    pub block_time:       DateTime<Utc>,
    /// The transaction hash that the event was recorded in.
    pub transaction_hash: TransactionHash,
    /// The index from the array of logged events in a transaction.
    pub event_index:      u64,
    /// The item's id as logged in the event.
    pub item_id:          u64,
    /// The item's new status as logged in the event.
    pub new_status:       Status,
    /// Any additional data encoded as generic bytes as logged in the event.
    /// Usecase-specific data can be included here such as temperature,
    /// longitude, latitude, ... .
    pub additional_data:  AdditionalData,
}

// Conversion from an integer, as stored in the database, to the `Status` type.
fn status_from_i64(value: i64) -> Result<Status, DatabaseError> {
    match value {
        0 => Ok(Status::Produced),
        1 => Ok(Status::InTransit),
        2 => Ok(Status::InStore),
        3 => Ok(Status::Sold),
        _ => Err(DatabaseError::TypeConversion),
    }
}

impl TryFrom<tokio_postgres::Row> for StoredItemStatusChangedEvent {
    type Error = DatabaseError;

    // Conversion from the postgres row to the `StoredItemStatusChangedEvent` type.
    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_block_time: DateTime<Utc> = value.try_get(0)?;
        let raw_transaction_hash: &[u8] = value.try_get(1)?;
        let raw_event_index: i64 = value.try_get(2)?;
        let raw_item_id: i64 = value.try_get(3)?;
        let raw_new_status: i64 = value.try_get(4)?;
        let raw_additional_data: &[u8] = value.try_get(5)?;

        let events = Self {
            block_time:       raw_block_time,
            transaction_hash: raw_transaction_hash
                .try_into()
                .map_err(|_| DatabaseError::TypeConversion)?,
            event_index:      raw_event_index as u64,
            new_status:       status_from_i64(raw_new_status)?,
            item_id:          raw_item_id as u64,
            additional_data:  AdditionalData::from_bytes(raw_additional_data.into()),
        };
        Ok(events)
    }
}

/// A `StoredItemCreated` event stored in the database.
#[derive(Debug)]
pub struct StoredItemCreatedEvent {
    /// The timestamp of the block the event was included in.
    pub block_time:       DateTime<Utc>,
    /// The transaction hash that the event was recorded in.
    pub transaction_hash: TransactionHash,
    /// The index from the array of logged events in a transaction.
    pub event_index:      u64,
    /// The item's id as logged in the event.
    pub item_id:          u64,
    /// The item's metadata_url as logged in the event.
    pub metadata_url:     Option<MetadataUrl>,
}

impl TryFrom<tokio_postgres::Row> for StoredItemCreatedEvent {
    type Error = DatabaseError;

    // Conversion from the postgres row to the `StoredItemCreatedEvent` type.
    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_block_time: DateTime<Utc> = value.try_get(0)?;
        let raw_transaction_hash: &[u8] = value.try_get(1)?;
        let raw_event_index: i64 = value.try_get(2)?;
        let raw_item_id: i64 = value.try_get(3)?;
        let raw_metadata_url: &[u8] = value.try_get(4)?;

        let events = Self {
            block_time:       raw_block_time,
            transaction_hash: raw_transaction_hash
                .try_into()
                .map_err(|_| DatabaseError::TypeConversion)?,
            event_index:      raw_event_index as u64,
            item_id:          raw_item_id as u64,
            metadata_url:     from_bytes(raw_metadata_url).unwrap(),
        };
        Ok(events)
    }
}

/// Database client wrapper
pub struct Database {
    /// The database client
    pub client: Object,
}

impl From<Object> for Database {
    fn from(client: Object) -> Self { Self { client } }
}

impl AsRef<Object> for Database {
    fn as_ref(&self) -> &Object { &self.client }
}

impl Database {
    /// Inserts a row in the settings table holding the application
    /// configuration. The table is constrained to only hold a single row.
    pub async fn init_settings(&self, contract_address: &ContractAddress) -> DatabaseResult<()> {
        let init_settings = self
            .client
            .prepare_cached(
                "INSERT INTO settings (contract_index, contract_subindex) VALUES ($1, $2) ON \
                 CONFLICT DO NOTHING",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 2] = [
            &(contract_address.index as i64),
            &(contract_address.subindex as i64),
        ];
        self.client.execute(&init_settings, &params).await?;
        Ok(())
    }

    /// Get the settings recorded in the database.
    pub async fn get_settings(&self) -> DatabaseResult<StoredConfiguration> {
        let get_settings = self
            .client
            .prepare_cached("SELECT contract_index, contract_subindex FROM settings")
            .await?;
        self.client.query_one(&get_settings, &[]).await?.try_into()
    }

    /// Get all [`StoredItemStatusChangedEvents`] by item id.
    /// Note: This function will be used by the http server and the
    /// `#[allow(dead_code)]` is only temporary until the http server is
    /// developed.
    #[allow(dead_code)]
    pub async fn get_item_status_changed_events_submissions(
        &self,
        item_id: u64,
    ) -> DatabaseResult<Vec<StoredItemStatusChangedEvent>> {
        let get_item_status_changed_event_submissions = self
            .client
            .prepare_cached(
                "SELECT block_time, transaction_hash, event_index, item_id, new_status, \
                 additional_data from item_status_changed_events WHERE item_id = $1",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(item_id as i64)];

        let rows = self
            .client
            .query(&get_item_status_changed_event_submissions, &params)
            .await?;

        let result: Vec<StoredItemStatusChangedEvent> = rows
            .into_iter()
            .map(StoredItemStatusChangedEvent::try_from)
            .collect::<Result<Vec<_>, _>>()?;

        Ok(result)
    }

    /// Get the [`StoredItemCreatedEvent`] by item id.
    /// Note: This function will be used by the http server and the
    /// `#[allow(dead_code)]` is only temporary until the http server is
    /// developed.
    #[allow(dead_code)]
    pub async fn get_item_created_event_submission(
        &self,
        item_id: u64,
    ) -> DatabaseResult<Option<StoredItemCreatedEvent>> {
        let get_item_created_event_submissions = self
            .client
            .prepare_cached(
                "SELECT block_time, transaction_hash, event_index, item_id, metadata_url from \
                 item_created_events WHERE item_id = $1",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(item_id as i64)];

        let opt_row = self
            .client
            .query_opt(&get_item_created_event_submissions, &params)
            .await?;

        opt_row.map(StoredItemCreatedEvent::try_from).transpose()
    }
}

/// Representation of a database pool
#[derive(Debug, Clone)]
pub struct DatabasePool {
    /// The inner pool value.
    pool: deadpool_postgres::Pool,
}

impl DatabasePool {
    /// Create a new [`DatabasePool`] from [`tokio_postgres::Config`] of size
    /// `pool_size`. If `try_create_tables` is true, database tables are
    /// created using `/resources/schema.sql`.
    pub async fn create(
        db_config: tokio_postgres::Config,
        pool_size: usize,
        try_create_tables: bool,
    ) -> DatabaseResult<Self> {
        let manager_config = deadpool_postgres::ManagerConfig {
            recycling_method: deadpool_postgres::RecyclingMethod::Verified,
        };

        let manager = deadpool_postgres::Manager::from_config(db_config, NoTls, manager_config);
        let pool = deadpool_postgres::Pool::builder(manager)
            .create_timeout(Some(std::time::Duration::from_secs(5)))
            .recycle_timeout(Some(std::time::Duration::from_secs(5)))
            .wait_timeout(Some(std::time::Duration::from_secs(5)))
            .max_size(pool_size)
            .runtime(deadpool_postgres::Runtime::Tokio1)
            .build()
            .context("Failed to build database pool")?;

        if try_create_tables {
            let client = pool
                .get()
                .await
                .context("Could not get database connection from pool")?;
            client
                .batch_execute(include_str!("../resources/schema.sql"))
                .await
                .context("Failed to execute create statements")?;
        }
        Ok(Self { pool })
    }

    /// Get a [`Database`] connection from the pool.
    pub async fn get(&self) -> DatabaseResult<Database> {
        let client = self
            .pool
            .get()
            .await
            .context("Failed to get connection from pool")?;
        Ok(client.into())
    }
}

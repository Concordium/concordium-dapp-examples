use anyhow::Context;
use concordium_rust_sdk::types::{hashes::TransactionHash, AbsoluteBlockHeight, ContractAddress};
use deadpool_postgres::{GenericClient, Object};
use serde::Serialize;
use tokio_postgres::{types::ToSql, NoTls};
use track_and_trace::*;

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
    /// Any other error happening
    #[error("{0}")]
    Other(String),
}

/// Alias for returning results with [`DatabaseError`]s as the `Err` variant.
type DatabaseResult<T> = Result<T, DatabaseError>;

/// The server configuration stored in the DB.
#[derive(Debug, Serialize)]
pub struct StoredConfiguration {
    /// The latest recorded block height.
    pub latest_block_height:     Option<AbsoluteBlockHeight>,
    ///  The latest recorded transaction hash.
    pub latest_transaction_hash: Option<TransactionHash>,
    /// The latest recorded event index.
    pub latest_event_index:      Option<u16>,
    /// The contract address of the track and trace contract monitored.
    pub contract_address:        ContractAddress,
}

impl TryFrom<tokio_postgres::Row> for StoredConfiguration {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_latest_block_height: Option<i64> = value.try_get(0)?;
        let raw_latest_transaction_hash: Option<&[u8]> = value.try_get(1)?;
        let raw_latest_event_index: Option<i64> = value.try_get(2)?;
        let raw_contract_index: i64 = value.try_get(3)?;
        let raw_contract_subindex: i64 = value.try_get(4)?;
        let contract_address =
            ContractAddress::new(raw_contract_index as u64, raw_contract_subindex as u64);

        let latest_transaction_hash: Option<TransactionHash> = match raw_latest_transaction_hash {
            Some(bytes) => {
                let latest_transaction_hash: TransactionHash = bytes
                    .try_into()
                    .map_err(|_| DatabaseError::TypeConversion)?;

                Some(latest_transaction_hash)
            }
            None => None,
        };

        let settings = Self {
            latest_block_height: raw_latest_block_height.map(|v| (v as u64).into()),
            latest_transaction_hash,
            latest_event_index: raw_latest_event_index.map(|v| (v as u16)),
            contract_address,
        };
        Ok(settings)
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

    /// Get the latest block height, latest transaction hash, and latest event
    /// index recorded in the DB.
    pub async fn get_settings(&self) -> DatabaseResult<StoredConfiguration> {
        let get_settings = self
            .client
            .prepare_cached(
                "SELECT latest_block_height, latest_transaction_hash, latest_event_index, \
                 contract_index, contract_subindex FROM settings",
            )
            .await?;
        self.client.query_one(&get_settings, &[]).await?.try_into()
    }
}

/// Wrapper around a database transaction
pub struct Transaction<'a> {
    /// The inner transaction
    pub inner: deadpool_postgres::Transaction<'a>,
}

impl<'a> From<deadpool_postgres::Transaction<'a>> for Transaction<'a> {
    fn from(inner: deadpool_postgres::Transaction<'a>) -> Self { Self { inner } }
}

impl<'a> Transaction<'a> {
    // Set the latest height in the DB.
    pub async fn set_latest_height(
        &self,
        height: AbsoluteBlockHeight,
        transaction_hash: TransactionHash,
        event_index: u16,
    ) -> DatabaseResult<()> {
        let set_latest_height = self
            .inner
            .prepare_cached(
                "UPDATE settings SET latest_block_height = $1, latest_transaction_hash = $2, \
                 latest_event_index = $3 WHERE id = true",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 3] = [
            &(height.height as i64),
            &transaction_hash.as_ref(),
            &(event_index as i64),
        ];
        self.inner.execute(&set_latest_height, &params).await?;
        Ok(())
    }

    /// Insert a contract event submission into the DB.
    pub async fn insert_event(
        &self,
        transaction_hash: TransactionHash,
        item_id: u64,
        new_status: Status,
        additional_data: AdditionalData,
    ) -> DatabaseResult<()> {
        let insert_event = self
            .inner
            .prepare_cached(
                "INSERT INTO events (id, transaction_hash, item_id, new_status, additional_data) \
                 SELECT COALESCE(MAX(id) + 1, 0), $1, $2, $3, $4 FROM events;",
            )
            .await?;

        let params: [&(dyn ToSql + Sync); 4] = [
            &transaction_hash.as_ref(),
            &(item_id as i64),
            &(new_status as i64),
            &additional_data.bytes,
        ];

        self.inner.execute(&insert_event, &params).await?;
        Ok(())
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

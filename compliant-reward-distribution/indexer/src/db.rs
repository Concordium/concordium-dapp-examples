use anyhow::Context;
use concordium_rust_sdk::types::{hashes::BlockHash, AbsoluteBlockHeight};
use deadpool_postgres::{GenericClient, Object};
use serde::Serialize;
use tokio_postgres::{types::ToSql, NoTls};

/// Represents possible errors returned from [`Database`] or [`DatabasePool`]
/// functions
#[derive(thiserror::Error, Debug)]
pub enum DatabaseError {
    /// An error happened while interacting with the postgres DB.
    #[error("{0}")]
    Postgres(#[from] tokio_postgres::Error),
    /// Failed to perform conversion from DB representation of type.
    #[error("Failed to convert type: {0}")]
    TypeConversion(String),
    /// Failed to configure database
    #[error("Could not configure database: {0}")]
    Configuration(#[from] anyhow::Error),
}

/// Alias for returning results with [`DatabaseError`]s as the `Err` variant.
type DatabaseResult<T> = Result<T, DatabaseError>;

/// The database configuration stored in the database.
#[derive(Debug, Serialize)]
pub struct StoredConfiguration {
    /// The genesis block hash of the network monitored.
    pub genesis_block_hash:            BlockHash,
    /// The last block height that was processed.
    pub latest_processed_block_height: Option<AbsoluteBlockHeight>,
}

impl TryFrom<tokio_postgres::Row> for StoredConfiguration {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_genesis_block_hash: &[u8] = value.try_get("genesis_block_hash")?;
        let raw_latest_processed_block_height: Option<i64> =
            value.try_get("latest_processed_block_height")?;

        let latest_processed_block_height =
            raw_latest_processed_block_height.map(|raw_latest_processed_block_height| {
                AbsoluteBlockHeight::from(raw_latest_processed_block_height as u64)
            });

        let settings = Self {
            latest_processed_block_height,
            genesis_block_hash: raw_genesis_block_hash
                .try_into()
                .map_err(|_| DatabaseError::TypeConversion("genesis_block_hash".to_string()))?,
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
    /// configuration if row does not exist already. The table is constrained to
    /// only hold a single row.
    pub async fn init_settings(
        &self,
        genesis_block_hash: &BlockHash,
        start_block_height: AbsoluteBlockHeight,
    ) -> DatabaseResult<()> {
        let init_settings = self
            .client
            .prepare_cached(
                "INSERT INTO settings (genesis_block_hash, start_block_height) VALUES ($1, $2) ON \
                 CONFLICT DO NOTHING",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 2] = [
            &genesis_block_hash.as_ref(),
            &(start_block_height.height as i64),
        ];
        self.client.execute(&init_settings, &params).await?;
        Ok(())
    }

    /// Get the settings recorded in the database.
    pub async fn get_settings(&self) -> DatabaseResult<Option<StoredConfiguration>> {
        let get_settings = self
            .client
            .prepare_cached(
                "SELECT genesis_block_hash, start_block_height, latest_processed_block_height \
                 FROM settings",
            )
            .await?;

        let opt_row = self.client.query_opt(&get_settings, &[]).await?;

        opt_row.map(StoredConfiguration::try_from).transpose()
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
    /// created using `../resources/schema.sql`.
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

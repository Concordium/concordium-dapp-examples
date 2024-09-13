use crate::error::{ConversionError, DatabaseError};
use chrono::{DateTime, Utc};
use concordium_rust_sdk::{
    base::{
        contracts_common::{AccountAddress, AccountAddressParseError},
        hashes::TransactionHash,
    },
    types::{hashes::BlockHash, AbsoluteBlockHeight},
};
use deadpool_postgres::{GenericClient, Object};
use serde::Serialize;
use tokio_postgres::{types::ToSql, NoTls};

/// Alias for returning results with [`DatabaseError`]s as the `Err` variant.
type DatabaseResult<T> = Result<T, DatabaseError>;

/// Use the [`BlockHash`] as an alias for the [`UniquenessHash`].
/// The [`BlockHash`] implements helper functions (e.g. serde::Serialize,
/// serde::Deserialize, and Display) that are needed for the `UniquenessHash` as
/// well.
type UniquenessHash = BlockHash;

/// The account data stored in the `accounts` table in the database.
#[derive(Debug, Clone, Copy, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AccountData {
    /// The account address that was indexed.
    pub account_address: AccountAddress,
    /// The timestamp of the block the event was included in.
    pub block_time: DateTime<Utc>,
    /// The transaction hash that the event was recorded in.
    pub transaction_hash: TransactionHash,
    /// A boolean specifying if the account has already claimed its rewards (got
    /// a reward payout). Every account can only claim rewards once.
    pub claimed: bool,
    /// A boolean specifying if this account address has submitted all tasks
    /// and the regulatory conditions have been proven via a ZK proof.
    /// A manual check of the completed tasks is required now before releasing
    /// the reward.
    pub pending_approval: bool,
}

/// The tweet data stored in the database.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TweetData {
    /// The account address that submitted the tweet.
    pub account_address: AccountAddress,
    /// A tweet id submitted by the above account address (task 1).
    pub tweet_id: Option<String>,
    /// A boolean specifying if the text content of the tweet is eligible for
    /// the reward. The content of the text was verified by this backend
    /// before this flag is set (or will be verified manually).
    pub tweet_valid: bool,
    /// A version that specifies the setting of the tweet verification. This
    /// enables us to update the tweet verification logic in the future and
    /// invalidate older versions.
    pub tweet_verification_version: u64,
    /// The timestamp when the tweet was submitted.
    pub tweet_submit_time: DateTime<Utc>,
}

/// The zk proof data stored in the database.
#[derive(Debug, Clone, Copy, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ZkProofData {
    /// The account address that submitted the zk proof.
    pub account_address: AccountAddress,
    /// A hash of the concatenated revealed `national_id_number` and
    /// `nationality` to prevent claiming with different accounts for the
    /// same identity.
    pub uniqueness_hash: UniquenessHash,
    /// A boolean specifying if the identity associated with the account is
    /// eligible for the reward (task 2). An associated ZK proof was
    /// verified by this backend before this flag is set.
    pub zk_proof_valid: bool,
    /// A version that specifies the setting of the ZK proof during the
    /// verification. This enables us to update the ZK proof-verification
    /// logic in the future and invalidate older proofs.
    pub zk_proof_verification_version: u64,
    /// The timestamp when the ZK proof verification was submitted.
    pub zk_proof_verification_submit_time: DateTime<Utc>,
}

/// The account data stored in the database across all tables.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StoredAccountData {
    /// Data from the `accounts` table.
    pub account_data: Option<AccountData>,
    /// Data from the `tweets` table.
    pub tweet_data: Option<TweetData>,
    /// Data from the `zkProofs` table.
    pub zk_proof_data: Option<ZkProofData>,
}

impl TryFrom<tokio_postgres::Row> for AccountData {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_account_address: &[u8] = value.try_get("account_address")?;
        let raw_transaction_hash: &[u8] = value.try_get("transaction_hash")?;

        let data = Self {
            account_address: raw_account_address.try_into().map_err(
                |e: AccountAddressParseError| {
                    DatabaseError::TypeConversion(
                        "account_address".to_string(),
                        ConversionError::AccountAddressParse(e),
                    )
                },
            )?,
            block_time: value.try_get("block_time")?,
            claimed: value.try_get("claimed")?,
            pending_approval: value.try_get("pending_approval")?,
            transaction_hash: raw_transaction_hash.try_into().map_err(|e| {
                DatabaseError::TypeConversion(
                    "transaction_hash".to_string(),
                    ConversionError::IncorrectLength(e),
                )
            })?,
        };

        Ok(data)
    }
}

impl TryFrom<tokio_postgres::Row> for TweetData {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_account_address: &[u8] = value.try_get("account_address")?;
        let raw_tweet_id: Option<&[u8]> = value.try_get("tweet_id")?;
        let raw_tweet_verification_version: i64 = value.try_get("tweet_verification_version")?;

        let data = Self {
            account_address: raw_account_address.try_into().map_err(
                |e: AccountAddressParseError| {
                    DatabaseError::TypeConversion(
                        "account_address".to_string(),
                        ConversionError::AccountAddressParse(e),
                    )
                },
            )?,
            tweet_valid: value.try_get("tweet_valid")?,
            tweet_verification_version: raw_tweet_verification_version as u64,
            tweet_submit_time: value.try_get("tweet_submit_time")?,
            tweet_id: raw_tweet_id.and_then(|tweet| {
                String::from_utf8(tweet.to_vec())
                    .map(Some)
                    .map_err(|e| {
                        DatabaseError::TypeConversion(
                            "tweet_id".to_string(),
                            ConversionError::FromUtf8Error(e),
                        )
                    })
                    .ok()?
            }),
        };

        Ok(data)
    }
}

impl TryFrom<tokio_postgres::Row> for ZkProofData {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_uniqueness_hash: &[u8] = value.try_get("uniqueness_hash")?;
        let raw_zk_proof_verification_version: i64 =
            value.try_get("zk_proof_verification_version")?;
        let raw_account_address: &[u8] = value.try_get("account_address")?;

        let data = Self {
            zk_proof_valid: value.try_get("zk_proof_valid")?,
            zk_proof_verification_version: raw_zk_proof_verification_version as u64,
            uniqueness_hash: UniquenessHash::try_from(raw_uniqueness_hash).map_err(|e| {
                DatabaseError::TypeConversion(
                    "uniqueness_hash".to_string(),
                    ConversionError::IncorrectLength(e),
                )
            })?,

            account_address: raw_account_address.try_into().map_err(
                |e: AccountAddressParseError| {
                    DatabaseError::TypeConversion(
                        "account_address".to_string(),
                        ConversionError::AccountAddressParse(e),
                    )
                },
            )?,
            zk_proof_verification_submit_time: value
                .try_get("zk_proof_verification_submit_time")?,
        };

        Ok(data)
    }
}

/// The database configuration stored in the database.
#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StoredConfiguration {
    /// The genesis block hash of the network monitored.
    pub genesis_block_hash: BlockHash,
    /// The last block height that was processed.
    pub latest_processed_block_height: Option<AbsoluteBlockHeight>,
    /// The start block height that was indexed.
    pub start_block_height: AbsoluteBlockHeight,
}

impl TryFrom<tokio_postgres::Row> for StoredConfiguration {
    type Error = DatabaseError;

    fn try_from(value: tokio_postgres::Row) -> DatabaseResult<Self> {
        let raw_genesis_block_hash: &[u8] = value.try_get("genesis_block_hash")?;
        let raw_latest_processed_block_height: Option<i64> =
            value.try_get("latest_processed_block_height")?;
        let raw_start_block_height: i64 = value.try_get("start_block_height")?;

        let latest_processed_block_height =
            raw_latest_processed_block_height.map(|raw_latest_processed_block_height| {
                AbsoluteBlockHeight::from(raw_latest_processed_block_height as u64)
            });
        let start_block_height = AbsoluteBlockHeight::from(raw_start_block_height as u64);

        let settings = Self {
            latest_processed_block_height,
            genesis_block_hash: raw_genesis_block_hash.try_into().map_err(|e| {
                DatabaseError::TypeConversion(
                    "genesis_block_hash".to_string(),
                    ConversionError::IncorrectLength(e),
                )
            })?,
            start_block_height,
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
    fn from(client: Object) -> Self {
        Self { client }
    }
}

impl AsRef<Object> for Database {
    fn as_ref(&self) -> &Object {
        &self.client
    }
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
        let conflict_check_query = "SELECT id FROM settings WHERE id = true";

        let opt_row = self.client.query_opt(conflict_check_query, &[]).await?;

        // If `settings` table already has one row, don't update it, otherwise set the
        // initial settings.
        if opt_row.is_none() {
            let init_settings = self
                .client
                .prepare_cached(
                    "INSERT INTO settings (genesis_block_hash, start_block_height) \
                    VALUES ($1, $2)",
                )
                .await?;
            let params: [&(dyn ToSql + Sync); 2] = [
                &genesis_block_hash.as_ref(),
                &(start_block_height.height as i64),
            ];
            self.client.execute(&init_settings, &params).await?;
        }

        Ok(())
    }

    pub async fn upsert_zk_proof(
        &self,
        uniqueness_hash: &[u8],
        account_address: AccountAddress,
        pending_approval: bool,
        current_zk_proof_verification_version: u16,
    ) -> DatabaseResult<()> {
        // Update the `zkProofs` tabel with the new ZK proof.
        let set_zk_proof = self
            .client
            .prepare_cached(
                "INSERT INTO zkProofs (zk_proof_valid, zk_proof_verification_version, uniqueness_hash, zk_proof_verification_submit_time, account_address) VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (account_address) DO UPDATE
                SET zk_proof_valid = EXCLUDED.zk_proof_valid,
                    zk_proof_verification_version = EXCLUDED.zk_proof_verification_version,
                    uniqueness_hash = EXCLUDED.uniqueness_hash,
                    zk_proof_verification_submit_time = EXCLUDED.zk_proof_verification_submit_time",
            ).await?;
        let params: [&(dyn ToSql + Sync); 5] = [
            &true,
            &(current_zk_proof_verification_version as i64),
            &uniqueness_hash,
            &Utc::now(),
            &account_address.0.as_ref(),
        ];
        self.client.execute(&set_zk_proof, &params).await?;

        // Update the `accounts` table with the new pending approval.
        let set_pending_approval = self
            .client
            .prepare_cached(
                "UPDATE accounts \
                SET pending_approval = $1 \
                WHERE account_address = $2",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 2] = [&pending_approval, &account_address.0.as_ref()];
        self.client.execute(&set_pending_approval, &params).await?;

        Ok(())
    }

    pub async fn upsert_tweet(
        &self,
        tweet_id: String,
        account_address: AccountAddress,
        pending_approval: bool,
        current_tweet_verification_version: u16,
    ) -> DatabaseResult<()> {
        // Update the `tweets` tabel with the new tweet.
        let set_tweet = self
            .client
            .prepare_cached(
                "INSERT INTO tweets (tweet_valid, tweet_verification_version, tweet_id, tweet_submit_time, account_address)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (account_address) DO UPDATE
                SET tweet_valid = EXCLUDED.tweet_valid,
                    tweet_verification_version = EXCLUDED.tweet_verification_version,
                    tweet_id = EXCLUDED.tweet_id,
                    tweet_submit_time = EXCLUDED.tweet_submit_time"
                 ).await?;
        let params: [&(dyn ToSql + Sync); 5] = [
            &true,
            &(current_tweet_verification_version as i64),
            &tweet_id.as_bytes(),
            &Utc::now(),
            &account_address.0.as_ref(),
        ];
        self.client.execute(&set_tweet, &params).await?;

        // Update the `accounts` table with the new pending approval.
        let set_pending_approval = self
            .client
            .prepare_cached(
                "UPDATE accounts \
                    SET pending_approval = $1 \
                    WHERE account_address = $2",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 2] = [&pending_approval, &account_address.0.as_ref()];
        self.client.execute(&set_pending_approval, &params).await?;

        Ok(())
    }

    pub async fn set_claimed(&self, account_addresses: Vec<AccountAddress>) -> DatabaseResult<()> {
        for account_address in account_addresses {
            let set_claimed = self
                .client
                .prepare_cached(
                    "UPDATE accounts \
                    SET claimed = $1, pending_approval = $2 \
                    WHERE account_address = $3",
                )
                .await?;
            let params: [&(dyn ToSql + Sync); 3] = [&true, &false, &account_address.0.as_ref()];
            self.client.execute(&set_claimed, &params).await?;
        }
        Ok(())
    }

    pub async fn get_settings(&self) -> DatabaseResult<StoredConfiguration> {
        let get_settings = self
            .client
            .prepare_cached(
                "SELECT genesis_block_hash, start_block_height, latest_processed_block_height \
                FROM settings",
            )
            .await?;
        self.client.query_one(&get_settings, &[]).await?.try_into()
    }

    pub async fn get_account_data(
        &self,
        account_address: AccountAddress,
    ) -> DatabaseResult<Option<AccountData>> {
        let get_account_data = self
            .client
            .prepare_cached(
                "SELECT account_address, block_time, transaction_hash, claimed, pending_approval
                FROM accounts
                WHERE account_address = $1",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(account_address.0.as_ref())];
        let opt_row = self.client.query_opt(&get_account_data, &params).await?;
        opt_row.map(AccountData::try_from).transpose()
    }

    pub async fn get_tweet_data(
        &self,
        account_address: AccountAddress,
    ) -> DatabaseResult<Option<TweetData>> {
        let get_account_data = self
            .client
            .prepare_cached(
                "SELECT account_address, tweet_id, tweet_valid, tweet_verification_version, tweet_submit_time
                FROM tweets
                WHERE account_address = $1",
            ).await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(account_address.0.as_ref())];
        let opt_row = self.client.query_opt(&get_account_data, &params).await?;
        opt_row.map(TweetData::try_from).transpose()
    }

    pub async fn get_zk_proof_data_by_unquiness_hash(
        &self,
        uniqueness_hash: &[u8],
    ) -> DatabaseResult<Option<ZkProofData>> {
        // Check if `uniqueness_hash` has been used for another account before.
        let get_account_data = self
            .client
            .prepare_cached(
            "SELECT account_address, uniqueness_hash, zk_proof_valid, zk_proof_verification_version, zk_proof_verification_submit_time
            FROM zkProofs
           WHERE uniqueness_hash = $1",

            )
            .await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(uniqueness_hash)];
        let opt_row = self.client.query_opt(&get_account_data, &params).await?;
        opt_row.map(ZkProofData::try_from).transpose()
    }

    pub async fn get_zk_proof_data_by_account(
        &self,
        account_address: AccountAddress,
    ) -> DatabaseResult<Option<ZkProofData>> {
        let get_account_data: tokio_postgres::Statement = self
            .client
            .prepare_cached(
                "SELECT account_address, uniqueness_hash, zk_proof_valid, zk_proof_verification_version, zk_proof_verification_submit_time
                FROM zkProofs
                WHERE account_address = $1",
            ).await?;
        let params: [&(dyn ToSql + Sync); 1] = [&(account_address.0.as_ref())];
        let opt_row = self.client.query_opt(&get_account_data, &params).await?;
        opt_row.map(ZkProofData::try_from).transpose()
    }

    pub async fn get_pending_approvals(
        &self,
        limit: u32,
        offset: u32,
    ) -> DatabaseResult<Vec<AccountData>> {
        let get_pending_approvals = self
            .client
            .prepare_cached(
                "SELECT account_address, block_time, transaction_hash, claimed, pending_approval \
                FROM accounts \
                WHERE pending_approval = true \
                LIMIT $1 \
                OFFSET $2",
            )
            .await?;
        let params: [&(dyn ToSql + Sync); 2] = [&(limit as i64), &(offset as i64)];

        let rows = self.client.query(&get_pending_approvals, &params).await?;

        let account_data: Vec<AccountData> = rows
            .into_iter()
            .map(AccountData::try_from)
            .collect::<Result<Vec<_>, _>>()?;

        Ok(account_data)
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
            .map_err(|e| DatabaseError::Configuration(e.into()))?;

        if try_create_tables {
            let client = pool.get().await?;
            client
                .batch_execute(include_str!("../resources/schema.sql"))
                .await
                .map_err(|e| DatabaseError::Configuration(e.into()))?;
        }
        Ok(Self { pool })
    }

    /// Get a [`Database`] connection from the pool.
    pub async fn get(&self) -> DatabaseResult<Database> {
        let client = self.pool.get().await?;
        Ok(client.into())
    }
}

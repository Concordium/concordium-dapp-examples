-- Table containing indexer settings
CREATE TABLE IF NOT EXISTS settings (
  -- Primary key.
  id BOOL PRIMARY KEY DEFAULT true CHECK (id), -- To constrain the table to have a single row.
  -- The genesis block hash as queried from the node. This will be set the first time the indexer is started.
  -- Re-starting the indexer will check if the node connection is compatible with
  -- the stored genesis_block_hash to prevent corrupting the database.
  -- The described check prevents that the indexer is re-started with a node connection
  -- to mainnet while the database has indexed data from testnet or vice versa.
  genesis_block_hash BYTEA NOT NULL,
  -- Start block height that was indexed.
  start_block_height INT8 NOT NULL,
  -- The last block height that was processed.
  latest_processed_block_height INT8
);

-- Table containing new accounts that have been created not earlier than `start_block_height`.
-- Every account in this table is eligible to claim rewards one time after completing some tasks
-- and fulfilling some regulatory conditions (e.g. age restrictions).
-- The `pending_approval` is set to true after submitting all tasks and the regulatory conditions have
-- been proven via a ZK proof. A manual check of the tasks is required now before releasing the reward.
-- The `claimed` flag is set to true after the reward has been released.
CREATE TABLE IF NOT EXISTS accounts (
  -- Primary key.
  id BIGSERIAL PRIMARY KEY,
  -- The account address created on chain.
  account_address BYTEA NOT NULL,
  -- The timestamp of the block when the account was created on chain.
  block_time TIMESTAMP WITH TIME ZONE NOT NULL,
  -- The transaction hash of the transaction that created the account on chain.
  transaction_hash BYTEA NOT NULL,
  -- A boolean specifying if the account has already claimed its rewards (got a reward payout).
  -- Every account can only claim rewards once.
  claimed BOOL NOT NULL,
  -- A boolean specifying if this account address has submitted all tasks
  -- and the regulatory conditions have been proven via a ZK proof.
  -- A manual check of the completed tasks is required now before releasing the reward.
  pending_approval BOOL NOT NULL,
  -- A link to a twitter post submitted by the above account address (task 1).
  twitter_post_link BYTEA,
  -- A boolean specifying if the identity associated with the account is eligible for the reward (task 2).
  -- An associated ZK proof was verfied by this backend before this flag is set.
  zk_proof_valid BOOL,
  -- A version that specifies the setting of the ZK proof during the verification. This enables us
  -- to update the ZK proof verification logic in the future and invalidate older proofs.
  zk_proof_version INT8,
  -- A hash of the revealed `firstName|lastName|passportNumber` to prevent
  -- claiming with different accounts for the same identity.
  uniqueness_hash BYTEA,
  -- Ensure that the ZK values are set at the same time. Either the ZK values are NULL or NOT NULL.
  CHECK (
    (zk_proof_valid IS NULL AND zk_proof_version IS NULL AND uniqueness_hash IS NULL) OR
    (zk_proof_valid IS NOT NULL AND zk_proof_version IS NOT NULL AND uniqueness_hash IS NOT NULL)
  )
);

-- Improve performance on queries for a given account_address in the accounts table.
CREATE INDEX IF NOT EXISTS accounts_index ON accounts (account_address);
-- Improve performance on queries for given pending_approvals in the accounts table.
CREATE INDEX IF NOT EXISTS pending_approval_index ON accounts (pending_approval);

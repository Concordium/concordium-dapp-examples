-- Table containing indexer settings
CREATE TABLE IF NOT EXISTS settings (
  -- The primary key.
  id BOOL PRIMARY KEY DEFAULT true CHECK (id), -- To constrain the table to have a single row.
  -- The genesis block hash as queried from the node. This will be set the first time the indexer is started.
  -- Re-starting the indexer will check if the node connection is compatible with
  -- the stored genesis_block_hash to prevent corrupting the database.
  -- The described check prevents that the indexer is re-started with a node connection
  -- to mainnet while the database has indexed data from testnet or vice versa.
  genesis_block_hash BYTEA NOT NULL,
  -- The start block height that was indexed.
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
  -- The account address created on chain.
  account_address BYTEA NOT NULL PRIMARY KEY,
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
  pending_approval BOOL NOT NULL
);

-- Task 1:
-- Table containing information regarding task 1 (tweet verification).
CREATE TABLE IF NOT EXISTS tweets (
  -- The account address that submitted the tweet.
  account_address BYTEA NOT NULL PRIMARY KEY,
  -- A tweet id to a twitter post submitted by the above account address. For MVP this post is
  -- collected to manually verify the text content. Nonethless, it is possible to automate this process
  -- and this value should not be set in the long run to preserve better privacy for the users
  -- (to not link a twitter account to a Concordium account address and its associated verified ZK proof).
  tweet_id BYTEA,
  -- A boolean specifying if the text content of the tweet is eligible for the reward.
  -- The content of the text was verified by this backend before this flag is set (or will be verified manually).
  tweet_valid BOOL NOT NULL,
  -- A version that specifies the setting of the tweet verification. This enables us
  -- to update the tweet verification logic in the future and invalidate older versions.
  tweet_verification_version INT8 NOT NULL,
  -- The timestamp when the tweet was submitted.
  tweet_submit_time TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Task 2:
-- Table containing information regarding the task 2 (zk proof verification).
CREATE TABLE IF NOT EXISTS zkProofs (
  -- The account address that submitted the zk proof.
  account_address BYTEA NOT NULL PRIMARY KEY,
  -- A hash of the concatenated revealed `national_id_number` and `nationality` to prevent
  -- claiming with different accounts for the same identity.
  uniqueness_hash BYTEA NOT NULL,
  -- A boolean specifying if the identity associated with the account is eligible for the reward.
  -- An associated ZK proof was verfied by this backend before this flag is set.
  zk_proof_valid BOOL NOT NULL,
  -- A version that specifies the setting of the ZK proof during the verification. This enables us
  -- to update the ZK proof verification logic in the future and invalidate older proofs.
  zk_proof_verification_version INT8 NOT NULL,
   -- The timestamp when the ZK proof verification was submitted.
  zk_proof_verification_submit_time TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Improve performance on queries for given pending_approvals in the accounts table.
CREATE INDEX IF NOT EXISTS pending_approvals_index ON accounts (pending_approval);
-- Improve performance on queries for a given uniqueness_hash in the accounts table.
CREATE INDEX IF NOT EXISTS uniqueness_hash_index ON zkProofs (uniqueness_hash);

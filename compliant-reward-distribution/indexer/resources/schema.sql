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
  -- The primary key.
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

  -- Task 1:
  -- A link to a twitter post submitted by the above account address. For MVP this post is
  -- collected to manually verify the text content. Nonethless, it is possible to automate this process
  -- and this value should not be set in the long run to preserve better privacy for the users
  -- (to not link a twitter account to a Concordium account address and its associated verified ZK proof).
  twitter_post_link BYTEA,
  -- A boolean specifying if the text content of the twitter post link is eligible for the reward.
  -- The content of the text was verified by this backend before this flag is set (or will be verified manually).
  twitter_post_link_valid BOOL,
  -- A version that specifies the setting of the twitter post link verification. This enables us
  -- to update the twitter post link verification logic in the future and invalidate older versions.
  twitter_post_link_verification_version INT8,

  -- Task 2:
  -- A hash of the concatenated revealed `national_id_number` and `nationality` to prevent
  -- claiming with different accounts for the same identity.
  uniqueness_hash BYTEA,
  -- A boolean specifying if the identity associated with the account is eligible for the reward.
  -- An associated ZK proof was verfied by this backend before this flag is set.
  zk_proof_valid BOOL,
  -- A version that specifies the setting of the ZK proof during the verification. This enables us
  -- to update the ZK proof verification logic in the future and invalidate older proofs.
  zk_proof_verification_version INT8,

  CHECK (
    -- Ensure that the twitter values are set at the same time. Either the twitter values are NULL or NOT NULL.
    (twitter_post_link_valid IS NULL AND twitter_post_link_verification_version IS NULL AND twitter_post_link IS NULL) OR
    -- For MVP the `twitter_post_link` is set but in the future the process should be automated to not link
    -- a twitter account to a Concordium account address anymore. As such the `twitter_post_link`
    -- might be come obsolete and set to NULL.
    (twitter_post_link_valid IS NOT NULL AND twitter_post_link_verification_version IS NOT NULL) OR
    -- Ensure that the ZK values are set at the same time. Either the ZK values are NULL or NOT NULL.
    (zk_proof_valid IS NULL AND zk_proof_verification_version IS NULL AND uniqueness_hash IS NULL) OR
    (zk_proof_valid IS NOT NULL AND zk_proof_verification_version IS NOT NULL AND uniqueness_hash IS NOT NULL)
  )
);

-- Improve performance on queries for a given account_address in the accounts table.
CREATE INDEX IF NOT EXISTS accounts_index ON accounts (account_address);
-- Improve performance on queries for given pending_approvals in the accounts table.
CREATE INDEX IF NOT EXISTS pending_approval_index ON accounts (pending_approval);

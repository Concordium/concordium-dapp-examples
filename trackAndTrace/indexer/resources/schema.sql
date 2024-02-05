-- Table containing server settings
CREATE TABLE IF NOT EXISTS settings (
  id BOOL PRIMARY KEY DEFAULT true CHECK (id), -- To constrain table to have a single row.
  latest_block_height INT8,
  latest_transaction_hash BYTEA,
  latest_event_index INT8,
  contract_index INT8 NOT NULL,
  contract_subindex INT8 NOT NULL
);

-- Table containing events successfully submitted to the contract monitored.
CREATE TABLE IF NOT EXISTS events (
  id INT8 PRIMARY KEY,
  transaction_hash BYTEA NOT NULL,
  item_id INT8 NOT NULL,
  new_status INT8 NOT NULL,
  additional_data BYTEA NOT NULL
);

-- Improve performance on queries for events within id range for an account.
-- CREATE INDEX IF NOT EXISTS ballots_account_id_idx ON ballots (account, id);

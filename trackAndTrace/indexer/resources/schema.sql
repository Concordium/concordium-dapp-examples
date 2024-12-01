-- Table containing indexer settings
CREATE TABLE IF NOT EXISTS settings (
  -- Primary key.
  id BOOL PRIMARY KEY DEFAULT true CHECK (id), -- To constrain table to have a single row.
  -- Contract index. This will be set the frist time the indexer is started. 
  -- Re-starting the indexer will check if its settings are compatible with 
  -- the stored indexer setting to prevent corrupting the database.
  contract_index INT8 NOT NULL,
  -- Contract subindex. This will be set the frist time the indexer is started. 
  -- Re-starting the indexer will check if its settings are compatible with 
  -- the stored indexer setting to prevent corrupting the database.
  contract_subindex INT8 NOT NULL,
  -- The genesis block hash as querried from the node. This will be set the frist time the indexer is started. 
  -- Re-starting the indexer will check if its settings are compatible with 
  -- the stored indexer setting to prevent corrupting the database.
  genesis_block_hash BYTEA NOT NULL,
    -- The last block height that was processed.
  latest_processed_block_height INT8
);

-- Table containing item_status_changed_events successfully submitted to the database from the contract monitored.
CREATE TABLE IF NOT EXISTS item_status_changed_events (
  -- Primary key.
  id INT8 PRIMARY KEY,
  -- The timestamp of the block the event was included in.
  block_time TIMESTAMP WITH TIME ZONE NOT NULL,
  -- The transaction hash that the event was included in.
  transaction_hash BYTEA NOT NULL,
  -- The index from the array of logged events in a transaction.
  event_index INT8 NOT NULL,
  -- The item's id as logged in the event.
  item_id INT8 NOT NULL,
  -- The item's metadata_url as logged in the event.
  metadata_url BYTEA NOT NULL,
  -- The item's new status as logged in the event.
  new_status JSONB NOT NULL,
  -- Any additional data encoded as generic bytes as logged in the event. Usecase-specific data can be included here such as temperature, longitude, latitude, ... .
  additional_data BYTEA NOT NULL
);

-- Table containing item_created_events successfully submitted to the database from the contract monitored.
CREATE TABLE IF NOT EXISTS item_created_events (
  -- Primary key.
  id INT8 PRIMARY KEY,
  -- The timestamp of the block the event was included in.
  block_time TIMESTAMP WITH TIME ZONE NOT NULL,
  -- The transaction hash that the event was included in.
  transaction_hash BYTEA NOT NULL,
  -- The index from the array of logged events in a transaction.
  event_index INT8 NOT NULL,
  -- The item's id as logged in the event.
  item_id INT8 NOT NULL,
  -- The item's metadata_url as logged in the event.
  metadata_url BYTEA NOT NULL,
  -- The item's initial status as logged in the event.
  initial_status JSONB NOT NULL,
  -- Any additional data encoded as generic bytes as logged in the event. Usecase-specific data can be included here such as temperature, longitude, latitude, ... .
  additional_data BYTEA NOT NULL
);

-- Improve performance on queries for events with given item_id.
CREATE INDEX IF NOT EXISTS item_changed_index ON item_status_changed_events (item_id);
-- Improve performance on queries for events with given current status.
CREATE INDEX IF NOT EXISTS current_status_index ON item_status_changed_events (new_status);
-- Improve performance on queries for events with given item_id.
CREATE INDEX IF NOT EXISTS item_created_index ON item_created_events (item_id);

-- Table containing server settings
CREATE TABLE IF NOT EXISTS settings (
  id BOOL PRIMARY KEY DEFAULT true CHECK (id), -- To constrain table to have a single row.
  contract_index INT8 NOT NULL,
  contract_subindex INT8 NOT NULL
);

-- Table containing item_status_changed_events successfully submitted to the database from the contract monitored.
CREATE TABLE IF NOT EXISTS item_status_changed_events (
  id INT8 PRIMARY KEY,
  block_height INT8 NOT NULL,
  transaction_hash BYTEA NOT NULL,
  event_index INT8 NOT NULL,
  item_id INT8 NOT NULL,
  new_status INT8 NOT NULL,
  additional_data BYTEA NOT NULL,
  -- Define composite unique constraint to ensure each event exists at most once in the database
  CONSTRAINT unique_item_status_changed UNIQUE (block_height, transaction_hash, event_index)
);

-- Table containing item_created_events successfully submitted to the database from the contract monitored.
CREATE TABLE IF NOT EXISTS item_created_events (
  id INT8 PRIMARY KEY,
  block_height INT8 NOT NULL,
  transaction_hash BYTEA NOT NULL,
  event_index INT8 NOT NULL,
  item_id INT8 NOT NULL,
  metadata_url BYTEA NOT NULL,
  -- Define composite unique constraint to ensure each event exists at most once in the database
  CONSTRAINT unique_item_created UNIQUE (block_height, transaction_hash, event_index)
);

-- Improve performance on queries for events with given item_id.
CREATE INDEX IF NOT EXISTS item_changed_index ON item_status_changed_events (item_id);
-- Improve performance on queries for events with given current status.
CREATE INDEX IF NOT EXISTS current_status_index ON item_status_changed_events (new_status);
-- Improve performance on queries for events with given item_id.
CREATE INDEX IF NOT EXISTS item_created_index ON item_created_events (item_id);
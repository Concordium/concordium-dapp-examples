## Unreleased changes

## 0.2.0

- Add `initial_status` field in the create event.
- Change to match the `TokenIdU64` type for the `item_id` field in the create event and update event.

## 0.1.1

- Fix memory leak in the `indexer` by disabling the `bump_alloc` as the global allocator.

## 0.1.0

-   Initial `indexer` and `server`.

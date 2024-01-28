use concordium_rust_sdk::smart_contracts::{common as concordium_std, common::Serial};

/// The location of the metadata URL and an optional hash of the content.
#[derive(Serial)]
pub struct MetadataUrl {
    /// The URL following the specification RFC1738.
    pub url:  String,
    /// An optional hash of the content.
    pub hash: Option<[u8; 32]>,
}

/// Custom type for the item id.
type ItemID = u64;

/// Enum of the statuses that an item can have.
#[allow(dead_code)]
#[derive(Serial)]
pub enum Status {
    /// Item is produced.
    Produced,
    /// Item is in transit.
    InTransit,
    /// Item is in store.
    InStore,
    /// Item is sold.
    Sold,
}

/// Partial type of the type `ChangeItemStatusParamsByAdmin`.
#[derive(Serial)]
pub struct AdditionalData {
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub bytes: Vec<u8>,
}

#[derive(Serial)]
pub struct ChangeItemStatusParamsByAdmin {
    /// The item's id.
    pub item_id:         ItemID,
    /// The item's new status.
    pub new_status:      Status,
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub additional_data: AdditionalData,
}

pub enum TrackAndTraceContract {}

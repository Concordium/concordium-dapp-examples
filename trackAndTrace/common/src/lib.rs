use concordium_cis2::TokenIdU64;
use concordium_std::*;

/// Enum of the statuses that an item can have.
#[derive(Serialize, PartialEq, Eq, Reject, SchemaType, Clone, Copy, Debug)]
#[cfg_attr(feature = "serde", derive(serde::Deserialize, serde::Serialize))]
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

/// Partial parameter type for the contract function
/// `changeItemStatus`.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq, Clone)]
#[cfg_attr(feature = "serde", derive(serde::Deserialize, serde::Serialize))]
pub struct AdditionalData {
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub bytes: Vec<u8>,
}

impl AdditionalData {
    pub fn empty() -> Self {
        AdditionalData { bytes: vec![] }
    }

    pub fn from_bytes(bytes: Vec<u8>) -> Self {
        AdditionalData { bytes }
    }
}

/// The CIS-6 standard defines the item id to be a variable-length ASCII string
/// up to 255 characters. To encode all possible item ids, 255 bytes would be
/// needed in the smart contract. Nonetheless, we care to represent only a small
/// subset of these possible item ids in this contract and as a result it is
/// better to use a smaller fixed-size item id array. This contract can have up
/// to `u64::MAX` items so we use an 8-byte array to represent the `ItemID`. For
/// a more general item id type see `TokenIdVec` in the CIS-2-library.
pub type ItemID = TokenIdU64;

/// Tagged events to be serialized for the event log.
#[derive(Debug, Serial, Deserial, PartialEq, Eq, SchemaType, Clone)]
#[concordium(repr(u8))]
pub enum Event<A: Serial> {
    /// The event tracks when an item is created.
    #[concordium(tag = 237)]
    ItemCreated(ItemCreatedEvent),
    /// The event tracks when the item's status is updated.
    #[concordium(tag = 236)]
    ItemStatusChanged(ItemStatusChangedEvent<A>),
    /// The event tracks when a new role is granted to an address.
    #[concordium(tag = 2)]
    GrantRole(GrantRoleEvent),
    /// The event tracks when a role is revoked from an address.
    #[concordium(tag = 3)]
    RevokeRole(RevokeRoleEvent),
    /// The event tracks the nonce used by the signer of the `PermitMessage`
    /// whenever the `permit` function is invoked.
    #[concordium(tag = 250)]
    Nonce(NonceEvent),
}

/// The [`ItemCreatedEvent`] is logged when an item is created.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq, Clone)]
pub struct ItemCreatedEvent {
    /// The item's id.
    pub item_id: ItemID,
    /// The item's metadata_url.
    pub metadata_url: Option<MetadataUrl>,
    /// The item's initial status.
    pub initial_status: Status,
}

/// The [`ItemStatusChangedEvent`] is logged when the status of an item is
/// updated.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq, Clone)]
pub struct ItemStatusChangedEvent<A: Serial> {
    /// The item's id.
    pub item_id: ItemID,
    /// The item's new status.
    pub new_status: Status,
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub additional_data: A,
}

/// The [`GrantRoleEvent`] is logged when a new role is granted to an address.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq, Clone)]
pub struct GrantRoleEvent {
    /// The address that has been its role granted.
    pub address: Address,
    /// The role that was granted to the above address.
    pub role: Roles,
}

/// The [`RevokeRoleEvent`] is logged when a role is revoked from an address.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq, Clone)]
pub struct RevokeRoleEvent {
    /// Address that has been its role revoked.
    pub address: Address,
    /// The role that was revoked from the above address.
    pub role: Roles,
}

/// The NonceEvent is logged when the `permit` function is invoked. The event
/// tracks the nonce used by the signer of the `PermitMessage`.
#[derive(Debug, Serialize, SchemaType, PartialEq, Eq, Clone)]
pub struct NonceEvent {
    /// Account that signed the `PermitMessage`.
    pub account: AccountAddress,
    /// The nonce that was used in the `PermitMessage`.
    pub nonce: u64,
}

/// Enum of available roles in this contract. Several addresses can have the
/// same role and an address can have several roles.
#[derive(Serialize, PartialEq, Eq, Reject, SchemaType, Clone, Copy, Debug)]
pub enum Roles {
    /// Admin role.
    Admin,
}

/// The parameter type for the contract function `init` which
/// initilizes a new instance of the contract.
#[derive(Serialize, SchemaType)]
#[cfg_attr(feature = "serde", derive(serde::Deserialize, serde::Serialize))]
pub struct TransitionEdges {
    /// The status of the `from` node of the transition edges.
    pub from: Status,
    /// A vector of statuses of the `to` node of the transition edges.
    pub to: Vec<Status>,
    /// The account that is allowed to execute the state transitions described
    /// above.
    pub authorized_account: AccountAddress,
}

/// The parameter type for the contract function `changeItemStatus` which
/// updates the status of an item.
#[derive(Serialize, SchemaType)]
pub struct ChangeItemStatusParams<A> {
    /// The item's id.
    pub item_id: ItemID,
    /// The item's new status.
    pub new_status: Status,
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub additional_data: A,
}

/// A struct containing a state of one item.
#[derive(Debug, Serialize, SchemaType, Clone, PartialEq, Eq)]
pub struct ItemState {
    /// The status of the item.
    pub status: Status,
    /// The metadata_url of the item.
    pub metadata_url: Option<MetadataUrl>,
}

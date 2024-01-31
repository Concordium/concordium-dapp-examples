//! # Implementation of a simple track-and-trace contract.
//!
//! ## Grant and Revoke roles:
//! The contract has access control roles. The available roles are Admin (can
//! grant/revoke roles, create a new item, and update the status of an item),
//! Producer (can update the status of an item from `Produced` to `InTransit`),
//! Transporter (can update the status of an item from `InTransit` to
//! `InStore`), and Seller (can update the status of an item from `InStore` to
//! `Sold`). Several addresses can have the same role and an address can have
//! several roles.
//!
//! ## State machine:
//! The track-and-trace contract is modeled based on a state machine. The state
//! machine is initialized when the contract is initialized. The flow of the
//! state machine is as follows: The Admin creates a new item with status
//! `Produced`. Each new item is assigned the `next_item_id`. The `next_item_id`
//! value is sequentially increased by 1 in the contract's state. The different
//! roles can update the item's status based on the rules of the state machine.
//!
//! For example to initilize the state machine with a linear supply chain use
//! the following input parameter when the contract is initialized:
//!
//! ```
//!     use track_and_trace::{Status,TransitionEdges};
//!     use concordium_std::AccountAddress;
//!
//!     const ADMIN: AccountAddress = AccountAddress([0; 32]); // insert the ADMIN wallet account here
//!     const PRODUCER: AccountAddress = AccountAddress([1; 32]); // insert the PRODUCER wallet account here
//!     const TRANSPORTER: AccountAddress = AccountAddress([2; 32]); // insert the TRANSPORTER wallet account here
//!     const SELLER: AccountAddress = AccountAddress([3; 32]); // insert the SELLER wallet account here
//!
//!     let params: Vec<TransitionEdges> = vec![
//!         TransitionEdges {
//!             from:               Status::Produced,
//!             to:                 vec![Status::InTransit],
//!             authorized_account: PRODUCER,
//!         },
//!         TransitionEdges {
//!             from:               Status::InTransit,
//!             to:                 vec![Status::InStore],
//!             authorized_account: TRANSPORTER,
//!         },
//!         TransitionEdges {
//!             from:               Status::InStore,
//!             to:                 vec![Status::Sold],
//!             authorized_account: SELLER,
//!         },
//!     ];
//! ```
#![cfg_attr(not(feature = "std"), no_std)]
use concordium_cis2::*;
use concordium_std::*;

/// Event tags.
pub const ITEM_CREATED_EVENT_TAG: u8 = 0;
pub const ITEM_STATUS_CHANGED_EVENT_TAG: u8 = 1;
pub const GRANT_ROLE_EVENT_TAG: u8 = 2;
pub const REVOKE_ROLE_EVENT_TAG: u8 = 3;

/// Custom type for the item id.
pub type ItemID = u64;

/// Tagged events to be serialized for the event log.
#[derive(Debug, Serial, Deserial, PartialEq, Eq, SchemaType)]
pub enum Event {
    /// The event tracks when an item is created.
    ItemCreated(ItemCreatedEvent),
    /// The event tracks when the item's status is updated.
    ItemStatusChanged(ItemStatusChangedEvent),
    /// The event tracks when a new role is granted to an address.
    GrantRole(GrantRoleEvent),
    /// The event tracks when a role is revoked from an address.
    RevokeRole(RevokeRoleEvent),
}

/// The [`ItemCreatedEvent`] is logged when an item is created.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct ItemCreatedEvent {
    /// The item's id.
    pub item_id:      ItemID,
    /// The item's metadata_url.
    pub metadata_url: Option<MetadataUrl>,
}

/// The [`ItemStatusChangedEvent`] is logged when the status of an item is
/// updated.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct ItemStatusChangedEvent {
    /// The item's id.
    pub item_id:         ItemID,
    /// The item's new status.
    pub new_status:      Status,
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub additional_data: AdditionalData,
}

/// The [`GrantRoleEvent`] is logged when a new role is granted to an address.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct GrantRoleEvent {
    /// The address that has been its role granted.
    pub address: Address,
    /// The role that was granted to the above address.
    pub role:    Roles,
}

/// The [`RevokeRoleEvent`] is logged when a role is revoked from an address.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct RevokeRoleEvent {
    /// Address that has been its role revoked.
    pub address: Address,
    /// The role that was revoked from the above address.
    pub role:    Roles,
}

/// A struct containing a set of roles granted to an address.
#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
struct AddressRoleState<S> {
    /// Set of roles.
    roles: StateSet<Roles, S>,
}

/// Enum of available roles in this contract. Several addresses can have the
/// same role and an address can have several roles.
#[derive(Serialize, PartialEq, Eq, Reject, SchemaType, Clone, Copy, Debug)]
pub enum Roles {
    /// Admin role.
    Admin,
    /// Producer role.
    Producer,
    /// Transporter role.
    Transporter,
    /// Seller role.
    Seller,
}

/// Enum of the statuses that an item can have.
#[derive(Serialize, PartialEq, Eq, Reject, SchemaType, Clone, Copy, Debug)]
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

/// A struct containing a state of one item.
#[derive(Debug, Serialize, SchemaType, Clone, PartialEq, Eq)]
pub struct ItemState {
    /// The status of the item.
    pub status:       Status,
    /// The metadata_url of the item.
    pub metadata_url: Option<MetadataUrl>,
}

/// The state of the smart contract.
/// This state can be viewed by querying the node with the command
/// `concordium-client contract invoke` using the `view` function as entrypoint.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
struct State<S = StateApi> {
    /// The next item id that will be assigned to an item when the admin creates
    /// it. This value is sequentially increased by 1.
    next_item_id: ItemID,
    /// A map containing all roles granted to addresses.
    roles:        StateMap<Address, AddressRoleState<S>, S>,
    /// A map containing all items with their states.
    items:        StateMap<ItemID, ItemState, S>,
    /// A map containing all allowed transitions of the state machine.
    /// The first `Status` maps to a map of `AccountAddresses` that are allowed
    /// to update the given `Status`. The The last set specifies to which
    /// `Statuses` the `AccountAddress` is allowed to update the first `Status.`
    transitions:  StateMap<Status, StateMap<AccountAddress, StateSet<Status, S>, S>, S>,
}

/// The different errors the contract can produce.
#[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
pub enum CustomContractError {
    /// Failed parsing the parameter.
    #[from(ParseError)]
    ParseParams, // -1
    /// Failed logging because the log is full.
    LogFull, // -2
    /// Failed logging because the log is malformed.
    LogMalformed, // -3
    /// Failed because the actor is not authorized to invoke the entry point.
    Unauthorized, // -4
    /// Failed to revoke role because it was not granted in the first place.
    RoleWasNotGranted, // -5
    /// Failed to grant role because it was granted already in the first place.
    RoleWasAlreadyGranted, // -6
    /// Item with given item id already exists in the state.
    ItemAlreadyExists, // -7
    /// Item with given item id does not exist in the state.
    ItemDoesNotExist, // -8
    /// The item is already in the final state and cannot be updated based on
    /// the state machine rules.
    FinalState, // -9
    /// Contract address should not invoke entry point.
    NoContract, // -10
}

/// Mapping the logging errors to CustomContractError.
impl From<LogError> for CustomContractError {
    fn from(le: LogError) -> Self {
        match le {
            LogError::Full => Self::LogFull,
            LogError::Malformed => Self::LogMalformed,
        }
    }
}

/// Custom type for the contract result.
pub type ContractResult<A> = Result<A, CustomContractError>;

impl<S: HasStateApi> State<S> {
    /// Add a new transition. Return if the transition was fresh.
    pub fn add(
        &mut self,
        builder: &mut StateBuilder<S>,
        from: Status,
        address: AccountAddress,
        to: Status,
    ) -> bool {
        let mut transition = self
            .transitions
            .entry(from)
            .or_insert_with(|| builder.new_map());
        let mut targets = transition
            .entry(address)
            .or_insert_with(|| builder.new_set());
        targets.insert(to)
    }

    /// Check if a transition is allowed.
    pub fn check(&self, from: &Status, address: &AccountAddress, to: &Status) -> bool {
        let Some(transition) = self.transitions.get(from) else {
            return false;
        };
        let Some(targets) = transition.get(address) else {
            return false;
        };
        targets.contains(to)
    }

    /// Create the state and state machine from a vector of transition edges.
    pub fn from_iter(state_builder: &mut StateBuilder<S>, i: Vec<TransitionEdges>) -> Self {
        let mut r = Self {
            next_item_id: 0u64,
            roles:        state_builder.new_map(),
            items:        state_builder.new_map(),
            transitions:  state_builder.new_map(),
        };
        for transition_edge in i {
            for to in transition_edge.to {
                r.add(
                    state_builder,
                    transition_edge.from,
                    transition_edge.authorized_account,
                    to,
                );
            }
        }
        r
    }

    /// Grant role to an address.
    fn grant_role(&mut self, account: &Address, role: Roles, state_builder: &mut StateBuilder<S>) {
        self.roles
            .entry(*account)
            .or_insert_with(|| AddressRoleState {
                roles: state_builder.new_set(),
            });

        self.roles.entry(*account).and_modify(|entry| {
            entry.roles.insert(role);
        });
    }

    /// Revoke role from an address.
    fn revoke_role(&mut self, account: &Address, role: Roles) {
        self.roles.entry(*account).and_modify(|entry| {
            entry.roles.remove(&role);
        });
    }

    /// Check if an address has a role.
    fn has_role(&self, account: &Address, role: Roles) -> bool {
        return match self.roles.get(account) {
            None => false,
            Some(roles) => roles.roles.contains(&role),
        };
    }
}

/// The parameter type for the contract function `init` which
/// initilizes a new instance of the contract.
#[derive(Serialize, SchemaType)]
pub struct TransitionEdges {
    /// The status of the `from` node of the transition edges.
    pub from:               Status,
    /// A vector of statuses of the `to` node of the transition edges.
    pub to:                 Vec<Status>,
    /// The account that is allowed to execute the state transitions described
    /// above.
    pub authorized_account: AccountAddress,
}

/// Init function that creates a new contract.
#[init(
    contract = "track_and_trace",
    parameter = "Vec<TransitionEdges>",
    event = "Event",
    enable_logger
)]
fn init(
    ctx: &InitContext,
    state_builder: &mut StateBuilder,
    logger: &mut impl HasLogger,
) -> InitResult<State> {
    // Parse the parameter.
    let iter: Vec<TransitionEdges> = ctx.parameter_cursor().get()?;

    let mut state = State::from_iter(state_builder, iter);

    // Get the instantiater of this contract instance.
    let invoker = Address::Account(ctx.init_origin());

    // Grant Admin role.
    state.grant_role(&invoker, Roles::Admin, state_builder);
    logger.log(&Event::GrantRole(GrantRoleEvent {
        address: invoker,
        role:    Roles::Admin,
    }))?;

    Ok(state)
}

/// View the next item id from the state.
#[receive(
    contract = "track_and_trace",
    name = "getNextItemId",
    return_value = "ItemID"
)]
fn contract_get_next_item_id(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<ItemID> {
    Ok(host.state().next_item_id)
}

/// View the roles that an address has.
#[receive(
    contract = "track_and_trace",
    name = "getRoles",
    parameter = "Address",
    return_value = "Vec<Roles>"
)]
fn contract_get_roles(ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<Vec<Roles>> {
    // Parse the parameter.
    let address: Address = ctx.parameter_cursor().get()?;

    let roles = host
        .state()
        .roles
        .get(&address)
        .map(|x| {
            let mut roles_vec = Vec::new();

            for role in x.roles.iter() {
                roles_vec.push(*role);
            }

            roles_vec
        })
        .ok_or(CustomContractError::ItemDoesNotExist)?;

    Ok(roles)
}

/// View the state of an item.
#[receive(
    contract = "track_and_trace",
    name = "getItemState",
    parameter = "ItemID",
    return_value = "ItemState"
)]
fn contract_get_item_state(ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<ItemState> {
    // Parse the parameter.
    let item_id: ItemID = ctx.parameter_cursor().get()?;

    let item = host
        .state()
        .items
        .get(&item_id)
        .map(|x| (*x).clone())
        .ok_or(CustomContractError::ItemDoesNotExist)?;
    Ok(item)
}

/// Receive function for the Admin to create a new item.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - The sender is not the Admin of the contract instance.
/// - The item already exists in the state which should technically not happen.
/// - It fails to log the `ItemCreatedEvent`.
#[receive(
    contract = "track_and_trace",
    name = "createItem",
    parameter = "Option<MetadataUrl>",
    error = "CustomContractError",
    mutable,
    enable_logger
)]
fn create_item(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> Result<(), CustomContractError> {
    // Parse the parameter.
    let metadata_url: Option<MetadataUrl> = ctx.parameter_cursor().get()?;

    // Check that only the Admin is authorized to create a new item.
    ensure!(
        host.state().has_role(&ctx.sender(), Roles::Admin),
        CustomContractError::Unauthorized
    );

    // Get the next available item id.
    let next_item_id = host.state().next_item_id;
    // Increase the item id tracker in the state.
    host.state_mut().next_item_id += 1;

    // Create the item in state.
    let previous_item = host.state_mut().items.insert(next_item_id, ItemState {
        metadata_url: metadata_url.clone(),
        status:       Status::Produced,
    });

    ensure_eq!(previous_item, None, CustomContractError::ItemAlreadyExists);

    // Log an ItemCreatedEvent.
    logger.log(&Event::ItemCreated(ItemCreatedEvent {
        item_id: next_item_id,
        metadata_url,
    }))?;

    Ok(())
}

/// Partial parameter type for the contract function
/// `changeItemStatus/changeItemStatusByAdmin`.
#[derive(Serialize, SchemaType, Debug, PartialEq, Eq)]
pub struct AdditionalData {
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub bytes: Vec<u8>,
}

/// The parameter type for the contract function `changeItemStatus` which
/// updates the status of an item.
#[derive(Serialize, SchemaType)]
pub struct ChangeItemStatusParams {
    /// The item's id.
    pub item_id:         ItemID,
    /// The item's new status.
    pub new_status:      Status,
    /// Any additional data encoded as generic bytes. Usecase-specific data can
    /// be included here such as temperature, longitude, latitude, ... .
    pub additional_data: AdditionalData,
}

/// Receive function to update the item's
/// status based on the rules of the state machine.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - Sender is not an authorized role to update the item to the next state.
/// - The item does not exist in the state.
/// - A contract is invoking the function.
/// - It fails to log the `ItemStatusChangedEvent`.
#[receive(
    contract = "track_and_trace",
    name = "changeItemStatus",
    parameter = "ChangeItemStatusParams",
    error = "CustomContractError",
    mutable,
    enable_logger
)]
fn change_item_status(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> Result<(), CustomContractError> {
    // Parse the parameter.
    let param: ChangeItemStatusParams = ctx.parameter_cursor().get()?;

    let mut item = host
        .state_mut()
        .items
        .entry(param.item_id)
        .occupied_or(CustomContractError::ItemDoesNotExist)?;

    let account = match ctx.sender() {
        Address::Account(account) => account,
        Address::Contract(_) => bail!(CustomContractError::NoContract),
    };

    // Update the state of the item.
    let old_item_status = item.status;
    item.status = param.new_status;
    drop(item);

    let verify = host
        .state()
        .check(&old_item_status, &account, &param.new_status);

    // Check that transition adheres to the state machine rules.
    ensure!(verify, CustomContractError::Unauthorized);

    // Log an ItemStatusChangedEvent.
    logger.log(&Event::ItemStatusChanged(ItemStatusChangedEvent {
        item_id:         param.item_id,
        new_status:      param.new_status,
        additional_data: param.additional_data,
    }))?;

    Ok(())
}

/// The parameter for the contract function `grantRole` which grants a role to
/// an address.
#[derive(Serialize, SchemaType)]
pub struct GrantRoleParams {
    /// The address that has been its role granted.
    pub address: Address,
    /// The role that has been granted to the above address.
    pub role:    Roles,
}

/// Add role to an address.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - The sender is not the Admin of the contract instance.
/// - The `address` is already holding the specified role to be granted.
#[receive(
    contract = "track_and_trace",
    name = "grantRole",
    parameter = "GrantRoleParams",
    error = "CustomContractError",
    enable_logger,
    mutable
)]
fn contract_grant_role(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    // Parse the parameter.
    let params: GrantRoleParams = ctx.parameter_cursor().get()?;

    let (state, state_builder) = host.state_and_builder();

    // Get the sender who invoked this contract function.
    let sender = ctx.sender();
    // Check that only the Admin is authorized to grant roles.
    ensure!(
        state.has_role(&sender, Roles::Admin),
        CustomContractError::Unauthorized
    );

    // Check that the `address` had previously not held the specified role.
    ensure!(
        !state.has_role(&params.address, params.role),
        CustomContractError::RoleWasAlreadyGranted
    );

    // Grant role.
    state.grant_role(&params.address, params.role, state_builder);
    // Log a GrantRoleEvent.
    logger.log(&Event::GrantRole(GrantRoleEvent {
        address: params.address,
        role:    params.role,
    }))?;
    Ok(())
}

/// The parameter for the contract function `revokeRole` which revokes a role
/// from an address.
#[derive(Serialize, SchemaType)]
pub struct RevokeRoleParams {
    /// The address that has been its role revoked.
    pub address: Address,
    /// The role that has been revoked from the above address.
    pub role:    Roles,
}

/// Revoke role from an address.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - The sender is not the Admin of the contract instance.
/// - The `address` does not hold the specified role to be revoked.
#[receive(
    contract = "track_and_trace",
    name = "revokeRole",
    parameter = "RevokeRoleParams",
    error = "CustomContractError",
    enable_logger,
    mutable
)]
fn contract_revoke_role(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    // Parse the parameter.
    let params: RevokeRoleParams = ctx.parameter_cursor().get()?;

    let (state, _) = host.state_and_builder();

    // Get the sender who invoked this contract function.
    let sender = ctx.sender();
    // Check that only the Admin is authorized to revoke roles.
    ensure!(
        state.has_role(&sender, Roles::Admin),
        CustomContractError::Unauthorized
    );

    // Check that the `address` had previously held the specified role.
    ensure!(
        state.has_role(&params.address, params.role),
        CustomContractError::RoleWasNotGranted
    );

    // Revoke role.
    state.revoke_role(&params.address, params.role);
    // Log a RevokeRoleEvent.
    logger.log(&Event::RevokeRole(RevokeRoleEvent {
        address: params.address,
        role:    params.role,
    }))?;
    Ok(())
}

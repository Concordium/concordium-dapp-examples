//! # Implementation of a simple track-and-trace contract.
//!
//! ## Grant and Revoke roles:
//! The contract has access control roles. The available roles are Admin (can
//! grant/revoke roles, create a new item), Producer, Transporter, and Seller.
//! The state machine defines which roles are authorized to update an item given
//! its current status. Several addresses can have the same role and an address
//! can have several roles.
//!
//! ## State machine:
//! The track-and-trace contract is modeled based on a state machine. The state
//! machine is initialized when the contract is initialized. The flow of the
//! state machine is as follows: The Admin creates a new item with status
//! `Produced`. Each new item is assigned the `next_item_id`. The `next_item_id`
//! value is sequentially increased by 1 in the contract's state. The different
//! roles can update the item's status based on the rules of the state machine.
//!
//! For example to initialize the state machine with a linear supply chain use
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
    /// The event tracks the nonce used by the signer of the `PermitMessage`
    /// whenever the `permit` function is invoked.
    Nonce(NonceEvent),
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

/// The NonceEvent is logged when the `permit` function is invoked. The event
/// tracks the nonce used by the signer of the `PermitMessage`.
#[derive(Debug, Serialize, SchemaType, PartialEq, Eq)]
pub struct NonceEvent {
    /// Account that signed the `PermitMessage`.
    pub account: AccountAddress,
    /// The nonce that was used in the `PermitMessage`.
    pub nonce:   u64,
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
    next_item_id:    ItemID,
    /// A map containing all roles granted to addresses.
    roles:           StateMap<Address, AddressRoleState<S>, S>,
    /// A map containing all items with their states.
    items:           StateMap<ItemID, ItemState, S>,
    /// A map containing all allowed transitions of the state machine.
    /// The first `Status` maps to a map of `AccountAddresses` that are allowed
    /// to update the given `Status`. The last `StateSet` specifies to which
    /// `Statuses` the `AccountAddress` is allowed to update the first `Status.`
    transitions:     StateMap<Status, StatusTransitions<S>, S>,
    /// A registry to link an account to its next nonce. The nonce is used to
    /// prevent replay attacks of sponsored transactions. The nonce is increased
    /// sequentially every time a signed message (corresponding to the
    /// account) is successfully executed in the `permit` function. This
    /// mapping keeps track of the next nonce that needs to be used by the
    /// account to generate a signature.
    nonces_registry: StateMap<AccountAddress, u64, S>,
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
    /// Item with given item id already exists in the state.
    ItemAlreadyExists, // -5
    /// Item with given item id does not exist in the state.
    ItemDoesNotExist, // -6
    /// The item is already in the final state and cannot be updated based on
    /// the state machine rules.
    FinalState, // -7
    /// Contract address should not invoke entry point.
    NoContract, // -8
    /// Failed to verify signature because signer account does not exist on
    /// chain.
    MissingAccount, // -9
    /// Failed to verify signature because data was malformed.
    MalformedData, // -10
    /// Failed signature verification: Invalid signature.
    WrongSignature, // -11
    /// Failed signature verification: A different nonce is expected.
    NonceMismatch, // -12
    /// Failed signature verification: Signature was intended for a different
    /// contract.
    WrongContract, // -13
    /// Failed signature verification: Signature was intended for a different
    /// entry_point.
    WrongEntryPoint, // -14
    /// Failed signature verification: Signature is expired.
    Expired, // -15
}

/// Mapping account signature error to CustomContractError
impl From<CheckAccountSignatureError> for CustomContractError {
    fn from(e: CheckAccountSignatureError) -> Self {
        match e {
            CheckAccountSignatureError::MissingAccount => Self::MissingAccount,
            CheckAccountSignatureError::MalformedData => Self::MalformedData,
        }
    }
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

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
#[repr(transparent)]
/// Transitions for a given status.
struct StatusTransitions<S> {
    transitions: StateMap<AccountAddress, StateSet<Status, S>, S>,
}

impl<S: HasStateApi> StatusTransitions<S> {
    /// Check if a transition is allowed.
    pub fn check(&self, address: &AccountAddress, to: &Status) -> bool {
        let Some(targets) = self.transitions.get(address) else {
            return false;
        };
        targets.contains(to)
    }

    /// Get the targets of a transition from the status using the given address.
    pub fn targets(
        &mut self,
        builder: &mut StateBuilder<S>,
        address: AccountAddress,
    ) -> OccupiedEntry<AccountAddress, StateSet<Status, S>, S> {
        self.transitions
            .entry(address)
            .or_insert_with(|| builder.new_set())
    }
}

/// An updatable item with the transitions it allows when it was looked up.
type UpdatableItemWithTransitions<'a, S> = (
    StateRefMut<'a, ItemState, S>,
    StateRef<'a, StatusTransitions<S>>,
);

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
            .or_insert_with(|| StatusTransitions {
                transitions: builder.new_map(),
            });
        let mut targets = transition.targets(builder, address);
        targets.insert(to)
    }

    /// Get the item and the possible state transitions for that item in its
    /// current state.
    pub fn get_item_and_transitions(
        &mut self,
        item_id: &ItemID,
    ) -> Result<UpdatableItemWithTransitions<S>, CustomContractError> {
        let item = self
            .items
            .get_mut(item_id)
            .ok_or(CustomContractError::ItemDoesNotExist)?;
        let transitions = self
            .transitions
            .get(&item.status)
            .ok_or(CustomContractError::Unauthorized)?;
        Ok((item, transitions))
    }

    /// Create the state and state machine from a vector of transition edges.
    pub fn from_iter(state_builder: &mut StateBuilder<S>, i: Vec<TransitionEdges>) -> Self {
        let mut r = Self {
            next_item_id:    0u64,
            roles:           state_builder.new_map(),
            items:           state_builder.new_map(),
            transitions:     state_builder.new_map(),
            nonces_registry: state_builder.new_map(),
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

    host.state()
        .items
        .get(&item_id)
        .map(|x| (*x).clone())
        .ok_or(CustomContractError::ItemDoesNotExist.into())
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
/// `changeItemStatus`.
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
fn contract_change_item_status(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    // Parse the parameter.
    let param: ChangeItemStatusParams = ctx.parameter_cursor().get()?;

    let account = match ctx.sender() {
        Address::Account(account) => account,
        Address::Contract(_) => bail!(CustomContractError::NoContract),
    };

    change_item_status(param, account, host, logger)
}

/// Helper function to update the item's status based on the rules of the state.
fn change_item_status(
    param: ChangeItemStatusParams,
    account: AccountAddress,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let (mut item, allowed_transitions) =
        host.state_mut().get_item_and_transitions(&param.item_id)?;

    let verify = allowed_transitions.check(&account, &param.new_status);

    // Check that transition adheres to the state machine rules.
    ensure!(verify, CustomContractError::Unauthorized);

    // Update the state of the item.
    item.status = param.new_status;
    drop(item);

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

    // Revoke role.
    state.revoke_role(&params.address, params.role);
    // Log a RevokeRoleEvent.
    logger.log(&Event::RevokeRole(RevokeRoleEvent {
        address: params.address,
        role:    params.role,
    }))?;
    Ok(())
}

/// Part of the parameter type for the contract function `permit`.
/// Specifies the message that is signed.
#[derive(SchemaType, Serialize)]
pub struct PermitMessage {
    /// The contract_address that the signature is intended for.
    pub contract_address: ContractAddress,
    /// A nonce to prevent replay attacks.
    pub nonce:            u64,
    /// A timestamp to make signatures expire.
    pub timestamp:        Timestamp,
    /// The entry_point that the signature is intended for.
    pub entry_point:      OwnedEntrypointName,
    /// The serialized payload that should be forwarded to either the `transfer`
    /// or the `updateOperator` function.
    #[concordium(size_length = 2)]
    pub payload:          Vec<u8>,
}

/// The parameter type for the contract function `permit`.
/// Takes a signature, the signer, and the message that was signed.
#[derive(Serialize, SchemaType)]
pub struct PermitParam {
    /// Signature/s. The CIS3 standard supports multi-sig accounts.
    pub signature: AccountSignatures,
    /// Account that created the above signature.
    pub signer:    AccountAddress,
    /// Message that was signed.
    pub message:   PermitMessage,
}

/// Partial version of the `PermitParam` type without the `message` field.
#[derive(Serialize)]
pub struct PermitParamPartial {
    /// Signature/s. The CIS3 standard supports multi-sig accounts.
    signature: AccountSignatures,
    /// Account that created the above signature.
    signer:    AccountAddress,
}

/// Verify an ed25519 signature and allows calling the `changeItemStatus`
/// function.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - A different nonce is expected.
/// - The signature was intended for a different contract.
/// - The signature was intended for a different `entry_point`.
/// - The signature is expired.
/// - The signature can not be validated.
/// - Fails to log event.
/// - The receive hook function call rejects.
#[receive(
    contract = "track_and_trace",
    name = "permit",
    parameter = "PermitParam",
    error = "CustomContractError",
    crypto_primitives,
    enable_logger,
    mutable
)]
fn contract_permit(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    logger: &mut impl HasLogger,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ContractResult<()> {
    // Parse the parameter.
    let param: PermitParam = ctx.parameter_cursor().get()?;

    // Update the nonce.
    let mut entry = host
        .state_mut()
        .nonces_registry
        .entry(param.signer)
        .or_insert_with(|| 0);

    // Get the current nonce.
    let nonce = *entry;
    // Bump nonce.
    *entry += 1;
    drop(entry);

    let message = param.message;

    // Check the nonce to prevent replay attacks.
    ensure_eq!(
        message.nonce,
        nonce,
        CustomContractError::NonceMismatch.into()
    );

    // Check that the signature was intended for this contract.
    ensure_eq!(
        message.contract_address,
        ctx.self_address(),
        CustomContractError::WrongContract.into()
    );

    // Check signature is not expired.
    ensure!(
        message.timestamp > ctx.metadata().slot_time(),
        CustomContractError::Expired.into()
    );

    let message_hash = contract_view_message_hash(ctx, host, crypto_primitives)?;

    // Check signature.
    let valid_signature =
        host.check_account_signature(param.signer, &param.signature, &message_hash)?;
    ensure!(valid_signature, CustomContractError::WrongSignature.into());

    if message.entry_point.as_entrypoint_name() == EntrypointName::new_unchecked("changeItemStatus")
    {
        let change_item_status_param: ChangeItemStatusParams = from_bytes(&message.payload)?;
        change_item_status(change_item_status_param, param.signer, host, logger)?;
    } else {
        bail!(CustomContractError::WrongEntryPoint.into())
    }

    // Log the nonce event.
    logger.log(&Event::Nonce(NonceEvent {
        account: param.signer,
        nonce,
    }))?;

    Ok(())
}

/// Helper function to calculate the `message_hash`.
#[receive(
    contract = "track_and_trace",
    name = "viewMessageHash",
    parameter = "PermitParam",
    return_value = "[u8;32]",
    error = "CustomContractError",
    crypto_primitives,
    mutable
)]
fn contract_view_message_hash(
    ctx: &ReceiveContext,
    _host: &mut Host<State>,
    crypto_primitives: &impl HasCryptoPrimitives,
) -> ContractResult<[u8; 32]> {
    // Parse the parameter.
    let mut cursor = ctx.parameter_cursor();
    // The input parameter is `PermitParam` but we only read the initial part of it
    // with `PermitParamPartial`. I.e. we read the `signature` and the
    // `signer`, but not the `message` here.
    let param: PermitParamPartial = cursor.get()?;

    // The input parameter is `PermitParam` but we have only read the initial part
    // of it with `PermitParamPartial` so far. We read in the `message` now.
    // `(cursor.size() - cursor.cursor_position()` is the length of the message in
    // bytes.
    let mut message_bytes = vec![0; (cursor.size() - cursor.cursor_position()) as usize];

    cursor.read_exact(&mut message_bytes)?;

    // The message signed in the Concordium browser wallet is prepended with the
    // `account` address and 8 zero bytes. Accounts in the Concordium browser wallet
    // can either sign a regular transaction (in that case the prepend is
    // `account` address and the nonce of the account which is by design >= 1)
    // or sign a message (in that case the prepend is `account` address and 8 zero
    // bytes). Hence, the 8 zero bytes ensure that the user does not accidentally
    // sign a transaction. The account nonce is of type u64 (8 bytes).
    let mut msg_prepend = [0; 32 + 8];
    // Prepend the `account` address of the signer.
    msg_prepend[0..32].copy_from_slice(param.signer.as_ref());
    // Prepend 8 zero bytes.
    msg_prepend[32..40].copy_from_slice(&[0u8; 8]);
    // Calculate the message hash.
    let message_hash = crypto_primitives
        .hash_sha2_256(&[&msg_prepend[0..40], &message_bytes].concat())
        .0;

    Ok(message_hash)
}

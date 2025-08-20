//! Tests for the track_and_trace smart contract.
use std::collections::BTreeMap;

use concordium_smart_contract_testing::*;
use concordium_std::{
    AccountSignatures, CredentialSignatures, HashSha2256, MetadataUrl, SignatureEd25519,
};
use track_and_trace::*;

/// The test accounts.
const ADMIN: AccountAddress = AccountAddress([0; 32]);
const ADMIN_ADDR: Address = Address::Account(AccountAddress([0; 32]));
const PRODUCER: AccountAddress = AccountAddress([1; 32]);
const PRODUCER_ADDR: Address = Address::Account(AccountAddress([1; 32]));
const TRANSPORTER: AccountAddress = AccountAddress([2; 32]);
const SELLER: AccountAddress = AccountAddress([3; 32]);
const SELLER_ADDR: Address = Address::Account(AccountAddress([3; 32]));
const NEW_ADDR: AccountAddress = AccountAddress([4; 32]);

const SIGNER: Signer = Signer::with_one_key();
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(10000);

/// Dummy signature used as placeholder.
const DUMMY_SIGNATURE: SignatureEd25519 = SignatureEd25519([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);

struct AccountKeypairs {
    admin:    AccountKeys,
    producer: AccountKeys,
}

/// Test that the `hasRole` view function works.
#[test]
fn test_has_role() {
    let (chain, _, track_and_trace_contract_address) = initialize_chain_and_contract();

    let param = HasRoleParams {
        address: ADMIN_ADDR,
        role:    Roles::Admin,
    };

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.hasRole".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&param).expect("Serialize parameter"),
            },
        )
        .expect("Invoke hasRole");

    let has_role: bool = invoke.parse_return_value().expect("hasRole return value");

    assert_eq!(has_role, true, "Admin should have role");
}

/// Test adding and removing state transition edges.
#[test]
fn test_add_and_remove_of_state_transition_edges() {
    let (mut chain, _, track_and_trace_contract_address) = initialize_chain_and_contract();

    let from_status = Status::InStore;
    let to_status = Status::Sold;
    let new_address = NEW_ADDR;

    let param = IsTransitionEdgeParams {
        account: new_address,
        from_status,
        to_status,
    };

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.isTransitionEdge".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&param).expect("Serialize parameter"),
            },
        )
        .expect("Invoke isTransitionEdge");

    let is_transition_edge: bool = invoke
        .parse_return_value()
        .expect("isTransitionEdge return value");

    assert_eq!(
        is_transition_edge, false,
        "Transition edge should not exist"
    );

    // Add a new transition edge.
    let mut update_transition_edge = UpdateStateMachineParams {
        address: NEW_ADDR,
        from_status,
        to_status,
        update: Update::Add,
    };

    // Check the ADMIN can update the state machine (add transition).
    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.updateStateMachine".to_string(),
                ),
                message:      OwnedParameter::from_serial(&update_transition_edge)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Should be able to update the state machine");

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.isTransitionEdge".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&param).expect("Serialize parameter"),
            },
        )
        .expect("Invoke isTransitionEdge");

    let is_transition_edge: bool = invoke
        .parse_return_value()
        .expect("isTransitionEdge return value");

    assert_eq!(is_transition_edge, true, "Transition edge should exist");

    // Remove a transition edge.
    update_transition_edge.update = Update::Remove;

    // Check the ADMIN can update the state machine (remove transition).
    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.updateStateMachine".to_string(),
                ),
                message:      OwnedParameter::from_serial(&update_transition_edge)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Should be able to update the state machine");

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.isTransitionEdge".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&param).expect("Serialize parameter"),
            },
        )
        .expect("Invoke isTransitionEdge");

    let is_transition_edge: bool = invoke
        .parse_return_value()
        .expect("isTransitionEdge return value");

    assert_eq!(
        is_transition_edge, false,
        "Transition edge should not exist"
    );
}

// 1. Test that the ADMIN can create a new item.
// 2. Test that the PRODUCER can update the item status to `InTransit`.
// 3. Test that the SELLER can NOT update the item status to `InStore`.
// 4. Test that the ADMIN can update the item status to `Sold`. The ADMIN can
// update the item to any state, neglecting the rules of the state machine.
#[test]
fn test_create_item_and_update_item_status() {
    let (mut chain, _, track_and_trace_contract_address) = initialize_chain_and_contract();

    // Create the Parameter.
    let metadata_url = Some(MetadataUrl {
        url:  "https://some.example/".to_string(),
        hash: None,
    });

    let item_id = ItemID::from(0u64);

    let parameter = CreateItemParams {
        metadata_url: metadata_url.clone(),
        additional_data: AdditionalData { bytes: vec![] },
    };
    // Check the ADMIN can create a new item.
    let update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.createItem".to_string(),
                ),
                message:      OwnedParameter::from_serial(&parameter)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Should be able to create item");

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Event<AdditionalData>>>();

    assert_eq!(events, [Event::ItemCreated(ItemCreatedEvent {
        item_id,
        metadata_url: parameter.metadata_url.clone(),
        initial_status: Status::Produced,
        additional_data: parameter.additional_data,
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        Status::Produced,
        parameter.metadata_url.clone(),
    );

    let new_metadata_url = Some(MetadataUrl {
        url:  "https://some.example/2".to_string(),
        hash: None,
    });

    let parameter = ChangeItemStatusParams {
        item_id,
        additional_data: AdditionalData { bytes: vec![] },
        new_status: Status::InTransit,
        new_metadata_url: new_metadata_url.clone(),
    };

    // Check the PRODUCER can update the item based on the state machine rules.
    let update = chain
        .contract_update(
            SIGNER,
            PRODUCER,
            PRODUCER_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.changeItemStatus".to_string(),
                ),
                message:      OwnedParameter::from_serial(&parameter).expect("Serialize parameter"),
            },
        )
        .expect("Should be able update the state of the item");

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Event<AdditionalData>>>();

    assert_eq!(events, [Event::ItemStatusChanged(ItemStatusChangedEvent {
        item_id:         parameter.item_id,
        new_metadata_url:    parameter.new_metadata_url.clone(),
        new_status:      Status::InTransit,
        additional_data: parameter.additional_data,
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        Status::InTransit,
        parameter.new_metadata_url.clone(),
    );


    let parameter = ChangeItemStatusParams {
        item_id,
        additional_data: AdditionalData { bytes: vec![] },
        new_status: Status::Sold,
        new_metadata_url: None
    };

    // Check the SELLER can NOT update the item because of the rules of the state
    // machine.
    let update = chain
        .contract_update(
            SIGNER,
            SELLER,
            SELLER_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.changeItemStatus".to_string(),
                ),
                message:      OwnedParameter::from_serial(&parameter).expect("Serialize parameter"),
            },
        )
        .expect_err("Should expect error");

    // Check that the correct error is returned.
    let error: CustomContractError = update
        .parse_return_value()
        .expect("CustomContractError return value");
    assert_eq!(error, CustomContractError::Unauthorized);

    let parameter = ChangeItemStatusParams {
        item_id,
        new_status: Status::Sold,
        additional_data: AdditionalData { bytes: vec![] },
        new_metadata_url: new_metadata_url.clone(),
    };

    // Check the ADMIN can update the item to any state.
    let update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      track_and_trace_contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.changeItemStatus".to_string(),
                ),
                message:      OwnedParameter::from_serial(&parameter).expect("Serialize parameter"),
            },
        )
        .expect("Should be able to update the state of the item");

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Event<AdditionalData>>>();

    assert_eq!(events, [Event::ItemStatusChanged(ItemStatusChangedEvent {
        item_id:         parameter.item_id,
        new_status:      parameter.new_status,
        additional_data: parameter.additional_data,
        new_metadata_url:    parameter.new_metadata_url
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        parameter.new_status,
        new_metadata_url,
    );
}

// Invoke the several getter functions and check that the contract state is as
// expected. Exactly one item is expected to be in the state.
fn check_state(
    chain: &Chain,
    track_and_trace_contract_address: ContractAddress,
    status: Status,
    metadata_url: Option<MetadataUrl>,
) {
    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.getRoles".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&ADMIN_ADDR)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Invoke view");

    let return_value: Vec<Roles> = invoke.parse_return_value().expect("ViewState return value");

    assert_eq!(return_value, vec![Roles::Admin]);

    let item_id = ItemID::from(0u64);

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.getItemState".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::from_serial(&item_id).expect("Serialize parameter"),
            },
        )
        .expect("Invoke view");

    let return_value: ItemState = invoke.parse_return_value().expect("ViewState return value");

    assert_eq!(return_value, ItemState {
        status,
        metadata_url
    });

    let invoke = chain
        .contract_invoke(
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.getNextItemId".to_string(),
                ),
                address:      track_and_trace_contract_address,
                message:      OwnedParameter::empty(),
            },
        )
        .expect("Invoke view");

    let return_value: u64 = invoke.parse_return_value().expect("ViewState return value");

    assert_eq!(return_value, 1u64);
}

/// Setup chain and contract. Returns the chain, keys of the ADMIN and PRODUCER,
/// and the contract address.
fn initialize_chain_and_contract() -> (Chain, AccountKeypairs, ContractAddress) {
    let mut chain = Chain::builder()
        .build()
        .expect("Should be able to build chain");

    let mut rng = rand::thread_rng();
    let balance = AccountBalance {
        total:  ACC_INITIAL_BALANCE,
        staked: Amount::zero(),
        locked: Amount::zero(),
    };
    let admin_keys = AccountKeys::singleton(&mut rng);
    let producer_keys = AccountKeys::singleton(&mut rng);
    let transporter_keys = AccountKeys::singleton(&mut rng);
    let seller_keys = AccountKeys::singleton(&mut rng);

    // Create some accounts on the chain.
    chain.create_account(Account::new(NEW_ADDR, ACC_INITIAL_BALANCE));
    chain.create_account(Account::new_with_keys(ADMIN, balance, (&admin_keys).into()));
    chain.create_account(Account::new_with_keys(
        PRODUCER,
        balance,
        (&producer_keys).into(),
    ));
    chain.create_account(Account::new_with_keys(
        TRANSPORTER,
        balance,
        (&transporter_keys).into(),
    ));
    chain.create_account(Account::new_with_keys(
        SELLER,
        balance,
        (&seller_keys).into(),
    ));
    let account_keypairs = AccountKeypairs {
        admin:    admin_keys,
        producer: producer_keys,
    };

    // Load and deploy the track_and_trace module.
    let module = module_load_v1("./concordium-out/module.wasm.v1").expect("Module exists");
    let deployment = chain
        .module_deploy_v1(SIGNER, ADMIN, module)
        .expect("Deploy valid module");

    let params: Vec<TransitionEdges> = vec![
        TransitionEdges {
            from:               Status::Produced,
            to:                 vec![Status::InTransit],
            authorized_account: PRODUCER,
        },
        TransitionEdges {
            from:               Status::InTransit,
            to:                 vec![Status::InStore],
            authorized_account: TRANSPORTER,
        },
        TransitionEdges {
            from:               Status::InStore,
            to:                 vec![Status::Sold],
            authorized_account: SELLER,
        },
        // Admin transitions (The admin can change the status of the item to any value)
        TransitionEdges {
            from:               Status::Produced,
            to:                 vec![Status::InTransit, Status::InStore, Status::Sold],
            authorized_account: ADMIN,
        },
        TransitionEdges {
            from:               Status::InTransit,
            to:                 vec![Status::Produced, Status::InStore, Status::Sold],
            authorized_account: ADMIN,
        },
        TransitionEdges {
            from:               Status::InStore,
            to:                 vec![Status::InTransit, Status::Produced, Status::Sold],
            authorized_account: ADMIN,
        },
        TransitionEdges {
            from:               Status::Sold,
            to:                 vec![Status::InTransit, Status::InStore, Status::Produced],
            authorized_account: ADMIN,
        },
    ];

    // Initialize the track_and_trace contract.
    let track_and_trace = chain
        .contract_init(SIGNER, ADMIN, Energy::from(10000), InitContractPayload {
            amount:    Amount::zero(),
            mod_ref:   deployment.module_reference,
            init_name: OwnedContractName::new_unchecked("init_track_and_trace".to_string()),
            param:     OwnedParameter::from_serial(&params).expect("Init params"),
        })
        .expect("Initialize track_and_trace contract");

    (chain, account_keypairs, track_and_trace.contract_address)
}

#[test]
fn test_permit_change_item_status() {
    let (mut chain, account_keypairs, contract_address) = initialize_chain_and_contract();

    // Create the Parameter.
    let metadata_url = Some(MetadataUrl {
        url:  "https://some.example/".to_string(),
        hash: None,
    });

    let param = CreateItemParams {
        metadata_url: metadata_url.clone(),
        additional_data: AdditionalData { bytes: vec![] },
    };

    // Have the ADMIN create a new item.
    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::from_ccd(0),
                address:      contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.createItem".to_string(),
                ),
                message:      OwnedParameter::from_serial(&param)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Should be able to create item");

    let item_id = ItemID::from(0u64);

    // Create the Parameter.
    let new_metadata_url = Some(MetadataUrl {
        url:  "https://some.example/".to_string(),
        hash: None,
    });
    
    // Check that the status can be updated to `InStore` with a sponsored
    // transaction.
    let payload = ChangeItemStatusParams {
        item_id,
        additional_data: AdditionalData { bytes: vec![] },
        new_status: Status::InStore,
        new_metadata_url: new_metadata_url.clone(),
    };

    let update = permit(
        &mut chain,
        contract_address,
        to_bytes(&payload),
        "changeItemStatus".to_string(),
        SELLER,
        account_keypairs.admin,
    )
    .expect("Should be able to update the state of the item");

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Event<AdditionalData>>>();

    // Check that a nonce event with tag 250 is logged.
    let nonce_event = events
        .iter()
        .find(|e| matches!(e, Event::Nonce(_)))
        .expect("Should have a nonce event");
    assert_eq!(to_bytes(nonce_event)[0], 250);

    // Check that the status updated correctly.
    check_state(
        &chain,
        contract_address,
        Status::InStore,
        new_metadata_url.clone(),
    );

    // Check if correct nonces are returned by the `nonceOf` function.
    let nonce_query_vector = VecOfAccountAddresses {
        queries: vec![ADMIN],
    };

    let invoke = chain
        .contract_invoke(
            ADMIN,
            Address::Account(ADMIN),
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.nonceOf".to_string(),
                ),
                message:      OwnedParameter::from_serial(&nonce_query_vector)
                    .expect("Should be a valid inut parameter"),
            },
        )
        .expect("Should be able to query nonceOf");

    let nonces: NonceOfQueryResponse =
        from_bytes(&invoke.return_value).expect("Should return a valid result");

    assert_eq!(
        nonces.0[0], 1,
        "Nonce of ADMIN should be 1 because the account already sent one sponsored transaction"
    );

    // Check that the PRODUCER can not update the status to `Sold` with a
    // sponsored transaction.
    let payload = ChangeItemStatusParams {
        item_id,
        additional_data: AdditionalData { bytes: vec![] },
        new_status: Status::Sold,
        new_metadata_url: None,
    };

    let _update = permit(
        &mut chain,
        contract_address,
        to_bytes(&payload),
        "changeItemStatus".to_string(),
        ADMIN,
        account_keypairs.producer,
    )
    .expect_err("PRODUCER should not be able to change state to Sold");

    // Check that the status was not updated.
    check_state(&chain, contract_address, Status::InStore, new_metadata_url);
}

/// Execute a permit function invoke.
fn permit(
    chain: &mut Chain,
    contract_address: ContractAddress,
    payload: Vec<u8>,
    entrypoint_name: String,
    invoker: AccountAddress,
    keypairs: AccountKeys,
) -> Result<ContractInvokeSuccess, ContractInvokeError> {
    // The `viewMessageHash` function uses the same input parameter `PermitParam` as
    // the `permit` function. The `PermitParam` type includes a `signature` and
    // a `signer`. Because these two values (`signature` and `signer`) are not
    // read in the `viewMessageHash` function, any value can be used and we choose
    // to use `DUMMY_SIGNATURE` and `ADMIN` in the test case below.
    let signature_map = BTreeMap::from([(0u8, CredentialSignatures {
        sigs: BTreeMap::from([(0u8, concordium_std::Signature::Ed25519(DUMMY_SIGNATURE))]),
    })]);

    let mut param = PermitParam {
        signature: AccountSignatures {
            sigs: signature_map,
        },
        signer:    ADMIN,
        message:   PermitMessage {
            timestamp: Timestamp::from_timestamp_millis(10_000_000_000),
            contract_address: ContractAddress::new(0, 0),
            entry_point: OwnedEntrypointName::new_unchecked(entrypoint_name),
            nonce: 0,
            payload,
        },
    };

    // Get the message hash to be signed.
    let invoke = chain
        .contract_invoke(
            invoker,
            Address::Account(invoker),
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      contract_address,
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.viewMessageHash".to_string(),
                ),
                message:      OwnedParameter::from_serial(&param)
                    .expect("Should be a valid inut parameter"),
            },
        )
        .expect("Should be able to query viewMessageHash");

    let message_hash: HashSha2256 =
        from_bytes(&invoke.return_value).expect("Should return a valid result");

    param.signature = keypairs.sign_message(&to_bytes(&message_hash));

    // Execute permit function.
    chain.contract_update(
        Signer::with_one_key(),
        invoker,
        Address::Account(invoker),
        Energy::from(10000),
        UpdateContractPayload {
            amount:       Amount::zero(),
            address:      contract_address,
            receive_name: OwnedReceiveName::new_unchecked("track_and_trace.permit".to_string()),
            message:      OwnedParameter::from_serial(&param)
                .expect("Should be a valid inut parameter"),
        },
    )
}

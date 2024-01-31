//! Tests for the track_and_trace smart contract.
use concordium_smart_contract_testing::*;
use concordium_std::MetadataUrl;
use track_and_trace::*;

/// The test accounts.
const ADMIN: AccountAddress = AccountAddress([0; 32]);
const ADMIN_ADDR: Address = Address::Account(AccountAddress([0; 32]));
const PRODUCER: AccountAddress = AccountAddress([1; 32]);
const PRODUCER_ADDR: Address = Address::Account(AccountAddress([1; 32]));
const TRANSPORTER: AccountAddress = AccountAddress([2; 32]);
const TRANSPORTER_ADDR: Address = Address::Account(AccountAddress([2; 32]));
const SELLER: AccountAddress = AccountAddress([3; 32]);
const SELLER_ADDR: Address = Address::Account(AccountAddress([3; 32]));

const SIGNER: Signer = Signer::with_one_key();
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(10000);

// 1. Test that the ADMIN can create a new item.
// 2. Test that the PRODUCER can update the item status to `InTransit`.
// 3. Test that the SELLER can NOT update the item status to `InStore`.
// 4. Test that the ADMIN can update the item status to `Sold`. The ADMIN can
// update the item to any state, neglecting the rules of the state machine.
#[test]
fn test_create_item_and_update_item_status() {
    let (mut chain, track_and_trace_contract_address) = initialize_chain_and_contract();

    // Create the Parameter.
    let metadata_url = Some(MetadataUrl {
        url:  "https://some.example/".to_string(),
        hash: None,
    });

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
                message:      OwnedParameter::from_serial(&metadata_url)
                    .expect("Serialize parameter"),
            },
        )
        .expect("Should be able to create item");

    // Check that the events are logged.
    let events = update
        .events()
        .flat_map(|(_addr, events)| events.iter().map(|e| e.parse().expect("Deserialize event")))
        .collect::<Vec<Event>>();

    assert_eq!(events, [Event::ItemCreated(ItemCreatedEvent {
        item_id:      0u64,
        metadata_url: metadata_url.clone(),
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        Status::Produced,
        metadata_url.clone(),
    );

    let parameter = ChangeItemStatusParams {
        item_id:         0u64,
        additional_data: AdditionalData { bytes: vec![] },
        new_status:      Status::InTransit,
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
        .collect::<Vec<Event>>();

    assert_eq!(events, [Event::ItemStatusChanged(ItemStatusChangedEvent {
        item_id:         parameter.item_id,
        new_status:      Status::InTransit,
        additional_data: parameter.additional_data,
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        Status::InTransit,
        metadata_url.clone(),
    );

    let parameter = ChangeItemStatusParams {
        item_id:         0u64,
        additional_data: AdditionalData { bytes: vec![] },
        new_status:      Status::Sold,
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
        item_id:         0u64,
        new_status:      Status::Sold,
        additional_data: AdditionalData { bytes: vec![] },
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
        .collect::<Vec<Event>>();

    assert_eq!(events, [Event::ItemStatusChanged(ItemStatusChangedEvent {
        item_id:         parameter.item_id,
        new_status:      parameter.new_status,
        additional_data: parameter.additional_data,
    })]);

    // Check contract state.
    check_state(
        &chain,
        track_and_trace_contract_address,
        parameter.new_status,
        metadata_url,
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
                message:      OwnedParameter::from_serial(&0u64).expect("Serialize parameter"),
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

    let return_value: ItemID = invoke.parse_return_value().expect("ViewState return value");

    assert_eq!(return_value, 1);
}

/// Setup chain and contract.
fn initialize_chain_and_contract() -> (Chain, ContractAddress) {
    let mut chain = Chain::builder()
        .build()
        .expect("Should be able to build chain");

    // Create some accounts on the chain.
    chain.create_account(Account::new(ADMIN, ACC_INITIAL_BALANCE));
    chain.create_account(Account::new(PRODUCER, ACC_INITIAL_BALANCE));
    chain.create_account(Account::new(TRANSPORTER, ACC_INITIAL_BALANCE));
    chain.create_account(Account::new(SELLER, ACC_INITIAL_BALANCE));

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
            param:     OwnedParameter::from_serial(&params).expect("GrantRole params"),
        })
        .expect("Initialize track_and_trace contract");

    // Grant PRODUCER role
    let grant_role_params = GrantRoleParams {
        address: PRODUCER_ADDR,
        role:    Roles::Producer,
    };

    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.grantRole".to_string(),
                ),
                address:      track_and_trace.contract_address,
                message:      OwnedParameter::from_serial(&grant_role_params)
                    .expect("GrantRole params"),
            },
        )
        .expect("PRODUCER should be granted role");

    // Grant TRANSPORTER role
    let grant_role_params = GrantRoleParams {
        address: TRANSPORTER_ADDR,
        role:    Roles::Transporter,
    };

    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.grantRole".to_string(),
                ),
                address:      track_and_trace.contract_address,
                message:      OwnedParameter::from_serial(&grant_role_params)
                    .expect("GrantRole params"),
            },
        )
        .expect("TRANSPORTER should be granted role");

    // Grant SELLER role
    let grant_role_params = GrantRoleParams {
        address: SELLER_ADDR,
        role:    Roles::Seller,
    };

    let _update = chain
        .contract_update(
            SIGNER,
            ADMIN,
            ADMIN_ADDR,
            Energy::from(10000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked(
                    "track_and_trace.grantRole".to_string(),
                ),
                address:      track_and_trace.contract_address,
                message:      OwnedParameter::from_serial(&grant_role_params)
                    .expect("GrantRole params"),
            },
        )
        .expect("SELLER should be granted role");
    (chain, track_and_trace.contract_address)
}

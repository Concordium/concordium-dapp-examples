use anyhow::Context;
use clap::Parser as _;
use concordium_rust_sdk::{
    contract_client::{ContractInitBuilder, ModuleDeployBuilder, ViewError},
    smart_contracts::common::Amount,
    types::{smart_contracts::WasmModule, WalletAccount},
    v2::{self as sdk, BlockIdentifier},
};
use track_and_trace::{MetadataUrl, *};

pub enum TrackAndTraceContract {}

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
struct Args {
    #[arg(
        long = "node",
        short = 'n',
        default_value = "https://grpc.testnet.concordium.com:20000",
        help = "The endpoints are expected to point to concordium node grpc v2 API's.",
        global = true
    )]
    node_endpoint:             concordium_rust_sdk::v2::Endpoint,
    #[arg(
        long = "module",
        short = 'm',
        default_value = "../smart-contract/concordium-out/module.wasm.v1",
        help = "Source module from which to initialize the contract instances."
    )]
    module:                    std::path::PathBuf,
    #[arg(
        long = "input-parameter-file",
        short = 'i',
        help = "A JSON file containing the input parameter."
    )]
    input_parameter_json_file: std::path::PathBuf,
    #[arg(
        long = "num-items",
        short = 'i',
        help = "Number of items to be created in the contract."
    )]
    num_items:                 u64,
    #[structopt(
        long = "admin-key-file",
        short = 'a',
        help = "Path to the admin key file."
    )]
    admin_keys_path:           std::path::PathBuf,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = Args::parse();

    let endpoint = if args
        .node_endpoint
        .uri()
        .scheme()
        .map_or(false, |x| x == &sdk::Scheme::HTTPS)
    {
        args.node_endpoint
            .tls_config(tonic::transport::channel::ClientTlsConfig::new())
            .context("Unable to construct TLS configuration for the Concordium API.")?
    } else {
        args.node_endpoint
    }
    .connect_timeout(std::time::Duration::from_secs(5))
    .timeout(std::time::Duration::from_secs(10));

    let mut client = sdk::Client::new(endpoint)
        .await
        .context("Unable to establish connection to the node.")?;

    // Load account keys and sender address from a file
    let admin_key: WalletAccount = WalletAccount::from_json_file(args.admin_keys_path)
        .context("Could not read the keys file.")?;

    eprintln!("Starting script with admin account {}.", admin_key.address);

    let module = WasmModule::from_file(&args.module).context("Could not read contract module.")?;
    let mod_ref = module.get_module_ref();

    // Deploy module
    if client
        .get_module_source(&mod_ref, BlockIdentifier::LastFinal)
        .await
        .is_ok()
    {
        eprintln!("Source module with reference {mod_ref} already exists.");
    } else {
        let builder =
            ModuleDeployBuilder::dry_run_module_deploy(client.clone(), admin_key.address, module)
                .await?;

        let handle = builder.send(&admin_key.keys).await?;

        println!("Module deployment transaction {handle} submitted.");

        let result = handle.wait_for_finalization().await?;

        println!("Module {} deployed.", result.module_reference);
    }

    // Initialize new instance
    let params: Vec<TransitionEdges> = serde_json::from_reader(
        std::fs::File::open(&args.input_parameter_json_file)
            .context("Unable to open input parameter file.")?,
    )
    .context("Unable to parse input parameter.")?;

    let builder = ContractInitBuilder::<TrackAndTraceContract>::dry_run_new_instance(
        client,
        admin_key.address,
        mod_ref,
        "track_and_trace",
        Amount::zero(),
        &params,
    )
    .await?;

    println!(
        "The maximum amount of NRG allowed for the transaction is {}.",
        builder.current_energy()
    );
    let handle = builder.send(&admin_key.keys).await?;

    println!("Transaction {handle} submitted. Waiting for finalization.");

    let (mut contract_client, _) = handle.wait_for_finalization().await?;

    println!(
        "Initialized a new smart contract instance at address {}.",
        contract_client.address
    );

    // Create new items
    for i in 0..args.num_items {
        let param: Option<MetadataUrl> = None;

        let tx_dry_run = contract_client
            .dry_run_update::<Option<MetadataUrl>, ViewError>(
                "createItem",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!("Submitted create item with index {i} in transaction {tx_hash}.");

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Creating item failed: {err:#?}");
        }
    }

    // Update items from `Produced` to `InTransit`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParams<AdditionalData> = ChangeItemStatusParams {
            item_id:         ItemID::from(i),
            new_status:      Status::InTransit,
            additional_data: AdditionalData::empty(),
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParams<AdditionalData>, ViewError>(
                "changeItemStatus",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `InTransit` in transaction {tx_hash}."
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}.");
        }
    }

    // Update items from `InTransit` to `InStore`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParams<AdditionalData> = ChangeItemStatusParams {
            item_id:         ItemID::from(i),
            new_status:      Status::InStore,
            additional_data: AdditionalData::empty(),
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParams<AdditionalData>, ViewError>(
                "changeItemStatus",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `InStore` in transaction hash \
             {tx_hash}."
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}.");
        }
    }

    // Update items from `InStore` to `Sold`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParams<AdditionalData> = ChangeItemStatusParams {
            item_id:         ItemID::from(i),
            new_status:      Status::Sold,
            additional_data: AdditionalData::empty(),
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParams<AdditionalData>, ViewError>(
                "changeItemStatus",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `Sold` in transaction {tx_hash}."
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}.");
        }
    }

    eprintln!("Script completed successfully");

    Ok(())
}

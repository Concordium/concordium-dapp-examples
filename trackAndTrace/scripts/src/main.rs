use anyhow::Context;
use clap::Parser as _;
use concordium_rust_sdk::{
    base::transactions,
    common::types::TransactionTime,
    contract_client::{self, ViewError},
    smart_contracts::common::Amount,
    types::{
        smart_contracts::{OwnedContractName, OwnedParameter, WasmModule},
        transactions::InitContractPayload,
        Energy, WalletAccount,
    },
    v2::{self as sdk, BlockIdentifier},
};
use std::sync::Arc;
mod types;
use types::*;

/// Command line configuration of the application.
#[derive(Debug, clap::Parser)]
struct Args {
    #[arg(
        long = "node",
        default_value = "http://node.testnet.concordium.com:20000",
        help = "The endpoints are expected to point to concordium node grpc v2 API's.",
        global = true
    )]
    node_endpoint:   concordium_rust_sdk::v2::Endpoint,
    #[arg(
        long = "module",
        default_value = "./track-and-trace.wasm.v1",
        help = "Source module from which to initialize the contract instances."
    )]
    module:          std::path::PathBuf,
    #[arg(
        long = "num-items",
        default_value = "1",
        help = "Number of items to be created in the contract."
    )]
    num_items:       usize,
    #[structopt(long = "admin-key-file", help = "Path to the admin key file.")]
    admin_keys_path: std::path::PathBuf,
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
    let keys: WalletAccount = WalletAccount::from_json_file(args.admin_keys_path)
        .context("Could not read the keys file.")?;

    let admin_key = Arc::new(keys);

    eprintln!("Starting script with admin account {}.", admin_key.address);

    // Deploy module
    let mod_ref = {
        let module = WasmModule::from_file(&args.module)?;
        let mod_ref = module.get_module_ref();
        if client
            .get_module_source(&mod_ref, BlockIdentifier::LastFinal)
            .await
            .is_ok()
        {
            eprintln!("Source module with reference {mod_ref} already exists.");
        } else {
            let nonce_response = client
                .get_next_account_sequence_number(&admin_key.address)
                .await
                .context("NonceQueryError.")?;

            let tx = transactions::send::deploy_module(
                &admin_key,
                admin_key.address,
                nonce_response.nonce,
                TransactionTime::hours_after(1),
                module,
            );
            let hash = client.send_account_transaction(tx).await?;

            eprintln!("Send deployment transaction with hash {hash}.");

            let (block_hash, result) = client.wait_until_finalized(&hash).await?;

            if let Some(err) = result.is_rejected_account_transaction() {
                anyhow::bail!("Failed to deploy module: {err:#?}");
            }

            eprintln!("Deployed module with reference {mod_ref} in block {block_hash}");
        }
        mod_ref
    };

    // Initialize new instance
    let mut contract_client = {
        let expiry = TransactionTime::hours_after(1);
        let payload = InitContractPayload {
            amount: Amount::zero(),
            mod_ref,
            init_name: OwnedContractName::new_unchecked("init_track_and_trace".into()),
            param: OwnedParameter::empty(),
        };
        let energy = Energy::from(10000);

        let nonce_response = client
            .get_next_account_sequence_number(&admin_key.address)
            .await
            .context("NonceQueryError.")?;

        let tx = transactions::send::init_contract(
            &admin_key,
            admin_key.address,
            nonce_response.nonce,
            expiry,
            payload,
            energy,
        );
        let hash = client.send_account_transaction(tx).await?;

        eprintln!("Send initialization transaction with hash {hash}.");

        let (block_hash, result) = client.wait_until_finalized(&hash).await?;
        if let Some(error) = result.is_rejected_account_transaction() {
            anyhow::bail!("Failed to initialize contract: {error:#?}.");
        }
        let info = result.contract_init().context("Expect an init result")?;

        eprintln!(
            "Successfully initialized contract in block {block_hash}, with address {}.",
            info.address
        );

        contract_client::ContractClient::<TrackAndTraceContract>::create(
            client.clone(),
            info.address,
        )
        .await?
    };

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

        eprintln!("Submitted create item with index {i} in transaction hash {tx_hash}");

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Creating item failed: {err:#?}");
        }
    }

    // Update items from `Produced` to `InTransit`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParamsByAdmin = ChangeItemStatusParamsByAdmin {
            item_id:         i as u64,
            new_status:      Status::InTransit,
            additional_data: AdditionalData { bytes: vec![] },
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParamsByAdmin, ViewError>(
                "changeItemStatusByAdmin",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `InTransit` in transaction hash \
             {tx_hash}"
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}");
        }
    }

    // Update items from `InTransit` to `InStore`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParamsByAdmin = ChangeItemStatusParamsByAdmin {
            item_id:         i as u64,
            new_status:      Status::InStore,
            additional_data: AdditionalData { bytes: vec![] },
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParamsByAdmin, ViewError>(
                "changeItemStatusByAdmin",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `InStore` in transaction hash \
             {tx_hash}"
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}");
        }
    }

    // Update items from `InStore` to `Sold`
    for i in 0..args.num_items {
        let param: ChangeItemStatusParamsByAdmin = ChangeItemStatusParamsByAdmin {
            item_id:         i as u64,
            new_status:      Status::Sold,
            additional_data: AdditionalData { bytes: vec![] },
        };

        let tx_dry_run = contract_client
            .dry_run_update::<ChangeItemStatusParamsByAdmin, ViewError>(
                "changeItemStatusByAdmin",
                Amount::zero(),
                admin_key.address,
                &param,
            )
            .await?;

        let tx_hash = tx_dry_run.send(&admin_key).await?;

        eprintln!(
            "Submitted update item status with index {i} to `Sold` in transaction hash {tx_hash}"
        );

        if let Err(err) = tx_hash.wait_for_finalization().await {
            anyhow::bail!("Update item status failed: {err:#?}");
        }
    }

    eprintln!("Script completed successfully");

    Ok(())
}

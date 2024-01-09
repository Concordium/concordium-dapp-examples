use concordium_cis2::{MetadataUrl, MINT_EVENT_TAG, TOKEN_METADATA_EVENT_TAG, TRANSFER_EVENT_TAG, BURN_EVENT_TAG};
use concordium_std::{collections::BTreeMap, schema::SchemaType, *};

use super::contract_types::{ContractCollateralTokenAmount, ContractTokenAmount, ContractTokenId};
pub type TransferEvent = concordium_cis2::TransferEvent<ContractTokenId, ContractTokenAmount>;
pub type TokenMetadataEvent = concordium_cis2::TokenMetadataEvent<ContractTokenId>;
pub type MintEvent = concordium_cis2::MintEvent<ContractTokenId, ContractTokenAmount>;
pub type BurnEvent = concordium_cis2::BurnEvent<ContractTokenId, ContractTokenAmount>;

#[derive(Serial, SchemaType)]
pub struct CollateralUpdatedEvent {
    pub contract: ContractAddress,
    pub token_id: ContractTokenId,
    pub amount: ContractCollateralTokenAmount,
    pub owner: Address,
}

pub enum ContractEvent {
    Mint(MintEvent),
    TokenMetadata(TokenMetadataEvent),
    Transfer(TransferEvent),
    Retire(BurnEvent),
    Retract(BurnEvent),
    Burn(BurnEvent),
    CollateralAdded(CollateralUpdatedEvent),
    CollateralRemoved(CollateralUpdatedEvent),
    CollateralUsedEvent(CollateralUpdatedEvent)
}

const RETIRE_EVENT_TAG: u8 = u8::MIN;
const COLLATERAL_ADDED_EVENT_TAG: u8 = u8::MIN + 1;
const COLLATERAL_REMOVED_EVENT_TAG: u8 = u8::MIN + 2;
const COLLATERAL_USED_EVENT_TAG: u8 = u8::MIN + 3;
const RETRACT_EVENT_TAG: u8 = u8::MIN + 5;

impl Serial for ContractEvent {
    fn serial<W: Write>(&self, out: &mut W) -> Result<(), W::Err> {
        match self {
            ContractEvent::Transfer(event) => {
                out.write_u8(concordium_cis2::TRANSFER_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::Mint(event) => {
                out.write_u8(concordium_cis2::MINT_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::TokenMetadata(event) => {
                out.write_u8(concordium_cis2::TOKEN_METADATA_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::Retire(event) => {
                out.write_u8(RETIRE_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::Retract(event) => {
                out.write_u8(RETRACT_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::Burn(event) => {
                out.write_u8(BURN_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::CollateralAdded(event) => {
                out.write_u8(COLLATERAL_ADDED_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::CollateralRemoved(event) => {
                out.write_u8(COLLATERAL_REMOVED_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::CollateralUsedEvent(event) => {
                out.write_u8(COLLATERAL_USED_EVENT_TAG)?;
                event.serial(out)
            }
        }
    }
}

impl SchemaType for ContractEvent {
    fn get_type() -> schema::Type {
        let mut event_map = BTreeMap::new();
        event_map.insert(
            TRANSFER_EVENT_TAG,
            (
                "Transfer".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("from"), Address::get_type()),
                    (String::from("to"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            MINT_EVENT_TAG,
            (
                "Mint".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            TOKEN_METADATA_EVENT_TAG,
            (
                "TokenMetadata".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("metadata_url"), MetadataUrl::get_type()),
                ]),
            ),
        );
        event_map.insert(
            RETIRE_EVENT_TAG,
            (
                "Retire".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            RETRACT_EVENT_TAG,
            (
                "Retract".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            BURN_EVENT_TAG,
            (
                "Burn".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("amount"), ContractTokenAmount::get_type()),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            COLLATERAL_ADDED_EVENT_TAG,
            (
                "CollateralAdded".to_string(),
                schema::Fields::Named(vec![
                    (String::from("contract"), ContractAddress::get_type()),
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (
                        String::from("amount"),
                        ContractCollateralTokenAmount::get_type(),
                    ),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            COLLATERAL_REMOVED_EVENT_TAG,
            (
                "CollateralRemoved".to_string(),
                schema::Fields::Named(vec![
                    (String::from("contract"), ContractAddress::get_type()),
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (
                        String::from("amount"),
                        ContractCollateralTokenAmount::get_type(),
                    ),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        event_map.insert(
            COLLATERAL_USED_EVENT_TAG,
            (
                "CollateralUsed".to_string(),
                schema::Fields::Named(vec![
                    (String::from("contract"), ContractAddress::get_type()),
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (
                        String::from("amount"),
                        ContractCollateralTokenAmount::get_type(),
                    ),
                    (String::from("owner"), Address::get_type()),
                ]),
            ),
        );
        schema::Type::TaggedEnum(event_map)
    }
}

use concordium_cis2::{MetadataUrl, MINT_EVENT_TAG, TOKEN_METADATA_EVENT_TAG, TRANSFER_EVENT_TAG, BURN_EVENT_TAG};
use concordium_std::{collections::BTreeMap, schema::SchemaType, *};

use super::contract_types::*;

pub type MintEvent = concordium_cis2::MintEvent<ContractTokenId, ContractTokenAmount>;
pub type TransferEvent = concordium_cis2::TransferEvent<ContractTokenId, ContractTokenAmount>;
pub type TokenMetadataEvent = concordium_cis2::TokenMetadataEvent<ContractTokenId>;
pub type BurnEvent = concordium_cis2::BurnEvent<ContractTokenId, ContractTokenAmount>;

#[derive(Serial, SchemaType)]
pub struct MaturityTimeEvent {
    pub token_id: ContractTokenId,
    pub maturity_time: Timestamp,
}

#[derive(Serial, SchemaType)]
pub struct VerifierUpdatedEvent {
    pub verifier: Address,
}

#[derive(Serial, SchemaType)]
pub struct VerificationEvent {
    pub verifier: Address,
    pub token_id: ContractTokenId,
}

pub enum ContractEvent {
    Mint(MintEvent),
    TokenMetadata(TokenMetadataEvent),
    MaturityTime(MaturityTimeEvent),
    Transfer(TransferEvent),
    Retire(BurnEvent),
    Retract(BurnEvent),
    Burn(BurnEvent),
    VerifierAdded(VerifierUpdatedEvent),
    VerifierRemoved(VerifierUpdatedEvent),
    Verification(VerificationEvent),
}

const RETIRE_EVENT_TAG: u8 = u8::MIN;
const MATURITY_TIME_EVENT_TAG: u8 = u8::MIN + 1;
const VERIFIER_ADDED_EVENT_TAG: u8 = u8::MIN + 2;
const VERIFIER_REMOVED_EVENT_TAG: u8 = u8::MIN + 3;
const VERIFICATION_EVENT_TAG: u8 = u8::MIN + 4;
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
            ContractEvent::MaturityTime(event) => {
                out.write_u8(MATURITY_TIME_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::VerifierAdded(event) => {
                out.write_u8(VERIFIER_ADDED_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::VerifierRemoved(event) => {
                out.write_u8(VERIFIER_REMOVED_EVENT_TAG)?;
                event.serial(out)
            }
            ContractEvent::Verification(event) => {
                out.write_u8(VERIFICATION_EVENT_TAG)?;
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
            MATURITY_TIME_EVENT_TAG,
            (
                "MaturityTime".to_string(),
                schema::Fields::Named(vec![
                    (String::from("token_id"), ContractTokenId::get_type()),
                    (String::from("maturity_time"), Timestamp::get_type()),
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
            VERIFIER_ADDED_EVENT_TAG,
            (
                "VerifierAdded".to_string(),
                schema::Fields::Named(vec![(String::from("verifier"), Address::get_type())]),
            ),
        );
        event_map.insert(
            VERIFIER_REMOVED_EVENT_TAG,
            (
                "VerifierRemoved".to_string(),
                schema::Fields::Named(vec![(String::from("verifier"), Address::get_type())]),
            ),
        );
        event_map.insert(
            VERIFICATION_EVENT_TAG,
            (
                "Verification".to_string(),
                schema::Fields::Named(vec![
                    (String::from("verifier"), Address::get_type()),
                    (String::from("token_id"), ContractTokenId::get_type()),
                ]),
            ),
        );
        schema::Type::TaggedEnum(event_map)
    }
}

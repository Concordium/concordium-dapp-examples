use concordium_std::{Address, ContractAddress, Amount, SchemaType, Serial};

use crate::carbon_credits::contract_types::{ContractTokenAmount, ContractTokenId};

#[derive(Serial, SchemaType)]
pub struct TokenReceivedEvent {
    pub token_id: ContractTokenId,
    pub token_contract: ContractAddress,
    pub owner: Address,
    pub amount: ContractTokenAmount,
}

#[derive(Serial, SchemaType)]
pub struct TokenListedEvent {
    pub token_id: ContractTokenId,
    pub token_contract: ContractAddress,
    pub amount: ContractTokenAmount,
    pub price: Amount
}

#[derive(Serial, SchemaType)]
pub struct TokenTransferredEvent {
    pub token_id: ContractTokenId,
    pub token_contract: ContractAddress,
    pub from: Address,
    pub to: Address,
    pub amount: ContractTokenAmount,
}

#[derive(Serial, SchemaType)]
pub enum ContractEvent {
    TokenReceived(TokenReceivedEvent),
    TokenListed(TokenListedEvent),
    TokenTransferred(TokenTransferredEvent),
}

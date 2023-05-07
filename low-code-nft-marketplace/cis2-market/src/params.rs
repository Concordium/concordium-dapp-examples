//! Defines the parameters for the marketplace contract.
//! [Read more](https://developer.concordium.software/en/mainnet/smart-contracts/general/develop-contracts.html#working-with-parameters) about working with parameters

use concordium_std::{
    AccountAddress, Amount, ContractAddress, Deserial, SchemaType, Serial, Serialize,
};

use crate::{state::TokenListItem, ContractTokenAmount, ContractTokenId};

/// Parameters for the `add` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub(crate) struct AddParams {
    pub cis_contract_address: ContractAddress,
    pub token_id: ContractTokenId,

    /// Price per Unit of Token at this the Token is to be sold.
    /// This includes Selling Price + Marketplace Commission
    pub price: Amount,

    /// Royalty basis points. This is equal to Royalty% * 100. So can be a max
    /// of 100*100 `MAX_BASIS_POINTS`
    pub royalty: u16,

    /// Quantity of the token which can be listed on the marketplace
    /// In case of an NFT this will always be one
    pub quantity: ContractTokenAmount,
}

/// Parameters for the `transfer` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub(crate) struct TransferParams {
    /// Address of the CIS2 Contract. Contract containing token to be transferred.
    pub cis_contract_address: ContractAddress,

    /// Token ID of the token to be transferred.
    pub token_id: ContractTokenId,

    /// Address of the receiver of the token.
    pub to: AccountAddress,

    /// Current owner of the Token.
    pub owner: AccountAddress,

    /// Quantity of the token to be transferred.
    pub quantity: ContractTokenAmount,
}

#[derive(Debug, Serialize, SchemaType)]
pub struct TokenList(
    #[concordium(size_length = 2)] pub Vec<TokenListItem<ContractTokenId, ContractTokenAmount>>,
);

/// Parameters for the `init` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub struct InitParams {
    /// Commission basis points. equals to percent * 100
    /// This can me atmost equal to 100*100 = 10000(MAX_BASIS_POINTS)
    /// This is the commission charged by the marketplace on every sale.
    pub commission: u16,
}

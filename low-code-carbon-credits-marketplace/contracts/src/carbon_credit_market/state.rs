//! Defines the State (persisted data) for the contract.

#![cfg_attr(not(feature = "std"), no_std)]

use concordium_std::*;

use crate::client_utils::types::*;

use super::error::*;

#[derive(Clone, Serialize, PartialEq, Eq, Debug)]
pub struct TokenInfo {
    pub id: ContractTokenId,
    pub address: ContractAddress,
}

#[derive(Clone, Serialize, PartialEq, Eq, Debug)]
pub struct TokenOwnerInfo {
    pub id: ContractTokenId,
    pub address: ContractAddress,
    pub owner: AccountAddress,
}

impl From<&TokenOwnerInfo> for TokenInfo {
    fn from(val: &TokenOwnerInfo) -> Self {
        TokenInfo {
            id: val.id,
            address: val.address,
        }
    }
}

impl From<TokenOwnerInfo> for TokenInfo {
    fn from(val: TokenOwnerInfo) -> Self {
        TokenInfo {
            id: val.id,
            address: val.address,
        }
    }
}

impl TokenOwnerInfo {
    pub fn from(token_info: &TokenInfo, owner: &AccountAddress) -> Self {
        TokenOwnerInfo {
            owner: *owner,
            id: token_info.id,
            address: token_info.address,
        }
    }
}

#[derive(Clone, Serialize, Copy, PartialEq, Eq, Debug)]
pub struct TokenPriceState {
    pub quantity: ContractTokenAmount,
    pub price: Amount,
}

#[derive(Clone, Serialize, Copy, PartialEq, Eq, Debug)]
pub struct TokenRoyaltyState {
    /// Primary Owner (Account Address which added the token first time on a
    /// Marketplace Instance)
    pub primary_owner: AccountAddress,

    /// Royalty basis points. Royalty percentage * 100.
    /// This can me atmost equal to 100*100 = 10000(MAX_BASIS_POINTS)
    pub royalty: u16,
}

/// Marketplace Commission
#[derive(Serialize, Clone, PartialEq, Eq, Debug)]
pub struct Commission {
    /// Commission basis points. equals to percent * 100
    pub percentage_basis: u16,
}

#[derive(Debug, Serialize, SchemaType, PartialEq, Eq, Clone)]
pub struct TokenListItem {
    pub token_id: ContractTokenId,
    pub contract: ContractAddress,
    pub price: Amount,
    pub owner: AccountAddress,
    pub royalty: u16,
    pub primary_owner: AccountAddress,
    pub quantity: ContractTokenAmount,
}

#[derive(Debug, Serialize, SchemaType, PartialEq, Eq, Clone)]
pub struct TokenOwnedListItem {
    pub token_id: ContractTokenId,
    pub contract: ContractAddress,
    pub owner: AccountAddress,
    pub quantity: ContractTokenAmount,
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct TokenListState<S: HasStateApi> {
    pub token_royalty: TokenRoyaltyState,
    pub token_prices: StateMap<AccountAddress, Amount, S>,
}

impl<S: HasStateApi> TokenListState<S> {
    pub fn new(
        state_builder: &mut StateBuilder<S>,
        owner: &AccountAddress,
        royalty: u16,
        price: Amount,
    ) -> Self {
        TokenListState {
            token_royalty: TokenRoyaltyState {
                primary_owner: *owner,
                royalty,
            },
            token_prices: {
                let mut map = state_builder.new_map();
                map.insert(owner.to_owned(), price);
                map
            },
        }
    }
}

#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S: HasStateApi> {
    pub commission: Commission,
    pub tokens_owned: StateMap<TokenOwnerInfo, ContractTokenAmount, S>,
    pub tokens_listed: StateMap<TokenInfo, TokenListState<S>, S>,
    // Contracts from which incoming CIS2 transfers will be accepted
    pub verifier_contracts: StateSet<ContractAddress, S>,
}

impl<S> State<S>
where
    S: HasStateApi,
{
    /// Creates a new state with the given commission.
    /// The commission is given as a percentage basis, i.e. 10000 is 100%.
    pub fn new(
        state_builder: &mut StateBuilder<S>,
        commission: u16,
        verifier_contracts: Vec<ContractAddress>,
    ) -> Self {
        State {
            commission: Commission {
                percentage_basis: commission,
            },
            tokens_owned: state_builder.new_map(),
            tokens_listed: state_builder.new_map(),
            verifier_contracts: {
                let mut set = state_builder.new_set();
                for contract in verifier_contracts {
                    set.insert(contract);
                }
                set
            },
        }
    }

    /// Check if the given address is a verifier contract.
    pub fn is_verifier_contract(&self, contract: &ContractAddress) -> bool {
        self.verifier_contracts.contains(contract)
    }

    pub fn add_owned_token(
        &mut self,
        token_owner_info: &TokenOwnerInfo,
        quantity: ContractTokenAmount,
    ) {
        self.tokens_owned
            .entry(token_owner_info.clone())
            .and_modify(|q| {
                *q += quantity;
            })
            .or_insert(quantity);
    }

    /// Adds a token to Buyable Token List.
    pub fn list_token(
        &mut self,
        state_builder: &mut StateBuilder<S>,
        token_info: &TokenInfo,
        owner: &AccountAddress,
        price: Amount,
        royalty: u16,
    ) {
        self.tokens_listed
            .entry(token_info.clone())
            .and_modify(|l| {
                l.token_prices.insert(owner.to_owned(), price);
            })
            .or_insert(TokenListState::new(state_builder, owner, royalty, price));
    }

    /// Decreases the quantity of a token in the buyable token list.
    pub fn decrease_listed_quantity(
        &mut self,
        token_owner_info: &TokenOwnerInfo,
        delta: ContractTokenAmount,
    ) {
        if let Some(quantity) = self.tokens_owned.get(token_owner_info) {
            let new_quantity = *quantity - delta;
            if new_quantity.eq(&ContractTokenAmount::from(0)) {
                self.tokens_owned.remove(token_owner_info);
                if let Some(mut token) = self.tokens_listed.get_mut(&token_owner_info.into()) {
                    token.token_prices.remove(&token_owner_info.owner);
                };
            } else {
                self.tokens_owned
                    .insert(token_owner_info.clone(), new_quantity);
            }
        }
    }

    pub fn get_quantity_owned(
        &self,
        token_info: &TokenInfo,
        owner: &AccountAddress,
    ) -> Result<ContractTokenAmount, MarketplaceError> {
        self.tokens_owned
            .get(&TokenOwnerInfo::from(token_info, owner))
            .map(|q| *q)
            .ok_or(MarketplaceError::TokenNotInCustody)
    }

    /// Gets a token from the buyable token list.
    pub fn get_listed_token(
        &self,
        token_info: &TokenInfo,
        owner: &AccountAddress,
    ) -> Result<(TokenRoyaltyState, Amount), MarketplaceError> {
        match self.tokens_listed.get(token_info) {
            Some(token) => match token.token_prices.get(owner) {
                Some(price) => Ok((token.token_royalty, *price)),
                None => Err(MarketplaceError::TokenNotListed),
            },
            None => Err(MarketplaceError::TokenNotListed),
        }
    }

    /// Gets a list of all tokens in the buyable token list.
    pub fn get_listed_tokens(&self) -> Vec<TokenListItem> {
        self.tokens_owned
            .iter()
            .filter_map(|owned_token| {
                match self.tokens_listed.get(&owned_token.0.to_owned().into()) {
                    Some(listed_token) => {
                        match listed_token
                            .token_prices
                            .get(&owned_token.0.owner.to_owned())
                        {
                            Some(price) => Some(TokenListItem {
                                token_id: owned_token.0.id,
                                contract: owned_token.0.address,
                                price: *price,
                                owner: owned_token.0.owner,
                                royalty: listed_token.token_royalty.royalty,
                                primary_owner: listed_token.token_royalty.primary_owner,
                                quantity: *owned_token.1,
                            }),
                            None => None,
                        }
                    }
                    None => None,
                }
            })
            .collect()
    }
}

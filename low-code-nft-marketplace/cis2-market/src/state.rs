//! Defines the State (persisted data) for the contract.

#![cfg_attr(not(feature = "std"), no_std)]

use concordium_cis2::{IsTokenAmount, IsTokenId};
use concordium_std::*;

#[derive(Clone, Serialize, PartialEq, Eq, Debug)]
pub struct TokenInfo<T: IsTokenId> {
    pub id: T,
    pub address: ContractAddress,
}

#[derive(Clone, Serialize, PartialEq, Eq, Debug)]
pub struct TokenOwnerInfo<T: IsTokenId> {
    pub id: T,
    pub address: ContractAddress,
    pub owner: AccountAddress,
}

impl<T: IsTokenId> TokenOwnerInfo<T> {
    pub fn from(token_info: TokenInfo<T>, owner: &AccountAddress) -> Self {
        TokenOwnerInfo {
            owner: *owner,
            id: token_info.id,
            address: token_info.address,
        }
    }
}

#[derive(Clone, Serialize, Copy, PartialEq, Eq, Debug)]
pub struct TokenPriceState<A: IsTokenAmount> {
    pub quantity: A,
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
pub struct TokenListItem<T: IsTokenId, A: IsTokenAmount> {
    pub token_id: T,
    pub contract: ContractAddress,
    pub price: Amount,
    pub owner: AccountAddress,
    pub royalty: u16,
    pub primary_owner: AccountAddress,
    pub quantity: A,
}

#[derive(Serial, DeserialWithState, StateClone)]
#[concordium(state_parameter = "S")]
pub struct State<S: HasStateApi, T: IsTokenId, A: IsTokenAmount + Copy> {
    pub commission: Commission,
    pub token_royalties: StateMap<TokenInfo<T>, TokenRoyaltyState, S>,
    pub token_prices: StateMap<TokenOwnerInfo<T>, TokenPriceState<A>, S>,
}

impl<S: HasStateApi, T: IsTokenId + Copy, A: IsTokenAmount + Copy + ops::Sub<Output = A>>
    State<S, T, A>
{
    /// Creates a new state with the given commission.
    /// The commission is given as a percentage basis, i.e. 10000 is 100%.
    pub fn new(state_builder: &mut StateBuilder<S>, commission: u16) -> Self {
        State {
            commission: Commission {
                percentage_basis: commission,
            },
            token_royalties: state_builder.new_map(),
            token_prices: state_builder.new_map(),
        }
    }

    /// Adds a token to Buyable Token List.
    pub fn list_token(
        &mut self,
        token_info: &TokenInfo<T>,
        owner: &AccountAddress,
        price: Amount,
        royalty: u16,
        quantity: A,
    ) {
        match self.token_royalties.get(token_info) {
            // If the token is already listed, do nothing.
            Some(_) => None,
            // If the token is not listed, add it to the list.
            None => self.token_royalties.insert(
                token_info.clone(),
                TokenRoyaltyState {
                    primary_owner: *owner,
                    royalty,
                },
            ),
        };

        // Add the token to the buyable token list.
        // If the token is already listed, update the price.
        self.token_prices.insert(
            TokenOwnerInfo::from(token_info.clone(), owner),
            TokenPriceState { price, quantity },
        );
    }

    pub(crate) fn decrease_listed_quantity(&mut self, token_info: &TokenOwnerInfo<T>, delta: A) {
        if let Some(mut price) = self.token_prices.get_mut(token_info) {
            price.quantity = price.quantity - delta;
        }
    }

    /// Gets a token from the buyable token list.
    pub fn get_listed(
        &self,
        token_info: &TokenInfo<T>,
        owner: &AccountAddress,
    ) -> Option<(TokenRoyaltyState, TokenPriceState<A>)> {
        match self.token_royalties.get(token_info) {
            Some(r) => self
                .token_prices
                .get(&TokenOwnerInfo::from(token_info.clone(), owner))
                .map(|p| (*r, *p)),
            None => Option::None,
        }
    }

    /// Gets a list of all tokens in the buyable token list.
    pub fn list(&self) -> Vec<TokenListItem<T, A>> {
        self.token_prices
            .iter()
            .filter_map(|p| -> Option<TokenListItem<T, A>> {
                let token_info = TokenInfo {
                    id: p.0.id,
                    address: p.0.address,
                };

                match self.token_royalties.get(&token_info) {
                    Option::None => Option::None,
                    Option::Some(r) => Option::Some(TokenListItem {
                        token_id: token_info.id,
                        contract: token_info.address,
                        price: p.1.price,
                        owner: p.0.owner,
                        royalty: r.royalty,
                        primary_owner: r.primary_owner,
                        quantity: p.1.quantity,
                    }),
                }
            })
            .collect()
    }
}

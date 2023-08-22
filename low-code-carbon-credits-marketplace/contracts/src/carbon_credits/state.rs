use core::ops::{AddAssign, SubAssign};

use concordium_cis2::*;
use concordium_std::*;

use crate::client_utils::types::ContractMetadataUrl;

use super::{error::*, contract_types::{ContractTokenId, ContractTokenAmount, ContractCollateralTokenAmount, ContractResult}};

/// The state for each address.
#[derive(Serial, DeserialWithState, Deletable)]
#[concordium(state_parameter = "S")]
pub struct AddressState<S> {
    /// The amount of tokens owned by this address.
    pub balances: StateMap<ContractTokenId, ContractTokenAmount, S>,
}

impl<S: HasStateApi> AddressState<S> {
    fn empty(state_builder: &mut StateBuilder<S>) -> Self {
        AddressState {
            balances: state_builder.new_map(),
        }
    }
}

/// Collateral Key.
/// The Token which is fractionalized and hence used as collateral.
#[derive(Serial, Deserial, Clone, SchemaType, Copy)]
pub struct CollateralToken {
    pub contract: ContractAddress,
    pub token_id: ContractTokenId,
    pub owner: AccountAddress,
}

/// The contract state,
///
/// Note: The specification does not specify how to structure the contract state
/// and this could be structured in a more space efficient way.
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct State<S> {
    /// The state of addresses.
    pub state: StateMap<Address, AddressState<S>, S>,
    /// All of the token IDs
    pub tokens: StateMap<ContractTokenId, MetadataUrl, S>,
    pub token_supply: StateMap<ContractTokenId, ContractTokenAmount, S>,
    pub collaterals: StateMap<CollateralToken, ContractCollateralTokenAmount, S>,
    pub used_collaterals: StateMap<ContractTokenId, CollateralToken, S>,
    pub last_token_id: ContractTokenId,
    // Contracts from which incoming CIS2 transfers will be accepted
    pub verifier_contracts: StateSet<ContractAddress, S>,
}

impl<S: HasStateApi> State<S> {
    /// Construct a state with no tokens
    pub fn new(
        state_builder: &mut StateBuilder<S>,
        verifier_contracts: Vec<ContractAddress>,
    ) -> Self {
        State {
            state: state_builder.new_map(),
            tokens: state_builder.new_map(),
            token_supply: state_builder.new_map(),
            last_token_id: 0.into(),
            collaterals: state_builder.new_map(),
            used_collaterals: state_builder.new_map(),
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

    /// Mints an amount of tokens with a given address as the owner.
    pub fn mint(
        &mut self,
        token_metadata: &ContractMetadataUrl,
        amount: ContractTokenAmount,
        owner: &Address,
        state_builder: &mut StateBuilder<S>,
    ) -> ContractTokenId {
        let token_id = self.last_token_id;
        self.tokens.insert(token_id, token_metadata.clone().into());

        self.state
            .entry(*owner)
            .and_modify(|b| {
                b.balances
                    .entry(token_id)
                    .and_modify(|a| *a += amount)
                    .or_insert(amount);
            })
            .or_insert_with(|| {
                let mut address_state = AddressState::empty(state_builder);
                address_state.balances.insert(token_id, amount);
                address_state
            });

        self.token_supply
            .entry(token_id)
            .and_modify(|a| a.add_assign(amount))
            .or_insert(amount);

        // Update the last token id
        self.last_token_id = ContractTokenId::from(token_id.0 + 1);
        token_id
    }

    pub fn burn(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        owner: &Address,
    ) {
        self.state.entry(owner.to_owned()).and_modify(|f| {
            f.balances
                .entry(*token_id)
                .and_modify(|a| a.sub_assign(amount));
        });

        self.token_supply
            .entry(*token_id)
            .and_modify(|a| a.sub_assign(amount));
    }

    /// Check that the token ID currently exists in this contract.
    #[inline(always)]
    pub fn contains_token(&self, token_id: &ContractTokenId) -> bool {
        self.tokens.get(token_id).is_some()
    }

    /// Get the current balance of a given token id for a given address.
    /// Results in an error if the token id does not exist in the state.
    pub fn balance(
        &self,
        token_id: &ContractTokenId,
        address: &Address,
    ) -> ContractResult<ContractTokenAmount> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        let balance = self.state.get(address).map_or(0.into(), |address_state| {
            address_state
                .balances
                .get(token_id)
                .map_or(0.into(), |x| *x)
        });
        Ok(balance)
    }

    pub fn get_supply(&self, token_id: &ContractTokenId) -> ContractTokenAmount {
        match self.token_supply.get(token_id) {
            Some(amount) => amount.to_owned(),
            None => ContractTokenAmount::from(0),
        }
    }

    /// Update the state with a transfer.
    /// Results in an error if the token id does not exist in the state or if
    /// the from address have insufficient tokens to do the transfer.
    pub fn transfer(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        from: &Address,
        to: &Address,
        state_builder: &mut StateBuilder<S>,
    ) -> ContractResult<()> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        // A zero transfer does not modify the state.
        if amount == 0.into() {
            return Ok(());
        }

        // Get the `from` state and balance, if not present it will fail since the
        // balance is interpreted as 0 and the transfer amount must be more than
        // 0 as this point.;
        {
            let mut from_address_state = self
                .state
                .entry(*from)
                .occupied_or(ContractError::InsufficientFunds)?;
            let mut from_balance = from_address_state
                .balances
                .entry(*token_id)
                .occupied_or(ContractError::InsufficientFunds)?;
            ensure!(*from_balance >= amount, ContractError::InsufficientFunds);
            *from_balance -= amount;
        }

        let mut to_address_state = self
            .state
            .entry(*to)
            .or_insert_with(|| AddressState::empty(state_builder));
        let mut to_address_balance = to_address_state
            .balances
            .entry(*token_id)
            .or_insert(0.into());
        *to_address_balance += amount;

        Ok(())
    }

    pub fn add_collateral(
        &mut self,
        contract: ContractAddress,
        token_id: ContractTokenId,
        owner: AccountAddress,
        received_token_amount: ContractCollateralTokenAmount,
    ) {
        let key = CollateralToken {
            contract,
            token_id,
            owner,
        };

        self.collaterals
            .entry(key)
            .and_modify(|c| {
                c.add_assign(received_token_amount);
            })
            .or_insert(received_token_amount);
    }

    /// Returns false if the owned token is used for any token Id other than the token being minted.
    pub fn has_unused_collateral(&self, collateral_key: &CollateralToken) -> bool {
        self.collaterals.get(collateral_key).is_some()
            && self
                .used_collaterals
                .get(&collateral_key.token_id)
                .is_none()
    }

    pub fn find_collateral(
        &self,
        token_id: &ContractTokenId,
    ) -> Option<(CollateralToken, ContractCollateralTokenAmount)> {
        self.used_collaterals
            .get(token_id)
            .and_then(|collateral_key| {
                self.collaterals
                    .get(&*collateral_key)
                    .map(|amount| (*collateral_key, *amount))
            })
    }

    pub fn remove_collateral(&mut self, collateral_key: &CollateralToken) {
        self.collaterals.remove(collateral_key);
    }

    /// Attaches a collateral token to a minted token.
    /// Returns the amount of collateral attached to the minted token.
    /// Fails if the collateral token is already used for another minted token.
    pub fn use_collateral(
        &mut self,
        owned_token: &CollateralToken,
        minted_token_id: &ContractTokenId,
    ) -> ContractResult<ContractCollateralTokenAmount> {
        ensure!(
            self.has_unused_collateral(owned_token),
            ContractError::Custom(CustomContractError::InvalidCollateral)
        );

        self.used_collaterals
            .insert(*minted_token_id, owned_token.to_owned());

        self.collaterals.get(owned_token).map_or(
            Err(ContractError::Custom(
                CustomContractError::InvalidCollateral,
            )),
            |c| Ok(c.to_owned()),
        )
    }
}

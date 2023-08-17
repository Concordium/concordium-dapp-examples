use concordium_cis2::*;
use concordium_std::*;

use super::{contract_types::*, error::*, mint::MintParam};

/// The state for each address.
#[derive(Serial, DeserialWithState, Deletable, StateClone)]
#[concordium(state_parameter = "S")]
pub struct AddressState<S> {
    /// The amount of tokens owned by this address.
    pub balances: StateMap<ContractTokenId, ContractTokenAmount, S>,
}

#[derive(Serial, Deserial, Clone)]
pub struct ContractTokenMetadata {
    pub metadata_url: MetadataUrl,
    pub maturity_time: Timestamp,
}

impl ContractTokenMetadata {
    pub fn is_mature(&self, now: &Timestamp) -> bool {
        self.maturity_time.cmp(now).is_le()
    }
}

impl From<&MintParam> for ContractTokenMetadata {
    fn from(mint_param: &MintParam) -> Self {
        ContractTokenMetadata {
            metadata_url: mint_param.metadata_url.clone().into(),
            maturity_time: mint_param.maturity_time,
        }
    }
}

impl<S: HasStateApi> AddressState<S> {
    pub fn empty(state_builder: &mut StateBuilder<S>) -> Self {
        AddressState {
            balances: state_builder.new_map(),
        }
    }
}

/// The contract state,
///
/// Note: The specification does not specify how to structure the contract state
/// and this could be structured in a more space efficient way.
#[derive(Serial, DeserialWithState, StateClone)]
#[concordium(state_parameter = "S")]
pub struct State<S> {
    /// The state of addresses.
    pub balances: StateMap<Address, StateSet<ContractTokenId, S>, S>,
    /// All of the token IDs
    pub metadatas: StateMap<ContractTokenId, ContractTokenMetadata, S>,
    pub last_token_id: ContractTokenId,
    /// Set of Verifiers
    pub verifiers: StateSet<Address, S>,
    pub verified_tokens: StateMap<ContractTokenId, StateSet<Address, S>, S>,
}

impl<S: HasStateApi> State<S> {
    /// Construct a state with no tokens
    pub fn empty(state_builder: &mut StateBuilder<S>) -> Self {
        State {
            balances: state_builder.new_map(),
            metadatas: state_builder.new_map(),
            last_token_id: 0.into(),
            verifiers: state_builder.new_set(),
            verified_tokens: state_builder.new_map(),
        }
    }

    /// Adds a verifier to the contract state.
    pub fn add_verifier(&mut self, verifier: &Address) {
        self.verifiers.insert(*verifier);
    }

    /// Removes a verifier from the contract state.
    pub fn remove_verifier(&mut self, verifier: &Address) {
        self.verifiers.remove(verifier);
    }

    /// Checks if a given address is a verifier.
    pub fn is_verifier(&self, verifier: &Address) -> bool {
        self.verifiers.contains(verifier)
    }

    /// Checks if a given token is verified
    pub fn is_verified(&self, token_id: &ContractTokenId) -> bool {
        self.verified_tokens.get(token_id).is_some()
    }

    /// Verify a token
    pub fn verify_token(
        &mut self,
        token_id: &ContractTokenId,
        verifier: &Address,
        state_builder: &mut StateBuilder<S>,
    ) {
        let mut verified_token = self
            .verified_tokens
            .entry(*token_id)
            .or_insert_with(|| state_builder.new_set());
        verified_token.insert(*verifier);
    }

    /// Get the set of verifiers for a given token.
    pub fn get_verifiers(&self, token_id: &ContractTokenId) -> Option<Vec<Address>> {
        self.verified_tokens
            .get(token_id)
            .map(|x| x.iter().map(|a| *a).collect())
    }

    /// Mints an amount of tokens with a given address as the owner.
    pub fn mint(
        &mut self,
        mint_param: &MintParam,
        owner: &Address,
        state_builder: &mut StateBuilder<S>,
    ) -> ContractTokenId {
        let token_id = self.last_token_id;
        // Add the token to the contract state.
        self.metadatas
            .insert(token_id, ContractTokenMetadata::from(mint_param));
        // Add the token to the owner's state.
        self.add(owner, state_builder, token_id);
        // Increment the token ID for the next mint.
        self.last_token_id = ContractTokenId::from(token_id.0 + 1);

        // Return the token ID.
        token_id
    }

    fn add(&mut self, owner: &Address, state_builder: &mut StateBuilder<S>, token_id: TokenIdU8) {
        let mut owner_state = self
            .balances
            .entry(*owner)
            .or_insert_with(|| state_builder.new_set());
        owner_state.insert(token_id);
    }

    /// Check that the token ID currently exists in this contract.
    #[inline(always)]
    pub fn contains_token(&self, token_id: &ContractTokenId) -> bool {
        self.get_token(token_id).is_some()
    }

    pub fn get_token(&self, token_id: &ContractTokenId) -> Option<ContractTokenMetadata> {
        self.metadatas.get(token_id).map(|x| x.to_owned())
    }

    /// Get the current balance of a given token id for a given address.
    /// Results in an error if the token id does not exist in the state.
    pub fn balance(
        &self,
        token_id: &ContractTokenId,
        address: &Address,
    ) -> ContractResult<ContractTokenAmount> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        let balance = self
            .balances
            .get(address)
            .map_or(0, |address_state| match address_state.contains(token_id) {
                true => 1,
                false => 0,
            })
            .into();

        Ok(balance)
    }

    /// Update the state with a transfer.
    /// Results in an error if the token id does not exist in the state or if
    /// the from address have insufficient tokens to do the transfer.
    pub fn transfer(
        &mut self,
        token_id: &ContractTokenId,
        from: &Address,
        to: &Address,
        state_builder: &mut StateBuilder<S>,
    ) -> ContractResult<()> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
        ensure!(
            self.balance(token_id, from)?.cmp(&0.into()).is_gt(),
            ContractError::InsufficientFunds
        );
        if from == to {
            return Ok(());
        }

        // Remove token from from address.
        self.remove_balances(from, token_id)?;

        // Add token to to address.
        self.add(to, state_builder, *token_id);

        Ok(())
    }

    pub fn burn(&mut self, token_id: &ContractTokenId, address: &Address) -> ContractResult<()> {
        ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);

        // Remove token from address.
        self.remove_balances(address, token_id)?;

        // Token metadata should be kept in the state.
        // This allows for the wallet to display the token metadata even if the token is burned
        // self.metadatas.remove(token_id);
        // Remove token from verified tokens.
        self.verified_tokens.remove(token_id);

        Ok(())
    }

    /// Remove a token from an address.
    fn remove_balances(
        &mut self,
        address: &Address,
        token_id: &TokenIdU8,
    ) -> Result<(), Cis2Error<super::error::CustomContractError>> {
        self.balances
            .get_mut(address)
            .ok_or(ContractError::InsufficientFunds)?
            .remove(token_id);
        Ok(())
    }
}

use concordium_std::*;

use crate::client_utils::types::{ContractMetadataUrl, ContractTokenAmount, ContractTokenId};

use super::{contract_types::ContractResult, error::CustomContractError, events::*, state::*};

#[derive(Serial, Deserial, SchemaType)]
pub struct TokenMintParams {
    pub metadata: ContractMetadataUrl,
    pub amount: ContractTokenAmount,
    /// Collateral Contract
    pub contract: ContractAddress,
    /// Collateral Token
    pub token_id: ContractTokenId,
}

/// The parameter for the contract function `mint` which mints a number of
/// token types and/or amounts of tokens to a given address.
#[derive(Serial, Deserial, SchemaType)]
pub struct MintParams {
    /// Owner of the newly minted tokens.
    pub owner: Address,
    /// A collection of tokens to mint.
    pub tokens: Vec<TokenMintParams>,
}

/// Mint new tokens with a given address as the owner of these tokens. 
/// Minting of carbon credits can only be done after a project token has already been transferred 
/// to the carbon credit contract (this contract). Refferred to as the collateral token.
///
/// It rejects if:
/// - The sender is not an account.
/// - Fails to parse parameter.
/// - Any of the tokens fails to be minted, which could be if:
///     - Fails to log Mint event.
///     - Fails to log TokenMetadata event.
///     - Token ID is already in use.
///     - References a used collateral, or a non-existent collateral.
///
/// Note: Can at most mint 32 token types in one call due to the limit on the
/// number of logs a smart contract can produce on each function call.
#[receive(
    contract = "carbon_credits",
    name = "mint",
    parameter = "MintParams",
    error = "super::error::ContractError",
    enable_logger,
    mutable
)]
pub fn mint<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let sender = match ctx.sender() {
        Address::Account(a) => a,
        Address::Contract(_) => bail!(CustomContractError::AccountsOnly.into()),
    };

    // Parse the parameter.
    let params: MintParams = ctx.parameter_cursor().get()?;

    let (state, builder) = host.state_and_builder();
    for token_info in params.tokens {
        ensure!(
            state.has_unused_collateral(&CollateralToken {
                contract: token_info.contract,
                token_id: token_info.token_id,
                owner: sender,
            }),
            concordium_cis2::Cis2Error::Custom(CustomContractError::InvalidCollateral)
        );

        // Mint the token in the state.
        let token_id = state.mint(
            &token_info.metadata,
            token_info.amount,
            &params.owner,
            builder,
        );

        let collateral_amount = state.use_collateral(
            &CollateralToken {
                contract: token_info.contract,
                token_id: token_info.token_id,
                owner: sender,
            },
            &token_id,
        )?;

        logger.log(&ContractEvent::CollateralUsedEvent(
            CollateralUpdatedEvent {
                contract: token_info.contract,
                token_id: token_info.token_id,
                amount: collateral_amount,
                owner: params.owner,
            },
        ))?;
        // Event for minted token.
        logger.log(&ContractEvent::Mint(MintEvent {
            token_id,
            amount: token_info.amount,
            owner: params.owner,
        }))?;
        logger.log(&ContractEvent::TokenMetadata(
            super::events::TokenMetadataEvent {
                token_id,
                metadata_url: token_info.metadata.into(),
            },
        ))?;
    }
    Ok(())
}

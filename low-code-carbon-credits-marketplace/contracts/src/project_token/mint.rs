use crate::{
    client_utils::types::ContractMetadataUrl,
    project_token::{contract_types::*, events::*, state::*},
};
use concordium_std::*;

#[derive(Serial, Deserial, SchemaType)]
pub struct MintParam {
    pub metadata_url: ContractMetadataUrl,
    pub maturity_time: Timestamp,
}

/// The parameter for the contract function `mint` which mints a number of
/// token types and/or amounts of tokens to a given address.
#[derive(Serial, Deserial, SchemaType)]
pub struct MintParams {
    /// Owner of the newly minted tokens.
    pub owner: Address,
    /// A collection of tokens to mint.
    pub tokens: Vec<MintParam>,
}

#[derive(Serial, Deserial, SchemaType)]
pub struct MintResponse(Vec<ContractTokenId>);

/// Mint new tokens with a given address as the owner of these tokens.
/// Can only be called by the contract owner.
/// Logs a `Mint` and a `TokenMetadata` event for each token.
/// The url for the token metadata is the token ID encoded in hex, appended on
/// the `TOKEN_METADATA_BASE_URL`.
///
/// It rejects if:
/// - The sender is not the contract instance owner.
/// - Fails to parse parameter.
/// - Any of the tokens fails to be minted, which could be if:
///     - Fails to log Mint event.
///     - Fails to log TokenMetadata event.
///
/// Note: Can at most mint 32 token types in one call due to the limit on the
/// number of logs a smart contract can produce on each function call.
#[receive(
    contract = "project_token",
    name = "mint",
    parameter = "MintParams",
    error = "super::error::ContractError",
    enable_logger,
    mutable,
    return_value = "MintResponse"
)]
fn mint<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<MintResponse> {
    // Mint function is unauthorized
    // Anyone having an account on the chain can call this function
    // Represents that anyone can create a Carbon Credit Project

    // Parse the parameter.
    let params: MintParams = ctx.parameter_cursor().get()?;

    let mut res: Vec<ContractTokenId> = Vec::new();
    let (state, builder) = host.state_and_builder();
    for mint_param in params.tokens {
        // Mint the token in the state.
        let token_id = state.mint(&mint_param, &params.owner, builder);

        // Event for minted token.
        logger.log(&ContractEvent::Mint(super::events::MintEvent {
            token_id,
            owner: params.owner,
            amount: 1.into(),
        }))?;
        // Event for token metadata.
        logger.log(&ContractEvent::TokenMetadata(
            super::events::TokenMetadataEvent {
                token_id,
                metadata_url: mint_param.metadata_url.into(),
            },
        ))?;
        // Event for maturity time.
        logger.log(&ContractEvent::MaturityTime(
            super::events::MaturityTimeEvent {
                token_id,
                maturity_time: mint_param.maturity_time,
            },
        ))?;

        res.push(token_id);
    }

    Ok(MintResponse(res))
}

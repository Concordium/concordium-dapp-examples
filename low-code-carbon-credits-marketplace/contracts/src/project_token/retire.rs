use concordium_std::*;

use super::{contract_types::*, error::*, events::*, state::*};

/// Take a list of tokens and retires them. Emitting a Retire event and a Burn event for each token.
/// Retire event has the domain meaning of retiring a carbon credit.
/// Burn event exists for compatibility with applications supporting CIS2 standard.
/// The token / carbon credit should be mature and verified to be retired.
#[receive(
    contract = "project_token",
    name = "retire",
    parameter = "ContractBurnParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn retire<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let ContractBurnParams { owner, tokens } = ctx.parameter_cursor().get()?;
    ensure!(ctx.sender() == owner, ContractError::Unauthorized);

    let state = host.state_mut();
    for ContractBurnParam { token_id, amount } in tokens {
        ensure!(amount == 1.into(), ContractError::InsufficientFunds);

        // Ensure that the token exists.
        let token = state
            .get_token(&token_id)
            .ok_or(ContractError::InvalidTokenId)?;

        // Ensure that the token is mature.
        ensure!(
            token.is_mature(&ctx.metadata().slot_time()),
            ContractError::Custom(CustomContractError::TokenNotMature)
        );
        // Ensure token is verified
        ensure!(
            state.is_verified(&token_id),
            ContractError::Custom(CustomContractError::TokenNotVerified)
        );
        // Ensure that the sender has token balance.
        let balance = state.balance(&token_id, &owner)?;
        ensure!(
            balance >= amount,
            ContractError::InsufficientFunds
        );

        // Retire token.
        state.burn(&token_id, &owner)?;

        //log token retire event.
        logger.log(&ContractEvent::Retire(BurnEvent {
            token_id,
            owner,
            amount,
        }))?;

        // log burn event
        logger.log(&ContractEvent::Burn(BurnEvent {
            token_id,
            owner,
            amount,
        }))?;
    }

    Ok(())
}

use concordium_std::*;

use crate::client_utils::types::BurnParam;

use super::{contract_types::*, error::*, events::*, state::*};

/// Take a list of tokens and retracts them. Emitting a Retract event and a Burn event for each token.
/// Retract event has the domain meaning of retracting a carbon credit.
/// Burn event exists for compatibility with applications supporting CIS2 standard.
#[receive(
    contract = "project_token",
    name = "retract",
    parameter = "ContractBurnParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
fn retract<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let ContractBurnParams { owner, tokens } = ctx.parameter_cursor().get()?;
    let state = host.state_mut();
    let sender = ctx.sender();
    let is_verifier = state.is_verifier(&sender);
    ensure!(
        sender == owner || is_verifier,
        ContractError::Unauthorized
    );

    for BurnParam { token_id, amount } in tokens {
        ensure!(amount == 1.into(), ContractError::InsufficientFunds);

        // Ensure that the token exists.
        let token = state
            .get_token(&token_id)
            .ok_or(ContractError::InvalidTokenId)?;

        // Ensure token is NOT verified
        ensure!(
            !state.is_verified(&token_id) || !token.is_mature(&ctx.metadata().slot_time()),
            ContractError::Custom(CustomContractError::TokenVerifiedOrMature)
        );

        // Ensure that the sender has token balance or is a verifier.
        let balance = state.balance(&token_id, &owner)?;
        ensure!(
            balance >= amount,
            ContractError::InsufficientFunds
        );

        // Retire token.
        state.burn(&token_id, &owner)?;

        // log token retract event.
        logger.log(&ContractEvent::Retract(BurnEvent {
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

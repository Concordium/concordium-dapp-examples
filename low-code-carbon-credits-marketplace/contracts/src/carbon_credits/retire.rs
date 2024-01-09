use concordium_std::*;

use crate::client_utils::client::Client;

use super::{contract_types::*, error::*, events::*, state::*};

/// Take a list of tokens and retires them. Emitting a Retire event and a Burn event for each token.
/// Retire event has the domain meaning of retiring a carbon credit.
/// Burn event exists for compatibility with applications supporting CIS2 standard.
/// The token / carbon credit should be mature and verified to be retired.
#[receive(
    contract = "carbon_credits",
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
    let ContractBurnParams { tokens, owner } = ctx.parameter_cursor().get()?;
    ensure!(ctx.sender() == owner, ContractError::Unauthorized);

    for ContractBurnParam { token_id, amount } in tokens {
        let state = host.state();
        let (is_mature, is_verified) = {
            // Get Collateral Token Info
            let (collateral_key, _) = state
                .find_collateral(&token_id)
                .ok_or(CustomContractError::InvalidCollateral)?;

            let client = Client::new(collateral_key.contract);
            // Get Maturity Time
            let maturity_of = client
                .maturity_of(host, collateral_key.token_id)
                .map_err(|e| Into::<CustomContractError>::into(e))?;
            let is_mature = maturity_of <= ctx.metadata().slot_time();

            // Get Verification Status
            let is_verified = client
                .is_verified(host, token_id)
                .map_err(|e| Into::<CustomContractError>::into(e))?;

            (is_mature, is_verified)
        };

        // ensure is mature
        ensure!(is_mature, CustomContractError::TokenNotMature.into());

        // ensure is verified
        ensure!(is_verified, CustomContractError::TokenNotVerified.into());

        let balance = state.balance(&token_id, &owner)?;
        ensure!(balance >= amount, ContractError::InsufficientFunds);

        // burn the tokens
        host.state_mut().burn(&token_id, amount, &owner);

        // log Retire event
        logger.log(&ContractEvent::Retire(BurnEvent {
            token_id,
            amount,
            owner,
        }))?;

        // log Burn event
        logger.log(&ContractEvent::Burn(BurnEvent {
            token_id,
            amount,
            owner,
        }))?;
    }

    Ok(())
}

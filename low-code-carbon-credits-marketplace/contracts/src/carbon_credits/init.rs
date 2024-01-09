use concordium_std::*;

use super::state::State;

#[derive(Serial, Deserial, SchemaType)]
pub struct InitParams {
    pub verifier_contracts: Vec<ContractAddress>,
}

// Contract functions
/// Initialize contract instance with a no token types.
#[init(
    contract = "carbon_credits",
    event = "super::events::ContractEvent",
    error = "super::error::ContractError",
    parameter = "InitParams"
)]
fn contract_init<S: HasStateApi>(
    ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<State<S>> {
    // Parse the parameter.
    let params: InitParams = ctx.parameter_cursor().get()?;
    // Construct the initial contract state.
    Ok(State::new(state_builder, params.verifier_contracts))
}

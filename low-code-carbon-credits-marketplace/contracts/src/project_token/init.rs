use concordium_std::*;

use super::state::State;

/// Initialize contract instance with an empty state (no tokens exist in the state).
#[init(
    contract = "project_token",
    event = "super::events::ContractEvent",
    error = "super::error::ContractError"
)]
pub fn init<S: HasStateApi>(
    _ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<State<S>> {
    // Construct the initial contract state.
    Ok(State::empty(state_builder))
}

use concordium_std::*;

use crate::client_utils::types::IsVerifiedQueryResponse;

use super::{
    contract_types::{ContractIsVerifiedQueryParams, ContractResult},
    state::State,
};

#[receive(
    contract = "project_token",
    name = "isVerified",
    parameter = "ContractIsVerifiedQueryParams",
    error = "super::error::ContractError",
    return_value = "IsVerifiedQueryResponse",
    mutable
)]
pub fn is_verified<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
) -> ContractResult<IsVerifiedQueryResponse> {
    // Parse the parameter.
    let ContractIsVerifiedQueryParams { queries } = ctx.parameter_cursor().get()?;
    // Get the sender who invoked this contract function.
    let state = host.state();
    queries
        .iter()
        .map(|token_id| Ok(state.is_verified(token_id)))
        .collect()
}

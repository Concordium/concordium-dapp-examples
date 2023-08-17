use concordium_std::*;

use super::{contract_types::ContractResult, state::State};

use crate::client_utils::types::IsVerifierQueryParams;

#[receive(
    contract = "project_token",
    name = "isVerifier",
    parameter = "IsVerifierQueryParams",
    error = "super::error::ContractError",
    return_value = "Vec<bool>",
    mutable
)]
pub fn is_verifier<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
) -> ContractResult<Vec<bool>> {
    // Parse the parameter.
    let IsVerifierQueryParams { queries } = ctx.parameter_cursor().get()?;
    let state = host.state();

    let mut res = Vec::with_capacity(queries.len());

    for address in queries.iter() {
        res.push(state.is_verifier(address));
    }

    Ok(res)
}

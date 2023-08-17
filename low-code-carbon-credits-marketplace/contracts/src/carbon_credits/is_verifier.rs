use concordium_std::*;

use super::{contract_types::ContractResult, state::State};

use crate::client_utils::{client::Client, types::IsVerifierQueryParams};

#[receive(
    contract = "carbon_credits",
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

    let res: Vec<bool> = queries
        .iter()
        .map(|q| {
            host.state()
                .verifier_contracts
                .iter()
                .map(|vc| Client::new(*vc).is_verifier(host, *q))
                .any(|r| r.is_ok() && r.unwrap())
        })
        .collect();

    Ok(res)
}

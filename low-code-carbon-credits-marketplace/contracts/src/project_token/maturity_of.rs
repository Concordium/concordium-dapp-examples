use concordium_std::*;

use crate::{
    client_utils::types::MaturityOfQueryResponse,
    project_token::{contract_types::*, state::*},
};

/// Returns the maturity time of the given tokens.
#[receive(
    contract = "project_token",
    name = "maturityOf",
    parameter = "ContractMaturityOfQueryParams",
    return_value = "MaturityOfQueryResponse"
)]
pub fn maturity_of<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<State<S>, StateApiType = S>,
) -> ContractResult<MaturityOfQueryResponse> {
    // Parse the parameter.
    let params: ContractMaturityOfQueryParams = ctx.parameter_cursor().get()?;

    params
        .queries
        .iter()
        .map(|token_id| {
            let state = host.state();
            let token = state.get_token(token_id).unwrap();
            Ok(token.maturity_time)
        })
        .collect()
}

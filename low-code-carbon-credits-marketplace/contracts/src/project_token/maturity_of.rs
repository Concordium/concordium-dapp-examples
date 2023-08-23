use concordium_std::*;

use crate::client_utils::types::MaturityOfQueryResponse;

use super::{contract_types::*, error::ContractError, state::*};

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
    let mut res: Vec<Timestamp> = Vec::with_capacity(params.queries.len());
    let state = host.state();

    // Get the maturity time of each token.
    for token_id in params.queries.iter() {
        let token = state
            .get_token(token_id)
            .ok_or(ContractError::InvalidTokenId)?;
        res.push(token.maturity_time);
    }

    Ok(res)
}

use concordium_cis2::*;
use concordium_std::*;

use super::{contract_types::*, state::*};

/// Takes a list of queries. Each query is an owner address and some address to
/// check as an operator of the owner address.
///
/// It rejects if:
/// - It fails to parse the parameter.
#[receive(
    contract = "carbon_credits",
    name = "operatorOf",
    parameter = "OperatorOfQueryParams",
    return_value = "OperatorOfQueryResponse",
    error = "super::error::ContractError"
)]
fn operator_of<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    _host: &impl HasHost<State<S>, StateApiType = S>,
) -> ContractResult<OperatorOfQueryResponse> {
    // Parse the parameter.
    let params: OperatorOfQueryParams = ctx.parameter_cursor().get()?;
    // Build the response.
    let mut response = Vec::with_capacity(params.queries.len());
    for _query in params.queries {
        // Query the state for address being an operator of owner.
        response.push(false);
    }
    let result = OperatorOfQueryResponse::from(response);
    Ok(result)
}

use concordium_cis2::*;
use concordium_std::*;

use super::{contract_types::*, state::*};

/// Takes a list of queries. Each query is an owner address and some address to
/// check as an operator of the owner address.
///
/// It rejects if:
/// - It fails to parse the parameter.
#[receive(
    contract = "project_token",
    name = "operatorOf",
    parameter = "OperatorOfQueryParams",
    return_value = "OperatorOfQueryResponse",
    error = "super::error::ContractError"
)]
pub fn operator_of<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    _host: &impl HasHost<State<S>, StateApiType = S>,
) -> ContractResult<OperatorOfQueryResponse> {
    let params: OperatorOfQueryParams = ctx.parameter_cursor().get()?;
    Ok(OperatorOfQueryResponse(vec![false; params.queries.len()]))
}

use concordium_std::*;

use crate::client_utils::{client::Client, types::MaturityOfQueryResponse};

use super::{
    contract_types::{ContractMaturityOfQueryParams, ContractResult},
    error::*,
    state::State,
};

/// Returns the maturity time of the given tokens.
#[receive(
    contract = "carbon_credits",
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
    let state = host.state();

    let mut res = Vec::with_capacity(params.queries.len());

    for token_id in params.queries.iter() {
        ensure!(
            state.contains_token(token_id),
            ContractError::InvalidTokenId
        );
        let (collateral_token, _) =
            state
                .find_collateral(token_id)
                .ok_or(ContractError::Custom(
                    CustomContractError::InvalidCollateral,
                ))?;

        let time = Client::new(collateral_token.contract)
            .maturity_of(host, collateral_token.token_id)
            .map_err(|e| Into::<CustomContractError>::into(e))?;
        res.push(time);
    }

    Ok(res)
}

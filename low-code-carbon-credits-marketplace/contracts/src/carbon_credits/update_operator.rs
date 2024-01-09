use super::{contract_types::*, error::*, state::*};
use concordium_std::*;

/// `update_operator` function of the [CIS2 spec](https://proposals.concordium.software/CIS/cis-2.html#updateoperator)
#[receive(
    contract = "carbon_credits",
    name = "updateOperator",
    parameter = "concordium_cis2::UpdateOperatorParams",
    error = "ContractError",
    enable_logger,
    mutable
)]
pub fn update_operator<S: HasStateApi>(
    _ctx: &impl HasReceiveContext,
    _host: &mut impl HasHost<State<S>, StateApiType = S>,
    _logger: &mut impl HasLogger,
) -> ContractResult<()> {
    Err(ContractError::Custom(CustomContractError::NotImplemented))
}

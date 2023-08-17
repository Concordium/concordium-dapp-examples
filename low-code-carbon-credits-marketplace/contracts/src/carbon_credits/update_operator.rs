use super::{contract_types::*, error::*, state::*};
use concordium_std::*;

/// Enable or disable addresses as operators of the sender address.
/// Logs an `UpdateOperator` event.
///
/// It rejects if:
/// - It fails to parse the parameter.
/// - Fails to log event.
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

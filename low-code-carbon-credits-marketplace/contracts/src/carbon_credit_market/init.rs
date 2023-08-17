use concordium_std::*;

use super::{contract_types::*, error::*, state::*};

pub type InitResult<S> = Result<State<S>, MarketplaceError>;

/// Parameters for the `init` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub struct InitParams {
    /// Commission basis points. equals to percent * 100
    /// This can me atmost equal to 100*100 = 10000(MAX_BASIS_POINTS)
    /// This is the commission charged by the marketplace on every sale.
    pub commission: u16,
    /// Contracts from which incoming CIS2 transfers will be accepted
    pub verifier_contracts: Vec<ContractAddress>,
}

/// Initializes a new Marketplace Contract
///
/// This function can be called by using InitParams.
/// The commission should be less than the maximum allowed value of 10000 basis
/// points
#[init(
    contract = "carbon_credit_market",
    parameter = "InitParams",
    error = "MarketplaceError",
    event = "super::events::ContractEvent"
)]
fn init<S: HasStateApi>(
    ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<S> {
    let params: InitParams = ctx.parameter_cursor().get()?;

    ensure!(
        params.commission.cmp(&MAX_BASIS_POINTS).is_le(),
        MarketplaceError::InvalidCommission
    );

    Ok(State::new(
        state_builder,
        params.commission,
        params.verifier_contracts,
    ))
}

#[concordium_cfg_test]
mod test {
    use super::*;
    use concordium_std::test_infrastructure::*;

    #[concordium_test]
    fn should_init_contract() {
        let mut ctx = TestInitContext::default();
        let mut state_builder = TestStateBuilder::new();

        let state = State::new(
            &mut state_builder,
            250,
            vec![ContractAddress {
                index: 1,
                subindex: 1,
            }],
        );
        let host = TestHost::new(state, state_builder);

        let init_params = InitParams {
            commission: 250,
            verifier_contracts: vec![ContractAddress {
                index: 1,
                subindex: 1,
            }],
        };

        let parameter_bytes = to_bytes(&init_params);
        ctx.set_parameter(&parameter_bytes);

        let result = init(&ctx, &mut TestStateBuilder::new());

        assert!(result.is_ok());
        assert_eq!(
            host.state().commission.percentage_basis,
            init_params.commission
        );
    }
}

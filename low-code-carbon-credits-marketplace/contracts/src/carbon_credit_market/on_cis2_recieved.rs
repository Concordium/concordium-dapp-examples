use concordium_std::*;

use super::{contract_types::*, error::*, events::*, state::*};
use crate::client_utils::{client::Client, types::*};

/// This functions should be invoked by any CIS2 Contract whose token is being transferred.
/// TO this contract
///
/// Upon receiving any token its added to the list of owned tokens.
/// `add` function can be called in a separate transaction to mint a token against the collateral.
///
/// It rejects if:
/// - Sender is not a contract.
/// - It fails to parse the parameter.
/// - Contract name part of the parameter is invalid.
/// - Calling back `transfer` to sender contract rejects.
#[receive(
    contract = "carbon_credit_market",
    name = "onCis2Recieved",
    error = "MarketplaceError",
    mutable,
    enable_logger
)]
fn on_cis2_received<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    // Ensure the sender is a contract.
    let sender = match ctx.sender() {
        Address::Account(_) => bail!(MarketplaceError::CalledByAnAccount),
        Address::Contract(contract) => {
            ensure!(
                // Check if the sender is a verifier contract.
                host.state().is_verifier_contract(&contract),
                MarketplaceError::InvalidVerifierContract
            );
            contract
        }
    };

    // Parse the parameter.
    let params: ContractOnReceivingCis2Params = ctx.parameter_cursor().get()?;

    let is_verified: bool = Client::new(sender).is_verified(host, params.token_id)?;
    // Ensure the token is verified.
    ensure!(is_verified, MarketplaceError::TokenNotVerified);

    let token_owner = match params.from {
        Address::Account(a) => a,
        Address::Contract(_) => bail!(MarketplaceError::CalledByAContract),
    };

    host.state_mut().add_owned_token(
        &TokenOwnerInfo {
            id: params.token_id,
            address: sender,
            owner: token_owner,
        },
        params.amount,
    );

    logger.log(&ContractEvent::TokenReceived(TokenReceivedEvent {
        token_id: params.token_id,
        token_contract: sender,
        owner: Address::Account(token_owner),
        amount: params.amount,
    }))?;

    Ok(())
}

#[concordium_cfg_test]
mod test {
    use super::*;
    use concordium_cis2::AdditionalData;
    use concordium_std::test_infrastructure::*;

    const ACCOUNT_0: AccountAddress = AccountAddress([0u8; 32]);
    const CIS_CONTRACT_ADDRESS: ContractAddress = ContractAddress {
        index: 1,
        subindex: 0,
    };
    const MARKET_CONTRACT_ADDRESS: ContractAddress = ContractAddress {
        index: 2,
        subindex: 0,
    };

    #[concordium_test]
    fn should_recieve_cis2() {
        // Tests that the contract can receive cis2 tokens
        let token_id_1 = ContractTokenId::from(1);
        let token_quantity_1 = ContractTokenAmount::from(1);

        let mut ctx = TestReceiveContext::default();
        ctx.set_sender(Address::Contract(CIS_CONTRACT_ADDRESS));
        ctx.set_self_address(MARKET_CONTRACT_ADDRESS);

        let params = ContractOnReceivingCis2Params {
            token_id: token_id_1,
            amount: token_quantity_1,
            from: Address::Account(ACCOUNT_0),
            data: AdditionalData::empty(),
        };
        let parameter_bytes = to_bytes(&params);
        ctx.set_parameter(&parameter_bytes);

        let mut state_builder = TestStateBuilder::new();
        let state = State::new(&mut state_builder, 250, vec![CIS_CONTRACT_ADDRESS]);
        let mut host = TestHost::new(state, state_builder);
        let mut logger = TestLogger::init();

        let result = on_cis2_received(&ctx, &mut host, &mut logger);
        assert!(result.is_ok());
        assert!(host
            .state()
            .tokens_owned
            .get(&TokenOwnerInfo {
                id: token_id_1,
                address: CIS_CONTRACT_ADDRESS,
                owner: ACCOUNT_0,
            })
            .is_some());
    }
}

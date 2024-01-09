use concordium_std::{ops::Add, *};

use super::{contract_types::*, error::*, events::*};
use crate::{carbon_credit_market::state::*, client_utils::types::*};

/// Parameters for the `add` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub(crate) struct AddParams {
    pub cis_contract_address: ContractAddress,
    pub token_id: ContractTokenId,

    /// Price per Unit of Token at this the Token is to be sold.
    /// This includes Selling Price + Marketplace Commission
    pub price: Amount,

    /// Royalty basis points. This is equal to Royalty% * 100. So can be a max
    /// of 100*100 `MAX_BASIS_POINTS`
    pub royalty: u16,
}

/// Adds a new already owned token to the marketplace.
#[receive(
    contract = "carbon_credit_market",
    name = "add",
    parameter = "AddParams",
    mutable,
    error = "MarketplaceError",
    enable_logger
)]
pub fn add<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<ContractState<S>, StateApiType = S>,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let sender_account_address: AccountAddress = match ctx.sender() {
        Address::Account(account_address) => account_address,
        Address::Contract(_) => bail!(MarketplaceError::CalledByAContract),
    };

    let params: AddParams = ctx.parameter_cursor().get()?;
    let token_info = TokenInfo {
        address: params.cis_contract_address,
        id: params.token_id,
    };

    let commission = host.state().commission.clone();

    // Ensure that the `commission + royalty` is less than the maximum allowed value of 10000
    ensure!(
        commission
            .percentage_basis
            .add(params.royalty)
            .cmp(&MAX_BASIS_POINTS)
            .is_le(),
        MarketplaceError::InvalidRoyalty
    );

    let owned_quantity = host
        .state()
        .get_quantity_owned(&token_info, &sender_account_address)?;
    // Ensure that the quantity owned is greater than 0
    ensure!(
        owned_quantity.cmp(&ContractTokenAmount::from(0)).is_ge(),
        MarketplaceError::InvalidTokenQuantity
    );

    let (state, state_builder) = host.state_and_builder();
    state.list_token(
        state_builder,
        &token_info,
        &sender_account_address,
        params.price,
        params.royalty,
    );

    logger.log(&ContractEvent::TokenListed(TokenListedEvent {
        token_id: params.token_id,
        token_contract: params.cis_contract_address,
        price: params.price,
        amount: owned_quantity,
    }))?;

    Ok(())
}

#[concordium_cfg_test]
mod test {
    use super::*;
    use concordium_std::test_infrastructure::*;

    const ACCOUNT_0: AccountAddress = AccountAddress([0u8; 32]);
    const ADDRESS_0: Address = Address::Account(ACCOUNT_0);
    const CIS_CONTRACT_ADDRESS: ContractAddress = ContractAddress {
        index: 1,
        subindex: 0,
    };
    const MARKET_CONTRACT_ADDRESS: ContractAddress = ContractAddress {
        index: 2,
        subindex: 0,
    };

    #[concordium_test]
    fn should_add_token() {
        let token_id_1 = ContractTokenId::from(1);
        let token_quantity_1 = ContractTokenAmount::from(1);
        let price = Amount::from_ccd(1);

        let mut ctx = TestReceiveContext::default();
        ctx.set_sender(ADDRESS_0);
        ctx.set_self_address(MARKET_CONTRACT_ADDRESS);

        let add_params = AddParams {
            cis_contract_address: CIS_CONTRACT_ADDRESS,
            price,
            token_id: token_id_1,
            royalty: 0,
        };
        let parameter_bytes = to_bytes(&add_params);
        ctx.set_parameter(&parameter_bytes);

        let mut state_builder = TestStateBuilder::new();
        let mut state = State::new(&mut state_builder, 250, vec![]);
        state.add_owned_token(
            &TokenOwnerInfo {
                id: token_id_1,
                address: CIS_CONTRACT_ADDRESS,
                owner: ACCOUNT_0,
            },
            token_quantity_1,
        );

        let mut host = TestHost::new(state, state_builder);
        let mut logger = TestLogger::init();

        let result = add(&ctx, &mut host, &mut logger);

        assert!(result.is_ok());
        assert!(host
            .state()
            .tokens_listed
            .get(&TokenInfo {
                address: CIS_CONTRACT_ADDRESS,
                id: token_id_1
            })
            .is_some());

        let listed_token = host
            .state()
            .tokens_listed
            .get(&TokenInfo {
                address: CIS_CONTRACT_ADDRESS,
                id: token_id_1,
            })
            .unwrap();
        assert_eq!(
            listed_token.token_royalty,
            TokenRoyaltyState {
                primary_owner: ACCOUNT_0,
                royalty: 0
            }
        );
        assert_eq!(
            listed_token
                .token_prices
                .get(&ACCOUNT_0)
                .unwrap()
                .to_owned(),
            price
        );
    }

    #[concordium_test]
    fn should_not_add_not_owned_token() {
        let token_id_1 = ContractTokenId::from(1);
        let price = Amount::from_ccd(1);

        let mut ctx = TestReceiveContext::default();
        ctx.set_sender(ADDRESS_0);
        ctx.set_self_address(MARKET_CONTRACT_ADDRESS);

        let add_params = AddParams {
            cis_contract_address: CIS_CONTRACT_ADDRESS,
            price,
            token_id: token_id_1,
            royalty: 0,
        };
        let parameter_bytes = to_bytes(&add_params);
        ctx.set_parameter(&parameter_bytes);

        let mut state_builder = TestStateBuilder::new();
        let state = State::new(&mut state_builder, 250, vec![]);
        let mut host = TestHost::new(state, state_builder);

        let mut logger = TestLogger::init();
        let result = add(&ctx, &mut host, &mut logger);

        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), MarketplaceError::TokenNotInCustody);
    }
}

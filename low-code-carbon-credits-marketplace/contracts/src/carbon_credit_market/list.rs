use concordium_std::*;

use super::{contract_types::*, state::*};
use crate::client_utils::types::ContractTokenAmount;

#[derive(Debug, Serialize, SchemaType)]
pub struct TokenList(pub Vec<TokenListItem>);
/// Returns a list of Added Tokens with Metadata which contains the token price
#[receive(
    contract = "carbon_credit_market",
    name = "list",
    return_value = "TokenList",
    error = "super::error::MarketplaceError"
)]
fn list<S: HasStateApi>(
    _ctx: &impl HasReceiveContext,
    host: &impl HasHost<ContractState<S>, StateApiType = S>,
) -> ContractResult<TokenList> {
    let tokens: Vec<TokenListItem> = host
        .state()
        .get_listed_tokens()
        .iter()
        .filter(|t| t.quantity.cmp(&ContractTokenAmount::from(0)).is_gt())
        .cloned()
        .collect::<Vec<TokenListItem>>();

    Ok(TokenList(tokens))
}

#[concordium_cfg_test]
mod test {
    use super::*;
    use crate::client_utils::types::*;
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
    fn should_list_tokens() {
        let mut ctx = TestReceiveContext::default();
        ctx.set_sender(ADDRESS_0);
        ctx.set_self_address(MARKET_CONTRACT_ADDRESS);

        let mut state_builder = TestStateBuilder::new();
        let mut state = State::new(&mut state_builder, 250, vec![]);
        state.add_owned_token(
            &TokenOwnerInfo {
                id: ContractTokenId::from(1),
                address: CIS_CONTRACT_ADDRESS,
                owner: ACCOUNT_0,
            },
            ContractTokenAmount::from(1),
        );
        state.add_owned_token(
            &TokenOwnerInfo {
                id: ContractTokenId::from(2),
                address: CIS_CONTRACT_ADDRESS,
                owner: ACCOUNT_0,
            },
            ContractTokenAmount::from(1),
        );
        state.tokens_listed.insert(
            TokenInfo {
                address: CIS_CONTRACT_ADDRESS,
                id: ContractTokenId::from(1),
            },
            TokenListState {
                token_royalty: TokenRoyaltyState {
                    primary_owner: ACCOUNT_0,
                    royalty: 0,
                },
                token_prices: {
                    let mut map = state_builder.new_map();
                    map.insert(ACCOUNT_0, Amount::from_ccd(1));
                    map
                },
            },
        );

        let result = list(&ctx, &mut TestHost::new(state, state_builder));
        assert!(result.is_ok());
        let tokens_list = result.unwrap();
        assert_eq!(tokens_list.0.len(), 1);
        assert_eq!(tokens_list.0[0].token_id, ContractTokenId::from(1));
        assert_eq!(tokens_list.0[0].price, Amount::from_ccd(1));
        assert_eq!(tokens_list.0[0].royalty, 0);
        assert_eq!(tokens_list.0[0].primary_owner, ACCOUNT_0);
        assert_eq!(tokens_list.0[0].contract, CIS_CONTRACT_ADDRESS);
    }
}

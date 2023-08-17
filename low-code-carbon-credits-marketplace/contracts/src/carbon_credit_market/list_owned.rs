use concordium_std::*;

use super::{contract_types::*, state::*};

#[receive(
    contract = "carbon_credit_market",
    name = "list_owned",
    return_value = "Vec<TokenOwnedListItem>",
    error = "super::error::MarketplaceError"
)]
fn list_owned<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<ContractState<S>, StateApiType = S>,
) -> ContractResult<Vec<TokenOwnedListItem>> {
    let sender = ctx.sender();

    let list = host
        .state()
        .tokens_owned
        .iter()
        .filter(|f| sender.matches_account(&f.0.owner))
        .filter(|f| {
            match host.state().tokens_listed.get(&TokenInfo {
                address: f.0.address,
                id: f.0.id,
            }) {
                Some(token) => token.token_prices.get(&f.0.owner).is_none(),
                None => true,
            }
        })
        .map(|f| TokenOwnedListItem {
            contract: f.0.address,
            token_id: f.0.id,
            owner: f.0.owner,
            quantity: *f.1,
        })
        .collect();

    Ok(list)
}

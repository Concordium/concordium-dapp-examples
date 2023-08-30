use concordium_cis2::{AdditionalData, Receiver, Transfer};
use concordium_std::{ops::Mul, *};

use crate::{
    carbon_credit_market::{state::*, utils::distribute_amounts},
    client_utils::{client::*, types::*},
};

use super::{contract_types::*, error::*, events::*};

/// Parameters for the `transfer` method for Market Contract.
#[derive(Serial, Deserial, SchemaType)]
pub(crate) struct TransferParams {
    /// Address of the CIS2 Contract. Contract containing token to be transferred.
    pub cis_contract_address: ContractAddress,

    /// Token ID of the token to be transferred.
    pub token_id: ContractTokenId,

    /// Address of the receiver of the token.
    pub to: AccountAddress,

    /// Current owner of the Token.
    pub owner: AccountAddress,

    /// Quantity of the token to be transferred.
    pub quantity: ContractTokenAmount,
}

/// Allows for transferring the token specified by TransferParams.
///
/// This function is the typical buy function of a Marketplace where one
/// account can transfer an Asset by paying a price. The transfer will fail if
/// the Amount paid is < token_quantity * token_price
#[receive(
    contract = "carbon_credit_market",
    name = "transfer",
    parameter = "TransferParams",
    mutable,
    payable,
    error = "MarketplaceError",
    enable_logger
)]
fn transfer<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<ContractState<S>, StateApiType = S>,
    amount: Amount,
    logger: &mut impl HasLogger,
) -> ContractResult<()> {
    let params: TransferParams = ctx.parameter_cursor().get()?;
    let token_info = &TokenInfo {
        id: params.token_id,
        address: params.cis_contract_address,
    };

    let quantity_owned = host.state().get_quantity_owned(token_info, &params.owner)?;

    ensure!(
        quantity_owned.cmp(&params.quantity).is_ge(),
        MarketplaceError::InvalidTokenQuantity
    );

    if ctx.sender() == Address::Account(params.owner) {
        ensure!(
            amount.cmp(&Amount::zero()).is_eq(),
            MarketplaceError::InvalidAmountPaid
        );
    } else {
        let (token_royalty_state, price_per_unit) =
            host.state().get_listed_token(token_info, &params.owner)?;
        let price = price_per_unit.mul(params.quantity.into());
        ensure!(
            amount.cmp(&price).is_ge(),
            MarketplaceError::InvalidAmountPaid
        );

        distribute_amounts(
            host,
            amount,
            &params.owner,
            &token_royalty_state,
            &ctx.owner(),
        )?;
    };

    Client::new(params.cis_contract_address)
        .cis2
        .transfer::<State<S>, ContractTokenId, ContractTokenAmount, ()>(
            host,
            Transfer {
                amount: params.quantity,
                to: Receiver::Account(params.to),
                token_id: params.token_id,
                from: Address::Contract(ctx.self_address()),
                data: AdditionalData::empty(),
            },
        )?;

    logger.log(&ContractEvent::TokenTransferred(TokenTransferredEvent {
        token_id: params.token_id,
        token_contract: params.cis_contract_address,
        from: Address::Account(params.owner),
        to: Address::Account(params.to),
        amount: params.quantity,
    }))?;

    host.state_mut().decrease_listed_quantity(
        &TokenOwnerInfo::from(token_info, &params.owner),
        params.quantity,
    );
    Ok(())
}

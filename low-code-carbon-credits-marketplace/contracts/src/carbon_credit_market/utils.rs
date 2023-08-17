use concordium_std::*;

use super::{contract_types::*, error::*, state::*};

pub struct DistributableAmounts {
    to_primary_owner: Amount,
    to_seller: Amount,
    to_marketplace: Amount,
}

// Distributes Selling Price, Royalty & Commission amounts.
pub fn distribute_amounts<S: HasStateApi>(
    host: &mut impl HasHost<State<S>, StateApiType = S>,
    amount: Amount,
    token_owner: &AccountAddress,
    token_royalty_state: &TokenRoyaltyState,
    marketplace_owner: &AccountAddress,
) -> Result<(), MarketplaceError> {
    let amounts = calculate_amounts(
        &amount,
        &host.state().commission,
        token_royalty_state.royalty,
    );

    if amounts.to_seller.cmp(&Amount::zero()).is_gt() {
        host.invoke_transfer(token_owner, amounts.to_seller)
            .map_err(|_| MarketplaceError::InvokeTransferError)?;
    }

    if amounts.to_marketplace.cmp(&Amount::zero()).is_gt() {
        host.invoke_transfer(marketplace_owner, amounts.to_marketplace)
            .map_err(|_| MarketplaceError::InvokeTransferError)?;
    }

    if amounts.to_primary_owner.cmp(&Amount::zero()).is_gt() {
        host.invoke_transfer(&token_royalty_state.primary_owner, amounts.to_primary_owner)
            .map_err(|_| MarketplaceError::InvokeTransferError)?;
    };

    Ok(())
}

/// Calculates the amounts (Commission, Royalty & Selling Price) to be
/// distributed
pub fn calculate_amounts(
    amount: &Amount,
    commission: &Commission,
    royalty_percentage_basis: u16,
) -> DistributableAmounts {
    let commission_amount =
        (*amount * commission.percentage_basis.into()).quotient_remainder(MAX_BASIS_POINTS.into());

    let royalty_amount =
        (*amount * royalty_percentage_basis.into()).quotient_remainder(MAX_BASIS_POINTS.into());

    DistributableAmounts {
        to_seller: amount
            .subtract_micro_ccd(commission_amount.0.micro_ccd())
            .subtract_micro_ccd(royalty_amount.0.micro_ccd()),
        to_marketplace: commission_amount.0,
        to_primary_owner: royalty_amount.0,
    }
}

#[concordium_cfg_test]
mod test {
    use concordium_std::*;
    use super::*;

    #[concordium_test]
    fn calculate_commissions_test() {
        let commission_percentage_basis: u16 = 250;
        let royalty_percentage_basis: u16 = 1000;
        let init_amount = Amount::from_ccd(11);
        let distributable_amounts = calculate_amounts(
            &init_amount,
            &Commission {
                percentage_basis: commission_percentage_basis,
            },
            royalty_percentage_basis,
        );

        claim_eq!(
            distributable_amounts.to_seller,
            Amount::from_micro_ccd(9625000)
        );
        claim_eq!(
            distributable_amounts.to_marketplace,
            Amount::from_micro_ccd(275000)
        );
        claim_eq!(
            distributable_amounts.to_primary_owner,
            Amount::from_micro_ccd(1100000)
        );
        claim_eq!(
            init_amount,
            Amount::from_ccd(0)
                .add_micro_ccd(distributable_amounts.to_seller.micro_ccd())
                .add_micro_ccd(distributable_amounts.to_marketplace.micro_ccd())
                .add_micro_ccd(distributable_amounts.to_primary_owner.micro_ccd())
        )
    }
}

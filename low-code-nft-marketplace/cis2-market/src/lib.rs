//! Marketplace Contract
//! This module provides implementation of the marketplace contract.
//! Marketplace Contract provides following functions
//! - `list` : returns a list of buyable tokens added to the contract instance.
//! - `add` : adds the token to the list of buyable tokens taking the price of
//!   the token as input.
//! - `transfer` : transfer the authority of the input listed token from one
//!   address to another.
//!
//! This code has not been checked for production readiness. Please use for
//! reference purposes

#![no_std]
extern crate alloc;

mod errors;
mod params;
mod state;

use concordium_cis2::*;
use concordium_std::*;
use errors::MarketplaceError;
use params::{AddParams, InitParams, TokenList};
use state::{Commission, State, TokenInfo, TokenListItem, TokenRoyaltyState};

use crate::{params::TransferParams, state::TokenOwnerInfo};

type ContractResult<A> = Result<A, MarketplaceError>;

const MAX_BASIS_POINTS: u16 = 10000;

/// Type of token Id used by the CIS2 contract.
type ContractTokenId = TokenIdU8;

/// Type of Token Amount used by the CIS2 contract.
type ContractTokenAmount = TokenAmountU64;

/// Type of state.
type ContractState<S> = State<S, ContractTokenId, ContractTokenAmount>;
type Cis2ClientResult<T> = Result<T, concordium_cis2::Cis2ClientError<()>>;

/// Initializes a new Marketplace Contract
///
/// This function can be called by using InitParams.
/// The commission should be less than the maximum allowed value of 10000 basis
/// points
#[init(contract = "Market-NFT", parameter = "InitParams")]
fn init<S: HasStateApi>(
    ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<State<S, ContractTokenId, ContractTokenAmount>> {
    let params: InitParams = ctx
        .parameter_cursor()
        .get()
        .map_err(|_e| MarketplaceError::ParseParams)?;

    ensure!(
        params.commission <= MAX_BASIS_POINTS,
        MarketplaceError::InvalidCommission.into()
    );

    Ok(State::new(state_builder, params.commission))
}

#[receive(
    contract = "Market-NFT",
    name = "add",
    parameter = "AddParams",
    mutable
)]
fn add<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<ContractState<S>, StateApiType = S>,
) -> ContractResult<()> {
    let params: AddParams = ctx
        .parameter_cursor()
        .get()
        .map_err(|_e| MarketplaceError::ParseParams)?;

    let sender_account_address: AccountAddress = match ctx.sender() {
        Address::Account(account_address) => account_address,
        Address::Contract(_) => bail!(MarketplaceError::CalledByAContract),
    };

    let token_info = TokenInfo {
        address: params.cis_contract_address,
        id: params.token_id,
    };

    ensure_supports_cis2(host, &params.cis_contract_address)?;
    ensure_is_operator(host, ctx, &params.cis_contract_address)?;
    ensure_balance(
        host,
        params.token_id,
        &params.cis_contract_address,
        sender_account_address,
        params.quantity,
    )?;

    ensure!(
        host.state().commission.percentage_basis + params.royalty <= MAX_BASIS_POINTS,
        MarketplaceError::InvalidRoyalty
    );
    host.state_mut().list_token(
        &token_info,
        &sender_account_address,
        params.price,
        params.royalty,
        params.quantity,
    );

    Ok(())
}

/// Allows for transferring the token specified by TransferParams.
///
/// This function is the typical buy function of a Marketplace where one
/// account can transfer an Asset by paying a price. The transfer will fail of
/// the Amount paid is < token_quantity * token_price
#[receive(
    contract = "Market-NFT",
    name = "transfer",
    parameter = "TransferParams",
    mutable,
    payable
)]
fn transfer<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<ContractState<S>, StateApiType = S>,
    amount: Amount,
) -> ContractResult<()> {
    let params: TransferParams = ctx
        .parameter_cursor()
        .get()
        .map_err(|_e| MarketplaceError::ParseParams)?;

    let token_info = TokenInfo {
        id: params.token_id,
        address: params.cis_contract_address,
    };

    let listed_token = host
        .state()
        .get_listed(&token_info, &params.owner)
        .ok_or(MarketplaceError::TokenNotListed)?;

    let listed_quantity = listed_token.1.quantity;
    let price_per_unit = listed_token.1.price;
    let token_royalty_state = listed_token.0;

    ensure!(
        listed_quantity.cmp(&params.quantity).is_ge(),
        MarketplaceError::InvalidTokenQuantity
    );

    let price = price_per_unit * params.quantity.0;
    ensure!(
        amount.cmp(&price).is_ge(),
        MarketplaceError::InvalidAmountPaid
    );

    let cis2_client = Cis2Client::new(params.cis_contract_address);
    let res: Cis2ClientResult<SupportResult> = cis2_client.supports_cis2(host);
    let res = match res {
        Ok(res) => res,
        Err(_) => bail!(MarketplaceError::Cis2ClientError),
    };
    // Checks if the CIS2 contract supports the CIS2 interface.
    let cis2_contract_address = match res {
        SupportResult::NoSupport => bail!(MarketplaceError::CollectionNotCis2),
        SupportResult::Support => params.cis_contract_address,
        SupportResult::SupportBy(contracts) => match contracts.first() {
            Some(c) => *c,
            None => bail!(MarketplaceError::CollectionNotCis2),
        },
    };

    let cis2_client = Cis2Client::new(cis2_contract_address);
    let res: Cis2ClientResult<bool> = cis2_client.transfer(
        host,
        Transfer {
            amount: params.quantity,
            from: Address::Account(params.owner),
            to: Receiver::Account(params.to),
            token_id: params.token_id,
            data: AdditionalData::empty(),
        },
    );

    match res {
        Ok(res) => res,
        Err(_) => bail!(MarketplaceError::Cis2ClientError),
    };

    distribute_amounts(
        host,
        amount,
        &params.owner,
        &token_royalty_state,
        &ctx.owner(),
    )?;

    host.state_mut().decrease_listed_quantity(
        &TokenOwnerInfo::from(token_info, &params.owner),
        params.quantity,
    );
    Ok(())
}

/// Returns a list of Added Tokens with Metadata which contains the token price
#[receive(contract = "Market-NFT", name = "list", return_value = "TokenList")]
fn list<S: HasStateApi>(
    _ctx: &impl HasReceiveContext,
    host: &impl HasHost<ContractState<S>, StateApiType = S>,
) -> ContractResult<TokenList> {
    let tokens: Vec<TokenListItem<ContractTokenId, ContractTokenAmount>> = host
        .state()
        .list()
        .iter()
        .filter(|t| t.quantity.cmp(&ContractTokenAmount::from(0)).is_gt())
        .cloned()
        .collect::<Vec<TokenListItem<ContractTokenId, ContractTokenAmount>>>();

    Ok(TokenList(tokens))
}

struct DistributableAmounts {
    to_primary_owner: Amount,
    to_seller: Amount,
    to_marketplace: Amount,
}

/// Calls the [supports](https://proposals.concordium.software/CIS/cis-0.html#supports) function of CIS2 contract.
/// Returns error If the contract does not support the standard.
fn ensure_supports_cis2<S: HasStateApi, T: IsTokenId + Copy, A: IsTokenAmount + Copy>(
    host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
    cis_contract_address: &ContractAddress,
) -> ContractResult<()> {
    let cis2_client = Cis2Client::new(*cis_contract_address);
    let res: Cis2ClientResult<SupportResult> = cis2_client.supports_cis2(host);

    let res = match res {
        Ok(res) => res,
        Err(_) => bail!(MarketplaceError::Cis2ClientError),
    };

    match res {
        SupportResult::NoSupport => bail!(MarketplaceError::CollectionNotCis2),
        SupportResult::SupportBy(_) => Ok(()),
        SupportResult::Support => Ok(()),
    }
}

/// Calls the [operatorOf](https://proposals.concordium.software/CIS/cis-2.html#operatorof) function of CIS contract.
/// Returns error if Current Contract Address is not an Operator of Transaction
/// Sender.
fn ensure_is_operator<S: HasStateApi, T: IsTokenId + Copy, A: IsTokenAmount + Copy>(
    host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
    ctx: &impl HasReceiveContext<()>,
    cis_contract_address: &ContractAddress,
) -> ContractResult<()> {
    let cis2_client = Cis2Client::new(*cis_contract_address);
    let res: Cis2ClientResult<bool> =
        cis2_client.operator_of(host, ctx.sender(), Address::Contract(ctx.self_address()));
    let res = match res {
        Ok(res) => res,
        Err(_) => bail!(MarketplaceError::Cis2ClientError),
    };
    ensure!(res, MarketplaceError::NotOperator);
    Ok(())
}

/// Calls the [balanceOf](https://proposals.concordium.software/CIS/cis-2.html#balanceof) function of the CIS2 contract.
/// Returns error if the returned balance < input balance (balance param).
fn ensure_balance<S: HasStateApi, T: IsTokenId + Copy, A: IsTokenAmount + Ord + Copy>(
    host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
    token_id: T,
    cis_contract_address: &ContractAddress,
    owner: AccountAddress,
    minimum_balance: A,
) -> ContractResult<()> {
    let cis2_client = Cis2Client::new(*cis_contract_address);

    let res: Cis2ClientResult<A> = cis2_client.balance_of(host, token_id, Address::Account(owner));
    let res = match res {
        Ok(res) => res,
        Err(_) => bail!(MarketplaceError::Cis2ClientError),
    };
    ensure!(
        res.cmp(&minimum_balance).is_ge(),
        MarketplaceError::NoBalance
    );

    Ok(())
}

// Distributes Selling Price, Royalty & Commission amounts.
fn distribute_amounts<S: HasStateApi, T: IsTokenId + Copy, A: IsTokenAmount + Copy, E>(
    host: &mut impl HasHost<State<S, T, A>, StateApiType = S, ReturnValueType = E>,
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

    host.invoke_transfer(token_owner, amounts.to_seller)
        .map_err(|_| MarketplaceError::InvokeTransferError)?;

    if amounts
        .to_marketplace
        .cmp(&Amount::from_micro_ccd(0))
        .is_gt()
    {
        host.invoke_transfer(marketplace_owner, amounts.to_marketplace)
            .map_err(|_| MarketplaceError::InvokeTransferError)?;
    }

    if amounts
        .to_primary_owner
        .cmp(&Amount::from_micro_ccd(0))
        .is_gt()
    {
        host.invoke_transfer(&token_royalty_state.primary_owner, amounts.to_primary_owner)
            .map_err(|_| MarketplaceError::InvokeTransferError)?;
    };

    Ok(())
}

/// Calculates the amounts (Commission, Royalty & Selling Price) to be
/// distributed
fn calculate_amounts(
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

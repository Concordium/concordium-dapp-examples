//! Provides error types which can be returned by Marketplace Contract.
//! Read more about errors which can be returned by a Concordium Contract [here](https://developer.concordium.software/en/mainnet/smart-contracts/guides/custom-errors.html)

use concordium_std::*;

#[derive(Serialize, Debug, PartialEq, Eq, Reject)]
pub enum MarketplaceError {
    ParseParams,
    CalledByAContract,
    TokenNotListed,
    Cis2ClientError(Cis2ClientError),
    CollectionNotCis2,
    InvalidAmountPaid,
    InvokeTransferError,
    NoBalance,
    NotOperator,
    InvalidCommission,
    InvalidTokenQuantity,
    InvalidRoyalty,
}

impl From<Cis2ClientError> for MarketplaceError {
    fn from(e: Cis2ClientError) -> Self {
        MarketplaceError::Cis2ClientError(e)
    }
}

#[derive(Serialize, Debug, PartialEq, Eq, Reject)]
pub enum Cis2ClientError {
    InvokeContractError,
    ParseParams,
    ParseResult,
}

impl<T> From<CallContractError<T>> for Cis2ClientError {
    fn from(_: CallContractError<T>) -> Self {
        Cis2ClientError::InvokeContractError
    }
}

impl From<ParseError> for Cis2ClientError {
    fn from(_: ParseError) -> Self {
        Cis2ClientError::ParseParams
    }
}

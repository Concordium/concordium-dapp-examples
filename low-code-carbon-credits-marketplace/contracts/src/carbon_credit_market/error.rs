//! Provides error types which can be returned by Marketplace Contract.
//! Read more about errors which can be returned by a Concordium Contract [here](https://developer.concordium.software/en/mainnet/smart-contracts/guides/custom-errors.html)

use concordium_cis2::Cis2ClientError;
use concordium_std::*;

#[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
pub enum MarketplaceError {
    ParseParams,
    CalledByAContract,
    TokenNotListed,
    Cis2ClientError,
    InvalidAmountPaid,
    InvokeTransferError,
    InvalidCommission,
    InvalidTokenQuantity,
    InvalidRoyalty,
    TokenNotInCustody,
    CalledByAnAccount,
    LogError,
    InvalidVerifierContract,
    TokenNotVerified,
}

impl<T> From<Cis2ClientError<T>> for MarketplaceError {
    fn from(_: Cis2ClientError<T>) -> Self {
        MarketplaceError::Cis2ClientError
    }
}

impl From<ParseError> for MarketplaceError {
    fn from(_: ParseError) -> Self {
        MarketplaceError::ParseParams
    }
}

impl From<LogError> for MarketplaceError {
    fn from(_: LogError) -> Self {
        MarketplaceError::LogError
    }
}

use concordium_cis2::Cis2Error;
use concordium_std::*;

pub type ContractError = Cis2Error<CustomContractError>;

/// The different errors the contract can produce.
#[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
pub enum CustomContractError {
    /// Failed parsing the parameter.
    #[from(ParseError)]
    ParseParams,
    /// Failed logging: Log is full.
    LogFull,
    /// Failed logging: Log is malformed.
    LogMalformed,
    /// Invalid contract name.
    InvalidContractName,
    /// Only a smart contract can call this function.
    ContractOnly,
    /// Failed to invoke a contract.
    InvokeContractError,
    /// Token amount is not equal to 1.
    InvalidAmount,
    /// Token Not Mature
    TokenNotMature,
    /// Token Not Verified
    TokenNotVerified,
    /// Metadata hash is invalid.
    InvalidMetadataHash,
    /// Token is verified Or Mature.
    TokenVerifiedOrMature
}

/// Mapping the logging errors to ContractError.
impl From<LogError> for CustomContractError {
    fn from(le: LogError) -> Self {
        match le {
            LogError::Full => Self::LogFull,
            LogError::Malformed => Self::LogMalformed,
        }
    }
}

/// Mapping errors related to contract invocations to CustomContractError.
impl<T> From<CallContractError<T>> for CustomContractError {
    fn from(_cce: CallContractError<T>) -> Self {
        Self::InvokeContractError
    }
}

/// Mapping CustomContractError to ContractError
impl From<CustomContractError> for ContractError {
    fn from(c: CustomContractError) -> Self {
        Cis2Error::Custom(c)
    }
}

impl From<NewReceiveNameError> for CustomContractError {
    fn from(_: NewReceiveNameError) -> Self {
        Self::InvalidContractName
    }
}

impl From<NewContractNameError> for CustomContractError {
    fn from(_: NewContractNameError) -> Self {
        Self::InvalidContractName
    }
}

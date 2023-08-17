use crate::{
    client_utils::types::{IsVerifiedQueryParams, MaturityOfQueryParams, BurnParams, BurnParam},
    project_token::error::*,
};
use concordium_cis2::*;

pub type ContractTokenId = TokenIdU8;
pub type ContractTokenAmount = TokenAmountU8;
pub type ContractResult<A> = Result<A, ContractError>;
pub type ContractIsVerifiedQueryParams = IsVerifiedQueryParams<ContractTokenId>;
pub type ContractMaturityOfQueryParams = MaturityOfQueryParams<ContractTokenId>;
pub type ContractBurnParams = BurnParams<ContractTokenId, ContractTokenAmount>;
pub type ContractBurnParam = BurnParam<ContractTokenId, ContractTokenAmount>;
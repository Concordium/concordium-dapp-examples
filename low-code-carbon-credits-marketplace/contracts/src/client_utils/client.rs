use concordium_cis2::*;
use concordium_std::*;

use super::types::{
    IsVerifiedQueryParams, IsVerifiedQueryResponse, IsVerifierQueryParams, IsVerifierQueryResponse,
    MaturityOfQueryParams, MaturityOfQueryResponse,
};

pub const MATURITY_OF_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("maturityOf");
pub const IS_VERIFIED_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("isVerified");
pub const IS_VERIFIER_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("isVerifier");

pub type ClientResult<T> = Result<T, Cis2ClientError<Cis2Error<()>>>;

pub struct Client {
    contract_address: ContractAddress,
    pub cis2: Cis2Client,
}

impl Client {
    pub fn new(contract_address: ContractAddress) -> Self {
        Self {
            contract_address,
            cis2: Cis2Client::new(contract_address),
        }
    }
}

impl Client {
    pub fn maturity_of<State, S: HasStateApi, T: IsTokenId>(
        &self,
        host: &impl HasHost<State, StateApiType = S>,
        token_id: T,
    ) -> ClientResult<Timestamp> {
        let params = MaturityOfQueryParams {
            queries: vec![token_id],
        };

        let res = host.invoke_contract_read_only(
            &self.contract_address,
            &params,
            MATURITY_OF_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        );

        let parsed_res = match res {
            Ok(Some(mut res)) => MaturityOfQueryResponse::deserial(&mut res).unwrap(),
            _ => bail!(Cis2ClientError::ParseResult),
        };

        let maturity_time = *parsed_res.first().ok_or(Cis2ClientError::InvalidResponse)?;

        Ok(maturity_time)
    }

    pub fn is_verified<State, S: HasStateApi, T: IsTokenId>(
        &self,
        host: &impl HasHost<State, StateApiType = S>,
        token_id: T,
    ) -> ClientResult<bool> {
        let params = IsVerifiedQueryParams {
            queries: vec![token_id],
        };

        let res = host.invoke_contract_read_only(
            &self.contract_address,
            &params,
            IS_VERIFIED_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        );

        let parsed_res = match res {
            Ok(Some(mut res)) => IsVerifiedQueryResponse::deserial(&mut res).unwrap(),
            _ => bail!(Cis2ClientError::ParseResult),
        };

        let is_verified = *parsed_res.first().ok_or(Cis2ClientError::InvalidResponse)?;

        Ok(is_verified)
    }

    pub fn is_verifier<State, S: HasStateApi>(
        &self,
        host: &impl HasHost<State, StateApiType = S>,
        address: Address,
    ) -> ClientResult<bool> {
        let params = IsVerifierQueryParams {
            queries: vec![address],
        };

        let res = host.invoke_contract_read_only(
            &self.contract_address,
            &params,
            IS_VERIFIER_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        );

        let parsed_res = match res {
            Ok(Some(mut res)) => IsVerifierQueryResponse::deserial(&mut res).unwrap(),
            _ => bail!(Cis2ClientError::ParseResult),
        };

        let is_verifier = *parsed_res.first().ok_or(Cis2ClientError::InvalidResponse)?;

        Ok(is_verifier)
    }
}

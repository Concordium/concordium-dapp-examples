//! CIS2 client is the intermediatory layer between marketplace contract and
//! CIS2 contract.
//!
//! # Description
//! It allows the marketplace contract to abstract away the logic of calling the
//! CIS2 contract for the following methods
//! - `supports_cis2` : Calls [`supports`](https://proposals.concordium.software/CIS/cis-0.html#supports)
//! - `is_operator_of` : Calls [`operatorOf`](https://proposals.concordium.software/CIS/cis-2.html#operatorof)
//! - `get_balance` : Calls [`balanceOf`](https://proposals.concordium.software/CIS/cis-2.html#balanceof)
//! - `transfer` : Calls [`transfer`](https://proposals.concordium.software/CIS/cis-2.html#transfer)

use concordium_cis2::*;
use concordium_std::*;

use crate::{errors::Cis2ClientError, state::State};

pub const CIS2_STANDARD_IDENTIFIER_STR: &str = "CIS-2";
pub const SUPPORTS_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("supports");
pub const OPERATOR_OF_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("operatorOf");
pub const BALANCE_OF_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("balanceOf");
pub const TRANSFER_ENTRYPOINT_NAME: EntrypointName = EntrypointName::new_unchecked("transfer");

pub struct Cis2Client;

impl Cis2Client {
    // calls the `supports` entrypoint of the CIS2 contract to check if the given contract supports CIS2 standard.
    // If the contract supports CIS2 standard, it returns the contract address, else it returns None.
    pub fn supports_cis2<S: HasStateApi, T: IsTokenId, A: IsTokenAmount + Copy>(
        host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
        cis_contract_address: &ContractAddress,
    ) -> Result<Option<ContractAddress>, Cis2ClientError> {
        let params = SupportsQueryParams {
            queries: vec![StandardIdentifierOwned::new_unchecked(
                CIS2_STANDARD_IDENTIFIER_STR.to_string(),
            )],
        };

        let parsed_res = match host.invoke_contract_read_only(
            cis_contract_address,
            &params,
            SUPPORTS_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        )? {
            // Since the contract should return a response. If it doesn't, it is an error.
            None => bail!(Cis2ClientError::InvokeContractError),
            Some(mut res) => SupportsQueryResponse::deserial(&mut res)?,
        };

        let supports_cis2 = parsed_res
            .results
            .first()
            .map(|f| match f {
                SupportResult::NoSupport => Option::None,
                SupportResult::Support => Option::Some(cis_contract_address),
                SupportResult::SupportBy(contracts) => contracts.first(),
            })
            .ok_or(Cis2ClientError::InvokeContractError)?;

        Ok(supports_cis2.copied())
    }

    // calls the `operatorOf` entrypoint of the CIS2 contract to check if the given owner is an operator of the given contract.
    // If the owner is an operator of the given contract, it returns true, else it returns false.
    pub fn is_operator_of<S: HasStateApi, T: IsTokenId, A: IsTokenAmount + Copy>(
        host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
        owner: Address,
        current_contract_address: ContractAddress,
        cis_contract_address: &ContractAddress,
    ) -> Result<bool, Cis2ClientError> {
        let params = &OperatorOfQueryParams {
            queries: vec![OperatorOfQuery {
                owner,
                address: Address::Contract(current_contract_address),
            }],
        };

        let is_operators = match host.invoke_contract_read_only(
            cis_contract_address,
            params,
            OPERATOR_OF_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        )? {
            // Since the contract should return a response. If it doesn't, it is an error.
            None => bail!(Cis2ClientError::InvokeContractError),
            Some(mut res) => OperatorOfQueryResponse::deserial(&mut res)?,
        };

        // If the contract returns a response, but the response is empty, it is an error. Since for a single query the response should be non-empty.
        let is_operator = is_operators
            .0
            .first()
            .ok_or(Cis2ClientError::InvokeContractError)?
            .clone();

        Ok(is_operator)
    }

    // calls the `balanceOf` entrypoint of the CIS2 contract to get the balance of the given owner for the given token.
    // Returns the balance of the owner for the given token.
    pub fn get_balance<S: HasStateApi, T: IsTokenId, A: IsTokenAmount + Copy>(
        host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
        token_id: T,
        cis_contract_address: &ContractAddress,
        owner: Address,
    ) -> Result<A, Cis2ClientError> {
        let params = BalanceOfQueryParams {
            queries: vec![BalanceOfQuery {
                token_id,
                address: owner,
            }],
        };

        let balances: BalanceOfQueryResponse<A> = match host.invoke_contract_read_only(
            cis_contract_address,
            &params,
            BALANCE_OF_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        )? {
            // Since the contract should return a response. If it doesn't, it is an error.
            None => bail!(Cis2ClientError::InvokeContractError),
            Some(mut res) => BalanceOfQueryResponse::<A>::deserial(&mut res)?,
        };

        // If the contract returns a response, but the response is empty, it is an error. Since for a single query the response should be non-empty.
        let balance = balances
            .0
            .first()
            .ok_or(Cis2ClientError::InvokeContractError)?
            .clone();

        Ok(balance)
    }

    // calls the `transfer` entrypoint of the CIS2 contract to transfer the given amount of tokens from the given owner to the given receiver.
    // If the transfer is successful, it returns `Ok(())`, else it returns an `Err`.
    pub fn transfer<S: HasStateApi, T: IsTokenId, A: IsTokenAmount + Copy>(
        host: &mut impl HasHost<State<S, T, A>, StateApiType = S>,
        token_id: T,
        cis_contract_address: ContractAddress,
        amount: A,
        from: AccountAddress,
        to: Receiver,
    ) -> Result<(), Cis2ClientError> {
        let params = TransferParams(vec![Transfer {
            token_id,
            amount,
            from: concordium_std::Address::Account(from),
            data: AdditionalData::empty(),
            to,
        }]);

        host.invoke_contract(
            &cis_contract_address,
            &params,
            TRANSFER_ENTRYPOINT_NAME,
            Amount::from_ccd(0),
        )?;

        Ok(())
    }
}

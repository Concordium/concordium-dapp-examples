/* eslint-disable no-console */
import { createContext } from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import {
    AccountTransactionType,
    CcdAmount,
    ContractAddress,
    ContractName,
    Energy,
    InitName,
    ReceiveName,
    UpdateContractPayload,
    AccountAddress,
} from '@concordium/web-sdk';

export const CONTRACT_NAME = 'PiggyBank';
export const expectedInitName = InitName.fromContractName(ContractName.fromString(CONTRACT_NAME));

/**
 * Action for depositing an amount of microCCD to the piggy bank instance
 */
export const deposit = (account: string, index: bigint, subindex = 0n, amount = 0) => {
    if (!Number.isInteger(amount) || amount <= 0) {
        return;
    }

    detectConcordiumProvider()
        .then((provider) => {
            provider
                .sendTransaction(AccountAddress.fromBase58(account), AccountTransactionType.Update, {
                    amount: CcdAmount.fromMicroCcd(amount),
                    address: ContractAddress.create(index, subindex),
                    receiveName: ReceiveName.fromString(`${CONTRACT_NAME}.insert`),
                    maxContractExecutionEnergy: Energy.create(30000),
                } as UpdateContractPayload)
                .then((txHash) =>
                    console.log(`https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${txHash}`)
                )
                .catch(alert);
        })
        .catch(() => {
            throw new Error('Concordium Wallet API not accessible');
        });
};

/**
 * Action for smashing the piggy bank. This is only possible to do, if the account sending the transaction matches the owner of the piggy bank:
 * https://github.com/Concordium/concordium-rust-smart-contracts/blob/c4d95504a51c15bdbfec503c9e8bf5e93a42e24d/examples/piggy-bank/part1/src/lib.rs#L64
 */
export const smash = (account: string, index: bigint, subindex = 0n) => {
    detectConcordiumProvider()
        .then((provider) => {
            provider
                .sendTransaction(AccountAddress.fromBase58(account), AccountTransactionType.Update, {
                    amount: CcdAmount.fromMicroCcd(0), // This feels weird? Why do I need an amount for a non-payable receive?
                    address: ContractAddress.create(index, subindex),
                    receiveName: ReceiveName.fromString(`${CONTRACT_NAME}.smash`),
                    maxContractExecutionEnergy: Energy.create(30000),
                })
                .then((txHash) =>
                    console.log(`https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${txHash}`)
                )
                .catch(alert);
        })
        .catch(() => {
            throw new Error('Concordium Wallet API not accessible');
        });
};

/**
 * Global application state.
 */
export type State = {
    isConnected: boolean;
    account: string | undefined;
};

export const state = createContext<State>({ isConnected: false, account: undefined });

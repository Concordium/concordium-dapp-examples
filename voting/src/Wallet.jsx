/* eslint-disable react/prop-types */

/* eslint-disable import/no-unresolved */

import React from 'react';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { Alert, Button } from 'react-bootstrap';
import {
    AccountTransactionType,
    CcdAmount,
    ConcordiumGRPCClient,
    ContractAddress,
    ContractName,
    EntrypointName,
    ModuleReference,
    ReceiveName,
    serializeUpdateContractParameters,
    toBuffer,
} from '@concordium/web-sdk';
import moment from 'moment';
import { RAW_SCHEMA_BASE64, TESTNET_GENESIS_BLOCK_HASH } from './config';

export async function init(setConnectedAccount) {
    const client = await detectConcordiumProvider();
    // Listen for relevant events from the wallet.
    client.on('accountChanged', (account) => {
        console.debug('browserwallet event: accountChange', { account });
        setConnectedAccount(account);
    });
    client.on('accountDisconnected', () => {
        console.debug('browserwallet event: accountDisconnected');
        client.getMostRecentlySelectedAccount().then(setConnectedAccount);
    });
    client.on('chainChanged', (chain) => {
        console.debug('browserwallet event: chainChanged', { chain });
    });
    client.getMostRecentlySelectedAccount().then(setConnectedAccount);

    return client;
}

export async function connect(client, setConnectedAccount) {
    const account = await client.connect();
    return setConnectedAccount(account);
}

// Check if the user is connected to the testnet chain by checking if the testnet genesisBlock exists.
// The smart contract voting module is deployed on the testnet chain.
async function checkConnectedToTestnet(client) {
    return client
        .getGrpcClient()
        .getCryptographicParameters(TESTNET_GENESIS_BLOCK_HASH.toString())
        .then((result) => {
            if (result === undefined || result?.value === null) {
                window.alert('Check if your Concordium browser wallet is connected to testnet!');
                return false;
            }
            return true;
        });
}

export async function createElection(
    client,
    contractName,
    description,
    options,
    deadlineMinutesInput,
    moduleRef,
    senderAddress,
) {
    const connectedToTestnet = await checkConnectedToTestnet(client);

    if (connectedToTestnet) {
        const deadlineMinutes = Number.parseInt(deadlineMinutesInput, 10);
        const deadlineTimestamp = moment().add(deadlineMinutes, 'm').format();

        const parameter = {
            description,
            options,
            deadline: deadlineTimestamp,
        };

        const txHash = await client.sendTransaction(
            senderAddress,
            AccountTransactionType.InitContract,
            {
                amount: CcdAmount.fromMicroCcd(BigInt(0)),
                moduleRef: ModuleReference.fromHexString(moduleRef),
                initName: contractName,
                maxContractExecutionEnergy: BigInt(30000),
            },
            parameter,
            RAW_SCHEMA_BASE64,
        );
        console.log({ txHash });
        return txHash;
    }
}

export async function getView(client, contractIndex) {
    return client.getGrpcClient().invokeContract({
        contract: { index: BigInt(contractIndex), subindex: BigInt(0) },
        method: 'voting.view',
    });
}

export async function getVotes(client, contractIndex, options) {
    const promises = [];

    const grpcClient = new ConcordiumGRPCClient(client.grpcTransport);
    for (const option of options) {
        const param = serializeUpdateContractParameters(
            ContractName.fromString('voting'),
            EntrypointName.fromString('getNumberOfVotes'),
            option,
            toBuffer(RAW_SCHEMA_BASE64, 'base64'),
        );

        const promise = grpcClient.invokeContract({
            contract: ContractAddress.create(contractIndex, 0),
            method: ReceiveName.fromString('voting.getNumberOfVotes'),
            parameter: param,
        });

        promises.push(promise);
    }

    return Promise.all(promises);
}

export async function castVote(client, contractIndex, vote, senderAddress) {
    if (!vote) {
        window.alert('Select one option.');
        return;
    }

    const connectedToTestnet = await checkConnectedToTestnet(client);
    if (!connectedToTestnet) {
        return;
    }

    const txHash = await client.sendTransaction(
        senderAddress,
        AccountTransactionType.Update,
        {
            amount: CcdAmount.fromMicroCcd(BigInt(0)),
            address: { index: BigInt(contractIndex), subindex: BigInt(0) },
            receiveName: 'voting.vote',
            maxContractExecutionEnergy: BigInt(30000),
        },
        vote,
        RAW_SCHEMA_BASE64,
    );
    console.log({ txHash });
    return txHash;
}

export default function Wallet(props) {
    const { client, connectedAccount, setConnectedAccount } = props;
    return (
        <>
            {!connectedAccount && (
                <>
                    <p>No wallet connection</p>
                    <Button onClick={() => connect(client, setConnectedAccount).catch(console.error)}>Connect</Button>
                </>
            )}
            {connectedAccount && (
                <Alert variant="success">
                    Connected to account <code>{connectedAccount}</code>.
                </Alert>
            )}
        </>
    );
}

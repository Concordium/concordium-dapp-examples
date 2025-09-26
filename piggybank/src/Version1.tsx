/* eslint-disable no-console */
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ConcordiumGRPCClient, ContractAddress, ReceiveName, ReturnValue, toBuffer } from '@concordium/web-sdk';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { smash, deposit, state, CONTRACT_NAME, expectedInitName } from './utils';

import PiggyIcon from './assets/piggy-bank-solid.svg?react';
import HammerIcon from './assets/hammer-solid.svg?react';

// V1 Module reference on testnet: 12362dd6f12fabd95959cafa27e512805161467b3156c7ccb043318cd2478838
const CONTRACT_INDEX = 81n; // V1 instance

/** If you want to test smashing the piggy bank,
 * it will be necessary to instantiate your own piggy bank using an account available in the browser wallet,
 * and change this constant to match the index of the instance.
 */
/** Should match the subindex of the instance targeted. */
const CONTRACT_SUB_INDEX = 0n;

async function updateState(setSmashed: (x: boolean) => void, setAmount: (x: bigint) => void): Promise<void> {
    const provider = await detectConcordiumProvider();
    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);
    const res = await grpc.invokeContract({
        method: ReceiveName.fromString(`${CONTRACT_NAME}.view`),
        contract: ContractAddress.create(CONTRACT_INDEX, CONTRACT_SUB_INDEX),
    });
    if (!res || res.tag === 'failure' || !res.returnValue) {
        throw new Error(`Expected succesful invocation`);
    }
    const hexVal = ReturnValue.toHexString(res.returnValue);
    setSmashed(!!Number(hexVal.substring(0, 2)));
    setAmount(toBuffer(hexVal, 'hex').readBigUInt64LE(0) as bigint);
}

export default function PiggyBank() {
    const { account, isConnected } = useContext(state);
    const [owner, setOwner] = useState<string>();
    const [smashed, setSmashed] = useState<boolean>();
    const [amount, setAmount] = useState<bigint>(0n);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isConnected) {
            // Get piggy bank owner.
            detectConcordiumProvider()
                .then((provider) => {
                    const grpc = new ConcordiumGRPCClient(provider.grpcTransport);
                    return grpc.getInstanceInfo(ContractAddress.create(CONTRACT_INDEX, CONTRACT_SUB_INDEX));
                })
                .then((info) => {
                    if (expectedInitName.value !== info.name.value) {
                        // Check that we have the expected instance.
                        throw new Error(`Expected instance of PiggyBank: ${info?.name.value}`);
                    }

                    setOwner(info.owner.address);
                });
        }
    }, [isConnected]);

    // The internal state of the piggy bank, which is either intact or smashed.
    useEffect(() => {
        if (isConnected) {
            updateState(setSmashed, setAmount);
        }
    }, [isConnected]);

    // Disable use if we're not connected or if piggy bank has already been smashed.
    const canUse = isConnected && smashed !== undefined && !smashed;

    return (
        <>
            {owner === undefined ? (
                <div>Loading piggy bank...</div>
            ) : (
                <>
                    <h1 className="stored">{Number(amount) / 1000000} CCD</h1>
                    <div>
                        Owned by
                        <br />
                        {owner}
                    </div>
                    <br />
                    <div>State: {smashed ? 'Smashed' : 'Intact'}</div>
                    <button type="button" onClick={() => updateState(setSmashed, setAmount)}>
                        ↻
                    </button>
                </>
            )}
            <br />
            <label>
                <div className="container">
                    <input className="input" type="number" placeholder="Deposit amount" ref={input} />
                    <button
                        className="deposit"
                        type="button"
                        onClick={() =>
                            account &&
                            deposit(account, CONTRACT_INDEX, CONTRACT_SUB_INDEX, input.current?.valueAsNumber)
                        }
                        disabled={account === undefined || !canUse}
                    >
                        <PiggyIcon height="20" />
                    </button>
                </div>
            </label>
            <br />
            <br />
            <button
                className="smash"
                type="button"
                onClick={() => account && smash(account, CONTRACT_INDEX, CONTRACT_SUB_INDEX)}
                disabled={account === undefined || account !== owner || !canUse} // The smash button is only active for the contract owner.
            >
                <HammerIcon width="40" />
            </button>
        </>
    );
}

import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Switch from 'react-switch';

import { WalletConnection } from '@concordium/wallet-connectors';
import { AccountAddress } from '@concordium/web-sdk';

import { TxHashLink } from './CCDScanLinks';
import { updateStateMachine } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { validateAccountAddress } from '../utils';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

const STATE_OPTIONS = [
    { label: 'Produced', value: 'Produced' },
    { label: 'InTransit', value: 'InTransit' },
    { label: 'InStore', value: 'InStore' },
    { label: 'Sold', value: 'Sold' },
];

export function AddTransitionRule(props: Props) {
    const { connection, accountAddress, activeConnectorError } = props;

    interface FormType {
        address: string | undefined;
        fromStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
        toStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
        isUpdateAdd: boolean;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [isUpdateAdd, fromStatus, toStatus, address] = useWatch({
        control: control,
        name: ['isUpdateAdd', 'fromStatus', 'toStatus', 'address'],
        defaultValue: { isUpdateAdd: true },
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (address === undefined) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        if (fromStatus === undefined) {
            setError(`'from_status' input field is undefined`);
            throw Error(`'from_status' input field is undefined`);
        }

        if (toStatus === undefined) {
            setError(`'to_status' input field is undefined`);
            throw Error(`'to_status' input field is undefined`);
        }

        const parameter: TrackAndTraceContract.UpdateStateMachineParameter = {
            address: AccountAddress.fromBase58(address),
            to_status: { type: toStatus },
            from_status: { type: fromStatus },
            update: { type: isUpdateAdd ? 'Add' : 'Remove' },
        };

        // Send transaction
        if (accountAddress && connection) {
            updateStateMachine(connection, AccountAddress.fromBase58(accountAddress), parameter)
                .then((txHash: string) => {
                    setTxHash(txHash);
                })
                .catch((e) => {
                    setError((e as Error).message);
                });
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Change Transition Rule</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="containerSwitch">
                        Add
                        <Controller
                            name="isUpdateAdd"
                            control={control}
                            defaultValue={true}
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    onChange={() => {
                                        onChange(!value);
                                    }}
                                    onColor="#808080"
                                    checked={!value}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            )}
                        />
                        Remove
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>From Status</Form.Label>
                        <Controller
                            name="fromStatus"
                            control={control}
                            defaultValue={'InStore'}
                            render={({ field: { onChange } }) => (
                                <Select
                                    getOptionValue={(option) => option.value}
                                    options={STATE_OPTIONS}
                                    onChange={(e) => {
                                        onChange(e?.value);
                                    }}
                                />
                            )}
                        />
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>To Status</Form.Label>
                        <Controller
                            name="toStatus"
                            control={control}
                            defaultValue={'Sold'}
                            render={({ field: { onChange } }) => (
                                <Select
                                    getOptionValue={(option) => option.value}
                                    options={STATE_OPTIONS}
                                    onChange={(e) => {
                                        onChange(e?.value);
                                    }}
                                />
                            )}
                        />
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            {...register('address', { required: true, validate: validateAccountAddress })}
                            placeholder="4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA"
                        />
                        {formState.errors.address && (
                            <Alert variant="info">Address is required. {formState.errors.address.message}</Alert>
                        )}
                        <Form.Text />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        {isUpdateAdd ? 'Add Transition Rule' : 'Remove Transition Rule'}
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
                {activeConnectorError && (
                    <Alert variant="danger">
                        Connect Error: {activeConnectorError}. Refresh page if you have the browser wallet installed.
                    </Alert>
                )}
                {txHash && (
                    <Alert variant="info">
                        <TxHashLink txHash={txHash} />
                    </Alert>
                )}
            </div>
        </div>
    );
}

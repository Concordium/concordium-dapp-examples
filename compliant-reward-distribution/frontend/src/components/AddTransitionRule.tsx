import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import Switch from 'react-switch';

import { WalletConnection } from '@concordium/wallet-connectors';

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
    const { activeConnectorError } = props;

    interface FormType {
        address: string | undefined;
        fromStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
        toStatus: 'Produced' | 'InTransit' | 'InStore' | 'Sold' | undefined;
        isUpdateAdd: boolean;
    }
    const { control, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [isUpdateAdd, fromStatus, toStatus, address] = useWatch({
        control: control,
        name: ['isUpdateAdd', 'fromStatus', 'toStatus', 'address'],
        defaultValue: { isUpdateAdd: true },
    });

    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (!address) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        if (!fromStatus) {
            setError(`'from_status' input field is undefined`);
            throw Error(`'from_status' input field is undefined`);
        }

        if (!toStatus) {
            setError(`'to_status' input field is undefined`);
            throw Error(`'to_status' input field is undefined`);
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
            </div>
        </div>
    );
}

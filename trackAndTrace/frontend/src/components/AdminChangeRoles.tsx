import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Switch from 'react-switch';

import { WalletConnection } from '@concordium/wallet-connectors';
import { AccountAddress } from '@concordium/web-sdk';

import { TxHashLink } from './CCDScanLinks';
import { addRole, removeRole } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { validateAccountAddress } from '../utils';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

export function AdminChangeRoles(props: Props) {
    const { connection, accountAddress, activeConnectorError } = props;

    interface FormType {
        address: string | undefined;
        addAdmin: boolean;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [addAdmin, address] = useWatch({
        control: control,
        name: ['addAdmin', 'address'],
        defaultValue: { addAdmin: true },
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (address === undefined) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        const parameter: TrackAndTraceContract.RevokeRoleParameter = {
            address: { type: 'Account', content: AccountAddress.fromBase58(address) },
            role: { type: 'Admin' },
        };

        if (accountAddress && connection) {
            // Send transaction
            if (addAdmin) {
                addRole(connection, AccountAddress.fromBase58(accountAddress), parameter)
                    .then((txHash: string) => {
                        setTxHash(txHash);
                    })
                    .catch((e) => {
                        setError((e as Error).message);
                    });
            } else {
                removeRole(connection, AccountAddress.fromBase58(accountAddress), parameter)
                    .then((txHash: string) => {
                        setTxHash(txHash);
                    })
                    .catch((e) => {
                        setError((e as Error).message);
                    });
            }
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Change Admin Role of an Address</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="containerSwitch">
                        Add
                        <Controller
                            name="addAdmin"
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
                        {addAdmin ? 'Add Admin Role' : 'Remove Admin Role'}
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

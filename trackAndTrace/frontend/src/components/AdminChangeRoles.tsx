import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
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
}

const ROLE_OPTIONS = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Producer', value: 'Producer' },
    { label: 'Transporter', value: 'Transporter' },
    { label: 'Seller', value: 'Seller' },
];

export function AdminChangeRoles(props: Props) {
    const { connection, accountAddress } = props;

    type FormType = {
        address: string | undefined;
        role: 'Admin' | 'Producer' | 'Transporter' | 'Seller' | undefined;
        toggle: boolean;
    };
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [toggle, role, address] = useWatch({
        control: control,
        name: ['toggle', 'role', 'address'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (address === undefined) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        if (role === undefined) {
            setError(`'role' input field is undefined`);
            throw Error(`'role' input field is undefined`);
        }

        if (toggle) {
            const parameter: TrackAndTraceContract.GrantRoleParameter = {
                address: { type: 'Account', content: AccountAddress.fromBase58(address) },
                role: { type: role },
            };

            // Send transaction
            if (accountAddress && connection) {
                addRole(connection, AccountAddress.fromBase58(accountAddress), parameter).then((txHash: string) => {
                    setTxHash(txHash);
                });
            } else {
                setError(`Wallet is not connected`);
                throw Error(`Wallet is not connected`);
            }
        } else {
            const parameter: TrackAndTraceContract.RevokeRoleParameter = {
                address: { type: 'Account', content: AccountAddress.fromBase58(address) },
                role: { type: role },
            };

            // Send transaction
            if (accountAddress && connection) {
                removeRole(connection, AccountAddress.fromBase58(accountAddress), parameter).then((txHash: string) => {
                    setTxHash(txHash);
                });
            } else {
                setError(`Wallet is not connected`);
                throw Error(`Wallet is not connected`);
            }
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered"> Change The Role Of An Address</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="containerSwitch">
                        Add role
                        <Controller
                            name="toggle"
                            control={control}
                            defaultValue={false}
                            render={({ field: { onChange } }) => (
                                <Switch
                                    onChange={() => {
                                        onChange(!toggle);
                                    }}
                                    onColor="#808080"
                                    checked={!toggle}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            )}
                        />
                        Remove old role
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>Role</Form.Label>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue={'Admin'}
                            render={({ field: { onChange } }) => (
                                <Select
                                    getOptionValue={(option) => option.value}
                                    options={ROLE_OPTIONS}
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
                        {toggle ? 'Add New Role' : 'Remove Role'}
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
                {txHash && (
                    <Alert variant="info">
                        <TxHashLink txHash={txHash} />
                    </Alert>
                )}
            </div>
        </div>
    );
}

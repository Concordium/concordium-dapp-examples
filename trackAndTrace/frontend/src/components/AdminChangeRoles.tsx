import { addRole, removeRole } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { AccountAddress } from '@concordium/web-sdk';
import * as concordiumHelpers from '@concordium/browser-wallet-api-helpers';
import { useState } from 'react';
import Switch from 'react-switch';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { TxHashLink } from './CCDScanLinks';

interface Props {
    provider: concordiumHelpers.WalletApi | undefined;
    accountAddress: string | undefined;
}

const ROLE_OPTIONS = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Producer', value: 'Producer' },
    { label: 'Transporter', value: 'Transporter' },
    { label: 'Seller', value: 'Seller' },
];

export function AdminChangeRoles(props: Props) {
    const { provider, accountAddress } = props;

    type FormType = {
        address: string | undefined;
        role: 'Admin' | 'Producer' | 'Transporter' | 'Seller' | undefined;
        toggle: boolean;
    };
    const { control, register, formState, handleSubmit, setValue } = useForm<FormType>({ mode: 'all' });

    const [toggle, role, address] = useWatch({
        control: control,
        name: ['toggle', 'role', 'address'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);

    function onSubmit() {
        if (address === undefined) {
            throw Error(`'address' undefined`);
        }

        if (role === undefined) {
            throw Error(`'role' undefined`);
        }

        if (toggle) {
            const parameter: TrackAndTraceContract.GrantRoleParameter = {
                address: { type: 'Account', content: AccountAddress.fromBase58(address) },
                role: { type: role },
            };

            // Send transaction
            if (accountAddress && provider) {
                addRole(provider, AccountAddress.fromBase58(accountAddress), parameter).then((txHash: string) => {
                    setTxHash(txHash);
                });
            }
        } else {
            const parameter: TrackAndTraceContract.RevokeRoleParameter = {
                address: { type: 'Account', content: AccountAddress.fromBase58(address) },
                role: { type: role },
            };

            // Send transaction
            if (accountAddress && provider) {
                removeRole(provider, AccountAddress.fromBase58(accountAddress), parameter).then((txHash: string) => {
                    setTxHash(txHash);
                });
            }
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="containerSwitch">
                        Add role
                        <Controller
                            name="toggle"
                            control={control}
                            defaultValue={false}
                            render={({}) => (
                                <Switch
                                    onChange={() => {
                                        setValue('toggle', !toggle);
                                    }}
                                    onColor="#808080"
                                    checked={!toggle}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            )}
                        />
                        Remove role
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>Role</Form.Label>
                        <Controller
                            name="role"
                            control={control}
                            render={({}) => (
                                <Controller
                                    render={({ field: { onChange } }) => (
                                        <Select
                                            getOptionValue={(option) => option.value}
                                            options={ROLE_OPTIONS}
                                            onChange={(e) => {
                                                onChange(e?.value);
                                            }}
                                        />
                                    )}
                                    name="role"
                                    control={control}
                                    defaultValue={'Admin'}
                                />
                            )}
                        />
                    </Form.Group>

                    <Form.Group className="col mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control {...register('address', { required: true })} />
                        {formState.errors.address && (
                            <Alert key="info" variant="info">
                                {' '}
                                Address is required{' '}
                            </Alert>
                        )}
                        <Form.Text />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        {toggle ? 'Add new role' : 'Remove role'}
                    </Button>
                </Form>

                {txHash && <TxHashLink txHash={txHash} />}
            </div>
        </div>
    );
}

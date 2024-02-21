import { createItem } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { AccountAddress } from '@concordium/web-sdk';
import * as concordiumHelpers from '@concordium/browser-wallet-api-helpers';
import { useState } from 'react';
import Switch from 'react-switch';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

interface Props {
    provider: concordiumHelpers.WalletApi | undefined;
    accountAddress: string | undefined;
}

export function AdminChangeRoles(props: Props) {
    const { provider, accountAddress } = props;

    type FormType = {
        address: string | undefined;
        role: string | undefined;
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

        // const parameter: TrackAndTraceContract.CreateItemParameter = {
        //     type: 'Some',
        //     content: {
        //         url,
        //         hash: { type: 'None' },
        //     },
        // };

        // Send transaction
        if (accountAddress && provider) {
            // const tx = deploy(connection, AccountAddress.fromBase58(account), base64Module);
            // tx.then((txHash) => {
            //     setTxHashDeploy(txHash);
            // }).catch((err: Error) => setTransactionErrorDeploy((err as Error).message));
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
                                    checked={!toggle}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            )}
                        />
                        Remove role
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
                    <Form.Group className="col mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control {...register('role', { required: true })} />
                        {formState.errors.role && (
                            <Alert key="info" variant="info">
                                {' '}
                                Role is required{' '}
                            </Alert>
                        )}
                        <Form.Text />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        {toggle ? 'Add new role' : 'Remove role'}
                    </Button>
                </Form>

                <div>{txHash}</div>
            </div>
        </div>
    );
}

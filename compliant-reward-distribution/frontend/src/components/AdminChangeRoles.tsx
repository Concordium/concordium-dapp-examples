import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import Switch from 'react-switch';

import { WalletConnection } from '@concordium/wallet-connectors';
import { validateAccountAddress } from '../utils';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

export function AdminChangeRoles(props: Props) {
    const { activeConnectorError } = props;

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

    const [error, setError] = useState<string | undefined>(undefined);

    function onSubmit() {
        setError(undefined);

        if (address === undefined) {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
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
            </div>
        </div>
    );
}

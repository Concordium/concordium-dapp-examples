import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';

export function Explorer() {
    type FormType = {
        itemID: bigint | undefined;
    };
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [itemID] = useWatch({
        control: control,
        name: ['itemID'],
    });

    const [info, setInfo] = useState<string | undefined>(undefined);

    function onSubmit() {
        setInfo(undefined);

        if (itemID === undefined) {
            throw Error('itemID undefined');
        }

        // TODO: query backend and display the content.
        setInfo('TODO: get data from database and display it');
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Track The Journey Of Your Products</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Item ID</Form.Label>
                        <Form.Control
                            {...register('itemID', { required: true })}
                            placeholder="Enter the tracking number ID"
                        />
                        {formState.errors.itemID && <Alert variant="info"> Item ID is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Search for Product Journey
                    </Button>
                    {info && <Alert variant="info">{info}</Alert>}
                </Form>
            </div>
        </div>
    );
}

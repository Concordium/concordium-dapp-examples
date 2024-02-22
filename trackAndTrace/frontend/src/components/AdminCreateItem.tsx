import { createItem } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { AccountAddress } from '@concordium/web-sdk';
import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { WalletConnection } from '@concordium/wallet-connectors';
import { useForm, useWatch } from 'react-hook-form';
import { TxHashLink } from './CCDScanLinks';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
}

export function AdminCreateItem(props: Props) {
    const { connection, accountAddress } = props;

    type FormType = {
        url: string | undefined;
    };
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [url] = useWatch({
        control: control,
        name: ['url'],
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);

    function onSubmit() {
        if (url === undefined) {
            throw Error('URL undefined');
        }
        const parameter: TrackAndTraceContract.CreateItemParameter = {
            type: 'Some',
            content: {
                url,
                hash: { type: 'None' },
            },
        };

        // Send transaction
        if (accountAddress && connection) {
            createItem(connection, AccountAddress.fromBase58(accountAddress), parameter).then((txHash) => {
                setTxHash(txHash);
            });
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Url</Form.Label>
                        <Form.Control {...register('url', { required: true })} placeholder="Enter metadata URL" />
                        {formState.errors.url && (
                            <Alert key="info" variant="info">
                                {' '}
                                Url is required{' '}
                            </Alert>
                        )}
                        <Form.Text />
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Add new product
                    </Button>
                </Form>

                {txHash && (
                    <Alert key="info" variant="info">
                        <TxHashLink txHash={txHash} />
                    </Alert>
                )}
            </div>
        </div>
    );
}

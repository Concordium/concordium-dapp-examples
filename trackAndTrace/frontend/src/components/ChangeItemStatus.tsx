import { createItem } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { AccountAddress } from '@concordium/web-sdk';
import { useState } from 'react';
import { WalletConnection } from '@concordium/wallet-connectors';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
}

export function ChangeItemStatus(props: Props) {
    const { connection, accountAddress } = props;

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [url, setUrl] = useState<string>('');

    function addItem() {
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

        if (accountAddress && connection) {
            createItem(connection, AccountAddress.fromBase58(accountAddress), parameter).then((txHash) => {
                setTxHash(txHash);
            });
        }
    }

    return (
        <div className="centered column flex-1">
            <br />
            <br />
            <input
                type="text"
                onChange={(event) => setUrl(event.target.value)}
                value={url}
                placeholder="Enter metadata URL"
            ></input>
            <br />
            <button onClick={addItem}>Add product</button>
            <div>{txHash}</div>
        </div>
    );
}

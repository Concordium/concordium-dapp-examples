import { createItem } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { AccountAddress } from '@concordium/web-sdk';
import * as concordiumHelpers from '@concordium/browser-wallet-api-helpers';
import { useState } from 'react';

interface Props {
    provider: concordiumHelpers.WalletApi | undefined;
    accountAddress: string | undefined;
}

export function Admin(props: Props) {
    const { provider, accountAddress } = props;

    const [txHash, setTxHash] = useState<string | undefined>(undefined);

    function addItem() {
        const parameter: TrackAndTraceContract.CreateItemParameter = {
            type: 'Some',
            content: {
                url: 'https://example.com',
                hash: { type: 'None' },
            },
        };

        if (accountAddress && provider) {
            createItem(provider, AccountAddress.fromBase58(accountAddress), parameter).then((txHash) => {
                setTxHash(txHash);
            });
        }
    }

    return (
        <div className="centered column flex-1">
            <br />
            <br />
            <input type="text" placeholder="Enter metadata URL"></input>
            <br />
            <button onClick={addItem}>Add product</button>
            <div>{txHash}</div>
        </div>
    );
}

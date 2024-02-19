import * as MyContract from '../../generated/module_track_and_trace';
import * as SDK from '@concordium/web-sdk';

export function Support() {
    return (
        <div className="centered column flex-1">
            <h1>Here is the basic support page</h1>
            <p>
                Hello from the generated contract client:{' '}
                <code>{SDK.ContractName.toString(MyContract.contractName)}</code>.
            </p>
        </div>
    );
}

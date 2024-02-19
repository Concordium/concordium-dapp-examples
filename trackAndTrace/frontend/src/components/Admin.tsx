import * as MyContract from '../../generated/module_track_and_trace';
import * as SDK from '@concordium/web-sdk';

export function Admin() {
    return (
        <div className="container">
            <div className="centered column flex-1">
                <br />
                <br />
                <input type="text" placeholder="Enter metadata URL"></input>
                <br />
                <button>Add product</button>
            </div>
        </div>
    );
}

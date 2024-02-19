import * as MyContract from '../../generated/module_track_and_trace';
import * as SDK from '@concordium/web-sdk';

export function Admin({ provider }: any) {
    function click() {
        console.log('hi');
        console.log(provider);
    }

    return (
        <div className="centered column flex-1">
            <br />
            <br />
            <input type="text" placeholder="Enter metadata URL"></input>
            <br />
            <button onClick={click}>Add product</button>
        </div>
    );
}

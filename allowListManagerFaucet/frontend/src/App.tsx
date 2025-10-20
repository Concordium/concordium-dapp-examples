import { WithWalletConnector, Network, TESTNET } from '@concordium/react-components';
import AllowListDApp from './components/AllowListDApp';

export default function App() {
    let NETWORK: Network;
    NETWORK = TESTNET;

    return (
        <WithWalletConnector network={NETWORK}>
            {(props) => <AllowListDApp {...props} />}
        </WithWalletConnector>
    );
}
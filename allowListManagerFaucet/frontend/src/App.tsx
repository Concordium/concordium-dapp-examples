import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import AllowListDApp from './components/AllowListDApp';

export default function App() {
    return (
        <WithWalletConnector network={TESTNET}>
            {(props) => <AllowListDApp {...props} />}
        </WithWalletConnector>
    );
}
import { WalletConnectionManager } from '@shared/wallet-connection';
import App from './App';
import { Provider, createStore, useAtomValue } from 'jotai';
import { electionConfigAtom } from '@shared/store';

const store = createStore();

/**
 * Component which ensures selected parts of global state stays in memory for the lifetime of the application
 */
function EnsureGlobalState() {
    useAtomValue(electionConfigAtom);
    return null;
}

/**
 * The application root. This is in charge of setting up global contexts to be available from {@linkcode App} and
 * below (in the component tree).
 */
function Root() {
    return (
        <Provider store={store}>
            <WalletConnectionManager>
                <EnsureGlobalState />
                <App />
            </WalletConnectionManager>
        </Provider>
    );
}

export default Root;

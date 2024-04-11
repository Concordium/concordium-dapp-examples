import { TESTNET, WithWalletConnector } from '@concordium/react-components';
import BeerStore from './components/BeerStore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BROWSER_WALLET, WALLET_CONNECT } from './config';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <WithWalletConnector network={TESTNET}>
                    {(props) => {
                        return <BeerStore {...{ connectorType: BROWSER_WALLET, ...props }} />;
                    }}
                </WithWalletConnector>
            ),
            errorElement: <div>Error</div>,
        },
        {
            path: 'mobile',
            element: (
                <WithWalletConnector network={TESTNET}>
                    {(props) => {
                        return <BeerStore {...{ connectorType: WALLET_CONNECT, ...props }} />;
                    }}
                </WithWalletConnector>
            ),
            errorElement: <div>Error</div>,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;

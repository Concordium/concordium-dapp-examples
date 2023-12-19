import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { WithWalletConnector, TESTNET } from '@concordium/react-components';
import './scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WithWalletConnector network={TESTNET}>{(props) => <App {...props} />}</WithWalletConnector>
    </React.StrictMode>,
);

// import SponsoredTransactions from './SponsoredTransactions';

// export default function Root() {
//     return (
//         <div>
//             <main>
//             <WithWalletConnector network={TESTNET}>
//                     {(props) => <SponsoredTransactions {...props} />}
//                 </WithWalletConnector>
//             </main>
//         </div>
//     );
// }

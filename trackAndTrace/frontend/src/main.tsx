import React from 'react';
import ReactDOM from 'react-dom/client';

import { WithWalletConnector } from '@concordium/react-components';

import './index.css';
import * as constants from './constants';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WithWalletConnector network={constants.NETWORK}>{(props) => <App {...props} />}</WithWalletConnector>
    </React.StrictMode>,
);

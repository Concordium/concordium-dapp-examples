// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.scss';
import { App } from './App';
import { WalletProviderWrapper } from './context/WalletContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WalletProviderWrapper>
            <App />
        </WalletProviderWrapper>
    </React.StrictMode>
);

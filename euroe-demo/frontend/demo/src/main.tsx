import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './shell/Root.tsx';
import './scss/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Root />
    </StrictMode>,
);

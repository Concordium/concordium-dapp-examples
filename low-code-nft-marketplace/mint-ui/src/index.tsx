import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const customTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#181817',
            contrastText: '#FBFBF9',
        },
    },
});

root.render(
    <HashRouter>
        <ThemeProvider theme={customTheme}>
            <App />
        </ThemeProvider>
    </HashRouter>,
);

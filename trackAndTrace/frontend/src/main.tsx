import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Admin } from './components/Admin';
import { About } from './components/About';
import { Explorer } from './components/Explorer';
import { Support } from './components/Support';
import './styles.scss';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/support" element={<Support />} />
                <Route path="/" element={<div>Home Page</div>} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

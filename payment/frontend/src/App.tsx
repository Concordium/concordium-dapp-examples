import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles.scss';

export const App = () => {
    return (
        <Router>
            <div className="navbar">
                <div>Payment</div>
            </div>

            <Routes>
                <Route path="/" element={<div>HOME</div>} />
            </Routes>
        </Router>
    );
};

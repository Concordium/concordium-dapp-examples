/* eslint-disable */
import './styles/App.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/variables.css';
import './styles/App.css';
import './styles/Header.css';
import './styles/HomePage.css';
import CreateElectionPage from './CreateElectionPage';
import VotePage from './VotePage';
import HomePage from './HomePage';
import Results from './Results';
import Header from './Header';

function App() {
    return (
        <div className="app-background">
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreateElectionPage />} />
                    <Route path="/vote/:electionId" element={<VotePage />} />
                    <Route path="/results/:electionId" element={<Results />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

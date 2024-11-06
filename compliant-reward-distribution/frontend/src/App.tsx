import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import { Admin } from './components/Admin/Admin';
import Home from './components/Home';
import ConnectWallet from './components/connect-wallet/ConnectWallet';
import TweetPost from './components/tweet-post/TweetPost';
import Proof from './components/proof/Proof';
import Submission from './components/submission/Submission';

export const App = () => {
    useEffect(() => {
        const timer = setTimeout(() => {}, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/connectWallet" element={<ConnectWallet />} />
                <Route path="/tweetPost" element={<TweetPost />} />
                <Route path="/proof" element={<Proof />} />
                {/* Final user page. This page will be shown to the user after completing the submissions. */}
                <Route path="/submission" element={<Submission />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

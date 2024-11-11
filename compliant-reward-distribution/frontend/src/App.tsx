import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.scss';
import { Admin } from './components/Admin/Admin';
import Home from './components/Home';
import ConnectWallet from './components/connect-wallet/ConnectWallet';
import TweetPost from './components/tweet-post/TweetPost';
import Proof from './components/proof/Proof';
import FinalPage from './components/finalPage/finalPage';
import TermsAndConditions from './components/termsAndConditions/TermsAndConditions';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/termsAndConditions" element={<TermsAndConditions />} />
                <Route path="/connectWallet" element={<ConnectWallet />} />
                <Route path="/tweetPost" element={<TweetPost />} />
                <Route path="/proof" element={<Proof />} />
                <Route path="/finalPage" element={<FinalPage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

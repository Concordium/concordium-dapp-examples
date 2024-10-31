import React, { useRef, useState, version } from 'react';

import BackButton from '../elements/BackButton';
import profileImage from "/images/Ellipse 1.svg";
import verifyImage from "/images/Verified.svg";
import '../../styles/ConnectWallet.scss';
import '../../styles/ProgressStep.scss';
import '../../styles/TweetPost.scss';
import '../../styles.scss';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { Container, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { getRecentBlock, requestSignature, validateTweetUrl } from '../../utils';
import { Copy } from "lucide-react";
import { useWallet } from '../../context/WalletContext';
import { submitTweet } from '../../apiReqeuests';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { SCHEMA_TWEET_MESSAGE } from '../../constants';
interface ProgressStepProps {
    number: number;
    active: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({ number, active }) => (
    <div className="progress-step d-flex align-items-center">
        <div
            className={`step-circle d-flex align-items-center justify-content-center ${active ? 'active' : 'inactive'
                }`}
        >
            {number}
        </div>
        {number < 3 && (
            <div
                className={`step-line ${active ? 'active' : 'inactive'
                    }`}
            />
        )}
    </div>
);

const TweetPost = () => {
    const navigate = useNavigate();
    const { provider, connectedAccount } = useWallet();
    const [error, setError] = useState<string | undefined>(undefined);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean | undefined>(undefined);
    const grpcClient = useRef(new ConcordiumGRPCClient(new GrpcWebFetchTransport({ baseUrl: CONFIG.node }))).current;
    const capitalizedNetwork = CONFIG.network[0].toUpperCase() + CONFIG.network.substring(1);

    interface FormType {
        tweet: string;
    }
    const { control, register, formState: { errors }, handleSubmit } = useForm<FormType>({ mode: 'all' });
    const [tweet] = useWatch({ control, name: ['tweet'] });

    async function onSubmit() {
        console.log("connectedAccount", connectedAccount)
        console.log("tweet", tweet)
        setError(undefined);
        setSuccessfulSubmission(undefined);

        if (!connectedAccount) {
            setError("Wallet missing, connect any wallet!")
            return
        }
        if (!tweet) {
            setError("Tweet link is required!")
            return
        }


        try {
            if (!connectedAccount) {
                throw new Error(`'connectedAccount' is undefined. Connect your wallet and ensure you have an account.`);
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);

            const signature = await requestSignature(recentBlockHash, SCHEMA_TWEET_MESSAGE, tweet, connectedAccount, provider);

            await submitTweet(connectedAccount, signature, recentBlockHeight, tweet);
            setSuccessfulSubmission(true);
            // navigate('/proof')
        } catch (error) {
            console.log("error", error)
            setError((error as Error).message);
        }
        navigate('/proof')
    }
    return (
        <Container fluid className="d-flex flex-column min-vh-100 text-light bg-dark" style={{ position: 'relative' }}>
            <div className="d-flex align-items-center">
                <BackButton redirectURL={'/connectWallet'} />
                <Button onClick={async (e) => {
                    const account: any = connectedAccount
                    await navigator.clipboard.writeText(account);
                    if (CONFIG.network === "testnet") {
                        window.open(`https://testnet.ccdscan.io/?dcount=1&dentity=account&daddress=${connectedAccount}`, "_blank")
                    } else {
                        window.open(`https://ccdscan.io/?dcount=1&dentity=account&daddress=${connectedAccount}`, "_blank")
                    }
                }} variant="primary" className="ms-auto mt-2 account-button text-black bg-theme">
                    {connectedAccount
                        ? connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)
                        : 'No Account Connected'}
                </Button>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution`}
                >
                    Version {version} ({capitalizedNetwork})
                </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`#`}
                >
                    {connectedAccount
                        ? connectedAccount.slice(0, 5) + '...' + connectedAccount.slice(-5)
                        : 'No Account Connected'}
                </a>
            </div>
            <div className="d-flex justify-content-center mb-3">
                <ProgressStep number={1} active={true} />
                <ProgressStep number={2} active={true} />
                <ProgressStep number={3} active={false} />
            </div>
            <Container className="connect-wallet-container text-center pt-2">
                <h1 className="connect-wallet-title">Submit X Post Link</h1>
                <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <Form.Group className="form-group">
                        <div className='input-container'>
                            <Form.Label htmlFor="post-link" className="form-label">
                                Paste link here
                            </Form.Label>
                            <Form.Control
                                {...register('tweet', { required: true, validate: validateTweetUrl })}
                                type="text"
                                id="post-link"
                                placeholder="https://x.com/coingecko/status/181499..."
                                className="form-input"
                            />
                            {/* {errors.tweet && (
                                <p className="error-message">{errors.tweet.message}</p>
                            )} */}
                        </div>

                        <div className="details-container mt-3">
                            <h2>Details</h2>
                            <ul className="details-list">
                                <li>
                                    Your post should contain the{" "}
                                    <span className="hashtag">#ConcordiumNet</span>{" "}
                                    <span className="ml-5">hashtag and mention</span>{" "}
                                    <span className="hashtag">@ConcordiumNet</span>
                                </li>
                                <li>The text can be anything you want</li>
                                <li>Use the template below or write your own</li>
                            </ul>

                            <div className="post-container">
                                <button onClick={async (e) => {
                                    const tweetToCopy = `Just created my @ConcordiumNet account and received 1000 $CCD reward!  Go to concordium.com/wallet to get yours! 
                                    
#Concordium`;
                                await navigator.clipboard.writeText(tweetToCopy);

                                }} className="copy-button">
                                    <Copy size={16} />
                                    <div>Copy</div>
                                </button>
                                <div className="profile">
                                    <img
                                        src={profileImage}
                                        width={40}
                                        height={40}
                                        alt="Profile picture"
                                    />
                                    <div>
                                        <p className="username">
                                            Yourname
                                            <img
                                                src={verifyImage}
                                                width={11}
                                                height={11}
                                                alt="Verified"
                                                className="verified-icon"
                                            />
                                        </p>
                                        <p className="nickname">@yournickname</p>
                                    </div>
                                </div>
                                <p className="content">
                                    Just created my{" "}
                                    <span className="text-[#1DA3F2]">
                                        <a href="https://www.concordium.com/">@ConcordiumNet</a>
                                    </span>{" "}
                                    account and received 1000 $CCD reward! Go to concordium.com/wallet to get yours!
                                </p>
                                <p className="content text-[#1DA3F2]">
                                    <a href="https://www.concordium.com/">#Concordium</a>
                                </p>
                                <p className="timestamp">XX:XX PM · Aug XX, 2024</p>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        {successfulSubmission && <p className="text-green-500 text-center">Submission Successful!</p>}
                        <div className="d-flex justify-content-center mt-3 mb-3"> {/* Flex container to center the button */}
                            <Button
                                type='submit'
                                // onClick={(e) => {
                                //     navigate('/proof')
                                // }}
                                variant="light"
                                className="px-5 py-3 rounded-pill bg-white text-black fw-semibold"
                                style={{ width: "239px", height: "56px" }}
                            >
                                Continue
                            </Button>
                        </div>
                    </Form.Group>
                </Form>

            </Container>
        </Container>
    );
};

export default TweetPost;

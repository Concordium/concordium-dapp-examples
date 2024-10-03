import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getRecentBlock, requestSignature, validateTweetUrl } from '../utils';
import { WalletProvider } from '../wallet-connection';
import { SCHEMA_TWEET_MESSAGE } from '../constants';
import { submitTweet } from '../apiReqeuests';

interface Props {
    signer: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

export function TweetSubmission(props: Props) {
    const { signer, grpcClient, provider } = props;

    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>(undefined);

    interface FormType {
        tweet: string;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });
    const [tweet] = useWatch({
        control: control,
        name: ['tweet'],
    });

    async function onSubmit() {
        setError(undefined);

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet. Have an account in your wallet.`);
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);

            const signature = await requestSignature(recentBlockHash, SCHEMA_TWEET_MESSAGE, tweet, signer, provider);

            await submitTweet(signer, signature, recentBlockHeight, tweet);

            navigate('/zkProofSubmission');
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered white">Submit Tweet</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label className="white">Tweet</Form.Label>

                        <Form.Control
                            {...register('tweet', { required: true, validate: validateTweetUrl })}
                            type="text"
                            placeholder="https://x.com/JohnDoe/status/1818198789817077916"
                        />
                        {formState.errors.tweet && (
                            <Alert variant="info">Tweet is required. {formState.errors.tweet.message}</Alert>
                        )}
                        <Form.Text />
                    </Form.Group>

                    <h3 className="white">Details</h3>

                    <ul className="white">
                        <li>Your post should contain the #Concordium hashtag and mention @ConcordiumNet</li>
                        <li>The text can be anything you want</li>
                        <li>Use the template below or write your own</li>
                    </ul>

                    <br />
                    <div className="centered">
                        <Image src="/assets/Tweet.png" alt="Tweet Example" fluid />
                    </div>
                    <br />
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { ConcordiumGRPCClient } from '@concordium/web-sdk';

import { getRecentBlock, requestSignature } from '../utils';
import { WalletProvider } from '../wallet-connection';
import { SCHEMA_TWEET_MESSAGE } from '../constants';
import { submitTweet } from '../apiReqeuests';

interface Props {
    signer: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

const checkTweetUrlFormat = (url: string) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^https:\/\/(x\.com|twitter\.com)\/[^\/]+\/status\/(\d+)$/;
    if (!url.match(regex)) {
        throw Error(
            `Not a valid tweet URL (expected format: https://x.com/MaxMustermann/status/1818198789817077916 or https://twitter.com/JohnDoe/status/1818198789817077916)`,
        );
    }
};

export function TweetSubmission(props: Props) {
    const { signer, grpcClient, provider } = props;

    const [error, setError] = useState<string | undefined>(undefined);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean | undefined>(undefined);

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
        setSuccessfulSubmission(undefined);

        try {
            checkTweetUrlFormat(tweet);

            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet. Have an account in your wallet.`);
            }

            const { blockHash: recentBlockHash, blockHeight: recentBlockHeight } = await getRecentBlock(grpcClient);

            const signature = await requestSignature(recentBlockHash, SCHEMA_TWEET_MESSAGE, tweet, signer, provider);

            await submitTweet(signer, signature, recentBlockHeight, tweet);

            setSuccessfulSubmission(true);
        } catch (error) {
            setError((error as Error).message);
        }
    }

    return (
        <div className="centered">
            <div className="card">
                <h2 className="centered">Submit Tweet</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="col mb-3">
                        <Form.Label>Tweet</Form.Label>
                        <Form.Control
                            {...register('tweet', { required: true })}
                            type="text"
                            placeholder="https://x.com/JohnDoe/status/1818198789817077916"
                        />
                        {formState.errors.tweet && <Alert variant="info">Tweet is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <br />
                    <Button
                        variant="info"
                        id="accountAddress"
                        disabled={true}
                        hidden={successfulSubmission === undefined}
                    >
                        Success
                    </Button>
                </Form>
            </div>
        </div>
    );
}

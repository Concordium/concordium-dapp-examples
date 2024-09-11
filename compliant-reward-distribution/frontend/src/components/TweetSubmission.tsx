import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import { getARecentBlockHash, requestSignature, submitTweet } from '../utils';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { WalletProvider } from '../wallet-connection';

interface Props {
    signer: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

const checkTweetdFromUrl = (url: string) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^https:\/\/(x\.com|twitter\.com)\/[^\/]+\/status\/(\d+)$/;
    if (!url.match(regex)) {
        throw Error(`Not a valid tweet URL (expected format: https://x.com/MaxMustermann/status/1818198789817077916)`);
    }
};

export function TweetSubmission(props: Props) {
    const { signer, grpcClient, provider } = props;

    interface FormType {
        tweet: string;
    }
    const { control, register, formState, handleSubmit } = useForm<FormType>({ mode: 'all' });

    const [tweet] = useWatch({
        control: control,
        name: ['tweet'],
    });

    const [error, setError] = useState<string | undefined>(undefined);

    async function onSubmit() {
        setError(undefined);

        try {
            checkTweetdFromUrl(tweet);

            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet.`);
            }

            const [recentBlockHash, recentBlockHeight] = await getARecentBlockHash(grpcClient);
            const schema = 'FAADAAAADgAAAGNvbnRleHRfc3RyaW5nFgIHAAAAbWVzc2FnZRYCCgAAAGJsb2NrX2hhc2gWAg==';

            const signature = await requestSignature(recentBlockHash, schema, tweet, signer, provider);

            await submitTweet(signer, signature, recentBlockHeight, tweet);
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
                        <Form.Control {...register('tweet', { required: true })} type="text" placeholder="12345" />
                        {formState.errors.tweet && <Alert variant="info">Tweet is required </Alert>}
                        <Form.Text />
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>

                {error && <Alert variant="danger">{error}</Alert>}
            </div>
        </div>
    );
}

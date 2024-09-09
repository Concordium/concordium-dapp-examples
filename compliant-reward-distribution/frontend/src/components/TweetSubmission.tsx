import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';

import sha256 from 'sha256';

import { getARecentBlockHash, submitTweet } from '../utils';
import { ConcordiumGRPCClient } from '@concordium/web-sdk';
import { CONTEXT_STRING } from '../constants';
import { WalletProvider } from '../../wallet-connection';

interface Props {
    signer: string | undefined;
    provider: WalletProvider | undefined;
    grpcClient: ConcordiumGRPCClient | undefined;
}

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

        // TODO: verify the tweet syntax and that it contains `Concordium` or `ConcordiumNetwork` in the tweet message.

        try {
            if (!signer) {
                throw Error(`'signer' is undefined. Connect your wallet.`);
            }

            if (!provider) {
                throw Error(`'provider' is undefined`);
            }

            const [recentBlockHash, recentBlockHeight] = await getARecentBlockHash(grpcClient);

            const encoder = new TextEncoder();
            const tweetBytes = encoder.encode(tweet);

            const digest = [recentBlockHash, CONTEXT_STRING, tweetBytes].flatMap((item) => Array.from(item));

            const messageHash = sha256(digest);

            const signatures = (await provider.signMessage(signer, messageHash))
            if (Object.keys(signatures).length !== 1 || Object.keys(signatures[0]).length !== 1) {
                throw Error(`Dapp only supports single singer accounts`);
            }
            const signature = signatures[0][0];

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

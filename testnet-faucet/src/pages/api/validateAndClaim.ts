import { AccountTransactionSignature, signTransaction } from '@concordium/web-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Rettiwt } from 'rettiwt-api';

import { extraKeywordToVerify } from '@/constants';
import checkUsageLimit from '@/lib/checkUsageLimit';
import createAccountTransaction from '@/lib/createAccountTrasantion';
import createGRPCNodeClient from '@/lib/createGPRCClient';
import getSenderAccountSigner from '@/lib/getSenderAccountSigner';

interface IBody {
    hoursLimit: number;
    receiver: string;
    XPostId: string;
}

type Data = {
    transactionHash?: string;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Please use POST.' });
    }

    const senderAddress = process.env.SENDER_ADDRESS;
    if (!senderAddress) {
        throw new Error('SENDER_ADDRESS env vars undefined.');
    }

    const { hoursLimit, XPostId, receiver } = req.body as IBody;

    if (!hoursLimit || !XPostId || !receiver) {
        return res.status(400).json({
            error: 'Missing parameters. Please provide hoursLimit XPostId, and receiver params.',
        });
    }
    try {
        const isAllowed = await checkUsageLimit(hoursLimit, receiver);
        if (!isAllowed) {
            return res.status(401).json({
                error: `You already get tokens in the last ${hoursLimit} ${hoursLimit > 1 ? 'hours' : 'hour'}. Please try again later.`,
            });
        }
        const rettiwt = new Rettiwt();
        const response = await rettiwt.tweet.details(XPostId);

        if (!response) {
            return res.status(500).json({
                error: 'Unable to retrieve tweet details. The X Post ID might be invalid.',
            });
        }

        const tweetText = response.fullText;
        const isValid = tweetText.includes(receiver) && tweetText.includes(extraKeywordToVerify);

        if (!isValid) {
            return res.status(400).json({
                error: 'X Post verification failed. Please make sure you do not modify the template text and that your address is present.',
            });
        }

        const client = createGRPCNodeClient();
        const signer = getSenderAccountSigner();

        const accountTransaction = await createAccountTransaction(client, senderAddress, receiver);
        const signature: AccountTransactionSignature = await signTransaction(accountTransaction, signer);

        const transactionHash = await client.sendAccountTransaction(accountTransaction, signature);
        return res.status(200).json({ transactionHash: transactionHash.toString() });
    } catch (e) {
        return res.status(500).json({ error: `An unexpected error has occurred: ${e}` });
    }
}

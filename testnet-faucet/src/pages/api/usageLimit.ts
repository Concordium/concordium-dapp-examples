import type { NextApiRequest, NextApiResponse } from 'next';

import checkUsageLimit from '@/lib/checkUsageLimit';

interface IBody {
    hoursLimit: number;
    receiver: string;
}

type Data = {
    isAllowed?: boolean;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Please use POST.' });
    }
    const { hoursLimit, receiver } = req.body as IBody;

    if (!hoursLimit || !receiver) {
        return res.status(400).json({
            error: 'Missing parameters. Please provide hoursLimit and receiver params.',
        });
    }
    try {
        const isAllowed = await checkUsageLimit(hoursLimit, receiver)
        return res.status(200).json({ isAllowed });
    } catch (e) {
        return res.status(500).json({ error: `An unexpected error has occurred: ${e}` });
    }
}

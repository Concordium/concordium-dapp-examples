import type { NextApiRequest, NextApiResponse } from 'next';

import getLatestTransactions from '@/lib/getLatestTransactions';

type Data = {
    transactions?: PartialTransaction[];
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed. Please use GET.' });
    }
    try {
        const transactions = await getLatestTransactions(5)
        return res.status(200).json({ transactions });
    } catch (e) {
        return res.status(500).json({ error: `An unexpected error has occurred: ${e}` });
    }
}

import { getUnixTime } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';

import { shiftDateBackwards } from '@/lib/utils';

interface IBody {
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
    const senderAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS;
    const explorerApiUrl = process.env.NEXT_PUBLIC_EXPLORER_API_URL
    const usageLimit = process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS

    if (!senderAddress || !explorerApiUrl || !usageLimit) {
        throw new Error(
            'NEXT_PUBLIC_EXPLORER_API_URL, NEXT_PUBLIC_SENDER_ADDRESS, NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS env vars undefined.',
        );
    }
    const { receiver } = req.body as IBody;

    if (!receiver) {
        return res.status(400).json({
            error: 'Missing parameters. Please provide receiver param.',
        });
    }
    const latestTransactionsPath = `/accTransactions/${receiver}?limit=1000&order=descending&includeRawRejectReason`;
    try {
      const response = await fetch(`${explorerApiUrl}${latestTransactionsPath}`);

      if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }
      let isAllowed = true;
      const limitDate = getUnixTime(shiftDateBackwards(Number(process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS)));
      const transactionResponse: TransactionsResponse = await response.json();

      transactionResponse.transactions.forEach(({ blockTime, origin }) => {
          if (senderAddress == origin.address) {
              if (Number(blockTime) > limitDate) {
                isAllowed = false
              };
          }
      });
        return res.status(200).json({ isAllowed });
    } catch (e) {
        return res.status(500).json({ error: `An unexpected error has occurred: ${e}` });
    }
}

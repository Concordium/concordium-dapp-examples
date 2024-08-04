import { getUnixTime } from 'date-fns';

import { shiftDateBackwards } from './utils';

export default async function isWithinUsageLimit(receiverAddress: string): Promise<Boolean> {
    if (
        !process.env.NEXT_PUBLIC_EXPLORER_API_URL ||
        !process.env.NEXT_PUBLIC_SENDER_ADDRESS ||
        !process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_DAYS
    ) {
        throw new Error(
            'NEXT_PUBLIC_EXPLORER_API_URL, NEXT_PUBLIC_SENDER_ADDRESS, NEXT_PUBLIC_USAGE_LIMIT_IN_DAYS env vars undefined.',
        );
    }
    const senderAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS;
    const latestTransactionsPath = `/accTransactions/${receiverAddress}?limit=1000&order=descending&includeRawRejectReason`;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXPLORER_API_URL}${latestTransactionsPath}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }
        let isWithin = true;
        const limitDate = getUnixTime(shiftDateBackwards(Number(process.env.NEXT_PUBLIC_USAGE_LIMIT_IN_DAYS)));
        const transactionResponse: TransactionsResponse = await response.json();

        transactionResponse.transactions.forEach(({ blockTime, origin }) => {
            if (senderAddress == origin.address) {
                if (Number(blockTime) > limitDate) [(isWithin = false)];
            }
        });
        return isWithin;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

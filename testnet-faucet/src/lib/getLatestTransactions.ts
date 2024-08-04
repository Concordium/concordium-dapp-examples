export default async function getLatestTransactions(): Promise<PartialTransaction[]> {
    if (!process.env.NEXT_PUBLIC_EXPLORER_API_URL || !process.env.NEXT_PUBLIC_SENDER_ADDRESS) {
        throw new Error('NEXT_PUBLIC_EXPLORER_API_URL or NEXT_PUBLIC_SENDER_ADDRESS env vars undefined.');
    }

    const latestTransactionsPath = `/accTransactions/${process.env.NEXT_PUBLIC_SENDER_ADDRESS}?limit=5&order=descending&includeRawRejectReason`;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXPLORER_API_URL}${latestTransactionsPath}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }

        const transactionResponse: TransactionsResponse = await response.json();
        return transactionResponse.transactions.map(({ blockTime, transactionHash }) => ({
            blockTime,
            transactionHash,
        }));
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

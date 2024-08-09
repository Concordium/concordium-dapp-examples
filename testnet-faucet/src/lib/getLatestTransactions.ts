export default async function getLatestTransactions(limit: number): Promise<PartialTransaction[]> {
    const explorerApiUrl = process.env.EXPLORER_API_URL;
    const senderAddress = process.env.SENDER_ADDRESS;
  
    if (!senderAddress || !explorerApiUrl) {
        throw new Error(
            'EXPLORER_API_URL, SENDER_ADDRESS env vars undefined.',
        );
    }
    const latestTransactionsPath = `/accTransactions/${senderAddress}?limit=${limit}&order=descending&includeRawRejectReason`;
  
    const response = await fetch(`${explorerApiUrl}${latestTransactionsPath}`);
  
    if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const transactionResponse: TransactionsResponse = await response.json();
    return transactionResponse.transactions.map(({ blockTime, transactionHash, details }) => ({
        blockTime,
        transactionHash,
        transferDestination: details.transferDestination
    }));
}

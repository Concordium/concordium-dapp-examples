interface TransactionDetails {
  description: string;
  events: string[];
  outcome: string;
  transferAmount: string;
  transferDestination: string;
  transferSource: string;
  type: string;
}

interface TransactionOrigin {
  address: string;
  type: string;
}

interface Transaction {
  blockHash: string;
  blockTime: number;
  details: TransactionDetails;
  energy: number;
  id: number;
  origin: TransactionOrigin;
  total: string;
  transactionHash: string;
}

interface TransactionsResponse {
  count: number;
  limit: number;
  order: string;
  transactions: Transaction[];
}

type PartialTransaction = Pick<Transaction, "blockTime" | "transactionHash">;

type CloudfareWidgetStatus = "solved" | "error" | "expired" | null;

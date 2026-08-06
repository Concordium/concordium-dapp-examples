export interface AirdropTransactionClaim {
	claimDate: Date;
	whitelistUrl: string;
	isOnWhitelist: boolean;
	selectedToken: number;
	amountOfTokens: number;
	hash: string;
	error: number;
	contractIndex: number;
}

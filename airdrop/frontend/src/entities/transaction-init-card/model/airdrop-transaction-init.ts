export interface AirdropTransactionInit {
	initDate: Date;
	metadataUrl: string;
	whitelistUrl: string;
	nftLimit: number;
	reserve: number;
	nftLimitPerAddress: number;
	endTime: Date;
	selectedIndex: boolean;
	hash: string;
	error: number;
	contractIndex: number;
}

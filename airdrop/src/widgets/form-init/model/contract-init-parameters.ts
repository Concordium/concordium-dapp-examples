export interface ContractInitParameters {
	whitelist: string[];
	nft_limit: number;
	nft_limit_per_address: number;
	nft_time_limit: number;
	reserve: number;
	base_url: string;
	metadata: string;
	whitelist_file: string;
	selected_index: boolean;
}

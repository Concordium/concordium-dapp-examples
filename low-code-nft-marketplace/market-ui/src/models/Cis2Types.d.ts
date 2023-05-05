export interface MetadataUrl {
	url: string;
	hash: string;
}
export type TokenInfo = MetadataUrl | [MetadataUrl, string];

export interface Metadata {
	name?: string;
	description?: string;
	display?: {
		url: string;
	};
	unique?: boolean;
	attributes?: Attribute[];
}

export interface Attribute {
	name: string;
	type: string;
	value: string;
}

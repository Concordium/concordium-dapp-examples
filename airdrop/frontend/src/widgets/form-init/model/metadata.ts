interface Attribute {
	type: string;
	name: string;
	value: string;
}

export interface Metadata {
	name: string;
	unique: boolean;
	description: string;
	thumbnail: {
		url: string;
	};
	display: {
		url: string;
	};
	attributes: Attribute[];
}

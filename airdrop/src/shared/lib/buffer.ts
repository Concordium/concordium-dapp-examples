import { toBuffer } from '@concordium/web-sdk';
import { ContractState } from 'shared/model/contract-state.ts';

export function decodeString(buffer: any, offset: number): [string, number] {
	const length = buffer.readUInt32LE(offset);
	offset += 4;
	return [
		buffer.slice(offset, offset + length).toString('utf8'),
		offset + length,
	];
}

export function decodeStrings(buffer: any, offset: number): [string[], number] {
	const length = buffer.readUInt32LE(offset);
	offset += 4;
	const res = [];
	for (let i = 0; i < length; i++) {
		const [str, nextOffset] = decodeString(buffer, offset);
		offset = nextOffset;
		res.push(str);
	}
	return [res, offset];
}

export function decodeView(result: string): ContractState {
	const offset0 = 0;
	const buffer = toBuffer(result, 'hex');
	const [metadataUrl, offsetMetadata] = decodeString(buffer, offset0);
	const [whitelistUrl, offsetWhitelist] = decodeString(
		buffer,
		offsetMetadata,
	);
	const numberOfNFTs = buffer.readUInt32LE(offsetWhitelist);
	return {
		metadataUrl,
		whitelistUrl,
		numberOfNFTs,
	};
}

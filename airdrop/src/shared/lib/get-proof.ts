import { create_hash_tree, get_hash_proof } from 'shared/lib/merkle-tree';
import { SHA256 } from 'crypto-js';
import { contractView } from 'shared/lib/contract-view.ts';
import axios from 'axios';
import { WalletConnection } from '@concordium/react-components';

export async function getProof(
	connection: WalletConnection,
	account: string,
	index: number,
): Promise<string[]> {
	const contractState = await contractView(connection, +index);
	const whitelistRaw = (await axios.get(contractState.whitelistUrl)).data;
	const whitelist = whitelistRaw?.split(',');

	if (!whitelist) {
		throw new Error('no fetched whitelistUrl');
	}

	const tree = create_hash_tree(whitelist);

	let proof: string[] = [];

	if (tree) {
		const hashed = SHA256(account).toString();
		try {
			proof = get_hash_proof(hashed, tree) || [];
		} catch (error) {
			console.error('error proof');
			console.error(error);
		}
	} else {
		console.error('build tree error');
	}

	return proof;
}

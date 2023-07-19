import { describe, expect, it } from 'vitest';
import {
	check_hash_value,
	create_hash_tree,
	get_hash_proof,
} from './merkle-tree/merkle_tree';
import { SHA256 } from 'crypto-js';

const DEFAULT_WHITElIST = [
	'4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QU',
	'3br3Fx9AvGjfqaRedgmPncQrUmSxtBqRtSZnBaWCueHaiEpxKB',
];

describe('merkle tree', () => {
	it('creating tree', () => {
		const address = '4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QU';
		const tree = create_hash_tree(DEFAULT_WHITElIST);
		expect(tree).not.eq(undefined);
		if (tree) {
			const addressHashed = SHA256(address).toString();
			const result = check_hash_value(tree, addressHashed);
			expect(result).eq(true);
		}
	});

	it('hash not exist', () => {
		const address = '4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QA';
		const tree = create_hash_tree(DEFAULT_WHITElIST);
		expect(tree).not.eq(undefined);
		if (tree) {
			const addressHashed = SHA256(address).toString();
			const result = check_hash_value(tree, addressHashed);
			expect(result).eq(false);
		}
	});

	it('create proof', () => {
		const address = '4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QU';
		const tree = create_hash_tree(DEFAULT_WHITElIST);
		expect(tree).not.eq(undefined);
		if (tree) {
			const hashed = SHA256(address).toString();
			const proof = get_hash_proof(hashed, tree);
			expect(proof).not.eq(undefined);
		}
	});

	it('create wrong proof', () => {
		const address = '4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QA';
		const tree = create_hash_tree(DEFAULT_WHITElIST);
		expect(tree).not.eq(undefined);
		if (tree) {
			const hashed = SHA256(address).toString();
			const proof = get_hash_proof(hashed, tree);
			expect(proof).eq(undefined);
		}
	});

	it('own merkle tree', () => {
		const tree: string[] = [];
		console.log(SHA256(DEFAULT_WHITElIST[0]));

		tree.push(
			SHA256(DEFAULT_WHITElIST[0]).toString(),
			SHA256(DEFAULT_WHITElIST[1]).toString(),
		);
		tree.push(SHA256(tree[0] + tree[1]).toString());

		console.log(tree);
	});

	// it('check proof', () => {
	// 	const address = '4n7N78gNEXuVjmdD421H4X6tdjDQ4LdkYswV8paAJzQVsvZ4QU';
	// 	const tree = create_hash_tree(DEFAULT_WHITElIST);
	// 	expect(tree).not.eq(undefined);
	// 	if (tree) {
	// 		const hashed = SHA256(address).toString();
	// 		const proof = get_hash_proof(hashed, tree);
	// 		expect(proof).not.eq(undefined);
	// 		if (proof) {
	// 			const tree = create_hash_tree(DEFAULT_WHITElIST);
	// 			expect(tree).not.eq(undefined);
	// 			if (tree) {
	// 				check_proof(proof, tree);
	// 			}
	// 		}
	// 	}
	// });
});

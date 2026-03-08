/* tslint:disable */

/* eslint-disable */
/**
 * @param {(string)[]} nodes
 * @returns {MerkleTree | undefined}
 */
export function create_hash_tree(nodes: string[]): MerkleTree | undefined;

/**
 * @param {string} test
 * @param {MerkleTree} merkle_tree
 * @returns {(string)[] | undefined}
 */
export function get_hash_proof(
	test: string,
	merkle_tree: MerkleTree,
): string[] | undefined;

/**
 * @param {ClaimNFTParams} test
 * @param {MerkleTree} merkle_tree
 * @returns {boolean}
 */
export function check_proof(
	test: ClaimNFTParams,
	merkle_tree: MerkleTree,
): boolean;

/**
 * @param {MerkleTree} tree
 * @param {string} test_address
 * @returns {boolean}
 */
export function check_hash_value(
	tree: MerkleTree,
	test_address: string,
): boolean;

/**
 */
export class ClaimNFTParams {
	proof: string[];
	node: string;
	selected_token: number;
	free(): void;
}

/**
 */
export class MerkleTree {
	free(): void;
}

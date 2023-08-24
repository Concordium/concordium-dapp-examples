import { CONTRACT_NAME } from '../config';
import { WalletConnection } from '@concordium/react-components';
import { ContractState } from 'shared/model/contract-state.ts';
import { deserializeReceiveReturnValue, toBuffer } from '@concordium/web-sdk';
import { DEFAULT_BASE_64_RAW_SCHEMA } from '../config/smart-contract.ts';

export async function contractView(
	connection: WalletConnection,
	index: number,
): Promise<ContractState> {
	const encodedView = await connection.getJsonRpcClient().invokeContract({
		contract: { index: BigInt(index), subindex: BigInt(0) },
		method: `${CONTRACT_NAME}.view`,
	});

	const contractState = deserializeReceiveReturnValue(
		toBuffer((encodedView as any).returnValue, 'hex'),
		toBuffer(DEFAULT_BASE_64_RAW_SCHEMA, 'base64'),
		CONTRACT_NAME,
		'view',
		2,
	);
	return {
		metadataUrl: contractState.metadata,
		whitelistUrl: contractState.whitelist,
		numberOfNFTs: contractState['number_of_nfts'],
	};
}

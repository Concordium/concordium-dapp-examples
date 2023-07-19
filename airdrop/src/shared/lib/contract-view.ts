import { CONTRACT_NAME } from '../config';
import { WalletConnection } from '@concordium/react-components';
import { decodeView } from 'shared/lib/buffer.ts';
import { ContractState } from 'shared/model/contract-state.ts';

export async function contractView(
	connection: WalletConnection,
	index: number,
): Promise<ContractState> {
	const encodedView = await connection.getJsonRpcClient().invokeContract({
		contract: { index: BigInt(index), subindex: BigInt(0) },
		method: `${CONTRACT_NAME}.view`,
	});

	return decodeView((encodedView as any).returnValue);
}

import { AccountTransactionType, CcdAmount } from '@concordium/web-sdk';
import {
	CONTRACT_NAME,
	LP_RAW_SCHEMA,
	MAX_CONTRACT_EXECUTION_ENERGY,
} from '../config';
import { WalletConnection } from '@concordium/react-components';
import { getProof } from 'shared/lib/get-proof.ts';

export async function contractClaim(
	connection: WalletConnection,
	account: string,
	index: number,
	subindex: number,
	selectedToken: number,
	amountOfTokens: number,
): Promise<string> {
	const proof = await getProof(connection, account, index);

	return connection.signAndSendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: new CcdAmount(BigInt(0)),
			address: {
				index: BigInt(index),
				subindex: BigInt(subindex),
			},
			receiveName: `${CONTRACT_NAME}.claim_nft`,
			maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
		},
		{
			proof: proof,
			node: account,
			node_string: account,
			selected_token: selectedToken.toString().padStart(8, '0'),
			amount_of_tokens: amountOfTokens,
		},
		LP_RAW_SCHEMA,
	);
}

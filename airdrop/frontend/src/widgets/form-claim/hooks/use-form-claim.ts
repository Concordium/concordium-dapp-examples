import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';
import { FormClaimProps } from '../model/form-claim-props.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { contractClaim } from 'shared/lib/contract-claim.ts';
import { useEffect, useState } from 'react';
import { pushLocalStorageClaim } from 'shared/lib/push-local-storage-claim.ts';
import { checkWhitelist } from 'shared/lib/use-check-whitelist.ts';

export function useFormClaim() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormClaimProps>();

	const { connection, account } = useConcordiumApi();
	const { index, subindex } = useParams();
	const [transactionHash, setTransactionHash] = useState<
		string | undefined
	>();
	const [isLoading, setIsLoading] = useState(false);
	const [errorCode, setErrorCode] = useState(0);
	const [data, setData] = useState<FormClaimProps>();

	const onAction: SubmitHandler<FormClaimProps> = async (
		data,
	): Promise<void> => {
		setData(data);
		setErrorCode(0);
		setIsLoading(true);
		setTransactionHash(undefined);

		if (!connection || !account || !index || !subindex) {
			return;
		}
		try {
			const transactionHash = await contractClaim(
				connection,
				account,
				+index,
				+subindex,
				+data['selected NFT'] || 0,
				+data['amount of NFTs'],
			);
			setTransactionHash(transactionHash);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		Promise.resolve(checkTransaction()).catch(console.error);
	}, [connection, transactionHash, isLoading]);

	function checkTransaction() {
		if (
			connection &&
			transactionHash &&
			!errorCode &&
			isLoading &&
			data &&
			index &&
			account
		) {
			const interval = setInterval(async () => {
				const status = await connection
					.getJsonRpcClient()
					.getTransactionStatus(transactionHash);

				console.log('claim', status);

				if (status?.status === 'finalized' && status.outcomes) {
					const outcome = Object.values(status.outcomes)[0];

					setIsLoading(false);
					clearInterval(interval);
					let error = 0;

					if (outcome.result.outcome === 'reject') {
						// @ts-ignore
						const reason = outcome.result.rejectReason.rejectReason;
						setErrorCode(reason);
						error = reason;
					}
					const { whitelistUrl, isOnWhitelist } =
						await checkWhitelist(connection, +index, account);

					pushLocalStorageClaim({
						claimDate: new Date(),
						hash: transactionHash,
						whitelistUrl,
						isOnWhitelist,
						selectedToken: +data['selected NFT'] || 0,
						amountOfTokens: +data['amount of NFTs'],
						error,
						contractIndex: +index,
					});
				}
			}, 1000);
		}
		return null;
	}

	return {
		register,
		errors,
		handleAction: handleSubmit(onAction),
		transactionHash,
		isLoading,
		errorCode,
	};
}

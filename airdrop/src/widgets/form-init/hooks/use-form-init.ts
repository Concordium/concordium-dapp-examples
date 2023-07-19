import { useEffect, useState } from 'react';
import { FormInitProps } from '../model/form-init-props.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';
import { LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX } from 'shared/config/local-storage.ts';
import { contractInit } from 'widgets/form-init/lib/contract-init.ts';
import { useMetadataStore } from 'shared/model/use-metadata-store.ts';
import { useWhitelistStore } from 'shared/model/use-whitelist-store.ts';
import { pushLocalStorageInit } from 'shared/lib/push-local-storage-init.ts';

export function useFormInit() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInitProps>();

	const [isLoading, setIsLoading] = useState(false);
	const { connection, account } = useConcordiumApi();
	const metadata = useMetadataStore((state) => state.metadata);
	const metadataUrl = useMetadataStore((state) => state.metadataUrl);
	const whitelist = useWhitelistStore((state) => state.whitelist);
	const whitelistUrl = useWhitelistStore((state) => state.whitelistUrl);

	const [submittedTxHash, setSubmittedTxHash] = useState<string | undefined>(
		undefined,
	);
	const [createdContractId, setCreatedContractId] = useState<
		bigint | undefined
	>();
	const [data, setData] = useState<FormInitProps>();

	const onAction: SubmitHandler<FormInitProps> = async (
		data,
	): Promise<void> => {
		if (
			!data ||
			metadataUrl === undefined ||
			metadata === undefined ||
			whitelistUrl === undefined ||
			whitelist === undefined ||
			!connection ||
			!account
		) {
			return;
		}
		try {
			setData(data);
			setIsLoading(true);
			setSubmittedTxHash(undefined);
			setCreatedContractId(undefined);
			const transactionHash = await contractInit(connection, account, {
				whitelist: whitelist !== '' ? whitelist.split(',') : [],
				nft_limit: +data['nft limit'],
				nft_limit_per_address: +data['nft limit per address'],
				nft_time_limit: new Date(data['nft time limit']).getTime(),
				reserve: +data['reserve'],
				base_url: metadata.display.url,
				metadata: metadataUrl,
				whitelist_file: whitelistUrl,
				selected_index: Boolean(data['selected index']),
			});

			setSubmittedTxHash(transactionHash);
		} catch (error) {
			setIsLoading(false);
			console.error('transaction', error);
		}
	};

	useEffect(() => {
		Promise.resolve(checkTransaction()).catch(console.error);
	}, [connection, submittedTxHash, createdContractId]);

	function checkTransaction() {
		if (
			!data ||
			metadataUrl === undefined ||
			metadata === undefined ||
			whitelistUrl === undefined ||
			whitelist === undefined ||
			!connection ||
			!account ||
			!submittedTxHash ||
			createdContractId
		) {
			return;
		}
		const interval = setInterval(async () => {
			const status = await connection
				.getJsonRpcClient()
				.getTransactionStatus(submittedTxHash);

			console.log('init', status);

			if (status?.status === 'finalized' && status.outcomes) {
				const outcome = Object.values(status.outcomes)[0];

				clearInterval(interval);
				setIsLoading(false);

				let error = 0;
				let index = 0;

				if (outcome.result.outcome === 'success') {
					const contractIndex =
						// @ts-ignore
						outcome.result.events[0].address.index;
					setCreatedContractId(contractIndex);
					localStorage.setItem(
						LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX,
						String(Number.parseInt(contractIndex)),
					);
					index = Number.parseInt(contractIndex);
				} else {
					error = -1;
					console.error('creation failed');
				}

				pushLocalStorageInit({
					initDate: new Date(),
					metadataUrl: metadataUrl,
					whitelistUrl: whitelistUrl,
					endTime: new Date(data['nft time limit']),
					hash: submittedTxHash,
					nftLimit: +data['nft limit'],
					nftLimitPerAddress: +data['nft limit per address'],
					reserve: +data['reserve'],
					selectedIndex: Boolean(data['selected index']),
					error,
					contractIndex: index,
				});
			}
		}, 1000);
		// TODO: return clear interval + promise race with timer instead of spinner
		return null;
	}

	return {
		register,
		errors,
		handleAction: handleSubmit(onAction),
		transactionHash: submittedTxHash,
		isLoading,
		createdContractId,
	};
}

import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';
import { FormFindProps } from '../model/form-find-props.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/route.ts';
import { LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX } from 'shared/config/local-storage.ts';
import { useState } from 'react';

export function useFormFind() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFindProps>();
	const navigate = useNavigate();

	const { connection, account } = useConcordiumApi();
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const onAction: SubmitHandler<FormFindProps> = async (
		data,
	): Promise<void> => {
		// TODO: make error handler
		setIsLoading(true);
		setErrorMessage('');
		if (!connection || !account) return;
		const address = {
			index: BigInt(+data.index),
			subindex: BigInt(+data.subindex),
		};
		const instanceInfo = await connection
			.getJsonRpcClient()
			.getInstanceInfo(address);

		if (instanceInfo !== undefined) {
			localStorage.setItem(
				LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX,
				address.index.toString(),
			);
			navigate(`${RoutePath.claim}/${address.index}/${address.subindex}`);
		} else {
			setErrorMessage(`<${data.index}, ${data.subindex}> not found`);
		}
		setIsLoading(false);
	};

	return {
		register,
		errors,
		handleAction: handleSubmit(onAction),
		errorMessage,
		isLoading,
	};
}

import { SubmitHandler, useForm } from 'react-hook-form';
import { listenerFabric } from 'widgets/form-init/lib/listner-fabric.ts';
import { useEffect, useState } from 'react';
import { TextAlert } from 'shared/components/text-alert';
import { useWhitelistStore } from 'shared/model/use-whitelist-store.ts';
import { postIpfs } from 'widgets/form-init/lib/post-ipfs.ts';
import { InputFile } from 'shared/components/input-file';

interface FormWhitelistProps {
	whitelist: FileList;
}

export function FormWhitelist() {
	const { register, handleSubmit } = useForm<FormWhitelistProps>();

	// const setWhitelist = useWhitelistStore((store) => store.setWhitelist);
	const [whitelist, setWhitelist] = useState<string | undefined>('');
	const [isLoading, setIsLoading] = useState(false);
	const [fileError, setFileError] = useState<string>();
	const [filename, setFilename] = useState('');
	const setStoreWhitelist = useWhitelistStore((state) => state.setWhitelist);
	const setStoreWhitelistUrl = useWhitelistStore(
		(state) => state.setWhitelistUrl,
	);

	useEffect(() => {
		if (whitelist) {
			setStoreWhitelist(whitelist);
		}
		handleSubmit(onAction)();
	}, [whitelist]);

	const onAction: SubmitHandler<any> = async (data): Promise<void> => {
		setIsLoading(true);
		try {
			setFilename(data.whitelist[0].name);
		} catch (error) {
			setIsLoading(false);
			return;
		}

		try {
			const whitelistReader = new FileReader();
			whitelistReader.onloadend = listenerFabric(setWhitelist);
			whitelistReader.readAsText(data.whitelist[0]);
		} catch (error) {
			setFileError('File loading error');
			setIsLoading(false);
			return;
		}

		try {
			setStoreWhitelistUrl(await postIpfs(data.whitelist[0]));
		} catch (error) {
			console.error(error);
			setFileError('IPFS error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onChange={handleSubmit(onAction)}>
			<div className='flex gap-4 flex-wrap'>
				<InputFile
					innerText={filename}
					isLoading={isLoading}
					isSuccess={!fileError}
					type='file'
					placeholder={`Input whitelist`}
					accept='.txt'
					formReg={register('whitelist')}
				/>
				{fileError && (
					<TextAlert className='self-center'>{fileError}</TextAlert>
				)}
			</div>
		</form>
	);
}

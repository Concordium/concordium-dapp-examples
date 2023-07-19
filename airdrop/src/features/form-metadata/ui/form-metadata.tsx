import { SubmitHandler, useForm } from 'react-hook-form';
import { listenerFabric } from 'widgets/form-init/lib/listner-fabric.ts';
import { useEffect, useState } from 'react';
import { TextAlert } from 'shared/components/text-alert';
import { useMetadataStore } from 'shared/model/use-metadata-store.ts';
import { postIpfs } from 'widgets/form-init/lib/post-ipfs.ts';
import { InputFile } from 'shared/components/input-file';

interface FormMetadataProps {
	metadata: FileList;
}

export function FormMetadata() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormMetadataProps>();

	// const setMetadata = useMetadataStore((store) => store.setMetadata);
	const [metadata, setMetadata] = useState<string | undefined>('');
	const [isLoading, setIsLoading] = useState(false);
	const [filename, setFilename] = useState('');
	const setStoreMetadata = useMetadataStore((state) => state.setMetadata);
	const setMetadataUrl = useMetadataStore((state) => state.setMetadataUrl);
	const setMetadataFile = useMetadataStore((state) => state.setMetadataFile);
	const [fileError, setFileError] = useState<string>();

	useEffect(() => {
		if (metadata) {
			setStoreMetadata(JSON.parse(metadata));
		} else {
			setStoreMetadata(undefined);
		}
		handleSubmit(onAction)();
	}, [metadata]);

	const onAction: SubmitHandler<FormMetadataProps> = async (
		data,
	): Promise<void> => {
		setIsLoading(true);
		try {
			setFilename(data.metadata[0].name);
			const metadataReader = new FileReader();
			metadataReader.onloadend = listenerFabric(setMetadata);
			metadataReader.readAsText(data.metadata[0]);
			setMetadataFile(data.metadata);

			setMetadataUrl(await postIpfs(data.metadata[0]));
		} catch (error) {
			console.error(error);
			setFileError('unknown file error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onChange={handleSubmit(onAction)}>
			<div className='flex gap-4 flex-wrap'>
				<InputFile
					innerText={filename}
					isSuccess={!fileError}
					isInvalid={!!errors.metadata?.type}
					isLoading={isLoading}
					type='file'
					accept='.json'
					formReg={register('metadata', { required: true })}
				/>
				{(errors.metadata?.type === 'required' && (
					<TextAlert className='self-center'>
						Metadata is required
					</TextAlert>
				)) ||
					(fileError && (
						<TextAlert className='self-center'>
							{fileError}
						</TextAlert>
					))}
			</div>
		</form>
	);
}

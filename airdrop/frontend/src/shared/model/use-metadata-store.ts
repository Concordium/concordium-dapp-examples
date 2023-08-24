import { create } from 'zustand';
import { Metadata } from 'widgets/form-init/model/metadata.ts';

interface State {
	metadata: Metadata | undefined;
	metadataUrl: string | undefined;
	metadataFile: FileList | undefined;
}

interface Actions {
	setMetadata: (metadata: Metadata | undefined) => void;
	setMetadataUrl: (metadataUrl: string) => void;
	setMetadataFile: (metadataFile: FileList) => void;
}

type IStore = State & Actions;

export const useMetadataStore = create<IStore>(
	(set): IStore => ({
		metadata: undefined,
		metadataUrl: undefined,
		metadataFile: undefined,

		setMetadata(metadata) {
			set({ metadata });
		},

		setMetadataUrl(metadataUrl) {
			set({ metadataUrl });
		},

		setMetadataFile(metadataFile) {
			set({ metadataFile });
		},
	}),
);

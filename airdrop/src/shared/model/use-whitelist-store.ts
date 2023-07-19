import { create } from 'zustand';
import { IPFS_URL } from 'shared/config/urls.ts';

interface State {
	whitelist: string | undefined;
	whitelistUrl: string | undefined;
}

interface Actions {
	setWhitelist: (whitelist: string) => void;
	setWhitelistUrl: (whitelistUrl: string) => void;
}

type IStore = State & Actions;

export const useWhitelistStore = create<IStore>(
	(set): IStore => ({
		whitelist: '',
		whitelistUrl: `${IPFS_URL}/QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH`,

		setWhitelist(whitelist) {
			set({ whitelist });
		},

		setWhitelistUrl(whitelistUrl) {
			set({ whitelistUrl });
		},
	}),
);

import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';

type ButtonAction = 'connecting...' | 'disconnect' | 'connect';

export function useButtonActionConnection(): ButtonAction {
	const { isConnecting, connection } = useConcordiumApi();

	if (isConnecting) {
		return 'connecting...';
	}
	return connection ? 'disconnect' : 'connect';
}

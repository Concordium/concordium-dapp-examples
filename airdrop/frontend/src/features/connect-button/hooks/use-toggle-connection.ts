import { useConcordiumApi } from 'shared/hooks/use-concordium-api.ts';

export function useToggleConnection() {
	const { connection, activeConnector, setConnection } = useConcordiumApi();

	return () =>
		connection
			? setConnection(undefined)
			: activeConnector
					?.connect()
					.then(setConnection)
					.catch(console.error);
}

import { useToggleConnection } from './use-toggle-connection.ts';
import { useButtonActionConnection } from './use-button-action-connection.ts';

export function useButtonConnect() {
	return {
		toggleConnection: useToggleConnection(),
		actionConnection: useButtonActionConnection(),
	};
}

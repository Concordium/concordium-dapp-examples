import { Dispatch, SetStateAction } from 'react';

export type listenerFabricResult = (event: ProgressEvent<FileReader>) => void;
export function listenerFabric(
	set: Dispatch<SetStateAction<string | undefined>>,
): listenerFabricResult {
	function listener(event: ProgressEvent<FileReader>): void {
		const buffer = event.target?.result;
		if (typeof buffer === 'string' || typeof buffer === 'undefined') {
			set(buffer);
		}
	}

	return listener;
}

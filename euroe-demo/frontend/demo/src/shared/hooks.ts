import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { electionConfigAtom } from './store';

export const enum ElectionOpenState {
    NotStarted,
    Open,
    Concluded,
}

export function useIsElectionOpen(): ElectionOpenState | undefined {
    const electionConfig = useAtomValue(electionConfigAtom);

    const isElectionOpen = useMemo(() => {
        if (electionConfig?.start === undefined || electionConfig.end === undefined) {
            return undefined;
        }
        const now = new Date();
        if (electionConfig.start > now) {
            return ElectionOpenState.NotStarted;
        }
        if (electionConfig.end < now) {
            return ElectionOpenState.Concluded;
        }
        return ElectionOpenState.Open;
    }, [electionConfig]);

    return isElectionOpen;
}

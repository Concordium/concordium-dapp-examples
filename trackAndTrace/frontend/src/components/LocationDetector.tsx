import { LocateFixed } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { Button } from '@/components/ui/button';

export function LocationDetector({ onDetectLocation }: { onDetectLocation: () => void }) {
    return (
        <Tooltip content="Detect my location">
            <Button type="button" onClick={onDetectLocation}>
                <LocateFixed />
            </Button>
        </Tooltip>
    );
}

import { useState } from 'react';
import * as constants from '@/constants';
import { Button } from '@/components/ui/button';
import { LucideCopy, LucideCopyCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TxHashLinkProps {
    txHash: string;
}

/**
 * A component that displays the CCDScan link of a transaction hash with a copy button.
 */
export function TxHashLink({ txHash }: TxHashLinkProps) {
    const [isCopied, setIsCopied] = useState(false);
    const isMobile = useIsMobile()
    const handleCopy = async () => {
        try {
            if (!navigator.clipboard) {
                throw new Error('Clipboard API not supported by your browser.');
            }

            const permission = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
            if (permission.state === 'denied') {
                throw new Error('Clipboard write permission is denied.');
            }

            await navigator.clipboard.writeText(txHash);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    return (
        <div className="flex items-center">
            <a
                target="_blank"
                rel="noreferrer"
                href={`${constants.CCD_EXPLORER_URL}/transaction/${txHash}`}
            >
                {isMobile ? `${txHash.slice(0,5)}...${txHash.slice(-5)}`: txHash}
            </a>
            <Button onClick={handleCopy} variant="ghost" size="icon">
                {isCopied ? <LucideCopyCheck className='text-green-500' /> : <LucideCopy />}
            </Button>
        </div>
    );
};

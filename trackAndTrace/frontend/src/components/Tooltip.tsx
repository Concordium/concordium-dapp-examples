import { Tooltip as TooltipRoot, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
    children: React.ReactNode;
    content: string;
}
export function Tooltip({ children, content }: Props) {
    return (
        <TooltipProvider>
            <TooltipRoot>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </TooltipRoot>
        </TooltipProvider>
    );
}

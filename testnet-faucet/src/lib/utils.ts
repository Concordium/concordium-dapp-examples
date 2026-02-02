import { format, fromUnixTime, getUnixTime } from 'date-fns';

export const extractITweetdFromUrl = (url: string): string | null => {
    const regex = /^https:\/\/(x\.com|twitter\.com)\/[^\/]+\/status\/(\d+)$/;
    const match = url.match(regex);
    if (match) {
        return match[2];
    } else {
        return null;
    }
};

export const formatTimestamp = (timestamp: number): string => format(fromUnixTime(timestamp), 'yyyy-MM-dd HH:mm:ss');

export const shiftDateBackwards = (hours: number) => {
    const shiftedDate = new Date();
    shiftedDate.setHours(shiftedDate.getHours() - hours);
    return shiftedDate;
};

export const formatTxHash = (txHash: string): string => {
    if (!txHash) return '';
    return `${txHash.substring(0, 12)}...${txHash.substring(txHash.length - 12)}`;
};

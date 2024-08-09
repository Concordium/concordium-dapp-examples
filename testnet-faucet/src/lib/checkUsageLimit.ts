import { getUnixTime } from 'date-fns';

import { usageLimit } from '@/constants';

import getLatestTransactions from './getLatestTransactions';
import { shiftDateBackwards } from './utils';

export default async function checkUsageLimit(receiverAddress: string): Promise<boolean> {
    if (!usageLimit) {
        throw new Error('NEXT_PUBLIC_USAGE_LIMIT_IN_HOURS env var undefined.');
    }
    let isAllowed = true;
    const limitDate = getUnixTime(shiftDateBackwards(usageLimit));
    const transactionResponse: PartialTransaction[] = await getLatestTransactions(1000);

    transactionResponse.forEach(({ blockTime, transferDestination }) => {
        if (receiverAddress == transferDestination) {
            if (Number(blockTime) > limitDate) {
                isAllowed = false;
            }
        }
    });
    return isAllowed;
}

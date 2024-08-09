import { getUnixTime } from 'date-fns';

import getLatestTransactions from './getLatestTransactions';
import { shiftDateBackwards } from './utils';

export default async function checkUsageLimit(hoursLimit: number, receiverAddress: string): Promise<boolean> {
    let isAllowed = true;
    const limitDate = getUnixTime(shiftDateBackwards(hoursLimit));
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

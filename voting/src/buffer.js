/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { toBuffer } from '@concordium/web-sdk';
import moment from 'moment';

export function decodeString(buffer, offset) {
    const length = buffer.readUInt32LE(offset);
    offset += 4;
    return [buffer.slice(offset, offset + length).toString('utf8'), offset + length];
}

export function decodeStrings(buffer, offset) {
    const length = buffer.readUInt32LE(offset);
    offset += 4;
    const res = [];
    for (let i = 0; i < length; i++) {
        const [str, nextOffset] = decodeString(buffer, offset);
        offset = nextOffset;
        res.push(str);
    }
    return [res, offset];
}

export function decodeView(result) {
    const offset0 = 0;
    const buffer = toBuffer(result, 'hex');
    const [descriptionText, offset1] = decodeString(buffer, offset0);
    const [opts, offset2] = decodeStrings(buffer, offset1);
    const deadlineTimestamp = buffer.readBigUInt64LE(offset2);
    const deadline = moment.unix(Number(deadlineTimestamp / BigInt(1000)));
    return {
        descriptionText,
        opts,
        deadline,
    };
}

export function decodeVotes(votesResult) {
    const votes = new Array(0);
    votesResult.forEach((element) => {
        const offset0 = 0;
        const buffer = toBuffer(element.returnValue.buffer, 'hex');
        const [voteCount] = [buffer.readUInt32LE(offset0), offset0 + 4];
        votes.push(voteCount);
    });
    return votes;
}

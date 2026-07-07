import { AccountAddress, CborAccountAddress, CborMemo, TokenId } from '@concordium/web-sdk';

import type { Status } from './types';

export const defaultStatus: Status = { type: 'idle', message: '' };

export const parseError = (error: unknown) => (error instanceof Error ? error.message : String(error));

export const requireValue = (value: string, label: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
        throw new Error(`${label} is required`);
    }

    return trimmed;
};

export const requirePositiveAmount = (value: string) => {
    const amount = requireValue(value, 'Amount');
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
        throw new Error('Amount must be a positive decimal value');
    }

    return amount;
};

export const optionalMemo = (memo: string) => {
    const trimmed = memo.trim();
    return trimmed ? CborMemo.fromString(trimmed) : undefined;
};

export const toCborAccount = (account: string) =>
    CborAccountAddress.fromAccountAddress(AccountAddress.fromBase58(requireValue(account, 'Account')));

export const toTokenId = (tokenId: string) => TokenId.fromString(requireValue(tokenId, 'Token ID'));

export const toHexBytes = (hex: string) => {
    const clean = hex.trim().replace(/^0x/i, '');
    if (!clean) {
        return undefined;
    }

    if (!/^[\da-f]+$/i.test(clean) || clean.length !== 64) {
        throw new Error('Metadata checksum must be a 32-byte hex string');
    }

    return Uint8Array.from(clean.match(/.{2}/g)!.map((byte) => Number.parseInt(byte, 16)));
};

export const commaList = (values: string[]) => values.filter(Boolean).join(', ');

export const operationTitle = (operationType: string) =>
    operationType
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

const toDateTimeInputValue = (date: Date) => {
    const pad = (value: number) => value.toString().padStart(2, '0');

    return (
        [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-') +
        `T${pad(date.getHours())}:${pad(date.getMinutes())}`
    );
};

export const getCurrentDateTimeInputValue = () => toDateTimeInputValue(new Date());

export const expiryDateTimeToFutureMinutes = (dateTimeValue: string) => {
    const expiryDateTime = requireValue(dateTimeValue, 'Expiry date and time');
    const expiryTime = new Date(expiryDateTime).getTime();

    if (Number.isNaN(expiryTime)) {
        throw new Error('Expiry date and time must be valid');
    }

    const minutes = Math.ceil((expiryTime - Date.now()) / 60000);
    if (!Number.isFinite(minutes) || minutes <= 0) {
        throw new Error('Expiry date and time must be in the future');
    }

    return minutes;
};

export const formatDateTimePreview = (dateTimeValue: string) => dateTimeValue.replace('T', ' ');

export const shortenValue = (value: string, head = 10, tail = 6) => {
    if (value.length <= head + tail + 3) {
        return value;
    }

    return `${value.slice(0, head)}...${value.slice(-tail)}`;
};

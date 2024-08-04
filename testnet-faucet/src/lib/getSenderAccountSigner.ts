import { buildBasicAccountSigner } from '@concordium/web-sdk';

export const getSenderAccountSigner = () => {
    const { SENDER_PRIVATE_KEY } = process.env;
    if (!SENDER_PRIVATE_KEY) {
        throw new Error('SENDER_PRIVATE_KEY env var undefined');
    }
    return buildBasicAccountSigner(SENDER_PRIVATE_KEY);
};

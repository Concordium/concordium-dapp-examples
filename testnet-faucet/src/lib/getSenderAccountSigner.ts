import { AccountSigner, buildBasicAccountSigner } from '@concordium/web-sdk';

export default function getSenderAccountSigner(): AccountSigner {
    const { SENDER_PRIVATE_KEY } = process.env;
    if (!SENDER_PRIVATE_KEY) {
        throw new Error('SENDER_PRIVATE_KEY env var undefined');
    }
    return buildBasicAccountSigner(SENDER_PRIVATE_KEY);
};

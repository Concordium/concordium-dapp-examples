import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export default async function validateTurnsiteToken(token: string) {
    const { CLOUDFLARE_TURNSTILE_SECRET } = process.env;
    if (!CLOUDFLARE_TURNSTILE_SECRET) {
        throw new Error('CLOUDFLARE_TURNSTILE_SECRET env vars not defined.');
    }
    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(CLOUDFLARE_TURNSTILE_SECRET)}&response=${encodeURIComponent(token)}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    });

    const data = (await res.json()) as TurnstileServerValidationResponse;

    return data.success;
}

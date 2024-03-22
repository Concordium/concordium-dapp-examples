export function microCcdToCcdString(amount: bigint) {
    const int = amount / BigInt(1e6);
    const frac = amount % BigInt(1e6);
    return `${int}.${frac.toString().padStart(6, '0')}`;
}

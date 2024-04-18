/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ed from '@noble/ed25519';
import { Buffer } from 'buffer/';
import { sha512 } from '@noble/hashes/sha512';

ed.etc.sha512Sync = (...m: any[]) => sha512(ed.etc.concatBytes(...m));

export type Hex = string;

const KEY_LOCATION_LS = '__payment-app_secret-key';
const SECRET_KEY = localStorage.getItem(KEY_LOCATION_LS) ?? generateKey();

function generateKey() {
  const k = Buffer.from(ed.utils.randomPrivateKey()).toString('hex');
  localStorage.setItem(KEY_LOCATION_LS, k);
  return k;
}

export const getPublicKey = () => ed.getPublicKey(SECRET_KEY);
export const signMessage = (message: Hex) => ed.sign(message, SECRET_KEY);

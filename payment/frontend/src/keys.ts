import * as ed from '@noble/ed25519';
import { Buffer } from 'buffer/';
import { useEffect, useState } from 'react';

export type Hex = string;

const KEY_LOCATION_LS = '__payment-app_secret-key';
const SECRET_KEY = localStorage.getItem(KEY_LOCATION_LS) ?? generateKey();

function generateKey() {
    const k = Buffer.from(ed.utils.randomPrivateKey()).toString('hex');
    localStorage.setItem(KEY_LOCATION_LS, k);
    return k;
}

export const getPublicKey = () => ed.getPublicKeyAsync(SECRET_KEY);
export const signMessage = (message: Hex) => ed.signAsync(message, SECRET_KEY);

export function usePublicKey() {
  const [publicKey, setPublicKey] = useState<Uint8Array>();
  useEffect(()=> {
    getPublicKey().then((key)=>{
      console.log({publicKey: Buffer(key).toString("hex")})
      setPublicKey(key)
    })
  }, []);
  return publicKey;
}

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
import { credentials } from '@grpc/grpc-js';
import { AccountAddress, verifyMessageSignature } from '@concordium/web-sdk';

const app = express();
app.use(cors());
app.use(express.json());

// Testnet node
const client = new ConcordiumGRPCNodeClient(
    'grpc.testnet.concordium.com',
    20000,
    credentials.createSsl(),
    { timeout: 15000 }
);

// Store pending challenges (would save in a db in production)
const challenges = new Map();

// Generate challenge
app.post('/api/challenge', (req, res) => {
    const { account } = req.body;
    
    try {
        AccountAddress.fromBase58(account);
    } catch {
        return res.status(400).json({ error: 'Invalid account address' });
    }

    const id = crypto.randomBytes(8).toString('hex');
    const challenge = `Prove ownership of ${account}\nNonce: ${crypto.randomBytes(16).toString('hex')}\nTime: ${Date.now()}`;
    
    challenges.set(id, { account, challenge, expires: Date.now() + 300000 });
    
    res.json({ id, challenge });
});

// Verify signature
app.post('/api/verify', async (req, res) => {
    const { id, account, signature } = req.body;
    
    const pending = challenges.get(id);
    if (!pending || pending.account !== account || Date.now() > pending.expires) {
        return res.status(400).json({ error: 'Invalid or expired challenge' });
    }
    
    try {
        const accountInfo = await client.getAccountInfo(AccountAddress.fromBase58(account));
        const valid = verifyMessageSignature(pending.challenge, signature, accountInfo);
        
        challenges.delete(id);
        
        if (valid) {
            res.json({ verified: true, account });
        } else {
            res.status(401).json({ verified: false, error: 'Invalid signature' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001, Testnet');
});

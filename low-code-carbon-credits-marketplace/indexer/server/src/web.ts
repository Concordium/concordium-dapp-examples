import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { default as cors } from 'cors';
import getDb, { getHighestBlockHeight } from './db/db';
import { OAuth2Client } from 'google-auth-library';
import { getUserCurrent } from './auth/authClient';
dotenv.config();

const port = process.env.APP_PORT || '';
const mongodbConnString = process.env.DB_CONN_STRING || '';
const pageSize = parseInt(process.env.PAGE_SIZE || '20');
const googleClientId = process.env.GOOGLE_CLIENT_ID!;
const baseAccountAddress = process.env.BASE_ACCOUNT_ADDRESS!;

(async () => {
    const db = await getDb(mongodbConnString);
    const app: Application = express();
    app.use(cors());
    app.use(express.json());

    app.get('/system/block-height', async (req: Request, res: Response) => {
        const blockHeight = await getHighestBlockHeight(db);
        res.json(blockHeight.toString());
    });

    app.get('/project-nft/contract-events/:txnHash', async (req: Request, res: Response) => {
        const { txnHash } = req.params;
        if (!txnHash) {
            res.json({ error: 'Invalid params' }).status(400);
            return;
        }

        const resDoc = await db.contractEvents.find({
            'transaction.hash': txnHash,
        });

        if (!resDoc || resDoc.length === 0) {
            res.status(404).json({ error: 'Not found' });
            return;
        }

        const events = resDoc.map((r) => r.event);
        res.status(200).json(events);
    });

    app.post('/contract-events', async (req: Request, res: Response) => {
        const reqBody = req.body as {
            index: string;
            subindex: string;
            account?: string;
            eventType?: string;
            page?: number;
        };

        if (!reqBody?.index || !reqBody?.subindex) {
            res.status(400).json({ error: 'Invalid params' });
            return;
        }

        const page = Math.max(reqBody.page || 0, 0);
        const skip = page * pageSize;
        const dbQuery: Record<string, any> = {
            'address.index': reqBody.index,
            'address.subindex': reqBody.subindex,
        };

        if (reqBody.account) {
            dbQuery['sender'] = reqBody.account;
        }

        if (reqBody.eventType) {
            dbQuery[`event.${reqBody.eventType}`] = { $exists: true };
        }

        const count = await db.contractEvents.count(dbQuery);
        const events = await db.contractEvents.find(dbQuery, null, {
            limit: pageSize,
            skip: skip,
            sort: { 'block.blockHeight': -1 },
        });

        const eventsRes = events.map((e) => e.event);
        res.status(200).json({
            pageCount: Math.ceil(count / pageSize),
            events: eventsRes,
        });
    });

    app.post('/project-nft/retirements', async (req: Request, res: Response) => {
        const reqBody = req.body as { index: string; subindex: string; owner?: string; page?: number };
        if (!reqBody?.index || !reqBody?.subindex) {
            res.status(400).json({ error: 'Invalid params' });
            return;
        }

        const page = Math.max(reqBody.page || 0, 0);
        const skip = page * pageSize;

        let events: any[] = [];
        if (reqBody.owner) {
            events = await db.contractEvents.find(
                {
                    'address.index': reqBody.index,
                    'address.subindex': reqBody.subindex,
                    'event.Retire.0.owner.Account.0': reqBody.owner,
                },
                null,
                { limit: pageSize, skip: skip, sort: { 'block.blockHeight': -1 } }
            );
        } else {
            events = await db.contractEvents.find(
                {
                    'address.index': reqBody.index,
                    'address.subindex': reqBody.subindex,
                    'event.Retire.0.owner.Account.0': { $exists: true },
                },
                null,
                { limit: pageSize, skip: skip, sort: { 'block.blockHeight': -1 } }
            );
        }

        const retirements = events.map((e) => e.event);
        res.status(200).json(retirements);
    });

    app.post(`/login`, async (req: Request, res: Response) => {
        const reqBody = req.body as { credential: string };
        if (!reqBody?.credential) {
            res.status(400).json({ error: 'Invalid params' });
            return;
        }

        const authClient = new OAuth2Client();
        const ticket = await authClient.verifyIdToken({
            idToken: reqBody.credential,
            audience: googleClientId,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            res.status(400).json({ error: 'Invalid credential' });
            return;
        }

        const { sub, email, name, picture } = payload;
        if (!email) {
            res.status(400).json({ error: 'Invalid credential: Could not find email' });
            return;
        }

        // This is an Account Alias which is unique for this email address
        const { account } = await getUserCurrent(email, baseAccountAddress);
        const upsertRes = await db.users.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    email: email,
                    name: name,
                    picture: picture,
                    account: account,
                },
            },
            { upsert: true }
        );

        res.status(200).json({
            id: sub,
            email,
            name,
            picture,
            account,
        });
    });

    return app;
})()
    .then((app) => {
        app.listen(port, function () {
            console.log(`App is listening on port ${port} !`);
        });
    })
    .catch((err) => console.error(err));

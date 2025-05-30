/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { NextFunction, Request, Response } from 'express';
import { AppConfig } from './types.js';
import { RpcError, VerifiablePresentation } from '@concordium/web-sdk/types';
import { ConcordiumGRPCNodeClient, credentials } from '@concordium/web-sdk/nodejs';
import { getPublicData } from '@concordium/web-sdk/web3-id';
import { CIS4 } from '@concordium/web-sdk/cis4';
import { verifyPresentation } from '@concordium/web-sdk/wasm';
import bodyParser from 'body-parser';
import cors from 'cors';


/**
 * Error class for returning HTTP error responses with status codes
 */
class HttpError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message);
    }

    /**
     * Attemps to convert any value thrown into an appropriate http error
     */
    static fromThrowable(e: unknown, statusCode: number) {
        let message = 'An error happened while handling the request';
        if (e instanceof Error) {
            message = e.message;
        } else if (typeof e === 'string') {
            message = e;
        }

        const error = new HttpError(statusCode, message);
        if (e instanceof Error) {
            error.stack = e.stack;
        }

        return error;
    }
}

/**
 * Middleware for handling {@linkcode HttpError}s.
 */
function httpErrorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
        console.error(err.stack ?? err.message);
    } else {
        console.error(err);
    }

    if (err instanceof HttpError) {
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
}

/**
 * Utility function for wrapping request handlers with graceful error handling
 */
function catchErrors(fun: (req: Request, res: Response) => Promise<unknown>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await fun(req, res);
        } catch (e) {
            next(e);
        }
    };
}

/**
 * Create a new ConcordiumGRPCNodeClient with the provided endpoint.
 * */
function setupConcordiumClient(endpoint: URL, timeout: number): ConcordiumGRPCNodeClient {
    const addr = endpoint.hostname;
    const port = Number(endpoint.port);
    const creds = /https/.test(endpoint.protocol) ? credentials.createSsl() : credentials.createInsecure();
    return new ConcordiumGRPCNodeClient(addr, port, creds, { timeout: timeout });
}

/**
 * Runs the verification server with the runtime configuration
 */
export function runServer(appConfig: AppConfig) {
    const grpc = setupConcordiumClient(appConfig.endpoint, appConfig.requestTimeout);

    /**
     * Handles the verification of received {@linkcode VerifiablePresentation}s.
     *
     * Sends a response containing the verified request containing the statements of the proof.
     * If verification fails, we return statuscode 400 (BAD_REQUEST).
     */
    async function verify(req: Request, res: Response) {
        const body = (req.body as Buffer).toString('utf8');

        const vp = VerifiablePresentation.fromString(body);

        try {
            // Get the block info from the node.
            const { blockHash, blockSlotTime: blockTime } = await grpc.getBlockInfo();
            const publicData = await getPublicData(grpc, appConfig.network, vp, blockHash);

            // Check that all credentials are currently active
            publicData.forEach((data) => {
                if (data.status !== CIS4.CredentialStatus.Active) {
                    throw new Error('One or more credentials in the presentation are inactive');
                }
            });

            // Get the cryptographic parameters for the chain
            const globalContext = await grpc.getCryptographicParameters(blockHash);
            // Verify the presentation received
            const verifiedRequest = verifyPresentation(
                vp,
                globalContext,
                publicData.map((d) => d.inputs),
            );

            res.send({
                blockHash,
                blockTime,
                ...verifiedRequest,
            });
        } catch (e: unknown) {
            if (e instanceof RpcError) {
                throw HttpError.fromThrowable(e, 500);
            }

            throw HttpError.fromThrowable(e, 400);
        }
    }

    const app = express();
    // Add CORS before other middleware
    app.use(cors({
        origin: ['http://localhost:5173', 'http://localhost:3000'], // AllowListManager Frontend
        methods: ['GET', 'POST'],
        credentials: true
    }));

    app.use(bodyParser.raw({ type: 'application/json' }));

    // Routes
    app.post('/v0/verify', catchErrors(verify));

    // Handle request errors gracefully
    app.use(httpErrorHandler);

    // Start the server
    app.listen(appConfig.listenAddress.port, () => {
        console.log('Configuration:', JSON.stringify(appConfig, null, 2));
        console.log(
            `Server is running on ${appConfig.listenAddress.toString()} (port: ${appConfig.listenAddress.port})`,
        );
    });
}

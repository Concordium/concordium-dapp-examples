import EventEmitter from 'events';
import JSONBigInt from 'json-bigint';
import { Buffer } from 'buffer';

import { SessionTypes } from '@walletconnect/types';
import SignClient from '@walletconnect/sign-client';
import QRCodeModal from '@walletconnect/qrcode-modal';

import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import {
    AccountTransactionSignature,
    BlockHash,
    CredentialStatements,
    HexString,
    serializeTypeValue,
    toBuffer,
    VerifiablePresentation,
} from '@concordium/web-sdk';

import {
    CHAIN_ID,
    CONTEXT_STRING,
    METHOD_GENERATE_ZK_PROOF,
    METHOD_SIGN,
    WALLET_CONNECT_SESSION_NAMESPACE,
    walletConnectOpts,
} from './constants';

export abstract class WalletProvider extends EventEmitter {
    connectedAccount: string | undefined;
    abstract connect(): Promise<string | undefined>;

    abstract requestVerifiablePresentation(
        challenge: HexString,
        statement: CredentialStatements,
    ): Promise<VerifiablePresentation>;

    disconnect?(): Promise<void>;

    abstract signMessage(
        accountAddress: string,
        message: string | string[] | object,
        recentBlockHash: BlockHash.Type,
        schema: string,
    ): Promise<AccountTransactionSignature>;

    /**
     * @param account string when account is changed, undefined when disconnected
     */
    protected onAccountChanged(new_account: string | undefined) {
        this.connectedAccount = new_account;
        this.emit('accountChanged', new_account);
    }
}

interface WalletConnectError {
    code: number;
    message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isWalletConnectError(obj: any): obj is WalletConnectError {
    return 'code' in obj && 'message' in obj;
}

let browserWalletInstance: BrowserWalletProvider | undefined;

export class BrowserWalletProvider extends WalletProvider {
    constructor(private provider: WalletApi) {
        super();

        provider.on('accountChanged', (account) => super.onAccountChanged(account));
        provider.on('accountDisconnected', async () =>
            super.onAccountChanged((await provider.getMostRecentlySelectedAccount()) ?? undefined),
        );
    }
    /**
     * @description gets a singleton instance, allowing existing session to be restored.
     */
    static async getInstance() {
        if (browserWalletInstance === undefined) {
            const provider = await detectConcordiumProvider();
            browserWalletInstance = new BrowserWalletProvider(provider);
        }

        return browserWalletInstance;
    }

    async signMessage(
        accountAddress: string,
        message: string | string[] | object,
        recentBlockHash: BlockHash.Type,
        schema: string,
    ): Promise<AccountTransactionSignature> {
        const payload = Buffer.from(
            serializeTypeValue(
                {
                    block_hash: BlockHash.toHexString(recentBlockHash),
                    context_string: CONTEXT_STRING,
                    message,
                },
                toBuffer(schema, 'base64'),
            ).buffer,
        ).toString('hex');

        const messageToSign = {
            data: payload,
            schema,
        };

        return this.provider.signMessage(accountAddress, messageToSign);
    }

    async connect(): Promise<string | undefined> {
        const new_connected_account = (await this.provider.requestAccounts())[0];
        super.onAccountChanged(new_connected_account ?? undefined);
        return new_connected_account;
    }

    async requestVerifiablePresentation(
        challenge: HexString,
        statement: CredentialStatements,
    ): Promise<VerifiablePresentation> {
        return this.provider.requestVerifiablePresentation(challenge, statement);
    }
}

let walletConnectInstance: WalletConnectProvider | undefined;

export class WalletConnectProvider extends WalletProvider {
    private topic: string | undefined;

    constructor(private client: SignClient) {
        super();

        this.client.on('session_update', ({ params }) => {
            this.connectedAccount = this.getAccount(params.namespaces);
            super.onAccountChanged(this.connectedAccount);
        });

        this.client.on('session_delete', () => {
            this.connectedAccount = undefined;
            this.topic = undefined;

            super.onAccountChanged(this.connectedAccount);
        });
    }

    /**
     * @description gets a singleton instance, allowing existing session to be restored.
     */
    static async getInstance() {
        if (walletConnectInstance === undefined) {
            const client = await SignClient.init(walletConnectOpts);
            walletConnectInstance = new WalletConnectProvider(client);
        }

        return walletConnectInstance;
    }

    async connect(): Promise<string | undefined> {
        const { uri, approval } = await this.client.connect({
            requiredNamespaces: {
                [WALLET_CONNECT_SESSION_NAMESPACE]: {
                    methods: [METHOD_SIGN, METHOD_GENERATE_ZK_PROOF],
                    chains: [CHAIN_ID],
                    events: ['accounts_changed'],
                },
            },
        });

        // Connecting to an existing pairing; it can be assumed that the account is already available.
        if (!uri) {
            if (this.connectedAccount == undefined) {
                return undefined;
            } else {
                return this.connectedAccount;
            }
        }

        // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
        QRCodeModal.open(uri, undefined);

        // Await session approval from the wallet.
        const session = await approval();

        this.connectedAccount = this.getAccount(session.namespaces);
        this.topic = session.topic;

        // Close the QRCode modal in case it was open.
        QRCodeModal.close();

        if (this.connectedAccount == undefined) {
            return undefined;
        } else {
            return this.connectedAccount;
        }
    }

    async signMessage(
        accountAddress: string,
        message: string | string[] | object,
        recentBlockHash: BlockHash.Type,
        schema: string,
    ): Promise<AccountTransactionSignature> {
        if (!this.topic) {
            throw new Error('No connection');
        }

        const payload = Buffer.from(
            serializeTypeValue(
                {
                    block_hash: BlockHash.toHexString(recentBlockHash),
                    context_string: CONTEXT_STRING,
                    message,
                },
                toBuffer(schema, 'base64'),
            ).buffer,
        ).toString('hex');

        const params = {
            message: {
                schema: schema,
                data: payload,
            },
        };

        try {
            const signature = await this.client.request({
                topic: this.topic,
                request: {
                    method: METHOD_SIGN,
                    params,
                },
                chainId: CHAIN_ID,
            });

            return signature as AccountTransactionSignature;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (isWalletConnectError(e)) {
                throw new Error('Signing request rejected in wallet: ' + JSON.stringify(e));
            }
            throw e;
        }
    }

    async requestVerifiablePresentation(
        challenge: HexString,
        statement: CredentialStatements,
    ): Promise<VerifiablePresentation> {
        if (!this.topic) {
            throw new Error('No connection');
        }

        const params = {
            challenge,
            credentialStatements: statement,
        };

        const serializedParams = JSONBigInt.stringify(params);

        try {
            const result = await this.client.request<{ verifiablePresentationJson: string }>({
                topic: this.topic,
                request: {
                    method: METHOD_GENERATE_ZK_PROOF,
                    params: { paramsJson: serializedParams },
                },
                chainId: CHAIN_ID,
            });
            return VerifiablePresentation.fromString(result.verifiablePresentationJson);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (isWalletConnectError(e)) {
                throw new Error('Generating proof request rejected in wallet: ' + JSON.stringify(e));
            }
            throw e;
        }
    }

    async disconnect(): Promise<void> {
        if (this.topic === undefined) {
            return;
        }

        await this.client.disconnect({
            topic: this.topic,
            reason: {
                code: 1,
                message: 'user disconnecting',
            },
        });

        this.connectedAccount = undefined;
        this.topic = undefined;

        super.onAccountChanged(this.connectedAccount);
    }

    private getAccount(ns: SessionTypes.Namespaces): string | undefined {
        const [, , account] = ns[WALLET_CONNECT_SESSION_NAMESPACE].accounts[0].split(':');
        return account;
    }
}

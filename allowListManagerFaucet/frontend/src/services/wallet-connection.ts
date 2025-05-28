import { detectConcordiumProvider, WalletApi } from '@concordium/browser-wallet-api-helpers';
import { CredentialStatements, HexString, VerifiablePresentation } from '@concordium/web-sdk';
import EventEmitter from 'events';


export abstract class WalletProvider extends EventEmitter {
    abstract connect(): Promise<string[] | undefined>;
    abstract requestVerifiablePresentation(
        challenge: HexString,
        statement: CredentialStatements
    ): Promise<VerifiablePresentation>;
    disconnect?(): Promise<void>;

    /**
     * @param account string when account is changed, undefined when disconnected
     */
    protected onAccountChanged(account: string | undefined) {
        this.emit('accountChanged', account);
    }
}

let browserWalletInstance: BrowserWalletProvider | undefined;

export class BrowserWalletProvider extends WalletProvider {
    constructor(private provider: WalletApi) {
        super();

        provider.on('accountChanged', (account) => super.onAccountChanged(account));
        provider.on('accountDisconnected', async () =>
            super.onAccountChanged((await provider.getMostRecentlySelectedAccount()) ?? undefined)
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

    async connect(): Promise<string[] | undefined> {
        return this.provider.requestAccounts();
    }

    async requestVerifiablePresentation(
        challenge: HexString,
        statement: CredentialStatements
    ): Promise<VerifiablePresentation> {
        return this.provider.requestVerifiablePresentation(challenge, statement);
    }

    async disconnect(): Promise<void> {
        // Clear the singleton instance
        browserWalletInstance = undefined;
        // Emit disconnection event
        this.onAccountChanged(undefined);
    }
}

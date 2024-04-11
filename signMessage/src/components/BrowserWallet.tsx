import { Alert, Button } from 'react-bootstrap';
import { WalletApi } from '@concordium/browser-wallet-api-helpers';

interface Props {
    client: WalletApi;
    connectedAccount: string | undefined;
    setConnectedAccount: (a: string | undefined) => void;
}

async function connect(client: WalletApi, setConnectedAccount: (a: string | undefined) => void) {
    const account = await client.connect();
    return setConnectedAccount(account);
}

export default function BrowserWallet(props: Props) {
    const { client, connectedAccount, setConnectedAccount } = props;

    return (
        <>
            {connectedAccount && (
                <>
                    <Alert variant="success">
                        <p>
                            Connected to account <code>{connectedAccount}</code>.
                        </p>
                        <p>
                            The wallet currently only exposes the &quot;most recently selected&quot; connected account,
                            even if more than one is actually connected. Select and disconnect accounts through the
                            wallet.
                        </p>
                    </Alert>
                </>
            )}
            {!connectedAccount && (
                <>
                    <p>No wallet connection</p>
                    <Button onClick={() => connect(client, setConnectedAccount).catch(console.error)}>Connect</Button>
                </>
            )}
        </>
    );
}

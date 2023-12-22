import { TransactionHash } from '@concordium/web-sdk';

interface TxHashLinkProps {
    txHash: TransactionHash.Type;
}

/*
 * A component that displays the CCDScan link of a transaction hash.
 */
export const TxHashLink = function TxHashLink(props: TxHashLinkProps) {
    const { txHash } = props;

    return (
        <div>
            <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href={`https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${TransactionHash.toHexString(
                    txHash,
                )}`}
            >
                {TransactionHash.toHexString(txHash)}
            </a>
        </div>
    );
};

interface AccountLinkProps {
    account: string;
}

/*
 * A component that displays the CCDScan link to an account address.
 */
export const AccountLink = function AccountLink(props: AccountLinkProps) {
    const { account } = props;

    return (
        <div>
            <a
                className="link"
                href={`https://testnet.ccdscan.io/?dcount=1&dentity=account&daddress=${account}`}
                target="_blank"
                rel="noreferrer"
            >
                {account}
            </a>
        </div>
    );
};

import React from 'react';

function ccdScanUrl(isTestnet: boolean): string {
    return `https://${isTestnet ? `testnet.` : ``}ccdscan.io`;
}

interface TxHashLinkProps {
    isTestnet: boolean;
    txHash: string;
    message: string;
}

/**
 * A component that displays the CCDScan link of a transaction hash.
 * A message at the bottom can be used to add some custom description to the link.
 * If `isTestnet` is true, the testnet CCDScan link is displayed.
 * If `isTestnet` is false, the mainnet CCDScan link is displayed.
 */
export const TxHashLink = function TxHashLink(props: TxHashLinkProps) {
    const { isTestnet, txHash, message } = props;

    return (
        <>
            <div>
                Transaction hash:{' '}
                <a
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                    href={`${ccdScanUrl(isTestnet)}/?dcount=1&dentity=transaction&dhash=${txHash}`}
                >
                    {txHash}
                </a>
            </div>
            <br />
            <div>
                CCDScan will take a moment to pick up the above transaction, hence the above link will work in a bit.
            </div>
            <div>{message}</div>
        </>
    );
};

interface AccountLinkProps {
    isTestnet: boolean;
    account: string;
}

/**
 * A component that displays the CCDScan link to an account address.
 * If `isTestnet` is true, the testnet CCDScan link is displayed.
 * If `isTestnet` is false, the mainnet CCDScan link is displayed.
 */
export const AccountLink = function AccountLink(props: AccountLinkProps) {
    const { isTestnet, account } = props;

    return (
        <div>
            <a
                className="link"
                href={`${ccdScanUrl(isTestnet)}/?dcount=1&dentity=account&daddress=${account}`}
                target="_blank"
                rel="noreferrer"
            >
                {account}
            </a>
        </div>
    );
};

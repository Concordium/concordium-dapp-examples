import * as constants from '../constants';

interface TxHashLinkProps {
    txHash: string;
}

/**
 * A component that displays the CCDScan link of a transaction hash.
 */
export const TxHashLink = function TxHashLink(props: TxHashLinkProps) {
    const { txHash } = props;

    return (
        <div className="centered">
            Txhash:{' '}
            <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href={`${constants.CCD_SCAN_URL}/?dcount=1&dentity=transaction&dhash=${txHash}`}
            >
                {txHash}
            </a>
        </div>
    );
};

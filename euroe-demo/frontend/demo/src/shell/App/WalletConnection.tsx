import { useCallback, useEffect, useState } from 'react';
import { Button, Offcanvas, ProgressBar, ProgressBarProps } from 'react-bootstrap';
import { useAtomValue, useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { useBrowserWallet, useWalletConnect } from '@shared/wallet-connection';
import WalletConnectIcon from '@assets/walletconnect.svg';
import ConcordiumIcon from '@assets/ccd.svg';
import {
    BallotSubmissionStatus,
    Wallet,
    activeWalletAtom,
    connectionViewAtom,
    loadMoreSubmittedBallotsAtom,
    submittedBallotsAtom,
} from '@shared/store';
import { AccountAddress, TransactionHash } from '@concordium/web-sdk';
import { accountShowShort, commonDateTimeFormat } from '@shared/util';
import { clsx } from 'clsx';

/**
 * Button for connecting user through wallet connect compatible Concordium wallet.
 */
function ConnectWalletConnect() {
    const { isActive, isConnecting, connect: _connect } = useWalletConnect();

    const connect = useCallback(() => {
        if (isActive || isConnecting) {
            return;
        }

        void _connect();
    }, [_connect, isActive, isConnecting]);

    return (
        <button onClick={connect} className="clear connect-wallet__button">
            <img className="connect-wallet__button-icon" src={WalletConnectIcon} alt="wallet connect icon" />
            Concordium Mobile Wallet
        </button>
    );
}

/**
 * Button for connecting user through Concordium Wallet for Web.
 */
function ConnectBrowser() {
    const { isActive, isConnecting, connect: _connect } = useBrowserWallet();

    const connect = useCallback(() => {
        if (isActive || isConnecting) {
            return;
        }

        void _connect();
    }, [_connect, isActive, isConnecting]);

    return (
        <button onClick={connect} className="clear connect-wallet__button">
            <img
                className="connect-wallet__button-icon connect-wallet__button-icon--chrome"
                src={ConcordiumIcon}
                alt="wallet connect icon"
            />
            Concordium Wallet for Web
        </button>
    );
}

/**
 * Trigger to open sidebar when no connection is available
 */
function SelectConnectionTrigger() {
    const showSidebar = useAtomValue(connectionViewAtom);

    return (
        <Button variant="primary" onClick={() => showSidebar?.()}>
            Connect
        </Button>
    );
}

/**
 * Sidebar title when no connection is available
 */
function SelectConnectionTitle() {
    return <>Select wallet</>;
}

/**
 * Sidebar body when no connection is available
 */
function SelectConnectionBody() {
    return (
        <>
            <ConnectBrowser />
            <ConnectWalletConnect />
        </>
    );
}

type WalletWithAccount = Omit<Wallet, 'account'> & {
    account: AccountAddress.Type;
};

/**
 * HoC for making components which assume and use a connection with a connected account.
 *
 * @param Component - A component which takes an extension of {@linkcode WalletWithAccount} as its props.
 *
 * @throws if the returned component is used without a connected account in the global store.
 * @returns A component which has a connection and a connected account passed to it through its props.
 */
function withActiveAccount<P>(Component: React.ComponentType<P & WalletWithAccount>) {
    return function Inner(props: P) {
        const wallet = useAtomValue(activeWalletAtom);

        if (wallet?.account === undefined) {
            throw new Error('Connection must be available');
        }

        return <Component {...props} {...wallet} account={wallet.account} />;
    };
}

/**
 * Trigger to open sidebar when an account is connected.
 *
 * @throws if used without a connected account in the global store.
 */
const ActiveConnectionTrigger = withActiveAccount(({ account }) => {
    const showSidebar = useAtomValue(connectionViewAtom);

    return (
        <Button variant="outline-success" onClick={() => showSidebar?.()}>
            {accountShowShort(account)}
        </Button>
    );
});

/**
 * Sidebar title used when an account is connected.
 *
 * @throws if used without a connected account in the global store.
 */
const ActiveConnectionTitle = withActiveAccount(({ account }) => {
    return (
        <div>
            <div>Connected</div>
            <div className="active-connection__sub-title">{accountShowShort(account)}</div>
        </div>
    );
});

/**
 * Conversion helper to convert submission progress step to percent
 */
const stepToProgress = (step: 1 | 2 | 3) => Math.ceil((step / 3) * 100);
/**
 * Map of {@linkcode BallotSubmissionStatus} to {@linkcode ProgressBarProps}
 */
const statusProgress: { [p in BallotSubmissionStatus]: Partial<ProgressBarProps> } = {
    [BallotSubmissionStatus.Committed]: { now: stepToProgress(1), variant: 'info', animated: true },
    [BallotSubmissionStatus.Rejected]: { now: stepToProgress(1), variant: 'danger' },
    [BallotSubmissionStatus.Approved]: { now: stepToProgress(2), variant: 'info', animated: true },
    [BallotSubmissionStatus.Discarded]: { now: stepToProgress(2), variant: 'danger' },
    [BallotSubmissionStatus.Verified]: { now: stepToProgress(3), variant: 'success' },
};
/**
 * Map of {@linkcode BallotSubmissionStatus} to status description
 */
const showStatus: { [p in BallotSubmissionStatus]: string } = {
    [BallotSubmissionStatus.Committed]: 'Ballot submitted to chain',
    [BallotSubmissionStatus.Rejected]: 'Ballot rejected by chain',
    [BallotSubmissionStatus.Approved]: 'Ballot finalized on chain',
    [BallotSubmissionStatus.Discarded]: 'Ballot verification failed',
    [BallotSubmissionStatus.Verified]: 'Ballot has been included in election tally',
};

/**
 * Shows the details and actions of the connected account.
 *
 * @throws if used without a connected account in the global store.
 */
const ActiveConnectionBody = withActiveAccount(({ connection }) => {
    const submissions = useAtomValue(submittedBallotsAtom);
    const loadMore = useSetAtom(loadMoreSubmittedBallotsAtom);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = useCallback(async () => {
        setLoading(true);

        try {
            await loadMore();
        } finally {
            setLoading(false);
        }
    }, [loadMore]);

    return (
        <>
            <section className="mb-4">
                <h5>Actions</h5>
                <Button variant="danger" size="sm" onClick={() => connection.disconnect()}>
                    Disconnect
                </Button>
            </section>
            <section>
                <h5>Ballot submissions</h5>
                {submissions?.ballots.length === 0 && (
                    <span className="active-connection__no-submissions text-muted">
                        No ballot submissions registered for the selected account
                    </span>
                )}
                {submissions?.ballots.map(({ status, transaction, submitted }, i, arr) => {
                    const transactionString = TransactionHash.toHexString(transaction);
                    const isLatest = i === 0;
                    const activeSubmission =
                        isLatest || arr.slice(0, i).every((s) => s.status !== BallotSubmissionStatus.Verified);

                    return (
                        <div
                            key={transactionString}
                            className={clsx(
                                'active-connection__submission mb-2',
                                !activeSubmission && 'active-connection__submission--inactive',
                            )}
                        >
                            <div className="mb-1">
                                <div>
                                    {transactionString.slice(0, 8)} (
                                    {submitted.toLocaleTimeString(undefined, commonDateTimeFormat)})
                                </div>
                                <div className="active-connection__submission-status">{showStatus[status]}</div>
                            </div>
                            <ProgressBar {...statusProgress[status]} />
                        </div>
                    );
                })}
                {submissions?.hasMore && (
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="secondary" size="sm" onClick={handleLoadMore} disabled={loading}>
                            Load more
                        </Button>
                    </div>
                )}
            </section>
        </>
    );
});

const activeConn = {
    Trigger: ActiveConnectionTrigger,
    Title: ActiveConnectionTitle,
    Body: ActiveConnectionBody,
};

const selectConn: typeof activeConn = {
    Trigger: SelectConnectionTrigger,
    Title: SelectConnectionTitle,
    Body: SelectConnectionBody,
};

/**
 * Component which shows the active connection state (if any), and allows the user to manage the connection and view
 * details pertaining to the connected account.
 */
export function WalletConnection() {
    const wallet = useAtomValue(activeWalletAtom);
    const [showModal, setShowModal] = useState(false);
    const setConnectionViewHandler = useSetAtom(connectionViewAtom);

    useEffect(() => {
        setConnectionViewHandler(() => () => setShowModal(true)); // atom setter interprets a function as a `SetStateAction`, which is why we pass an action which returns a function.
        return () => setConnectionViewHandler(RESET);
    }, [setConnectionViewHandler]);

    const { Trigger, Title, Body } = wallet?.account !== undefined ? activeConn : selectConn;

    return (
        <>
            <Trigger />
            <Offcanvas show={showModal} onHide={() => setShowModal(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="d-flex">
                        <Title />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Body />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

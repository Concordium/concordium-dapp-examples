import { clsx } from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Image } from 'react-bootstrap';

import { ElectionContract, registerVotes } from '@shared/election-contract';
import {
    IndexedCandidateDetails,
    addSubmittedBallotAtom,
    electionConfigAtom,
    connectionViewAtom,
    activeWalletAtom,
} from '@shared/store';
import { ElectionOpenState, useIsElectionOpen } from '@shared/hooks';

interface CandidateProps {
    candidate: IndexedCandidateDetails;
    onClick(): void;
    isSelected: boolean;
}

/**
 * Renders an election candidate
 */
function Candidate({ candidate: { name, imageUrl, descriptionUrl }, onClick, isSelected }: CandidateProps) {
    const isElectionOpen = useIsElectionOpen() === ElectionOpenState.Open;
    const handleClick = () => {
        if (isElectionOpen) {
            onClick();
        }
    };
    return (
        <Col className="mt-4" xs={24} md={12} xl={8}>
            <Card
                role="button"
                onClick={handleClick}
                aria-disabled={!isElectionOpen}
                className={clsx('candidate', isSelected && isElectionOpen && 'candidate--selected')}
            >
                <Image src={imageUrl} alt={name} />
                <Card.Body className="candidate__body">
                    <Card.Title>{name}</Card.Title>
                    <Card.Link
                        href={descriptionUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read more
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

/**
 * The home page component.
 */
export default function Home() {
    const electionConfig = useAtomValue(electionConfigAtom);
    const [selected, setSelected] = useState<number[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [awaitConnection, setAwaitConnection] = useState(false);
    const wallet = useAtomValue(activeWalletAtom);
    const openViewConnection = useAtomValue(connectionViewAtom);
    const addSubmission = useSetAtom(addSubmittedBallotAtom);
    const isElectionOpen = useIsElectionOpen() === ElectionOpenState.Open;

    /**
     * Toggle the selection of a candidate at `index`
     * @param index - The candidate index to toggle selection for
     */
    const toggleCandidate = (index: number) => {
        setSelected((xs) => (xs.includes(index) ? xs.filter((x) => x !== index) : [...xs, index]));
    };

    /**
     * Closes the confirmation modal (if open)
     */
    const closeConfirm = () => setConfirmOpen(false);

    /**
     * Confirms the ballot submission, i.e. attempts to register the ballot on chain.
     */
    const confirmSubmission = async () => {
        if (wallet?.connection === undefined || electionConfig === undefined || wallet?.account === undefined) {
            throw new Error('Expected required parameters to be defined'); // Will not happen.
        }
        const ballot: ElectionContract.RegisterVotesParameter = electionConfig.candidates
            .map((_, i) => selected.includes(i))
            .map((hasVote, i) => ({ candidate_index: i, has_vote: hasVote }));

        const transaction = await registerVotes(ballot, wallet.connection, wallet.account);
        addSubmission(transaction);

        closeConfirm();
        openViewConnection?.();
    };

    /**
     * Opens a confirmation modal for ballot submission. If not connected at this point, a connection prompt will be
     * made prior to opening the modal.
     */
    const submit = useCallback(() => {
        if ((wallet?.connection === undefined || wallet?.account === undefined) && openViewConnection !== undefined) {
            openViewConnection();
            setAwaitConnection(true);
        } else {
            setConfirmOpen(true);
        }
    }, [wallet?.connection, openViewConnection, wallet?.account]);

    // Handle connecting due to a submission attempt while not connected.
    useEffect(() => {
        if (awaitConnection && wallet?.connection !== undefined && wallet?.account !== undefined) {
            submit();
            setAwaitConnection(false);
        }
    }, [awaitConnection, wallet?.connection, submit, wallet?.account]);

    if (electionConfig === undefined) {
        return null;
    }

    return (
        <>
            <Row className="mt-n4">
                {electionConfig?.candidates.map((c) => (
                    <Candidate
                        key={c.index}
                        candidate={c}
                        onClick={() => toggleCandidate(c.index)}
                        isSelected={selected.includes(c.index)}
                    />
                ))}
            </Row>
            {isElectionOpen && (
                <div className="d-flex justify-content-center mt-4">
                    <Button className="text-center" variant="primary" onClick={submit}>
                        Submit
                    </Button>
                </div>
            )}
            <Modal show={confirmOpen} onHide={closeConfirm} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm candidate selection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selected.length === 0 && (
                        <p>
                            You have not selected any candidates. Confirming this submission will result in not voting
                            for any candidate(s).
                        </p>
                    )}
                    {selected.length === electionConfig.candidates.length && (
                        <p>
                            You have selected all candidates. Confirming this submission will result in a ballot with
                            equal weight distribution on all candidates.
                        </p>
                    )}
                    {0 < selected.length && selected.length < electionConfig.candidates.length && (
                        <>
                            <p>You have selected the following candidates:</p>
                            <ul>
                                {electionConfig.candidates
                                    .filter((c) => selected.includes(c.index))
                                    .map((c) => (
                                        <li key={c.index}>{c.name}</li>
                                    ))}
                            </ul>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={closeConfirm}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmSubmission}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

/* eslint-disable import/no-unresolved */

/* eslint-disable react/prop-types */

import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import { decodeView, decodeVotes } from './buffer';
import { getView, getVotes } from './Wallet';
import { REFRESH_INTERVAL } from './config';
import Footer from './Footer';
import './styles/Results.css';

function VoteLink(props) {
    const { electionId, endsInMillis } = props;
    if (endsInMillis > 0) {
        return (
            <Row>
                <Col>
                    <Link to={`/vote/${electionId}`}>
                        <Button className="font-weight-bold">
                            <strong>Vote now</strong>
                        </Button>
                    </Link>
                </Col>
                <Col>Election ends in {moment.duration(endsInMillis).humanize()}.</Col>
            </Row>
        );
    }
    return (
        <Row>
            <Col>
                <Button className="font-weight-bold" disabled>
                    <strong>Too late!</strong>
                </Button>
            </Col>
            <Col>Election ended {moment.duration(endsInMillis).humanize()} ago.</Col>
        </Row>
    );
}

function Results() {
    const params = useParams();
    const { electionId } = params;

    const [client, setClient] = useState();
    const [view, setView] = useState();
    const [votes, setVotes] = useState();

    // Refresh time to deadline each second.
    const [now, setNow] = useState(moment());
    useEffect(() => {
        const interval = setInterval(() => setNow(moment()), moment.duration(1, 'second').asMilliseconds());
        return () => clearInterval(interval);
    }, []);

    // Attempt to initialize Browser Wallet Client.
    useEffect(() => {
        detectConcordiumProvider().then(setClient).catch(console.error);
    }, []);

    // Attempt to get general information about the election.
    useEffect(() => {
        if (client) {
            getView(client, electionId).then(setView).catch(console.error);
        }
    }, [client, electionId]);

    // Decode general information about the election.
    const viewResult = useMemo(() => {
        if (view) {
            return decodeView(view.returnValue);
        }
    }, [view]);

    // Attempt to get the voting results.
    useMemo(() => {
        if (viewResult && client && electionId) {
            getVotes(client, electionId, viewResult?.opts).then(setVotes).catch(console.error);
        }
    }, [viewResult, client, electionId]);

    // Decode voting results.
    const votesResult = useMemo(() => {
        if (votes) {
            return decodeVotes(votes);
        }
    }, [votes]);

    const endsInMillis = viewResult?.deadline.diff(now);

    // Refresh tally periodically until deadline.
    useEffect(() => {
        if (client && viewResult?.deadline.isAfter()) {
            const interval = setInterval(() => {
                console.log('refreshing');
                setView(undefined);
                getView(client, electionId).then(setView).catch(console.error);
            }, REFRESH_INTERVAL.asMilliseconds());
            return () => clearInterval(interval);
        }
    }, [client, electionId, viewResult]);

    // Calculate the max vote count.
    const maxVoteCount = useMemo(() => {
        if (votesResult) {
            return Math.max(...Object.values(votesResult));
        }
    }, [votesResult]);

    return (
        <Container className="results-container">
            <Row>
                <Col>
                    <h1>Results for Election {electionId}*</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>{viewResult?.descriptionText}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup numbered className="mb-3">
                        {!viewResult && <Spinner animation="border" />}
                        {votesResult &&
                            viewResult &&
                            Object.entries(votesResult).map(([index, count]) => (
                                <ListGroup.Item
                                    className="d-flex justify-content-between align-items-start"
                                    style={{
                                        background: `linear-gradient(90deg, rgba(100,200,255,1) ${
                                            (100 * count) / maxVoteCount
                                        }%, rgba(0,0,0,0) ${(100 * count) / maxVoteCount}%)`,
                                    }}
                                    key={viewResult.opts[index]}
                                >
                                    <div className="ms-2 me-auto">{viewResult.opts[index]}</div>
                                    <Badge bg="primary" pill>
                                        {count}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Col>
            </Row>
            {endsInMillis && <VoteLink endsInMillis={endsInMillis} electionId={electionId} />}
            <br />
            <br />
            <br />
            <br />
            <footer>
                <p>*Smart contract index on the Concordium chain</p>
            </footer>
            <Footer />
        </Container>
    );
}

export default Results;

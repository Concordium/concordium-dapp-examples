import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Wallet, { castVote, init, getView } from './Wallet';
import { decodeView } from './buffer';
import Footer from './Footer';
import './styles/VotePage.css';

function VotePage() {
    const params = useParams();
    const { electionId } = params;

    const [client, setClient] = useState();
    const [connectedAccount, setConnectedAccount] = useState();
    const [view, setView] = useState();

    const [selectedOption, setSelectionOption] = useState();

    // Attempt to initialize Browser Wallet Client.
    useEffect(() => {
        init(setConnectedAccount).then(setClient).catch(console.error);
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

    return (
        <Container className="vote-container">
            <Row>
                <Col>
                    <Wallet
                        client={client}
                        connectedAccount={connectedAccount}
                        setConnectedAccount={setConnectedAccount}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Vote in Election {electionId}*</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>{viewResult?.descriptionText}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <div className="mb-3">
                            {viewResult?.opts.map((v) => (
                                <Form.Check key={v} type="radio" id={`default-radio-${v}`}>
                                    <Form.Check.Input
                                        className="btn-check"
                                        type="radio"
                                        onChange={() => setSelectionOption(v)}
                                        checked={selectedOption === v}
                                    />
                                    <Form.Check.Label className="btn btn-light w-100">{v}</Form.Check.Label>
                                </Form.Check>
                            ))}
                        </div>
                        <Button
                            className="w-100"
                            onClick={() => castVote(client, electionId, selectedOption, connectedAccount)}
                        >
                            <strong>Cast Vote!</strong>
                        </Button>
                    </Form>
                    <ul />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/results/${electionId}`}>
                        <Button className="btn-secondary font-weight-bold">
                            <strong>Results</strong>
                        </Button>
                    </Link>
                </Col>
            </Row>
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

export default VotePage;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from "@fortawesome/free-solid-svg-icons"
import { QRCode } from 'react-qrcode-logo';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {Buffer} from "buffer";

import { HomePage } from './Home';
import * as Keys from "./keys";
import * as Server from "./server";

import './styles.scss';

export const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/> } />
            <Route path="/send" element={<SendForm />} />
          </Routes>
        </Router>
    );
};

function SendForm() {
  
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  
  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Col>
        <Row>
          <QRPublic/>
          <Form validated={validated} onSubmit={handleSubmit} >
            <div className='mb-3'>
              <Form.Label htmlFor="amount">Send</Form.Label>
              <InputGroup>
                <InputGroup.Text id="amount">EUR</InputGroup.Text>
                <Form.Control
                  placeholder="3.14"
                  aria-label="EUR amount"
                  aria-describedby="amount-balance"
                />
              </InputGroup>
              <Form.Text id="amount-balance" muted>
                Current balance is EUR 100,000.00
              </Form.Text>
            </div>
            <div className='mb-3'>
              <Form.Label htmlFor='send-to'>To</Form.Label>
              <InputGroup>
                <Form.Control
                  id="send-to"
                  placeholder=""
                  aria-label="Receiver of the amount"
                />
                <SendToScannerModal onScan={(out)=> console.log(out)} onError={(out)=> console.log(out)} />
              </InputGroup>
            </div>
            <Button type='submit'>Send</Button>
          </Form >
        </Row>
      </Col>
    </Container>
  );
}

function QRPublic(request?: bigint) {
  const publicKey = Keys.usePublicKey();
  if (!publicKey) {
    return "Loading";
  }
  const qrContentString = JSON.stringify({
    publicKey: Buffer(publicKey).toString("base64"),
    request: amount?.toString()
  });
  return (<QRCode value={qrContentString} size={250} />);
}

type SendToScannerProps = {onScan: (out: QrContent) => void, onError: (out: string) => void};

type QrContent = {
  /** Public key in Base64 */
  publicKey: string,
  /** Optional amount to request, string representation of a bigint. */
  request?: string
};

function SendToScannerModal(props: SendToScannerProps) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDecode = (qrString: string) => {
    const content = JSON.parse(qrString) as unknown;

    if (!content || typeof content !== "object") {
      setError(`Expected JSON object, instead got: ${qrString}`);
      return;
    }
    if (!("publicKey" in content)) {
      setError("Expected JSON object with field 'publicKey'");
      return;
    }
    if (typeof content.publicKey !== 'string') {
      setError("Unexpected");
      return;
    }
    handleClose();
    props.onScan(content as QrContent);
  };

  const onError = (err: Error) => {
    handleClose();
    props.onError(err.message);
  };

  return (
    <>
      <Button id="button-send-to-scan" onClick={handleShow}>
        <FontAwesomeIcon icon={faQrcode}/>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Scan QR for the receiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QrScanner onDecode={onDecode} onError={onError}/>
        </Modal.Body>
        <Modal.Footer>
          {error}
        </Modal.Footer>
      </Modal>
    </>);
}

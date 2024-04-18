import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { QRCode } from 'react-qrcode-logo';
import { QrScanner } from '@yudiel/react-qr-scanner';
import Modal from 'react-bootstrap/Modal';
import { useRef, useState } from 'react';
import { Buffer } from 'buffer';

import { HomePage } from './Home';
import * as Keys from './keys';
import * as Server from './server';

import './styles.scss';
import { ReceivePage } from './Receive';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/send" element={<SendForm />} />
        <Route path="/receive" element={<ReceivePage />} />
      </Routes>
    </Router>
  );
};

function SendForm() {
  const nav = useNavigate();
  const [validated, setValidated] = useState(false);
  const receiverRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // TODO form validation
    }
    setValidated(true);

    const amount = BigInt(Number(form.amount.value) * 10 ** 6);
    const receiver = form.to.value;
    console.log({ amount, receiver });
    Server.transfer(amount, receiver).then(console.log).catch(console.log);
  };

  const onQRScan = (content: QrContent) => {
    if (receiverRef.current === null) {
      return;
    }
    const receiverHex = Buffer.from(content.publicKey, 'base64').toString('hex');
    receiverRef.current.value = receiverHex;
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <Form onSubmit={handleSubmit} className="d-flex flex-column w-100">
        <Form.Label htmlFor="amount" className="text-muted pull-left w-90">
          Send
        </Form.Label>
        <InputGroup size="lg" className="amountField">
          <InputGroup.Text id="amount">EUR</InputGroup.Text>
          <Form.Control
            name="amount"
            type="number"
            step={0.000001}
            placeholder="0.00"
            aria-label="EUR amount"
            aria-describedby="amount-balance"
            className="font-monospace"
          />
        </InputGroup>
        <Form.Label htmlFor="send-to" className="text-muted pull-left w-90">
          to
        </Form.Label>
        <InputGroup className="amountField saF">
          <Form.Control
            name="to"
            id="send-to"
            placeholder=""
            aria-label="Receiver of the amount"
            ref={receiverRef}
          />
          <SendToScannerModal onScan={onQRScan} onError={(out) => console.log(out)} />
        </InputGroup>
        <div className="d-grid gap-2 w-100 mt-4">
          <Button variant="success" size="lg" type="submit">
            Send
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              nav('/');
            }}
          >
            Back
          </Button>
        </div>
      </Form>
    </Container>
  );
}

type SendToScannerProps = { onScan: (out: QrContent) => void; onError: (out: string) => void };

type QrContent = {
  /** Public key in Base64 */
  publicKey: string;
  /** Optional amount to request, string representation of a bigint. */
  request?: string;
};

function SendToScannerModal(props: SendToScannerProps) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDecode = (qrString: string) => {
    const content = JSON.parse(qrString) as unknown;

    if (!content || typeof content !== 'object') {
      setError(`Expected JSON object, instead got: ${qrString}`);
      return;
    }
    if (!('publicKey' in content)) {
      setError("Expected JSON object with field 'publicKey'");
      return;
    }
    if (typeof content.publicKey !== 'string') {
      setError('Unexpected');
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
      <Button id="button-send-to-scan" onClick={handleShow} variant="secondary">
        <FontAwesomeIcon icon={faQrcode} />
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR for the receiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QrScanner onDecode={onDecode} onError={onError} />
        </Modal.Body>
        <Modal.Footer>{error}</Modal.Footer>
      </Modal>
    </>
  );
}

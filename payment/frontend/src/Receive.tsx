import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
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
import { useState } from 'react';
import * as Keys from './keys';
import { Buffer } from 'buffer';
import Jdenticon from 'react-jdenticon';

import './styles.scss';

export function ReceivePage() {
  const nav = useNavigate();
  const [amount, setAmount] = useState<bigint>();
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <div className="m-4">
        <QRPublic amount={amount} />
        <Jdenticon size="48" value="Hello World" />
      </div>
      <InputGroup size="lg" className="amountField saF">
        <InputGroup.Text id="amount">EUR</InputGroup.Text>
        <Form.Control
          name="amount"
          type="number"
          step={0.000001}
          placeholder="0.00"
          aria-label="EUR amount"
          aria-describedby="amount-balance"
          onChange={(e) => setAmount(BigInt(Number(e.target.value) * 1000000))}
          className="font-monospace"
        />
      </InputGroup>
      <div className="blockquote-footer">Balance</div>
      <div className="d-grid gap-2 w-100">
        <Button variant="secondary" size="lg" onClick={() => nav('/')}>
          Back
        </Button>
      </div>
    </Container>
  );
}

type QrProps = {
  amount?: bigint;
};

function QRPublic(props: QrProps) {
  const publicKey = Keys.usePublicKey();
  if (!publicKey) {
    return 'Loading';
  }
  const qrContentString = JSON.stringify({
    publicKey: Buffer.from(publicKey).toString('base64'),
    request: props.amount?.toString(),
  });
  return <QRCode value={qrContentString} size={250} />;
}

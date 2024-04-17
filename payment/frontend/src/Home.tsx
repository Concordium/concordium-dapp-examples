import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
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

import './styles.scss';

export function HomePage() {
  const [balance, setBalance] = useState<bigint>(23_000_000_000n);
  const nav = useNavigate();
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
          <figure className='mt-4'>
              <h1 className="display-1"><small className="text-muted">EUR</small> <span className='font-monospace'>{(Number(balance) / 10**6).toFixed(2)}</span></h1>
              <figcaption className="blockquote-footer">Balance</figcaption>
          </figure>
          <div className="d-grid gap-2 w-100 mt-4">
              <Button variant="dark" size="lg" onClick={()=> nav("/send")}>Send</Button>
              <Button variant="secondary" size="lg" onClick={()=> nav("/receive")}>Receive</Button>
          </div>
    </Container>
  );
}

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Col>
        <Row>
          <figure>
              <h1 class="display-1"><small class="text-muted">EUR</small> 100.000</h1>
              <figcaption class="blockquote-footer">Balance</figcaption>
          </figure>
        </Row>
        <Row>
          <div className="d-grid gap-2">
              <Button size="lg">Send</Button>
              <Button size="lg">Receive</Button>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

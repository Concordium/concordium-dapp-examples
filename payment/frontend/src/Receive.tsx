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
import * as Jdenticon from 'jdenticon';

import './styles.scss';

export function ReceivePage() {
    const nav = useNavigate();
    const [amount, setAmount] = useState<bigint>();
    return (
        <Container fluid className="d-flex flex-column align-items-center justify-content-center">
            <Form onSubmit={() => {}} className="d-flex flex-column w-100">
                <div className="m-4 d-flex flex-column align-items-center justify-content-center">
                    <QRPublic amount={amount} />
                </div>
                <Form.Label htmlFor="amount" className="text-muted pull-left w-90">
                    Desired Amount
                </Form.Label>
                <InputGroup size="lg" className="amountField saF">
                    <InputGroup.Text id="amount">EUR</InputGroup.Text>
                    <Form.Control
                        name="amount"
                        type="number"
                        min="0"
                        step={0.01}
                        placeholder="0.00"
                        aria-label="EUR amount"
                        aria-describedby="amount-balance"
                        onChange={(e) => setAmount(BigInt(Number(e.target.value) * 1000000))}
                        className="font-monospace prevent-validation"
                    />
                </InputGroup>
                <div className="blockquote-footer">Balance</div>
                <div className="d-grid gap-2 w-100">
                    <Button variant="secondary" size="lg" onClick={() => nav('/')}>
                        Back
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

type QrProps = {
    amount?: bigint;
};

function QRPublic(props: QrProps) {
    const publicKey = Keys.PUBLIC_KEY;
    if (!publicKey) {
        return 'Loading';
    }
    const base64Key = Buffer.from(publicKey).toString('base64');
    const qrContentString = JSON.stringify({
        publicKey: base64Key,
        request: props.amount?.toString(),
    });
    const logoSize = 100;
    const svgString = Jdenticon.toSvg(base64Key, logoSize, { backColor: '#FFFFFF' });
    const image = 'data:image/svg+xml;base64,' + window.btoa(svgString);
    return (
        <QRCode
            value={qrContentString}
            size={250}
            logoImage={image}
            ecLevel="H"
            logoWidth={logoSize}
            logoHeight={logoSize}
        />
    );
}

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './styles.scss';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SendForm />} />
            </Routes>
        </Router>
    );
};

function SendForm() {
    return (
          <Container className="row align-items-center justify-content-center">
                <Row>
                  <Col>
                    <Form>
                      <Form.Label htmlFor="basic-url">Send</Form.Label>
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
                      <Form.Group className="mb-3" controlId="formReceiver">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="text" placeholder="" />
                      </Form.Group>
                      <Button>Send</Button>
                    </Form >
                  </Col>
                </Row>
            </Container>
    );


}

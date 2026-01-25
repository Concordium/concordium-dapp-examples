import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './styles/HomePage.css'; // Add this import

function HomePage() {
    return (
        <Container className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Decentralized Voting</h1>
                <p className="hero-subtitle">Create secure, transparent elections on the blockchain</p>
                <div className="text-center">
                    <Link to="/create">
                        <Button className="btn-success btn-lg">
                            <strong>Setup Election</strong>
                        </Button>
                    </Link>
                </div>
            </div>
            <Row className="mt-5">
                <Col md={4}>
                    <div className="card">
                        <div className="card-body">
                            <h3>Secure</h3>
                            <p>Blockchain-backed voting system</p>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="card">
                        <div className="card-body">
                            <h3>Transparent</h3>
                            <p>Real-time voting results</p>
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="card">
                        <div className="card-body">
                            <h3>Decentralized</h3>
                            <p>Powered by Concordium</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
}

export default HomePage;

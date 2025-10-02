import React from 'react';
import { Col } from 'react-bootstrap';
import packageInfo from '../package.json';

function Footer() {
    return (
        <>
            <hr />
            <Col style={{ textAlign: 'center' }}>
                Version: {packageInfo.version} |{' '}
                <a
                    href="https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/voting/index.html"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'black' }}
                >
                    Explore the voting tutorial here.
                </a>
            </Col>
        </>
    );
}

export default Footer;

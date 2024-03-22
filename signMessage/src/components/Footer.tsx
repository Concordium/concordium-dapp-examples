import { Col } from 'react-bootstrap';
import packageInfo from '../../package.json';

function Footer() {
    return (
        <>
            <hr />
            <Col style={{ textAlign: 'center' }}>
                Version: {packageInfo.version} |{' '}
                <a
                    href="https://github.com/Concordium/concordium-dapp-examples/tree/main/signMessage"
                    target="_blank"
                    rel="noreferrer"
                >
                    Source code.
                </a>
            </Col>
        </>
    );
}

export default Footer;

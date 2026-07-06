import { Col, Container, Row } from 'react-bootstrap';

import { BlockListedMessage } from './components/BlockListedMessage';
import { Loader } from './components/Loader';
import { ConnectionPanel } from './connection/ConnectionPanel';
import { useLocksApp } from './hooks/useLocksApp';
import { LockConfigSection } from './lock/LockConfigSection';
import { OperationQueue } from './queue/OperationQueue';
import { TokenOperationsSection } from './token/TokenOperationsSection';

function App() {
    const {
        provider,
        providerDetected,
        blockListedChain,
        connectedAccount,
        grpcClient,
        status,
        submitStatus,
        transactionHash,
        operations,
        context,
        connect,
        submit,
        removeOperation,
    } = useLocksApp();

    if (!providerDetected) {
        return <Loader />;
    }

    if (blockListedChain) {
        return <BlockListedMessage name={blockListedChain.name} />;
    }

    return (
        <Container fluid className="locks-app">
            <Row className="g-4">
                <Col xl={8} lg={7}>
                    <ConnectionPanel
                        provider={provider}
                        connectedAccount={connectedAccount}
                        status={status}
                        onConnect={connect}
                    />
                    <LockConfigSection context={context} />
                    <TokenOperationsSection context={context} />
                </Col>
                <Col xl={4} lg={5}>
                    <OperationQueue
                        operations={operations}
                        canSubmit={Boolean(connectedAccount && grpcClient && operations.length)}
                        submitStatus={submitStatus}
                        transactionHash={transactionHash}
                        onRemove={removeOperation}
                        onSubmit={submit}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;

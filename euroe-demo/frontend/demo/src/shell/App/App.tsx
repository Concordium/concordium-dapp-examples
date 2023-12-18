import { Container } from 'react-bootstrap';
import { useAtomValue } from 'jotai';

import { electionConfigAtom } from '@shared/store';
import Home from '@pages/Home';
import { WalletConnection } from './WalletConnection';
import { commonDateTimeFormat } from '@shared/util';
import { ElectionOpenState, useIsElectionOpen } from '@shared/hooks';

const showDate = (date: Date) => date.toLocaleString(undefined, commonDateTimeFormat);

/**
 * The application root layout.
 */
function App() {
    const electionConfig = useAtomValue(electionConfigAtom);
    const openState = useIsElectionOpen();

    return (
        <Container>
            <header className="d-flex flex-wrap justify-content-between mb-4">
                {electionConfig !== undefined && (
                    <div className="mb-2">
                        <h2 className="mb-0">{electionConfig.election_description}</h2>
                        <div className={openState === ElectionOpenState.Open ? 'text-success' : 'text-danger'}>
                            {openState === ElectionOpenState.Open && `Open until ${showDate(electionConfig.end)}`}
                            {openState === ElectionOpenState.NotStarted &&
                                `Opening at ${showDate(electionConfig.start)}`}
                            {openState === ElectionOpenState.Concluded && `Closed at ${showDate(electionConfig.end)}`}
                        </div>
                    </div>
                )}
                <div className="mb-2">
                    <WalletConnection />
                </div>
            </header>
            <main>
                <Home />
            </main>
        </Container>
    );
}

export default App;

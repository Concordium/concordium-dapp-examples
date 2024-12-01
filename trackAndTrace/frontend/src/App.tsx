import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { WalletConnectionProps, useConnection, useConnect } from '@concordium/react-components';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AdminChangeRoles } from '@/pages/AdminChangeRoles';
import { AddTransitionRule } from '@/pages/AddTransitionRule';
import { AdminCreateItem } from '@/pages/AdminCreateItem';
import { ChangeItemStatus } from '@/pages/ChangeItemStatus';
import { Explorer } from '@/pages/Explorer';
import * as constants from './constants';
import { useIsMobile } from './hooks/use-mobile';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: CONFIG.pinataJWT,
    pinataGateway: CONFIG.pinataGateway,
});

export const App = (props: WalletConnectionProps) => {
    const { setActiveConnectorType, activeConnectorError, activeConnector, connectedAccounts, genesisHashes } = props;

    const { connection, setConnection, account } = useConnection(connectedAccounts, genesisHashes);
    const { connect } = useConnect(activeConnector, setConnection);
    const isMobile = useIsMobile();
    useEffect(() => {
        setActiveConnectorType(constants.BROWSER_WALLET);
    }, [setActiveConnectorType]);

    return (
        <Router>
            <SidebarProvider>
                <AppSidebar
                    connect={connect}
                    disconnect={() => setConnection(undefined)}
                    activeConnector={activeConnector}
                    account={account}
                />
                <main className="w-full">
                    {isMobile && (
                        <div className="h-12 border-b flex items-center px-4">
                            <SidebarTrigger />
                        </div>
                    )}
                    <Routes>
                        <Route path="/" element={<Explorer pinata={pinata} />} />
                        <Route
                            path="/item/create"
                            element={
                                <AdminCreateItem
                                    activeConnectorError={activeConnectorError}
                                    connection={connection}
                                    accountAddress={account}
                                    pinata={pinata}
                                />
                            }
                        />
                        <Route
                            path="/roles/change"
                            element={
                                <AdminChangeRoles
                                    activeConnectorError={activeConnectorError}
                                    connection={connection}
                                    accountAddress={account}
                                />
                            }
                        />
                        <Route
                            path="/item/update"
                            element={
                                <ChangeItemStatus
                                    activeConnectorError={activeConnectorError}
                                    connection={connection}
                                    accountAddress={account}
                                    pinata={pinata}
                                />
                            }
                        />
                        <Route
                            path="/transition-rules/add"
                            element={
                                <AddTransitionRule
                                    activeConnectorError={activeConnectorError}
                                    connection={connection}
                                    accountAddress={account}
                                />
                            }
                        />
                    </Routes>
                </main>
            </SidebarProvider>
        </Router>
    );
};

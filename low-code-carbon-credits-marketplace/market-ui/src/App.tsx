import './App.css';

import { useState } from 'react';
import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { ContractAddress, createConcordiumClient } from '@concordium/web-sdk';
import {
    AppBar, Box, Button, Container, createTheme, Link, ThemeProvider, Toolbar, Typography
} from '@mui/material';

import GuardedRoute from './components/auth/GuardedRoute';
import UserAuth from './components/auth/UserAuth';
import FractionalizerEvents from './components/cis2-fractionalizer/FractionalizerEvents';
import { FractionalizerRetire } from './components/cis2-fractionalizer/FractionalizerRetire';
import { FractionalizerRetract } from './components/cis2-fractionalizer/FractionalizerRetract';
import MarketEvents from './components/cis2-market/MarketEvents';
import Cis2BalanceOf from './components/cis2/Cis2BalanceOf';
import ProjectEvents from './components/cis2/ProjectEvents';
import { ProjectRetire } from './components/cis2/ProjectRetire';
import { ProjectRetract } from './components/cis2/ProjectRetract';
import AddVerifier from './components/cis2/verifier/AddVerifier';
import RemoveVerifier from './components/cis2/verifier/RemoveVerifier';
import Verify from './components/cis2/verifier/Verify';
import MarketplaceTokensList from './components/MarketplaceTokensList';
import ContractsSetup from './components/setup/ContractsSetup';
import {
    CARBON_CREDIT_CONTRACT_ADDRESS, CARBON_CREDIT_CONTRACT_INFO, CONCORDIUM_NODE_PORT,
    CONNCORDIUM_NODE_ENDPOINT, MARKET_CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_INFO,
    PROJECT_TOKEN_CONTRACT_ADDRESS, PROJECT_TOKEN_CONTRACT_INFO
} from './Constants';
import CIS2Page from './pages/cis2/CIS2Page';
import MintPage from './pages/cis2/MintPage';
import FractionalizerPage from './pages/fractionalizer/FractionalizerPage';
import FractionalizeTokenPage from './pages/fractionalizer/FractionalizeTokenPage';
import MarketPage from './pages/marketplace/MarketPage';
import SellPage from './pages/marketplace/SellPage';
import AdminPage from './pages/setup/AdminPage';
import VerifyPage from './pages/verification/VerificationPage';
import { User } from './types/user';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d0d0d",
    },
    secondary: {
      main: "#95fcb2",
    },
  },
});

const loggedOutUser: User = { account: "", accountType: "", email: "" };

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(loggedOutUser);
  const [state] = useState({
    grpcClient: createConcordiumClient(CONNCORDIUM_NODE_ENDPOINT, Number(CONCORDIUM_NODE_PORT)),
  });

  const [marketContract, setMarketContract] = useState<ContractAddress>(MARKET_CONTRACT_ADDRESS);
  const [fracContract, setFracContract] = useState<ContractAddress>(CARBON_CREDIT_CONTRACT_ADDRESS);
  const [projectContract, setProjectContract] = useState<ContractAddress>(PROJECT_TOKEN_CONTRACT_ADDRESS);

  const isWalletUser = () => {
    return user && user.accountType === "wallet" && user.account;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth={"xl"}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="div">
                  Concordium
                </Typography>
              </Box>
              <Button component={NavLink} className="nav-link" to="/market" color="inherit">
                Market
              </Button>
              <Button
                component={NavLink}
                className="nav-link"
                to="/fractionalizer"
                color="inherit"
                disabled={!isWalletUser()}
              >
                Carbon Credits
              </Button>
              <Button component={NavLink} className="nav-link" to="/cis2" color="inherit" disabled={!isWalletUser()}>
                Projects
              </Button>
              <Button
                component={NavLink}
                className="nav-link"
                to="/verifier"
                color="inherit"
                disabled={!isWalletUser()}
              >
                verifier
              </Button>
              <Button component={NavLink} className="nav-link" to="/admin" color="inherit" disabled={!isWalletUser()}>
                Admin
              </Button>
              <UserAuth user={user} onLogin={setUser} onLogout={() => setUser(loggedOutUser)} />
            </Toolbar>
          </Container>
        </AppBar>
        <Box className="App">
          <Container maxWidth={"lg"}>
            <Routes>
              <Route path="/market" element={<MarketPage user={user} marketContract={marketContract} />} key="market">
                <Route
                  path="buy"
                  element={
                    <MarketplaceTokensList grpcClient={state.grpcClient!} user={user} marketContract={marketContract} />
                  }
                />
                <Route element={<GuardedRoute isRouteAccessible={!!user?.account} redirectRoute="/market" />}>
                  <Route
                    path="sell"
                    element={
                      <SellPage
                        grpcClient={state.grpcClient!}
                        contractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        marketContract={marketContract}
                        projectContract={projectContract}
                        fracContract={fracContract}
                      />
                    }
                  />
                  <Route path="events" element={<MarketEvents defaultContractAddress={marketContract} />} />
                  <Route path="" element={<Navigate to={"/market/buy"} replace={true} />} />
                </Route>
              </Route>
              <Route element={<GuardedRoute isRouteAccessible={!!user?.account} redirectRoute="/market" />}>
                <Route path="/admin" element={<AdminPage />} key="admin">
                  <Route
                    path="contracts-setup"
                    element={
                      <ContractsSetup
                        grpcClient={state.grpcClient!}
                        tokenContract={projectContract}
                        marketContract={marketContract}
                        fracContract={fracContract}
                        tokenContractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        marketContractInfo={MARKETPLACE_CONTRACT_INFO}
                        fracContractInfo={CARBON_CREDIT_CONTRACT_INFO}
                        onDone={(contracts) => {
                          setMarketContract(contracts.marketContract);
                          setFracContract(contracts.fracContract);
                          setProjectContract(contracts.tokenContract);
                          navigate(`admin/add-verifier`);
                        }}
                      />
                    }
                  />
                  <Route
                    path="add-verifier"
                    element={
                      <AddVerifier contractInfo={PROJECT_TOKEN_CONTRACT_INFO} projectContract={projectContract} />
                    }
                    key="add-verifier"
                  />
                  <Route
                    path="remove-verifier"
                    element={
                      <RemoveVerifier contractInfo={PROJECT_TOKEN_CONTRACT_INFO} projectContract={projectContract} />
                    }
                    key="remove-verifier"
                  />
                  <Route path="" element={<Navigate to={"/admin/contracts-setup"} replace={true} />} />
                </Route>
              </Route>
              <Route element={<GuardedRoute isRouteAccessible={!!user?.account} redirectRoute="/market" />}>
                <Route path="/cis2" element={<CIS2Page tokenContract={projectContract} />} key="cis2">
                  <Route
                    path="mint"
                    element={
                      <MintPage
                        grpcClient={state.grpcClient!}
                        key={PROJECT_TOKEN_CONTRACT_INFO.contractName}
                        contractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        tokenContract={projectContract}
                      />
                    }
                  />
                  <Route
                    path="retire"
                    element={
                      <ProjectRetire
                        grpcClient={state.grpcClient}
                        contractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        address={projectContract}
                        onDone={() => alert("tokens retireds")}
                      />
                    }
                  />
                  <Route
                    path="retract"
                    element={
                      <ProjectRetract
                        grpcClient={state.grpcClient}
                        contractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        address={projectContract}
                        onDone={() => alert("tokens retracted")}
                      />
                    }
                  />
                  <Route path="events" element={<ProjectEvents defaultContractAddress={projectContract} />} />
                  <Route
                    path="balanceOf"
                    element={
                      <Cis2BalanceOf
                        grpcClient={state.grpcClient}
                        contractName={PROJECT_TOKEN_CONTRACT_INFO.contractName}
                        contract={projectContract}
                        defaultAccount={user?.account}
                      />
                    }
                  />
                  <Route path="" element={<Navigate to={"mint"} replace={true} />} />
                </Route>
              </Route>
              <Route element={<GuardedRoute isRouteAccessible={!!user?.account} redirectRoute="/market" />}>
                <Route path="/fractionalizer" element={<FractionalizerPage fracContract={fracContract} />}>
                  <Route
                    path="fractionalize"
                    element={
                      <FractionalizeTokenPage
                        grpcClient={state.grpcClient!}
                        contractInfo={CARBON_CREDIT_CONTRACT_INFO}
                        fracContract={fracContract}
                        tokenContract={projectContract}
                      />
                    }
                  />
                  <Route
                    path="retire"
                    element={
                      <FractionalizerRetire
                        onDone={() => alert("tokens retireds")}
                        grpcClient={state.grpcClient!}
                        contractInfo={CARBON_CREDIT_CONTRACT_INFO}
                        address={fracContract}
                      />
                    }
                  />
                  <Route
                    path="retract"
                    element={
                      <FractionalizerRetract
                        onDone={() => alert("tokens retracted")}
                        grpcClient={state.grpcClient!}
                        contractInfo={CARBON_CREDIT_CONTRACT_INFO}
                        address={fracContract}
                      />
                    }
                  />
                  <Route path="events" element={<FractionalizerEvents defaultContractAddress={fracContract} />} />
                  <Route
                    path="balanceOf"
                    element={
                      <Cis2BalanceOf
                        grpcClient={state.grpcClient}
                        contractName={CARBON_CREDIT_CONTRACT_INFO.contractName}
                        defaultAccount={user?.account}
                        contract={fracContract}
                      />
                    }
                  />
                  <Route path="" element={<Navigate to={`fractionalize`} replace={true} />} />
                </Route>
              </Route>
              <Route element={<GuardedRoute isRouteAccessible={!!user?.account} redirectRoute="/market" />}>
                <Route path="/verifier" element={<VerifyPage tokenContract={projectContract} />} key="verifier">
                  <Route
                    path="verify"
                    element={<Verify contractInfo={PROJECT_TOKEN_CONTRACT_INFO} projectContract={projectContract} />}
                  />
                  <Route
                    path="retract"
                    element={
                      <ProjectRetract
                        contractInfo={PROJECT_TOKEN_CONTRACT_INFO}
                        address={projectContract}
                        grpcClient={state.grpcClient}
                        onDone={() => alert("Project(s) Retracted")}
                      />
                    }
                  />
                  <Route path="" element={<Navigate to={"verify"} replace={true} />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to={"/market"} replace={true} />} />
            </Routes>
          </Container>
        </Box>
        <footer className="footer">
          <Typography textAlign={"center"} sx={{ color: "white" }}>
            <Link
              sx={{ color: "white" }}
              href="https://developer.concordium.software/en/mainnet/net/guides/low-code-nft-marketplace/introduction.html"
              target={"_blank"}
            >
              Visit the Concordium documentation portal to create your own marketplace in a few minutes!
            </Link>
          </Typography>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default App;
